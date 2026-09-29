import React from 'react';
import { 
  ShieldCheck, 
  Settings, 
  LogOut, 
  PlusCircle, 
  Edit3, 
  MapPin, 
  Building2, 
  FileText,
  Sliders,
  Handshake,
  Calculator
} from 'lucide-react';

interface AdminBarProps {
  isAdminLoggedIn: boolean;
  onOpenAdminTab: (tab: string) => void;
  onLogout: () => void;
  onLogin: () => void;
}

export const AdminBar: React.FC<AdminBarProps> = ({
  isAdminLoggedIn,
  onOpenAdminTab,
  onLogout,
  onLogin
}) => {
  if (!isAdminLoggedIn) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-amber-600 via-amber-700 to-rose-700 text-white shadow-xl px-4 py-2 text-xs font-semibold border-b border-amber-400/40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left Badge */}
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
          <span className="font-extrabold uppercase tracking-wider text-amber-100 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-white" />
            Chế Độ Quản Trị Viên (Live CMS):
          </span>
          <span className="hidden md:inline text-amber-100 text-[11px] font-normal">
            Bấm nút [✏️ Sửa] tại bất kỳ phần nào trên web để chỉnh sửa ngay lập tức không cần code!
          </span>
        </div>

        {/* Quick Edit Shortcuts */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => onOpenAdminTab('factories_add')}
            className="bg-white/20 hover:bg-white text-white hover:text-slate-900 px-2.5 py-1 rounded-lg transition font-bold flex items-center gap-1"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Thêm Nhà Máy</span>
          </button>

          <button
            onClick={() => onOpenAdminTab('partners')}
            className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg transition flex items-center gap-1"
          >
            <Handshake className="w-3.5 h-3.5 text-amber-300" />
            <span>Doanh Nghiệp & Khách Hàng</span>
          </button>

          <button
            onClick={() => onOpenAdminTab('offices')}
            className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg transition flex items-center gap-1"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-300" />
            <span>Địa Chỉ & Chi Nhánh</span>
          </button>

          <button
            onClick={() => onOpenAdminTab('calculator')}
            className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg transition flex items-center gap-1"
          >
            <Calculator className="w-3.5 h-3.5 text-cyan-300" />
            <span>Thông Số Tính Lương</span>
          </button>

          <button
            onClick={() => onOpenAdminTab('general')}
            className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded-lg transition flex items-center gap-1"
          >
            <Sliders className="w-3.5 h-3.5 text-blue-300" />
            <span>Hotline & Logo</span>
          </button>

          <button
            onClick={() => onOpenAdminTab('dashboard')}
            className="bg-slate-900/80 hover:bg-slate-900 text-white px-3 py-1 rounded-lg transition font-bold flex items-center gap-1 shadow"
          >
            <Settings className="w-3.5 h-3.5 text-amber-300" />
            <span>Tất Cả Cài Đặt (CMS)</span>
          </button>

          <button
            onClick={onLogout}
            className="bg-black/30 hover:bg-black/50 text-white/90 hover:text-white px-2 py-1 rounded-lg transition flex items-center gap-1 ml-1"
            title="Thoát chế độ quản trị"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Thoát</span>
          </button>
        </div>
      </div>
    </div>
  );
};
