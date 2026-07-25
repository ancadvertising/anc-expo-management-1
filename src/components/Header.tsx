import React from 'react';
import { 
  Building2, 
  Search, 
  Sun, 
  Moon, 
  ShieldCheck, 
  History, 
  ChevronDown, 
  Plus,
  LogOut,
  MapPin,
  Layers,
  Bell
} from 'lucide-react';
import { ExpoEvent, ThemeMode, StaffMember } from '../types';

interface HeaderProps {
  expos: ExpoEvent[];
  selectedExpoId: string;
  onSelectExpo: (id: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenAuditLog: () => void;
  auditCount: number;
  currentUser: StaffMember;
  onOpenLoginModal: () => void;
  onOpenNewRFQ?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  expos,
  selectedExpoId,
  onSelectExpo,
  searchTerm,
  onSearchChange,
  theme,
  onToggleTheme,
  onOpenAuditLog,
  auditCount,
  currentUser,
  onOpenLoginModal,
  onOpenNewRFQ,
}) => {
  const currentExpo = expos.find((e) => e.id === selectedExpoId) || expos[0];

  return (
    <header className={`border-b transition-colors duration-200 sticky top-0 z-40 backdrop-blur-md ${
      theme === 'dark' 
        ? 'bg-[#080a0f]/95 border-[#181c26] text-slate-100' 
        : 'bg-white/95 border-slate-200 text-slate-800 shadow-xs'
    }`}>
      {/* Main ANC ADVERTISING Header Bar */}
      <div className="px-4 lg:px-6 py-3 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Right Side: Section Breadcrumb & Title / Search */}
        <div className="flex items-center gap-4 flex-1">
          <div>
            <div className="text-[10px] font-bold text-slate-400">نظرة عامة</div>
            <h1 className="text-lg font-black text-white font-cairo tracking-tight">
              لوحة المؤشرات والتحكم
            </h1>
          </div>

          <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>

          {/* Expo Selector */}
          <div className="relative group min-w-[200px]">
            <div className={`flex items-center justify-between px-3 py-1.5 rounded-xl border text-xs cursor-pointer transition-all ${
              theme === 'dark'
                ? 'bg-[#0f131d] hover:bg-[#151a28] border-[#1e2332] text-slate-100'
                : 'bg-slate-100 hover:bg-slate-200/80 border-slate-300 text-slate-900'
            }`}>
              <div className="flex items-center gap-2 truncate">
                <Building2 className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <div className="truncate text-right">
                  <div className="font-bold truncate text-xs">{currentExpo.name}</div>
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>

            <select
              value={selectedExpoId}
              onChange={(e) => onSelectExpo(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              title="اختر المعرض"
            >
              {expos.map((e) => (
                <option key={e.id} value={e.id} className="bg-slate-900 text-white p-2">
                  {e.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-xs hidden xl:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="بحث شامل..."
              className={`w-full pr-8 pl-3 py-1.5 rounded-xl text-xs transition-all outline-hidden border ${
                theme === 'dark'
                  ? 'bg-[#0d1017] border-[#1e2332] text-slate-100 focus:border-emerald-500'
                  : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>
        </div>

        {/* Left Side: Buttons matching ANC ADVERTISING screenshot */}
        <div className="flex items-center gap-2.5 flex-wrap justify-end">
          {/* Logout Button */}
          <button
            onClick={onOpenLoginModal}
            className="px-3 py-1.5 rounded-xl border border-slate-700 bg-[#0d1017] hover:bg-slate-800 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
            title="تسجيل الخروج"
          >
            <LogOut className="w-3.5 h-3.5 text-slate-400" />
            <span>تسجيل الخروج</span>
          </button>

          {/* New Action Button (+ إضافة جديدة) */}
          <button
            onClick={onOpenNewRFQ}
            className="px-3.5 py-1.5 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-xs transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-900 stroke-[3]" />
            <span>إضافة جديدة</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl border border-slate-700 bg-[#0d1017] hover:bg-slate-800 text-slate-300 transition-all"
            title="تغيير المظهر"
          >
            {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
          </button>

          {/* Online Status Pill (متصل) */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0d1017] border border-slate-700 text-slate-300 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>متصل</span>
          </div>

          {/* User Profile Card (ANC Administrator) */}
          <div 
            onClick={onOpenLoginModal}
            className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#0d1017] border border-slate-700 text-right cursor-pointer hover:bg-slate-800/80 transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-900 font-black flex items-center justify-center text-xs">
              A
            </div>
            <div className="hidden sm:block text-right">
              <div className="text-xs font-black text-white leading-tight">ANC Administrator</div>
              <div className="text-[9px] text-slate-400 leading-tight">المدير الأساسي</div>
            </div>
          </div>

          {/* Approval Requests Pill (طلبات الاعتماد (0)) */}
          <button
            onClick={onOpenAuditLog}
            className="px-3 py-1.5 rounded-xl border border-slate-700 bg-[#0d1017] hover:bg-slate-800 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <span>طلبات الاعتماد</span>
            <span className="bg-slate-800 text-slate-300 text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold">
              ({auditCount})
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

