import { useState, useMemo, FormEvent } from 'react';
import {
  X,
  Lock,
  User,
  Calendar,
  Clock,
  Trash2,
  Plus,
  Check,
  AlertCircle,
  LogOut,
  Scissors,
  Phone,
  FileText,
  ShieldCheck,
  Eye,
  EyeOff,
  MessageSquare,
  Search,
  CheckCircle2,
  Filter,
  CheckCheck
} from 'lucide-react';
import { AppointmentRecord } from '../types';
import { SERVICES } from '../data/barberData';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: AppointmentRecord[];
  onAddAppointment: (record: Omit<AppointmentRecord, 'id' | 'createdAt'>) => void;
  onDeleteAppointment: (id: string, day: string, time: string) => void;
  onUpdateStatus?: (id: string, newStatus: 'Beklemede' | 'Onaylandı' | 'Tamamlandı') => void;
}

const ALL_SLOTS = [
  '09:30', '10:15', '11:00', '11:45',
  '13:00', '13:45', '14:30', '15:15',
  '16:00', '16:45', '17:30', '18:15',
  '19:00', '19:45', '20:15'
];

export default function AdminPanelModal({
  isOpen,
  onClose,
  appointments,
  onAddAppointment,
  onDeleteAppointment,
  onUpdateStatus,
}: AdminPanelModalProps) {
  // Giriş durumu (sessionStorage ile saklanır)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('berber_admin_auth') === 'true';
  });

  // Giriş form alanları (Kullanıcı adı: berbervezir, şifre: 12345)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Filtreler & Arama
  const [activeFilterDay, setActiveFilterDay] = useState<'Tümü' | 'Bugün' | 'Yarın' | 'Sonraki Gün'>('Tümü');
  const [activeStatusFilter, setActiveStatusFilter] = useState<'Tümü' | 'Beklemede' | 'Onaylandı' | 'Tamamlandı'>('Tümü');
  const [searchQuery, setSearchQuery] = useState('');

  // Silme Onay Durumu (iframe içinde window.confirm bloklanmasını önler)
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Yeni randevu modalı içindeki mini form durumu
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [newDay, setNewDay] = useState<string>('Bugün');
  const [newTime, setNewTime] = useState<string>('14:30');
  const [newCustomerName, setNewCustomerName] = useState<string>('');
  const [newPhone, setNewPhone] = useState<string>('');
  const [newNote, setNewNote] = useState<string>('');
  const [newSelectedServiceIds, setNewSelectedServiceIds] = useState<string[]>([SERVICES[0].id]);
  const [newStatus, setNewStatus] = useState<'Beklemede' | 'Onaylandı'>('Onaylandı');
  const [formError, setFormError] = useState('');

  // Giriş işlemi kontrolü
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'berbervezir' && password === '12345') {
      setIsAuthenticated(true);
      sessionStorage.setItem('berber_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Hatalı kullanıcı adı veya şifre! (Kullanıcı: berbervezir, Şifre: 12345)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('berber_admin_auth');
    setUsername('');
    setPassword('');
  };

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Yeni Randevu Ekleme işlemi
  const handleCreateAppointment = (e: FormEvent) => {
    e.preventDefault();
    if (!newCustomerName.trim()) {
      setFormError('Lütfen müşteri adını giriniz.');
      return;
    }

    // Seçilen saat dolu mu kontrolü
    const isSlotTaken = appointments.some(
      (app) => app.day === newDay && app.time === newTime
    );

    if (isSlotTaken) {
      setFormError(`${newDay} günü saat ${newTime} zaten randevuludur! Lütfen başka bir saat seçin.`);
      return;
    }

    const selectedServiceObjects = SERVICES.filter((s) =>
      newSelectedServiceIds.includes(s.id)
    );
    const serviceNames = selectedServiceObjects.map((s) => s.name);
    const totalPrice = selectedServiceObjects.reduce((acc, s) => acc + s.price, 0);

    onAddAppointment({
      day: newDay,
      time: newTime,
      customerName: newCustomerName.trim(),
      phone: newPhone.trim() || undefined,
      serviceNames,
      totalPrice,
      note: newNote.trim() || undefined,
      status: newStatus,
      source: 'admin',
    });

    // Formu sıfırla
    setNewCustomerName('');
    setNewPhone('');
    setNewNote('');
    setNewSelectedServiceIds([SERVICES[0].id]);
    setFormError('');
    setIsAddFormOpen(false);
    showNotification(`${newCustomerName.trim()} için ${newDay} ${newTime} randevusu başarıyla oluşturuldu.`);
  };

  const toggleServiceSelection = (id: string) => {
    setNewSelectedServiceIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Randevu Silme işlemi
  const handleExecuteDelete = (id: string, day: string, time: string, customerName: string) => {
    onDeleteAppointment(id, day, time);
    setConfirmDeleteId(null);
    showNotification(`${customerName} randevusu silindi. ${day} ${time} saati sitede tekrar "Müsait" oldu.`);
  };

  // Randevuları filtrele & ara
  const filteredAppointments = useMemo(() => {
    return appointments.filter((app) => {
      // Gün filtresi
      if (activeFilterDay !== 'Tümü' && app.day !== activeFilterDay) {
        return false;
      }
      // Durum filtresi
      if (activeStatusFilter !== 'Tümü') {
        const appStatus = app.status || 'Onaylandı';
        if (appStatus !== activeStatusFilter) return false;
      }
      // Arama filtresi
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = app.customerName.toLowerCase().includes(q);
        const matchPhone = app.phone ? app.phone.toLowerCase().includes(q) : false;
        const matchTime = app.time.includes(q);
        const matchService = app.serviceNames.some((s) => s.toLowerCase().includes(q));
        if (!matchName && !matchPhone && !matchTime && !matchService) {
          return false;
        }
      }
      return true;
    });
  }, [appointments, activeFilterDay, activeStatusFilter, searchQuery]);

  // Metrikler
  const totalRevenue = appointments.reduce((sum, app) => sum + (app.totalPrice || 0), 0);
  const todayCount = appointments.filter((a) => a.day === 'Bugün').length;
  const pendingCount = appointments.filter((a) => (a.status || 'Onaylandı') === 'Beklemede').length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/90 backdrop-blur-md animate-fadeIn font-['Plus_Jakarta_Sans',sans-serif]">
      <div
        className="relative w-full max-w-4xl bg-[#161616] border border-[#d4af37]/40 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.85)] p-5 sm:p-8 text-[#f5f5f5] my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-[#222222] border border-[#333333] hover:border-[#d4af37] text-[#888888] hover:text-[#f5f5f5] flex items-center justify-center transition-colors cursor-pointer z-10"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/90 border border-emerald-500/70 text-emerald-200 text-xs sm:text-sm flex items-center gap-2 animate-fadeIn shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 1. GİRİŞ YAPILMAMIŞSA: Giriş Formu */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2a2412] to-[#1a160a] border border-[#d4af37]/40 flex items-center justify-center mx-auto mb-3 text-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-[#f5f5f5]">
                Berber Vezir Yönetici Girişi
              </h3>
              <p className="text-xs sm:text-sm text-[#999999] mt-1">
                Siteden alınan tüm randevuları detaylı inceleyebilir, duruma göre silebilir veya yeni randevu ekleyebilirsiniz.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/50 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1.5">
                  Kullanıcı Adı
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#888888] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="berbervezir"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#202020] border border-[#333333] text-sm text-white placeholder-[#555555] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#d4af37] mb-1.5">
                  Şifre
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#888888] absolute left-3.5 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="•••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#202020] border border-[#333333] text-sm text-white placeholder-[#555555] focus:outline-none focus:border-[#d4af37]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-[#888888] hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89327] hover:from-[#e5bd3d] hover:to-[#cda52e] text-[#121212] font-bold text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] active:scale-98 cursor-pointer"
                >
                  Panele Giriş Yap
                </button>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setUsername('berbervezir');
                    setPassword('12345');
                  }}
                  className="text-[11px] text-[#888888] hover:text-[#d4af37] underline transition-colors cursor-pointer"
                >
                  Hızlı Doldur (berbervezir / 12345)
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* 2. GİRİŞ YAPILMIŞSA: Yönetici Randevu Paneli */
          <div>
            {/* Header Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#2a2a2a] mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-[#2a2412] text-[#d4af37] border border-[#d4af37]/30">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">
                    Berber Vezir • Yönetici Paneli
                  </span>
                </div>
                <h3 className="font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-white mt-1">
                  Canlı Randevu Masası
                </h3>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  onClick={() => setIsAddFormOpen(!isAddFormOpen)}
                  className="px-3.5 py-2 rounded-xl bg-[#d4af37] hover:bg-[#e5bd3d] text-[#121212] text-xs font-bold flex items-center gap-1.5 transition-all shadow cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isAddFormOpen ? 'Formu Kapat' : 'Manuel Randevu Ekle'}</span>
                </button>

                <button
                  onClick={handleLogout}
                  title="Çıkış Yap"
                  className="px-3 py-2 rounded-xl bg-[#222222] hover:bg-[#2e2222] border border-[#383838] hover:border-rose-500/50 text-[#888888] hover:text-rose-400 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Çıkış</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3.5 rounded-xl bg-[#1e1e1e] border border-[#2b2b2b]">
                <span className="text-[11px] text-[#888888] block">Toplam Randevu</span>
                <span className="text-xl font-bold text-white font-mono">{appointments.length} Seans</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1e1e1e] border border-[#2b2b2b]">
                <span className="text-[11px] text-[#888888] block">Bugünkü Randevular</span>
                <span className="text-xl font-bold text-emerald-400 font-mono">{todayCount} Seans</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1e1e1e] border border-[#2b2b2b]">
                <span className="text-[11px] text-[#888888] block">Bekleyen Onay</span>
                <span className="text-xl font-bold text-amber-400 font-mono">{pendingCount}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#1e1e1e] border border-[#2b2b2b]">
                <span className="text-[11px] text-[#888888] block">Tahmini Kazanç</span>
                <span className="text-xl font-bold text-[#d4af37] font-mono">{totalRevenue} ₺</span>
              </div>
            </div>

            {/* Manuel Randevu Ekleme Formu (Açılır/Kapanır) */}
            {isAddFormOpen && (
              <form
                onSubmit={handleCreateAppointment}
                className="mb-6 p-5 rounded-2xl bg-[#1c1c1c] border border-[#d4af37]/40 shadow-xl space-y-4 animate-fadeIn"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#d4af37] uppercase tracking-wider flex items-center gap-2">
                    <Scissors className="w-4 h-4" />
                    Dükkan / Telefon İle Randevu Kaydet
                  </h4>
                  <button
                    type="button"
                    onClick={() => setIsAddFormOpen(false)}
                    className="text-xs text-[#888888] hover:text-white cursor-pointer"
                  >
                    Vazgeç
                  </button>
                </div>

                {formError && (
                  <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Gün Seçimi */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#b5b5b5] mb-1">
                      Gün Tercihi
                    </label>
                    <select
                      value={newDay}
                      onChange={(e) => setNewDay(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#252525] border border-[#383838] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Bugün">Bugün</option>
                      <option value="Yarın">Yarın</option>
                      <option value="Sonraki Gün">Sonraki Gün</option>
                    </select>
                  </div>

                  {/* Saat Seçimi */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#b5b5b5] mb-1">
                      Saat (45 dk seans)
                    </label>
                    <select
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#252525] border border-[#383838] text-xs text-white font-mono focus:outline-none focus:border-[#d4af37]"
                    >
                      {ALL_SLOTS.map((t) => {
                        const isTaken = appointments.some(
                          (a) => a.day === newDay && a.time === t
                        );
                        return (
                          <option key={t} value={t} disabled={isTaken}>
                            {t} {isTaken ? '(Dolu)' : '(Müsait)'}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  {/* Durum */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#b5b5b5] mb-1">
                      Başlangıç Durumu
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as 'Beklemede' | 'Onaylandı')}
                      className="w-full px-3 py-2 rounded-lg bg-[#252525] border border-[#383838] text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Onaylandı">Onaylandı (Kesin)</option>
                      <option value="Beklemede">Beklemede (Teyit Edilecek)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Müşteri Adı */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#b5b5b5] mb-1">
                      Müşteri Adı & Soyadı *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Mustafa Bey"
                      value={newCustomerName}
                      onChange={(e) => setNewCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#252525] border border-[#383838] text-xs text-white placeholder-[#666666] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  {/* Telefon Numarası */}
                  <div>
                    <label className="block text-[11px] font-bold text-[#b5b5b5] mb-1">
                      Telefon Numarası
                    </label>
                    <input
                      type="tel"
                      placeholder="0530 000 0000"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#252525] border border-[#383838] text-xs text-white placeholder-[#666666] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                {/* Hizmet Çoklu Seçim */}
                <div>
                  <label className="block text-[11px] font-bold text-[#b5b5b5] mb-1.5">
                    Hizmetler (Çoklu Seçilebilir)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SERVICES.map((srv) => {
                      const isSelected = newSelectedServiceIds.includes(srv.id);
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => toggleServiceSelection(srv.id)}
                          className={`p-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#2a2412] border-[#d4af37] text-white'
                              : 'bg-[#252525] border-[#383838] text-[#888888] hover:border-[#555555]'
                          }`}
                        >
                          <div className="font-semibold truncate">{srv.name}</div>
                          <div className="text-[11px] text-[#d4af37] font-mono">{srv.price} ₺</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Not */}
                <div>
                  <label className="block text-[11px] font-bold text-[#b5b5b5] mb-1">
                    Özel Not
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Telefonla aradı, kafa yapısına uygun kesim istedi..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#252525] border border-[#383838] text-xs text-white placeholder-[#666666] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddFormOpen(false)}
                    className="px-4 py-2 rounded-lg bg-[#262626] hover:bg-[#303030] text-xs text-[#cccccc] font-medium cursor-pointer"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#d4af37] hover:bg-[#e5bd3d] text-[#121212] text-xs font-bold uppercase tracking-wider cursor-pointer shadow"
                  >
                    Randevuyu Kaydet & Saati Kilitle
                  </button>
                </div>
              </form>
            )}

            {/* Arama ve Filtre Kontrolleri */}
            <div className="space-y-3 mb-5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-[#888888] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Müşteri, telefon veya saat ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#202020] border border-[#333333] text-xs text-white placeholder-[#666666] focus:outline-none focus:border-[#d4af37]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-2.5 text-xs text-[#777777] hover:text-white"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
                  <Filter className="w-3.5 h-3.5 text-[#888888] shrink-0 mr-1" />
                  {(['Tümü', 'Onaylandı', 'Beklemede', 'Tamamlandı'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setActiveStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                        activeStatusFilter === st
                          ? 'bg-[#d4af37] text-[#121212] font-bold'
                          : 'bg-[#202020] text-[#888888] hover:text-white border border-[#303030]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Day Filter Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {(['Tümü', 'Bugün', 'Yarın', 'Sonraki Gün'] as const).map((day) => {
                  const isActive = activeFilterDay === day;
                  const count = day === 'Tümü'
                    ? appointments.length
                    : appointments.filter((a) => a.day === day).length;
                  return (
                    <button
                      key={day}
                      onClick={() => setActiveFilterDay(day)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#d4af37] text-[#121212] font-bold shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                          : 'bg-[#202020] border border-[#303030] text-[#999999] hover:text-white'
                      }`}
                    >
                      {day} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Randevu Kartları Listesi */}
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-2xl bg-[#1c1c1c] border border-[#2b2b2b]">
                <Calendar className="w-10 h-10 text-[#555555] mx-auto mb-3" />
                <p className="text-sm font-semibold text-[#cccccc]">
                  {searchQuery
                    ? `"${searchQuery}" aramasına uygun randevu bulunamadı.`
                    : activeFilterDay === 'Tümü'
                    ? 'Henüz kayıtlı randevu bulunmuyor.'
                    : `${activeFilterDay} günü için henüz randevu bulunmuyor.`}
                </p>
                <p className="text-xs text-[#888888] mt-1 max-w-md mx-auto">
                  Müşteriler siteden randevu aldığında veya siz "+ Manuel Randevu Ekle" butonuna bastığınızda detaylarıyla burada listelenir.
                </p>
                <button
                  onClick={() => setIsAddFormOpen(true)}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#262626] hover:bg-[#303030] border border-[#d4af37]/40 text-xs font-bold text-[#d4af37] cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Randevu Ekle</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredAppointments.map((app) => {
                  const isPendingDelete = confirmDeleteId === app.id;
                  const currentStatus = app.status || 'Onaylandı';
                  const cleanPhone = app.phone ? app.phone.replace(/\D/g, '') : '';

                  return (
                    <div
                      key={app.id}
                      className="p-4 sm:p-5 rounded-2xl bg-[#1e1e1e] border border-[#2f2f2f] hover:border-[#d4af37]/50 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4 shadow-md"
                    >
                      {/* Sol: Detaylı Bilgiler */}
                      <div className="space-y-2 flex-1">
                        {/* Başlık Satırı: Gün, Saat, İsim, Durum, Kaynak */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-1 rounded-lg bg-[#2a2412] text-[#d4af37] font-mono text-xs font-bold border border-[#d4af37]/40 flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#d4af37]" />
                            <span>{app.day} • {app.time}</span>
                          </span>

                          <span className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-[#888888]" />
                            <span>{app.customerName}</span>
                          </span>

                          {/* Durum Rozeti */}
                          <button
                            type="button"
                            onClick={() => {
                              if (onUpdateStatus) {
                                const nextStatus =
                                  currentStatus === 'Onaylandı'
                                    ? 'Tamamlandı'
                                    : currentStatus === 'Tamamlandı'
                                    ? 'Beklemede'
                                    : 'Onaylandı';
                                onUpdateStatus(app.id, nextStatus);
                                showNotification(`${app.customerName} durumu "${nextStatus}" olarak güncellendi.`);
                              }
                            }}
                            title="Durumu değiştirmek için tıklayın"
                            className={`px-2 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide cursor-pointer transition-transform hover:scale-105 ${
                              currentStatus === 'Onaylandı'
                                ? 'bg-emerald-950/70 border border-emerald-500/50 text-emerald-300'
                                : currentStatus === 'Tamamlandı'
                                ? 'bg-blue-950/70 border border-blue-500/50 text-blue-300'
                                : 'bg-amber-950/70 border border-amber-500/50 text-amber-300'
                            }`}
                          >
                            ● {currentStatus}
                          </button>

                          {/* Kaynak */}
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#272727] text-[#888888] border border-[#333333]">
                            {app.source === 'admin' ? 'Dükkan Kaydı' : 'Web Rezervasyonu'}
                          </span>

                          {app.createdAt && (
                            <span className="text-[11px] text-[#777777]">
                              (Kayıt: {app.createdAt})
                            </span>
                          )}
                        </div>

                        {/* Telefon & Hızlı İletişim Butonları */}
                        {app.phone && (
                          <div className="flex items-center gap-2 flex-wrap pt-0.5">
                            <span className="text-xs text-[#cfcfcf] font-mono font-medium flex items-center gap-1 bg-[#242424] px-2 py-1 rounded-md border border-[#333333]">
                              <Phone className="w-3 h-3 text-[#d4af37]" />
                              {app.phone}
                            </span>

                            {/* Tıkla Ara */}
                            <a
                              href={`tel:${cleanPhone}`}
                              className="px-2.5 py-1 rounded-md bg-[#252525] hover:bg-[#303030] text-[11px] font-semibold text-[#f0f0f0] border border-[#383838] flex items-center gap-1 transition-colors"
                            >
                              <Phone className="w-3 h-3 text-[#d4af37]" />
                              <span>Ara</span>
                            </a>

                            {/* WhatsApp Yaz */}
                            <a
                              href={`https://wa.me/90${cleanPhone}?text=${encodeURIComponent(`Merhaba ${app.customerName}, Berber Vezir olarak ${app.day} ${app.time} randevunuz ile ilgili bilgi vermek istiyoruz.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-md bg-emerald-950/50 hover:bg-emerald-900/60 text-[11px] font-semibold text-emerald-300 border border-emerald-600/40 flex items-center gap-1 transition-colors"
                            >
                              <MessageSquare className="w-3 h-3 text-emerald-400" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        )}

                        {/* Seçilen Hizmetlerin Ayrıntısı */}
                        <div className="text-xs text-[#b0b0b0] flex items-center gap-2 flex-wrap pt-1">
                          <Scissors className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                          <span className="text-[#888888]">Hizmetler:</span>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {app.serviceNames.map((sName, sIdx) => (
                              <span
                                key={sIdx}
                                className="px-2 py-0.5 rounded bg-[#262626] border border-[#333333] text-[#e0e0e0] font-medium text-[11px]"
                              >
                                {sName}
                              </span>
                            ))}
                          </div>
                          <span className="text-[#d4af37] font-bold font-mono text-sm ml-auto sm:ml-2">
                            Toplam: {app.totalPrice} ₺
                          </span>
                        </div>

                        {/* Varsa Müşteri Notu */}
                        {app.note && (
                          <div className="text-xs text-[#a0a0a0] bg-[#222222] p-2 rounded-lg border border-[#2e2e2e] flex items-start gap-1.5 mt-1">
                            <FileText className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                            <span><strong className="text-[#cccccc]">Müşteri Notu:</strong> {app.note}</span>
                          </div>
                        )}
                      </div>

                      {/* Sağ: Sil Butonu ve İki Aşamalı Güvenli Silme Onayı */}
                      <div className="self-end sm:self-center shrink-0 pt-2 sm:pt-0">
                        {isPendingDelete ? (
                          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-rose-950/80 border border-rose-600/70 animate-fadeIn">
                            <span className="text-[11px] text-rose-200 font-bold px-1">Silinsin mi?</span>
                            <button
                              onClick={() => handleExecuteDelete(app.id, app.day, app.time, app.customerName)}
                              className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors cursor-pointer"
                            >
                              Evet, Sil
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="px-2 py-1 rounded-lg bg-[#222222] hover:bg-[#333333] text-gray-300 text-xs transition-colors cursor-pointer"
                            >
                              Vazgeç
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmDeleteId(app.id)}
                            className="px-3 py-2 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 text-rose-300 hover:text-rose-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer hover:border-rose-500/60 active:scale-95"
                            title="Randevuyu Sil (Saati Müsait Yap)"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Randevuyu Sil</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
