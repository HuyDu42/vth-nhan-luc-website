import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Settings, 
  ChevronRight,
  Edit3
} from 'lucide-react';
import { Language, GeneralSettings } from '../types';

interface FooterProps {
  currentLang: Language;
  onOpenAdminModal: () => void;
  onOpenApplyModal: () => void;
  onOpenEmployerModal: () => void;
  general: GeneralSettings;
  isAdminLoggedIn?: boolean;
  onEditSection?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onOpenAdminModal,
  onOpenApplyModal,
  onOpenEmployerModal,
  general,
  isAdminLoggedIn,
  onEditSection
}) => {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: About company */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-md">
                VTH
              </div>
              <div>
                <div className="font-extrabold text-white text-base tracking-tight leading-none">
                  {general.brandName}
                </div>
                <div className="text-[10px] font-semibold text-rose-500 uppercase tracking-wider mt-1">
                  {general.domain} • {general.subBrand}
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Đơn vị hàng đầu chuyên cung ứng lao động thời vụ, cho thuê lại lao động và gia công đóng gói cho các nhà máy, khu công nghiệp tại Đồng Nai, Bình Dương, TP.HCM và các tỉnh lân cận.
            </p>

            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{general.license}</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Dịch Vụ Cung Ứng
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#dich-vu" className="hover:text-rose-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-500" />
                  <span>Cho thuê lại lao động (Subleasing)</span>
                </a>
              </li>
              <li>
                <a href="#dich-vu" className="hover:text-rose-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-500" />
                  <span>Cung ứng lao động thời vụ cao điểm</span>
                </a>
              </li>
              <li>
                <a href="#dich-vu" className="hover:text-rose-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-500" />
                  <span>Gia công đóng gói & hoàn thiện sản phẩm</span>
                </a>
              </li>
              <li>
                <a href="#dich-vu" className="hover:text-rose-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-500" />
                  <span>Bốc xếp kho bãi & vận hành container</span>
                </a>
              </li>
              <li>
                <a href="#dich-vu" className="hover:text-rose-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-500" />
                  <span>Quản lý tiền lương Payroll & Nhân sự</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Hot Factories & Quick Links */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Liên Kết Nhanh
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#nha-may" className="hover:text-rose-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-500" />
                  <span>Danh sách nhà máy tuyển dụng</span>
                </a>
              </li>
              <li>
                <a href="#tinh-luong" className="hover:text-rose-400 transition flex items-center gap-1.5 text-blue-400">
                  <ChevronRight className="w-3 h-3 text-blue-500" />
                  <span>Công cụ tính lương thực nhận</span>
                </a>
              </li>
              <li>
                <a href="#doanh-nghiep" className="hover:text-rose-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-500" />
                  <span>Dành cho doanh nghiệp báo giá</span>
                </a>
              </li>
              <li>
                <a href="#ve-chung-toi" className="hover:text-rose-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-500" />
                  <span>Hồ sơ năng lực & pháp lý</span>
                </a>
              </li>
              <li>
                <a href="#tin-tuc" className="hover:text-rose-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-500" />
                  <span>Bản tin tuyển dụng & cẩm nang</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Access */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Liên Hệ Trực Tuyến
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Hotline: <strong className="text-white">{general.hotline}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                <span>Email: {general.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{general.headOfficeAddress}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-3">
              <button
                onClick={onOpenAdminModal}
                className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition font-bold"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{isAdminLoggedIn ? '⚡ Bảng Điều Khiển CMS' : 'Đăng Nhập Quản Trị (/admin)'}</span>
              </button>

              {onEditSection && (
                <button
                  onClick={onEditSection}
                  className="text-xs bg-slate-800 hover:bg-amber-500 text-slate-300 hover:text-slate-950 px-2.5 py-1 rounded transition flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Sửa Chân Trang</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div>
            © 2026 {general.subBrand}. Bản quyền thuộc về <strong className="text-slate-400">{general.domain}</strong>.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Chính sách bảo mật</span>
            <span>•</span>
            <span>Quy chế hoạt động</span>
            <span>•</span>
            <a href={general.zaloLink} target="_blank" rel="noreferrer" className="text-rose-400 hover:underline font-bold">
              Zalo Tuyển Dụng
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
