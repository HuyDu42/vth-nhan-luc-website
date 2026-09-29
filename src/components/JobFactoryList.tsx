import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  DollarSign, 
  Users, 
  Gift, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles,
  Filter,
  Eye,
  ChevronRight,
  PlusCircle,
  PhoneCall,
  MessageSquare
} from 'lucide-react';
import { FactoryJob, Language } from '../types';
import { SectionEditButton } from './SectionEditButton';

interface JobFactoryListProps {
  factories: FactoryJob[];
  currentLang: Language;
  onSelectJob: (job: FactoryJob) => void;
  onApplyJob: (job: FactoryJob) => void;
  activeFilterRegion: string;
  activeFilterLocation: string;
  activeFilterKeyword: string;
  onResetFilters: () => void;
  onOpenAdminAddFactory: () => void;
  isAdminLoggedIn?: boolean;
  onEditSection?: () => void;
}

export const JobFactoryList: React.FC<JobFactoryListProps> = ({
  factories,
  currentLang,
  onSelectJob,
  onApplyJob,
  activeFilterRegion,
  activeFilterLocation,
  activeFilterKeyword,
  onResetFilters,
  onOpenAdminAddFactory,
  isAdminLoggedIn,
  onEditSection
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all');
  const [onlyBonus, setOnlyBonus] = useState<boolean>(false);

  // Format currency
  const formatCurrency = (val: number) => {
    return (val / 1000000).toLocaleString('vi-VN', { maximumFractionDigits: 1 }) + ' Triệu';
  };

  // Filter factories
  const filtered = factories.filter((item) => {
    if (!item.active) return false;

    // Region filter
    if (activeFilterRegion !== 'all' && item.region !== activeFilterRegion) {
      return false;
    }

    // Location filter
    if (activeFilterLocation !== 'all' && !item.location.includes(activeFilterLocation)) {
      return false;
    }

    // Keyword filter
    if (activeFilterKeyword.trim() !== '') {
      const kw = activeFilterKeyword.toLowerCase();
      const match = 
        item.name.toLowerCase().includes(kw) ||
        item.companyName.toLowerCase().includes(kw) ||
        item.industrialPark.toLowerCase().includes(kw) ||
        item.location.toLowerCase().includes(kw) ||
        (item.nameZh && item.nameZh.toLowerCase().includes(kw));
      if (!match) return false;
    }

    // Industry filter
    if (selectedIndustry !== 'all' && item.industry !== selectedIndustry) {
      return false;
    }

    // Bonus filter
    if (onlyBonus && (!item.hotBonus || item.hotBonus <= 0)) {
      return false;
    }

    return true;
  });

  const t = {
    vi: {
      sectionBadge: 'VIỆC LÀM NHÀ MÁY ĐANG TUYỂN DỤNG',
      sectionTitle: 'Danh Sách Nhà Máy Tuyển Dụng Nóng',
      sectionDesc: 'Cam kết lương thưởng rõ ràng, hợp đồng trực tiếp, hỗ trợ ký túc xá và đưa đón tận nơi. 100% miễn phí cho người lao động.',
      filterAll: 'Tất Cả Ngành Nghề',
      filterElectronics: 'Điện Tử & Bo Mạch',
      filterPackaging: 'Bao Bì & In Ấn',
      filterMechanical: 'Cơ Khí Chế Tạo',
      filterLogistics: 'Kho Vận & Thực Phẩm',
      bonusFilter: 'Có Thưởng Nóng Tuyển Dụng',
      viewDetails: 'Xem Chi Tiết',
      applyNow: 'Ứng Tuyển Ngay',
      chatZalo: 'Tư Vấn Zalo',
      hotBonusLabel: 'Thưởng nóng:',
      basicSalaryLabel: 'Lương cơ bản:',
      allowanceLabel: 'Phụ cấp:',
      noJobsFound: 'Không tìm thấy nhà máy nào phù hợp với bộ lọc hiện tại.',
      resetFilterBtn: 'Xóa bộ lọc & Xem tất cả'
    },
    zh: {
      sectionBadge: '正在热招工厂与岗位',
      sectionTitle: '最新热招工厂清单',
      sectionDesc: '薪资待遇透明，正规劳动合同，提供厂区宿舍与班车支持，求职者全程零中介费用。',
      filterAll: '所有行业',
      filterElectronics: '电子与主板组装',
      filterPackaging: '印刷与精品包装',
      filterMechanical: '精密机械制造',
      filterLogistics: '仓储物流与食品',
      bonusFilter: '仅看有高额入职奖金',
      viewDetails: '查看详情',
      applyNow: '立即应聘',
      chatZalo: 'Zalo 在线咨询',
      hotBonusLabel: '入职奖金:',
      basicSalaryLabel: '底薪:',
      allowanceLabel: '各项津贴:',
      noJobsFound: '没有找到符合当前筛选条件的工厂。',
      resetFilterBtn: '重置筛选并显示全部'
    },
    en: {
      sectionBadge: 'HOT RECRUITING FACTORIES',
      sectionTitle: 'Active Factory Openings',
      sectionDesc: 'Guaranteed transparent salaries, formal contracts, air-conditioned dorms, and shuttle buses. 100% free for applicants.',
      filterAll: 'All Industries',
      filterElectronics: 'Electronics & SMT',
      filterPackaging: 'Packaging & Printing',
      filterMechanical: 'Precision Machinery',
      filterLogistics: 'Warehousing & Food',
      bonusFilter: 'Only With Sign-on Bonus',
      viewDetails: 'View Details',
      applyNow: 'Apply Now',
      chatZalo: 'Chat on Zalo',
      hotBonusLabel: 'Hot bonus:',
      basicSalaryLabel: 'Basic salary:',
      allowanceLabel: 'Allowances:',
      noJobsFound: 'No factory openings found matching the current filters.',
      resetFilterBtn: 'Reset filters & view all'
    }
  }[currentLang];

  return (
    <section id="nha-may" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            {t.sectionBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white mb-4">
            {t.sectionTitle}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {t.sectionDesc}
          </p>
          <div className="w-20 h-1 bg-rose-600 mx-auto mt-4 rounded-full" />

          {/* Quick Admin Add & Manage Buttons */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenAdminAddFactory}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition shadow-md"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>+ Thêm Công Ty Đang Tuyển Dụng (Admin)</span>
            </button>

            {onEditSection && (
              <SectionEditButton
                sectionTitle="Nhà Máy Tuyển Dụng"
                onClick={onEditSection}
                isAdminLoggedIn={isAdminLoggedIn}
              />
            )}
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-4 mb-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5" /> Phân loại:
            </span>
            <button
              onClick={() => setSelectedIndustry('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedIndustry === 'all' 
                  ? 'bg-rose-600 text-white' 
                  : 'bg-slate-700/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t.filterAll}
            </button>
            <button
              onClick={() => setSelectedIndustry('electronics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedIndustry === 'electronics' 
                  ? 'bg-rose-600 text-white' 
                  : 'bg-slate-700/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t.filterElectronics}
            </button>
            <button
              onClick={() => setSelectedIndustry('packaging')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedIndustry === 'packaging' 
                  ? 'bg-rose-600 text-white' 
                  : 'bg-slate-700/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t.filterPackaging}
            </button>
            <button
              onClick={() => setSelectedIndustry('mechanical')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedIndustry === 'mechanical' 
                  ? 'bg-rose-600 text-white' 
                  : 'bg-slate-700/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t.filterMechanical}
            </button>
            <button
              onClick={() => setSelectedIndustry('logistics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedIndustry === 'logistics' 
                  ? 'bg-rose-600 text-white' 
                  : 'bg-slate-700/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {t.filterLogistics}
            </button>
          </div>

          {/* Toggle hot bonus */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-amber-300 font-semibold bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg hover:bg-amber-500/20 transition">
              <input
                type="checkbox"
                checked={onlyBonus}
                onChange={(e) => setOnlyBonus(e.target.checked)}
                className="w-4 h-4 text-amber-500 rounded focus:ring-0"
              />
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.bonusFilter}</span>
            </label>
          </div>
        </div>

        {/* Filter status indicator if active */}
        {(activeFilterRegion !== 'all' || activeFilterLocation !== 'all' || activeFilterKeyword.trim() !== '') && (
          <div className="mb-6 flex items-center justify-between bg-slate-800/60 border border-slate-700 px-4 py-2.5 rounded-xl text-xs text-slate-300">
            <div className="flex items-center gap-2 flex-wrap">
              <span>Đang lọc:</span>
              {activeFilterRegion !== 'all' && (
                <span className="bg-rose-900/60 text-rose-300 px-2 py-0.5 rounded font-medium">
                  {activeFilterRegion === 'Bac' ? 'KCN Miền Bắc' : 'KCN Miền Nam'}
                </span>
              )}
              {activeFilterLocation !== 'all' && (
                <span className="bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded font-medium">
                  {activeFilterLocation}
                </span>
              )}
              {activeFilterKeyword && (
                <span className="bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded font-medium">
                  Từ khóa: "{activeFilterKeyword}"
                </span>
              )}
            </div>
            <button
              onClick={onResetFilters}
              className="text-rose-400 hover:text-rose-300 font-bold underline ml-4 shrink-0"
            >
              {t.resetFilterBtn}
            </button>
          </div>
        )}

        {/* Factory Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-700/80 shadow-xl hover:border-rose-500/60 hover:shadow-2xl hover:shadow-rose-950/40 transition-all duration-300 flex flex-col group"
              >
                {/* Image & Badges */}
                <div 
                  className="relative h-56 overflow-hidden cursor-pointer bg-slate-950"
                  onClick={() => onSelectJob(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

                  {/* Hot tag */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-rose-600 text-white text-[11px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
                      Đang Tuyển Gấp
                    </span>
                    {item.region === 'Bac' ? (
                      <span className="bg-blue-600 text-white text-[11px] font-bold px-2 py-1 rounded-md shadow">
                        Miền Bắc
                      </span>
                    ) : (
                      <span className="bg-emerald-600 text-white text-[11px] font-bold px-2 py-1 rounded-md shadow">
                        Miền Nam
                      </span>
                    )}
                  </div>

                  {/* Hot bonus banner if available */}
                  {item.hotBonus && item.hotBonus > 0 && (
                    <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-r from-amber-600 to-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-black shadow-lg flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-white animate-bounce" />
                      <span>{t.hotBonusLabel} Tới {(item.hotBonus / 1000000).toFixed(1)} Triệu Đồng!</span>
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Factory Title */}
                    <h3 
                      onClick={() => onSelectJob(item)}
                      className="font-black text-lg sm:text-xl text-white group-hover:text-rose-400 transition cursor-pointer mb-1 leading-snug"
                    >
                      {item.name}
                    </h3>
                    {item.nameZh && (
                      <div className="text-xs text-slate-400 font-medium mb-3">
                        {item.nameZh}
                      </div>
                    )}

                    {/* Industrial Park & Location */}
                    <div className="space-y-1.5 mb-4 text-xs text-slate-300">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span className="font-semibold text-slate-200">{item.industrialPark}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 pl-5">
                        <span>Độ tuổi: <strong className="text-slate-200">{item.ageRange}</strong></span>
                        <span>•</span>
                        <span>{item.shift}</span>
                      </div>
                    </div>

                    {/* Salary Highlight Box */}
                    <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-700/60 mb-4">
                      <div className="text-xs text-slate-400 mb-0.5">Thu nhập dự kiến thực nhận:</div>
                      <div className="text-xl font-black text-emerald-400">
                        {formatCurrency(item.salaryMin)} - {formatCurrency(item.salaryMax)} <span className="text-xs font-normal text-slate-400">/tháng</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-300">
                        <span>{t.basicSalaryLabel} <strong className="text-white">{(item.basicSalary / 1000000).toFixed(1)}Tr</strong></span>
                        <span>{t.allowanceLabel} <strong className="text-white">{(item.allowance / 1000000).toFixed(1)}Tr</strong></span>
                      </div>
                    </div>

                    {/* Key Perks mini list */}
                    <ul className="space-y-1 text-xs text-slate-300 mb-6">
                      {item.benefits.slice(0, 2).map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-700/80">
                    <button
                      onClick={() => onSelectJob(item)}
                      className="w-full bg-slate-700/80 hover:bg-slate-700 text-slate-200 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{t.viewDetails}</span>
                    </button>

                    <button
                      onClick={() => onApplyJob(item)}
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 px-3 rounded-xl text-xs font-black shadow-md shadow-rose-900/30 transition flex items-center justify-center gap-1 active:scale-95"
                    >
                      <span>{t.applyNow}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : factories.length === 0 ? (
          <div className="bg-slate-800/90 rounded-3xl p-8 sm:p-14 text-center border border-slate-700/80 max-w-2xl mx-auto shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-slate-700/60 text-slate-300 flex items-center justify-center mx-auto mb-4 border border-slate-600">
              <Building2 className="w-8 h-8 text-rose-500" />
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              Chưa Có Công Ty / Nhà Máy Nào Đang Tuyển Dụng
            </h3>
            
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md mx-auto mb-6">
              Danh sách công ty đang tuyển dụng hiện đang để trống theo cài đặt ban đầu. Quản trị viên có thể thêm thông tin công ty và nhà máy mới để người lao động bắt đầu ứng tuyển.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onOpenAdminAddFactory}
                className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-lg shadow-rose-900/40 transition flex items-center justify-center gap-2 transform active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>+ Thêm Công Ty Đang Tuyển (Dành Cho Admin)</span>
              </button>

              <a
                href="https://zalo.me/0823166683"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Hỗ Trợ Zalo Tuyển Dụng</span>
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700/60 text-xs text-slate-400">
              Cần hỗ trợ bố trí việc làm ngay? Gọi Hotline: <a href="tel:0823166683" className="text-rose-400 font-bold hover:underline">0823 166 683</a>
            </div>
          </div>
        ) : (
          <div className="bg-slate-800 rounded-2xl p-12 text-center border border-slate-700 max-w-lg mx-auto">
            <Building2 className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-300 font-medium mb-4">{t.noJobsFound}</p>
            <button
              onClick={onResetFilters}
              className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm"
            >
              {t.resetFilterBtn}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
