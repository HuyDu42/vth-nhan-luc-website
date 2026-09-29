import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  UserCheck, 
  Building2, 
  Calculator, 
  ShieldCheck,
  Globe,
  Settings,
  Edit3
} from 'lucide-react';
import { Language, GeneralSettings } from '../types';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenApplyModal: () => void;
  onOpenEmployerModal: () => void;
  onOpenAdminModal: () => void;
  generalSettings: GeneralSettings;
  isAdminLoggedIn?: boolean;
  onEditSection?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenApplyModal,
  onOpenEmployerModal,
  onOpenAdminModal,
  generalSettings,
  isAdminLoggedIn,
  onEditSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    vi: {
      hotline: 'Hotline 24/7:',
      workingTime: generalSettings.workingHours || 'T2 - T7: 7:30 - 20:30',
      applyNow: 'Ứng Tuyển Nhanh',
      b2b: 'Dành Cho Doanh Nghiệp',
      admin: 'Quản Trị CMS',
      nav: {
        home: 'Trang Chủ',
        services: 'Dịch Vụ',
        jobs: 'Việc Làm Nhà Máy',
        calculator: 'Tính Thu Nhập',
        b2b: 'Doanh Nghiệp',
        about: 'Về Chúng Tôi',
        news: 'Tin Tức',
        contact: 'Liên Hệ'
      }
    },
    zh: {
      hotline: '服务热线 24/7:',
      workingTime: '周一至周六: 7:30 - 20:30',
      applyNow: '快速求职应聘',
      b2b: '企业用工需求',
      admin: '后台管理',
      nav: {
        home: '首页',
        services: '核心服务',
        jobs: '工厂热招',
        calculator: '薪资测算',
        b2b: '企业合作',
        about: '关于我们',
        news: '劳务资讯',
        contact: '联系我们'
      }
    },
    en: {
      hotline: 'Hotline 24/7:',
      workingTime: 'Mon - Sat: 7:30 - 20:30',
      applyNow: 'Apply Now',
      b2b: 'For Employers',
      admin: 'Admin Portal',
      nav: {
        home: 'Home',
        services: 'Services',
        jobs: 'Factory Jobs',
        calculator: 'Salary Calc',
        b2b: 'B2B Staffing',
        about: 'About Us',
        news: 'News',
        contact: 'Contact'
      }
    }
  }[currentLang];

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md border-b border-slate-100">
      {/* Top micro bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a 
              href={`tel:${generalSettings.hotlineCall || generalSettings.hotline.replace(/\s/g, '')}`} 
              className="flex items-center gap-1.5 hover:text-amber-400 transition font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-rose-500" />
              <span>{t.hotline} <strong className="text-white">{generalSettings.hotline}</strong></span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{t.workingTime}</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Đồng Nai • Bình Dương • TP.HCM • Bắc Ninh • Bắc Giang</span>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Inline edit button for admin */}
            {onEditSection && (
              <button
                onClick={onEditSection}
                title="Sửa hotline, logo và thông tin thương hiệu"
                className="flex items-center gap-1 text-[11px] bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold px-2 py-0.5 rounded border border-amber-400/40 transition"
              >
                <Edit3 className="w-3 h-3" />
                <span className="hidden sm:inline">Sửa Hotline/Logo</span>
              </button>
            )}

            {/* Language dropdown / selector */}
            <div className="flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded text-[11px]">
              <Globe className="w-3 h-3 text-slate-400" />
              <button 
                onClick={() => onLanguageChange('vi')} 
                className={`px-1.5 py-0.5 rounded font-bold transition ${currentLang === 'vi' ? 'bg-rose-600 text-white' : 'text-slate-300 hover:text-white'}`}
              >
                VIE
              </button>
              <button 
                onClick={() => onLanguageChange('zh')} 
                className={`px-1.5 py-0.5 rounded font-bold transition ${currentLang === 'zh' ? 'bg-rose-600 text-white' : 'text-slate-300 hover:text-white'}`}
              >
                中文
              </button>
              <button 
                onClick={() => onLanguageChange('en')} 
                className={`px-1.5 py-0.5 rounded font-bold transition ${currentLang === 'en' ? 'bg-rose-600 text-white' : 'text-slate-300 hover:text-white'}`}
              >
                ENG
              </button>
            </div>

            {/* Admin entry point */}
            <button
              onClick={onOpenAdminModal}
              className={`flex items-center gap-1 text-[11px] transition py-0.5 px-2 rounded font-bold ${
                isAdminLoggedIn
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800'
              }`}
              title="Khu vực quản trị CMS và chỉnh sửa thông số website"
            >
              <Settings className="w-3 h-3" />
              <span>{isAdminLoggedIn ? 'CMS Đang Bật' : t.admin}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-rose-600/30 group-hover:scale-105 transition duration-200">
              VTH
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight leading-none group-hover:text-rose-600 transition">
                {generalSettings.brandName}
              </div>
              <div className="text-[11px] font-semibold text-rose-600 tracking-wider uppercase mt-1">
                {generalSettings.domain} • {generalSettings.subBrand}
              </div>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <a href="#" className="hover:text-rose-600 transition py-2">{t.nav.home}</a>
            <a href="#nha-may" className="hover:text-rose-600 transition py-2 flex items-center gap-1">
              <span>{t.nav.jobs}</span>
              <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">HOT</span>
            </a>
            <a href="#dich-vu" className="hover:text-rose-600 transition py-2">{t.nav.services}</a>
            <a href="#tinh-luong" className="hover:text-rose-600 transition py-2 flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.nav.calculator}</span>
            </a>
            <a href="#doanh-nghiep" className="hover:text-rose-600 transition py-2">{t.nav.b2b}</a>
            <a href="#ve-chung-toi" className="hover:text-rose-600 transition py-2">{t.nav.about}</a>
            <a href="#tin-tuc" className="hover:text-rose-600 transition py-2">{t.nav.news}</a>
            <a href="#lien-he" className="hover:text-rose-600 transition py-2">{t.nav.contact}</a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenEmployerModal}
              className="border border-slate-300 hover:border-slate-800 text-slate-800 hover:bg-slate-50 px-3.5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-1.5"
            >
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>{t.b2b}</span>
            </button>

            <button
              onClick={onOpenApplyModal}
              className="bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-rose-600/25 transition transform active:scale-95 flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" />
              <span>{t.applyNow}</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenApplyModal}
              className="bg-rose-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
            >
              {t.applyNow}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg border border-slate-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 font-semibold text-slate-700 text-sm">
            <a 
              href="#" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 flex items-center justify-between"
            >
              <span>{t.nav.home}</span>
            </a>
            <a 
              href="#nha-may" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 flex items-center justify-between text-rose-600 font-bold"
            >
              <span>{t.nav.jobs}</span>
              <span className="bg-rose-100 text-rose-700 text-[10px] px-2 py-0.5 rounded-full">Tuyển gấp</span>
            </a>
            <a 
              href="#dich-vu" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100"
            >
              {t.nav.services}
            </a>
            <a 
              href="#tinh-luong" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 flex items-center gap-2 text-blue-600"
            >
              <Calculator className="w-4 h-4" />
              <span>{t.nav.calculator}</span>
            </a>
            <a 
              href="#doanh-nghiep" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100"
            >
              {t.nav.b2b}
            </a>
            <a 
              href="#ve-chung-toi" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100"
            >
              {t.nav.about}
            </a>
            <a 
              href="#tin-tuc" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100"
            >
              {t.nav.news}
            </a>
            <a 
              href="#lien-he" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100"
            >
              {t.nav.contact}
            </a>
          </nav>

          <div className="pt-4 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEmployerModal();
              }}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>{t.b2b}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenApplyModal();
              }}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>{t.applyNow}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
