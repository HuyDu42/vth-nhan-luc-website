import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Gift, 
  Bus, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  PhoneCall,
  Clock
} from 'lucide-react';
import { Language, HeroSettings } from '../types';
import { SectionEditButton } from './SectionEditButton';

interface HeroProps {
  currentLang: Language;
  onSearch: (keyword: string, location: string, region: string) => void;
  onOpenApplyModal: () => void;
  onOpenEmployerModal: () => void;
  heroSettings: HeroSettings;
  isAdminLoggedIn?: boolean;
  onEditSection?: () => void;
  hotline: string;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  onSearch,
  onOpenApplyModal,
  onOpenEmployerModal,
  heroSettings,
  isAdminLoggedIn,
  onEditSection,
  hotline
}) => {
  const [keyword, setKeyword] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(keyword, selectedLocation, selectedRegion);
    const el = document.getElementById('nha-may');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const t = {
    vi: {
      btnFindJob: 'Tìm Việc Làm Ngay',
      btnB2B: 'Doanh Nghiệp Yêu Cầu Nhân Lực',
      searchPlaceholder: 'Tìm theo tên nhà máy, KCN hoặc vị trí tuyển...',
      allLocations: 'Tất cả Tỉnh/Thành',
      allRegions: 'Tất cả Khu vực'
    },
    zh: {
      btnFindJob: '查看招聘清单',
      btnB2B: '发布企业用工需求',
      searchPlaceholder: '搜索工厂、工业园区或工作岗位...',
      allLocations: '所有省份/城市',
      allRegions: '所有区域'
    },
    en: {
      btnFindJob: 'Explore Job Openings',
      btnB2B: 'Request Labor Supply',
      searchPlaceholder: 'Search factory, industrial park, or position...',
      allLocations: 'All Locations',
      allRegions: 'All Regions'
    }
  }[currentLang];

  return (
    <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-10 pb-20 overflow-hidden border-b border-slate-800">
      {/* Background ambient decorative graphics */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-rose-600 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-600 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top badge & inline edit */}
        <div className="text-center mb-4 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-rose-500/15 text-rose-400 border border-rose-500/30 backdrop-blur">
            <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            {heroSettings.badge}
          </span>

          {onEditSection && (
            <SectionEditButton
              sectionTitle="Banner Hero & Số Liệu"
              onClick={onEditSection}
              isAdminLoggedIn={isAdminLoggedIn}
            />
          )}
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-5">
            {heroSettings.title}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto font-normal">
            {heroSettings.subtitle}
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-emerald-400">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{heroSettings.highlightText}</span>
          </div>
        </div>

        {/* Search & Filter Box */}
        <div className="max-w-4xl mx-auto bg-white/95 text-slate-900 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md border border-white/20 mb-12">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Keyword Input */}
            <div className="sm:col-span-5 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4 text-rose-600" />
              </div>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-3 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50 font-medium"
              />
            </div>

            {/* Region select */}
            <div className="sm:col-span-3 relative">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-3 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50 font-medium text-slate-700 cursor-pointer"
              >
                <option value="all">{t.allRegions}</option>
                <option value="Nam">KCN Miền Nam (Đồng Nai, Bình Dương, HCM)</option>
                <option value="Bac">KCN Miền Bắc (Bắc Ninh, Bắc Giang)</option>
              </select>
            </div>

            {/* Location select */}
            <div className="sm:col-span-2 relative">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-slate-50 font-medium text-slate-700 cursor-pointer"
              >
                <option value="all">{t.allLocations}</option>
                <option value="Đồng Nai">Đồng Nai</option>
                <option value="Bình Dương">Bình Dương</option>
                <option value="TP.HCM">TP.HCM</option>
                <option value="Bắc Ninh">Bắc Ninh</option>
                <option value="Bắc Giang">Bắc Giang</option>
              </select>
            </div>

            {/* Submit button */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3 px-4 rounded-xl font-bold text-sm shadow-md transition transform active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Search className="w-4 h-4" />
                <span>Tìm</span>
              </button>
            </div>
          </form>
        </div>

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {heroSettings.pillars.map((pill, idx) => (
            <div 
              key={idx}
              className="bg-slate-800/80 backdrop-blur border border-slate-700/70 p-5 rounded-2xl hover:border-rose-500/50 transition duration-300 group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg bg-rose-600/20 text-rose-400 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition">
                  {idx === 0 && <ShieldCheck className="w-5 h-5" />}
                  {idx === 1 && <Gift className="w-5 h-5" />}
                  {idx === 2 && <Bus className="w-5 h-5" />}
                  {idx === 3 && <Clock className="w-5 h-5" />}
                </div>
                <h3 className="font-bold text-white text-base leading-tight">
                  {pill.title}
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {pill.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Live Counters */}
        <div className="bg-gradient-to-r from-rose-900/40 via-slate-800/80 to-slate-900/40 border border-slate-700/60 rounded-2xl p-6 sm:p-8 backdrop-blur">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-slate-700/60">
            {heroSettings.stats.map((st, i) => (
              <div key={i} className={i > 0 ? 'pt-4 md:pt-0' : ''}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-rose-400 mb-1">
                  {st.num}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-300">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button Group */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenApplyModal}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-rose-600/30 transition transform active:scale-95 flex items-center gap-2 text-sm sm:text-base"
          >
            <span>{t.btnFindJob}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={onOpenEmployerModal}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-7 py-3.5 rounded-xl border border-slate-600 transition flex items-center gap-2 text-sm sm:text-base"
          >
            <span>{t.btnB2B}</span>
          </button>

          <a
            href={`tel:${hotline.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 text-amber-300 hover:text-amber-200 px-4 py-2 font-bold text-sm transition"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Hotline: {hotline}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
