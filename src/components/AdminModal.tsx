import React, { useState, useEffect } from 'react';
import { 
  X, 
  Settings, 
  Building2, 
  Users, 
  Briefcase, 
  Plus, 
  Edit2, 
  Trash2, 
  Download, 
  CheckCircle, 
  Phone, 
  Lock, 
  Save,
  RotateCcw,
  MapPin,
  Sparkles,
  HelpCircle,
  Image as ImageIcon,
  MessageSquare,
  FileText,
  Sliders,
  DollarSign,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Handshake,
  Calculator
} from 'lucide-react';
import { 
  FactoryJob, 
  CandidateApplication, 
  EmployerRequest, 
  SiteSettings, 
  OfficeLocation, 
  StaffingService, 
  PartnerItem,
  CalculatorSettings,
  TestimonialItem, 
  GalleryItem, 
  ProcessStep, 
  NewsArticle 
} from '../types';
import { DEFAULT_SITE_SETTINGS } from '../data/mockData';

export type AdminTab = 
  | 'factories'
  | 'general'
  | 'hero'
  | 'offices'
  | 'services'
  | 'partners'
  | 'calculator'
  | 'about'
  | 'process'
  | 'testimonials'
  | 'gallery'
  | 'news'
  | 'applications'
  | 'employers';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  onAuthenticate: (status: boolean) => void;
  initialTab?: string;
  initialOpenAddFactory?: boolean;
  siteSettings: SiteSettings;
  onUpdateSiteSettings: (settings: SiteSettings) => void;
  factories: FactoryJob[];
  onSaveFactory: (factory: FactoryJob) => void;
  onDeleteFactory: (id: string) => void;
  newsList: NewsArticle[];
  onSaveNews: (news: NewsArticle) => void;
  onDeleteNews: (id: string) => void;
  applications: CandidateApplication[];
  onUpdateApplicationStatus: (id: string, status: CandidateApplication['status']) => void;
  onDeleteApplication: (id: string) => void;
  employerRequests: EmployerRequest[];
  onDeleteEmployerRequest: (id: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  isAuthenticated,
  onAuthenticate,
  initialTab = 'factories',
  initialOpenAddFactory = false,
  siteSettings,
  onUpdateSiteSettings,
  factories,
  onSaveFactory,
  onDeleteFactory,
  newsList,
  onSaveNews,
  onDeleteNews,
  applications,
  onUpdateApplicationStatus,
  onDeleteApplication,
  employerRequests,
  onDeleteEmployerRequest
}) => {
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>('factories');
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);

  // Editable Site Settings clone
  const [editableSettings, setEditableSettings] = useState<SiteSettings>(siteSettings);

  useEffect(() => {
    setEditableSettings(siteSettings);
  }, [siteSettings]);

  useEffect(() => {
    if (initialTab) {
      if (initialTab === 'factories_add') {
        setActiveTab('factories');
        setIsAddingFactory(true);
      } else {
        setActiveTab(initialTab as AdminTab);
      }
    }
  }, [initialTab, isOpen]);

  // Factory form state
  const [isAddingFactory, setIsAddingFactory] = useState(initialOpenAddFactory);
  const [editingFactoryId, setEditingFactoryId] = useState<string | null>(null);
  const [factoryName, setFactoryName] = useState('');
  const [factoryCompany, setFactoryCompany] = useState('');
  const [factoryLocation, setFactoryLocation] = useState('Đồng Nai');
  const [factoryRegion, setFactoryRegion] = useState<'Bac' | 'Nam' | 'Trung'>('Nam');
  const [factoryIndustrialPark, setFactoryIndustrialPark] = useState('');
  const [factoryIndustry, setFactoryIndustry] = useState<FactoryJob['industry']>('electronics');
  const [factorySalaryMin, setFactorySalaryMin] = useState(9000000);
  const [factorySalaryMax, setFactorySalaryMax] = useState(14000000);
  const [factoryBasicSalary, setFactoryBasicSalary] = useState(5500000);
  const [factoryAllowance, setFactoryAllowance] = useState(2000000);
  const [factoryHotBonus, setFactoryHotBonus] = useState(5000000);
  const [factoryHotBonusNote, setFactoryHotBonusNote] = useState('');
  const [factoryAgeRange, setFactoryAgeRange] = useState('18 - 45 tuổi');
  const [factoryImage, setFactoryImage] = useState('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop');
  const [factoryActive, setFactoryActive] = useState(true);
  const [factoryZalo, setFactoryZalo] = useState('https://zalo.me/0823166683');

  // Office edit state
  const [newOffice, setNewOffice] = useState({ region: '', address: '', hotline: '0823 166 683' });

  // News edit state
  const [isEditingNews, setIsEditingNews] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState('Thị Trường Lao Động');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsImage, setNewsImage] = useState('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop');
  const [newsAuthor, setNewsAuthor] = useState('Ban Tuyển Dụng VTH');

  // Partner edit state
  const [isEditingPartner, setIsEditingPartner] = useState(false);
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);
  const [partnerName, setPartnerName] = useState('');
  const [partnerLogo, setPartnerLogo] = useState('');
  const [partnerIndustry, setPartnerIndustry] = useState('');
  const [partnerLocation, setPartnerLocation] = useState('');
  const [partnerWorkerCount, setPartnerWorkerCount] = useState('');
  const [partnerYear, setPartnerYear] = useState('');
  const [partnerDesc, setPartnerDesc] = useState('');

  const handleStartAddPartner = () => {
    setEditingPartnerId(null);
    setPartnerName('');
    setPartnerLogo('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&auto=format&fit=crop');
    setPartnerIndustry('Sản xuất & Lắp ráp linh kiện');
    setPartnerLocation('KCN Quế Võ, Bắc Ninh');
    setPartnerWorkerCount('1.000+ Lao động');
    setPartnerYear('2024 - Nay');
    setPartnerDesc('Đối tác cung ứng công nhân sản xuất và đóng gói thời vụ.');
    setIsEditingPartner(true);
  };

  const handleStartEditPartner = (p: PartnerItem) => {
    setEditingPartnerId(p.id);
    setPartnerName(p.name);
    setPartnerLogo(p.logo);
    setPartnerIndustry(p.industry);
    setPartnerLocation(p.location);
    setPartnerWorkerCount(p.workerCountProvided);
    setPartnerYear(p.partnershipYear);
    setPartnerDesc(p.description);
    setIsEditingPartner(true);
  };

  const handleSavePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingPartnerId || 'partner-' + Date.now();
    const newPartner: PartnerItem = {
      id,
      name: partnerName,
      logo: partnerLogo || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&auto=format&fit=crop',
      industry: partnerIndustry,
      location: partnerLocation,
      workerCountProvided: partnerWorkerCount,
      partnershipYear: partnerYear,
      description: partnerDesc
    };
    const currentPartners = editableSettings.partners || [];
    const exists = currentPartners.some((p) => p.id === id);
    const updated = exists 
      ? currentPartners.map((p) => (p.id === id ? newPartner : p))
      : [...currentPartners, newPartner];
    const newSettings = { ...editableSettings, partners: updated };
    setEditableSettings(newSettings);
    onUpdateSiteSettings(newSettings);
    setIsEditingPartner(false);
    triggerNotice('Đã lưu thông tin đối tác doanh nghiệp thành công!');
  };

  const handleDeletePartner = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa doanh nghiệp đối tác này?')) {
      const updated = (editableSettings.partners || []).filter((p) => p.id !== id);
      const newSettings = { ...editableSettings, partners: updated };
      setEditableSettings(newSettings);
      onUpdateSiteSettings(newSettings);
      triggerNotice('Đã xóa đối tác thành công!');
    }
  };

  const handleSaveCalculatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteSettings(editableSettings);
    triggerNotice('Đã lưu toàn bộ thông số tính lương thành công!');
  };

  if (!isOpen) return null;

  const triggerNotice = (msg: string) => {
    setSaveSuccessNotice(msg);
    setTimeout(() => {
      setSaveSuccessNotice(null);
    }, 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '123456' || password === 'admin' || password === 'vthnhanluc') {
      onAuthenticate(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // Factory Handlers
  const handleStartAddFactory = () => {
    setEditingFactoryId(null);
    setFactoryName('');
    setFactoryCompany('');
    setFactoryLocation('Đồng Nai');
    setFactoryRegion('Nam');
    setFactoryIndustrialPark('');
    setFactoryIndustry('electronics');
    setFactorySalaryMin(9500000);
    setFactorySalaryMax(14500000);
    setFactoryBasicSalary(5600000);
    setFactoryAllowance(2000000);
    setFactoryHotBonus(5000000);
    setFactoryHotBonusNote('Thưởng nóng tuyển dụng chia theo các mốc nhận việc');
    setFactoryAgeRange('18 - 45 tuổi');
    setFactoryImage('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop');
    setFactoryActive(true);
    setFactoryZalo('https://zalo.me/0823166683');
    setIsAddingFactory(true);
  };

  const handleStartEditFactory = (f: FactoryJob) => {
    setEditingFactoryId(f.id);
    setFactoryName(f.name);
    setFactoryCompany(f.companyName);
    setFactoryLocation(f.location);
    setFactoryRegion(f.region);
    setFactoryIndustrialPark(f.industrialPark);
    setFactoryIndustry(f.industry);
    setFactorySalaryMin(f.salaryMin);
    setFactorySalaryMax(f.salaryMax);
    setFactoryBasicSalary(f.basicSalary);
    setFactoryAllowance(f.allowance);
    setFactoryHotBonus(f.hotBonus || 0);
    setFactoryHotBonusNote(f.hotBonusNote || '');
    setFactoryAgeRange(f.ageRange);
    setFactoryImage(f.image);
    setFactoryActive(f.active);
    setFactoryZalo(f.zaloUrl || 'https://zalo.me/0823166683');
    setIsAddingFactory(true);
  };

  const handleSaveFactorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingFactoryId || 'factory-' + Date.now();
    const existing = factories.find((f) => f.id === id);

    const fData: FactoryJob = {
      id,
      name: factoryName,
      companyName: factoryCompany,
      location: factoryLocation,
      region: factoryRegion,
      industrialPark: factoryIndustrialPark,
      industry: factoryIndustry,
      industryName: factoryIndustry === 'electronics' ? 'Điện tử' : factoryIndustry === 'packaging' ? 'Bao bì' : 'Cơ khí / Kho vận',
      salaryMin: Number(factorySalaryMin),
      salaryMax: Number(factorySalaryMax),
      basicSalary: Number(factoryBasicSalary),
      allowance: Number(factoryAllowance),
      hotBonus: Number(factoryHotBonus),
      hotBonusNote: factoryHotBonusNote,
      ageRange: factoryAgeRange,
      gender: 'all',
      shift: 'Xoay ca ngày / đêm',
      image: factoryImage || 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop',
      featured: existing ? existing.featured : true,
      active: factoryActive,
      order: existing ? existing.order : factories.length + 1,
      zaloUrl: factoryZalo,
      benefits: existing?.benefits || [
        'Bao ăn 2-3 bữa miễn phí',
        'Có ký túc xá máy lạnh wifi miễn phí',
        'Đóng BHXH đầy đủ theo luật'
      ],
      requirements: existing?.requirements || [
        'Nam/Nữ 18-45 tuổi, sức khỏe tốt',
        'Có CMND/CCCD gắn chip',
        'Không yêu cầu kinh nghiệm'
      ],
      jobDescription: existing?.jobDescription || [
        'Lắp ráp, kiểm tra ngoại quan sản phẩm',
        'Đóng gói thành phẩm vào thùng',
        'Ngồi làm việc phòng máy lạnh mát mẻ'
      ],
      postedDate: existing?.postedDate || new Date().toISOString().split('T')[0]
    };

    onSaveFactory(fData);
    setIsAddingFactory(false);
    triggerNotice(`Đã lưu công ty "${factoryName}" thành công!`);
  };

  // General Settings Save
  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteSettings(editableSettings);
    triggerNotice('Đã lưu thông tin chung & thương hiệu thành công!');
  };

  // Hero Settings Save
  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteSettings(editableSettings);
    triggerNotice('Đã lưu nội dung Banner Hero thành công!');
  };

  // About Settings Save
  const handleSaveAbout = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteSettings(editableSettings);
    triggerNotice('Đã lưu thông tin Về Chúng Tôi thành công!');
  };

  // Office Add & Remove
  const handleAddOffice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOffice.region || !newOffice.address) return;
    const updated = [
      ...editableSettings.offices,
      { id: 'off-' + Date.now(), ...newOffice }
    ];
    const newSettings = { ...editableSettings, offices: updated };
    setEditableSettings(newSettings);
    onUpdateSiteSettings(newSettings);
    setNewOffice({ region: '', address: '', hotline: editableSettings.general.hotline });
    triggerNotice('Đã thêm chi nhánh mới thành công!');
  };

  const handleDeleteOffice = (id: string) => {
    const updated = editableSettings.offices.filter(o => o.id !== id);
    const newSettings = { ...editableSettings, offices: updated };
    setEditableSettings(newSettings);
    onUpdateSiteSettings(newSettings);
    triggerNotice('Đã xóa chi nhánh!');
  };

  // News Handlers
  const handleSaveNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = editingNewsId || 'news-' + Date.now();
    const item: NewsArticle = {
      id,
      title: newsTitle,
      category: newsCategory,
      summary: newsSummary,
      content: newsContent,
      date: new Date().toISOString().split('T')[0],
      image: newsImage,
      author: newsAuthor
    };
    onSaveNews(item);
    setIsEditingNews(false);
    triggerNotice('Đã lưu bài viết tin tức thành công!');
  };

  const handleExportCSV = () => {
    const headers = ['Họ Tên', 'Số Điện Thoại', 'Năm Sinh', 'Quê Quán', 'Nhà Máy', 'Kinh Nghiệm', 'Trạng Thái', 'Ngày Nộp'];
    const rows = applications.map((a) => [
      `"${a.fullName}"`,
      `"${a.phone}"`,
      `"${a.birthYear}"`,
      `"${a.hometown || ''}"`,
      `"${a.targetJobName}"`,
      a.hasExperience ? 'Có' : 'Chưa',
      a.status,
      a.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `danh_sach_ung_vien_vth_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetToDefault = () => {
    if (confirm('Bạn có chắc muốn khôi phục toàn bộ nội dung cài đặt (Thương hiệu, Hero, Giới thiệu, Địa chỉ, Dịch vụ) về mặc định ban đầu?')) {
      setEditableSettings(DEFAULT_SITE_SETTINGS);
      onUpdateSiteSettings(DEFAULT_SITE_SETTINGS);
      triggerNotice('Đã khôi phục cài đặt mặc định thành công!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-6xl w-full max-h-[96vh] overflow-hidden shadow-2xl flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Admin Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-black shadow-md">
              VTH
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight flex items-center gap-2">
                <span>Hệ Thống Quản Trị Trực Tiếp Website (Live CMS)</span>
                <span className="text-[10px] bg-rose-600/80 text-white px-2 py-0.5 rounded-full font-bold">
                  Không cần code
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {editableSettings.general.domain} • {editableSettings.general.brandName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccessNotice && (
              <span className="text-xs text-emerald-400 font-bold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700 animate-pulse">
                ✓ {saveSuccessNotice}
              </span>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title="Đóng bảng quản trị"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* If Not Authenticated */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-14 text-center max-w-md mx-auto my-auto space-y-4">
            <div className="w-16 h-16 bg-slate-100 text-slate-700 rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-slate-200">
              <Lock className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Đăng Nhập Quản Trị Viên</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Nhập mật khẩu để chỉnh sửa trực tiếp mọi thông số trên website (Mật khẩu mặc định: <strong className="text-slate-800 font-bold">123456</strong>)
            </p>

            <form onSubmit={handleLogin} className="space-y-3 pt-3">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu quản trị..."
                className="w-full p-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none text-center font-bold"
              />

              {authError && (
                <div className="text-xs text-rose-600 font-bold">
                  Mật khẩu không chính xác! Vui lòng thử lại.
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white font-extrabold py-3 px-4 rounded-xl text-sm shadow-md transition"
              >
                Mở Chế Độ Chỉnh Sửa Trực Tiếp
              </button>

              <button
                type="button"
                onClick={() => {
                  onAuthenticate(true);
                  setAuthError(false);
                }}
                className="w-full text-xs text-slate-500 hover:text-rose-600 underline py-1 transition"
              >
                Đăng nhập nhanh 1-chạm (Dành cho Quản trị viên)
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated CMS Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Vertical Sidebar Navigation */}
            <div className="w-full md:w-64 bg-slate-900 text-slate-300 p-3 border-r border-slate-800 overflow-y-auto shrink-0 flex flex-row md:flex-col gap-1">
              <div className="hidden md:block text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 py-2">
                Mục Chỉnh Sửa Nội Dung
              </div>

              {/* Tab items */}
              <button
                onClick={() => { setActiveTab('factories'); setIsAddingFactory(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                  activeTab === 'factories' ? 'bg-rose-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span>Nhà Máy Đang Tuyển</span>
                </div>
                <span className="text-[10px] bg-slate-950/60 px-2 py-0.5 rounded-full">{factories.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('calculator')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'calculator' ? 'bg-rose-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Thông Số Tính Lương</span>
              </button>

              <button
                onClick={() => setActiveTab('general')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'general' ? 'bg-rose-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Sliders className="w-4 h-4 text-blue-400" />
                <span>Thông Tin & Hotline</span>
              </button>

              <button
                onClick={() => setActiveTab('hero')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'hero' ? 'bg-rose-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>Banner & Số Liệu</span>
              </button>

              <button
                onClick={() => setActiveTab('offices')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                  activeTab === 'offices' ? 'bg-rose-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>Địa Chỉ & Chi Nhánh</span>
                </div>
                <span className="text-[10px] bg-slate-950/60 px-2 py-0.5 rounded-full">{editableSettings.offices.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'services' ? 'bg-rose-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4 text-purple-400" />
                <span>Dịch Vụ Cung Ứng</span>
              </button>

              <button
                onClick={() => { setActiveTab('partners'); setIsEditingPartner(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                  activeTab === 'partners' ? 'bg-rose-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Handshake className="w-4 h-4 text-amber-400" />
                  <span>Khách Hàng & Doanh Nghiệp</span>
                </div>
                <span className="text-[10px] bg-slate-950/60 px-2 py-0.5 rounded-full">
                  {(editableSettings.partners || []).length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('about')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'about' ? 'bg-rose-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Về Chúng Tôi</span>
              </button>

              <button
                onClick={() => setActiveTab('process')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'process' ? 'bg-rose-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span>Quy Trình 5 Bước</span>
              </button>

              <button
                onClick={() => setActiveTab('testimonials')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'testimonials' ? 'bg-rose-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-pink-400" />
                <span>Đánh Giá Khách Hàng</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'gallery' ? 'bg-rose-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <ImageIcon className="w-4 h-4 text-indigo-400" />
                <span>Ảnh Hoạt Động</span>
              </button>

              <button
                onClick={() => { setActiveTab('news'); setIsEditingNews(false); }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeTab === 'news' ? 'bg-rose-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <FileText className="w-4 h-4 text-orange-400" />
                <span>Tin Tức & Cẩm Nang</span>
              </button>

              <div className="hidden md:block my-2 border-t border-slate-800 pt-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3">
                Dữ Liệu Khách Hàng
              </div>

              <button
                onClick={() => setActiveTab('applications')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                  activeTab === 'applications' ? 'bg-rose-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Ứng Viên Nộp Đơn</span>
                </div>
                <span className="text-[10px] bg-slate-950/60 px-2 py-0.5 rounded-full">{applications.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('employers')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                  activeTab === 'employers' ? 'bg-rose-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  <span>Yêu Cầu Doanh Nghiệp</span>
                </div>
                <span className="text-[10px] bg-slate-950/60 px-2 py-0.5 rounded-full">{employerRequests.length}</span>
              </button>

              {/* Reset defaults button */}
              <div className="mt-auto hidden md:block pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="w-full text-left text-[11px] text-slate-500 hover:text-rose-400 flex items-center gap-1.5 px-3 py-2 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Khôi phục mặc định ban đầu</span>
                </button>
              </div>
            </div>

            {/* Right Main Content Panel */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-7 bg-slate-50">
              
              {/* TAB 1: FACTORIES */}
              {activeTab === 'factories' && (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">
                        Quản Lý Công Ty / Nhà Máy Tuyển Dụng
                      </h3>
                      <p className="text-xs text-slate-500">
                        Thêm mới hoặc sửa đổi các nhà máy đang tuyển dụng. Người lao động sẽ thấy ngay lập tức trên trang chủ.
                      </p>
                    </div>

                    {!isAddingFactory && (
                      <button
                        onClick={handleStartAddFactory}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-md transition flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Thêm Nhà Máy Mới</span>
                      </button>
                    )}
                  </div>

                  {isAddingFactory ? (
                    /* Factory Add / Edit Form */
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                        <h4 className="font-black text-sm text-slate-900">
                          {editingFactoryId ? 'Chỉnh Sửa Thông Tin Nhà Máy' : 'Thêm Nhà Máy Tuyển Dụng Mới'}
                        </h4>
                        <button
                          type="button"
                          onClick={() => setIsAddingFactory(false)}
                          className="text-xs text-slate-500 hover:text-slate-800"
                        >
                          Quay lại danh sách
                        </button>
                      </div>

                      <form onSubmit={handleSaveFactorySubmit} className="space-y-4 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Tên Nhà Máy / Đơn Tuyển (*):</label>
                            <input
                              type="text"
                              required
                              value={factoryName}
                              onChange={(e) => setFactoryName(e.target.value)}
                              placeholder="VD: Tập Đoàn Pegatron Việt Nam"
                              className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Tên Công Ty Pháp Nhân (*):</label>
                            <input
                              type="text"
                              required
                              value={factoryCompany}
                              onChange={(e) => setFactoryCompany(e.target.value)}
                              placeholder="VD: Công ty TNHH Pegatron Technology Service"
                              className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Khu Vực:</label>
                            <select
                              value={factoryRegion}
                              onChange={(e) => setFactoryRegion(e.target.value as any)}
                              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                            >
                              <option value="Nam">Miền Nam</option>
                              <option value="Bac">Miền Bắc</option>
                            </select>
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Tỉnh / Thành Phố (*):</label>
                            <input
                              type="text"
                              required
                              value={factoryLocation}
                              onChange={(e) => setFactoryLocation(e.target.value)}
                              placeholder="VD: Đồng Nai, Bình Dương, Bắc Ninh..."
                              className="w-full p-2.5 rounded-xl border border-slate-300"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Khu Công Nghiệp (*):</label>
                            <input
                              type="text"
                              required
                              value={factoryIndustrialPark}
                              onChange={(e) => setFactoryIndustrialPark(e.target.value)}
                              placeholder="VD: KCN Amata, KCN VSIP 1, KCN Quế Võ..."
                              className="w-full p-2.5 rounded-xl border border-slate-300"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Lương Cơ Bản (VND):</label>
                            <input
                              type="number"
                              required
                              value={factoryBasicSalary}
                              onChange={(e) => setFactoryBasicSalary(Number(e.target.value))}
                              className="w-full p-2.5 rounded-xl border border-slate-300"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Tổng Phụ Cấp (VND):</label>
                            <input
                              type="number"
                              required
                              value={factoryAllowance}
                              onChange={(e) => setFactoryAllowance(Number(e.target.value))}
                              className="w-full p-2.5 rounded-xl border border-slate-300"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Lương Thực Nhận Min:</label>
                            <input
                              type="number"
                              required
                              value={factorySalaryMin}
                              onChange={(e) => setFactorySalaryMin(Number(e.target.value))}
                              className="w-full p-2.5 rounded-xl border border-slate-300"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Lương Thực Nhận Max:</label>
                            <input
                              type="number"
                              required
                              value={factorySalaryMax}
                              onChange={(e) => setFactorySalaryMax(Number(e.target.value))}
                              className="w-full p-2.5 rounded-xl border border-slate-300"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Thưởng Nóng Tuyển Dụng (VND):</label>
                            <input
                              type="number"
                              value={factoryHotBonus}
                              onChange={(e) => setFactoryHotBonus(Number(e.target.value))}
                              placeholder="VD: 5000000"
                              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-amber-600"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Ghi Chú Thưởng Nóng:</label>
                            <input
                              type="text"
                              value={factoryHotBonusNote}
                              onChange={(e) => setFactoryHotBonusNote(e.target.value)}
                              placeholder="VD: Thưởng nóng 5 triệu chia đều các tháng"
                              className="w-full p-2.5 rounded-xl border border-slate-300"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Link Ảnh Poster Nhà Máy (URL):</label>
                            <input
                              type="url"
                              value={factoryImage}
                              onChange={(e) => setFactoryImage(e.target.value)}
                              placeholder="https://images.unsplash.com/..."
                              className="w-full p-2.5 rounded-xl border border-slate-300"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Độ Tuổi Tuyển Dụng:</label>
                            <input
                              type="text"
                              value={factoryAgeRange}
                              onChange={(e) => setFactoryAgeRange(e.target.value)}
                              placeholder="18 - 45 tuổi"
                              className="w-full p-2.5 rounded-xl border border-slate-300"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Link Zalo Tuyển Dụng:</label>
                            <input
                              type="url"
                              value={factoryZalo}
                              onChange={(e) => setFactoryZalo(e.target.value)}
                              placeholder="https://zalo.me/0823166683"
                              className="w-full p-2.5 rounded-xl border border-slate-300"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2">
                          <input
                            type="checkbox"
                            id="fActive"
                            checked={factoryActive}
                            onChange={(e) => setFactoryActive(e.target.checked)}
                            className="w-4 h-4 text-rose-600 rounded"
                          />
                          <label htmlFor="fActive" className="font-bold text-slate-800 cursor-pointer">
                            Hiển thị công khai trên website ngay
                          </label>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-slate-100">
                          <button
                            type="submit"
                            className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-2.5 px-6 rounded-xl shadow transition flex items-center gap-1.5"
                          >
                            <Save className="w-4 h-4" />
                            <span>Lưu Thông Tin Nhà Máy</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsAddingFactory(false)}
                            className="bg-slate-200 text-slate-700 py-2.5 px-4 rounded-xl font-bold"
                          >
                            Hủy Bỏ
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    /* Factory list */
                    <div className="space-y-3">
                      {factories.length === 0 ? (
                        <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
                          <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
                          <h4 className="font-bold text-slate-800 text-base">Chưa có nhà máy nào trong danh sách</h4>
                          <p className="text-xs text-slate-500 max-w-md mx-auto">
                            Bấm nút <strong>"+ Thêm Nhà Máy Mới"</strong> ở góc trên bên phải để bắt đầu đăng tin tuyển dụng.
                          </p>
                          <button
                            onClick={handleStartAddFactory}
                            className="bg-rose-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow hover:bg-rose-700 transition"
                          >
                            + Thêm Nhà Máy Đầu Tiên
                          </button>
                        </div>
                      ) : (
                        factories.map((f) => (
                          <div
                            key={f.id}
                            className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={f.image}
                                alt={f.name}
                                className="w-16 h-16 rounded-xl object-cover border shrink-0"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-black text-sm text-slate-900">{f.name}</h4>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                    f.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                                  }`}>
                                    {f.active ? '● Hiển thị' : '○ Đã ẩn'}
                                  </span>
                                </div>
                                <div className="text-xs text-slate-500 mt-0.5">
                                  {f.industrialPark} • {f.location} ({f.region === 'Bac' ? 'Miền Bắc' : 'Miền Nam'})
                                </div>
                                <div className="text-xs text-rose-600 font-bold mt-1">
                                  Lương: {(f.salaryMin / 1000000).toFixed(1)} - {(f.salaryMax / 1000000).toFixed(1)} Triệu
                                  {f.hotBonus ? ` • Thưởng nóng ${(f.hotBonus / 1000000).toFixed(1)}Tr` : ''}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-center">
                              <button
                                onClick={() => handleStartEditFactory(f)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                title="Sửa thông tin"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Bạn có chắc muốn xóa nhà máy "${f.name}"?`)) {
                                    onDeleteFactory(f.id);
                                    triggerNotice(`Đã xóa nhà máy "${f.name}"!`);
                                  }
                                }}
                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                                title="Xóa nhà máy"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* TAB: CALCULATOR SETTINGS */}
              {activeTab === 'calculator' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-3xl">
                  <div className="mb-6 pb-3 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">
                        Cấu Hình Thông Số Bảng Tính Lương & Thu Nhập
                      </h3>
                      <p className="text-xs text-slate-500">
                        Chỉnh sửa các thông số tính toán lương cơ bản, hệ số tăng ca, phụ cấp ca đêm, chuyên cần, tiền ăn.
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Calculator className="w-5 h-5" />
                    </div>
                  </div>

                  <form onSubmit={handleSaveCalculatorSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Lương Cơ Bản Mặc Định (VNĐ):</label>
                        <input
                          type="number"
                          step={100000}
                          value={editableSettings.calculator?.defaultBaseSalary || 5200000}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            calculator: { 
                              ...(editableSettings.calculator || DEFAULT_SITE_SETTINGS.calculator), 
                              defaultBaseSalary: Number(e.target.value) 
                            }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Hệ Số Tăng Ca Ngày Thường (OT):</label>
                        <input
                          type="number"
                          step={0.1}
                          value={editableSettings.calculator?.overtimeWeekdayRate || 1.5}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            calculator: { 
                              ...(editableSettings.calculator || DEFAULT_SITE_SETTINGS.calculator), 
                              overtimeWeekdayRate: Number(e.target.value) 
                            }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Hệ Số Tăng Ca Chủ Nhật:</label>
                        <input
                          type="number"
                          step={0.1}
                          value={editableSettings.calculator?.overtimeSundayRate || 2.0}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            calculator: { 
                              ...(editableSettings.calculator || DEFAULT_SITE_SETTINGS.calculator), 
                              overtimeSundayRate: Number(e.target.value) 
                            }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Hệ Số Tăng Ca Ngày Lễ / Tết:</label>
                        <input
                          type="number"
                          step={0.1}
                          value={editableSettings.calculator?.overtimeHolidayRate || 3.0}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            calculator: { 
                              ...(editableSettings.calculator || DEFAULT_SITE_SETTINGS.calculator), 
                              overtimeHolidayRate: Number(e.target.value) 
                            }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Phụ Cấp Ca Đêm (% Lương Giờ):</label>
                        <input
                          type="number"
                          step={1}
                          value={editableSettings.calculator?.nightShiftAllowancePercent || 30}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            calculator: { 
                              ...(editableSettings.calculator || DEFAULT_SITE_SETTINGS.calculator), 
                              nightShiftAllowancePercent: Number(e.target.value) 
                            }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Phụ Cấp Chuyên Cần (VNĐ):</label>
                        <input
                          type="number"
                          step={50000}
                          value={editableSettings.calculator?.defaultAttendanceBonus || 500000}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            calculator: { 
                              ...(editableSettings.calculator || DEFAULT_SITE_SETTINGS.calculator), 
                              defaultAttendanceBonus: Number(e.target.value) 
                            }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Phụ Cấp Tiền Ăn (VNĐ):</label>
                        <input
                          type="number"
                          step={50000}
                          value={editableSettings.calculator?.defaultMealAllowance || 750000}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            calculator: { 
                              ...(editableSettings.calculator || DEFAULT_SITE_SETTINGS.calculator), 
                              defaultMealAllowance: Number(e.target.value) 
                            }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Phụ Cấp Nhà Ở / Trọ (VNĐ):</label>
                        <input
                          type="number"
                          step={50000}
                          value={editableSettings.calculator?.defaultHousingAllowance || 500000}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            calculator: { 
                              ...(editableSettings.calculator || DEFAULT_SITE_SETTINGS.calculator), 
                              defaultHousingAllowance: Number(e.target.value) 
                            }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 px-6 rounded-xl shadow transition flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        <span>Lưu Thông Số Tính Lương</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: GENERAL SETTINGS */}
              {activeTab === 'general' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-3xl">
                  <div className="mb-6 pb-3 border-b border-slate-100">
                    <h3 className="text-lg font-black text-slate-900">
                      Cài Đặt Thương Hiệu & Hotline Liên Hệ
                    </h3>
                    <p className="text-xs text-slate-500">
                      Tất cả các thông số này sẽ tự động cập nhật lên Header, Footer, Zalo link và nút gọi thoại.
                    </p>
                  </div>

                  <form onSubmit={handleSaveGeneral} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Tên Thương Hiệu (Brand Name):</label>
                        <input
                          type="text"
                          required
                          value={editableSettings.general.brandName}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            general: { ...editableSettings.general, brandName: e.target.value }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Tên Công Ty Pháp Nhân:</label>
                        <input
                          type="text"
                          required
                          value={editableSettings.general.subBrand}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            general: { ...editableSettings.general, subBrand: e.target.value }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Số Hotline Hiển Thị:</label>
                        <input
                          type="text"
                          required
                          value={editableSettings.general.hotline}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            general: { ...editableSettings.general, hotline: e.target.value }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-rose-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Hotline Bấm Gọi (Tel):</label>
                        <input
                          type="text"
                          required
                          value={editableSettings.general.hotlineCall}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            general: { ...editableSettings.general, hotlineCall: e.target.value }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Email Công Ty:</label>
                        <input
                          type="email"
                          required
                          value={editableSettings.general.email}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            general: { ...editableSettings.general, email: e.target.value }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Link Zalo Tư Vấn:</label>
                        <input
                          type="url"
                          required
                          value={editableSettings.general.zaloLink}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            general: { ...editableSettings.general, zaloLink: e.target.value }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 font-medium text-blue-600"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Tên Miền (Domain):</label>
                        <input
                          type="text"
                          value={editableSettings.general.domain}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            general: { ...editableSettings.general, domain: e.target.value }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Thời Gian Làm Việc:</label>
                        <input
                          type="text"
                          value={editableSettings.general.workingHours}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            general: { ...editableSettings.general, workingHours: e.target.value }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Giấy Phép Pháp Lý:</label>
                        <input
                          type="text"
                          value={editableSettings.general.license}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            general: { ...editableSettings.general, license: e.target.value }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Địa Chỉ Trụ Sở Chính:</label>
                      <input
                        type="text"
                        value={editableSettings.general.headOfficeAddress}
                        onChange={(e) => setEditableSettings({
                          ...editableSettings,
                          general: { ...editableSettings.general, headOfficeAddress: e.target.value }
                        })}
                        className="w-full p-2.5 rounded-xl border border-slate-300"
                      />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <button
                        type="submit"
                        className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-2.5 px-6 rounded-xl shadow transition flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        <span>Lưu Toàn Bộ Thông Tin Chung</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 3: HERO SETTINGS */}
              {activeTab === 'hero' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-3xl">
                  <div className="mb-6 pb-3 border-b border-slate-100">
                    <h3 className="text-lg font-black text-slate-900">
                      Chỉnh Sửa Banner Hero & Các Chỉ Số Thống Kê
                    </h3>
                    <p className="text-xs text-slate-500">
                      Sửa tiêu đề chính, phụ, các con số ấn tượng (50.000+, 350+,...) hiển thị ngay đầu trang.
                    </p>
                  </div>

                  <form onSubmit={handleSaveHero} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Huy Hiệu Đầu Banner (Badge):</label>
                      <input
                        type="text"
                        value={editableSettings.hero.badge}
                        onChange={(e) => setEditableSettings({
                          ...editableSettings,
                          hero: { ...editableSettings.hero, badge: e.target.value }
                        })}
                        className="w-full p-2.5 rounded-xl border border-slate-300"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Tiêu Đề Lớn Banner (H1):</label>
                      <input
                        type="text"
                        value={editableSettings.hero.title}
                        onChange={(e) => setEditableSettings({
                          ...editableSettings,
                          hero: { ...editableSettings.hero, title: e.target.value }
                        })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 font-black text-slate-900 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Mô Tả Phụ Banner:</label>
                      <textarea
                        rows={3}
                        value={editableSettings.hero.subtitle}
                        onChange={(e) => setEditableSettings({
                          ...editableSettings,
                          hero: { ...editableSettings.hero, subtitle: e.target.value }
                        })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Cam Kết Nổi Bật Màu Xanh Lá:</label>
                      <input
                        type="text"
                        value={editableSettings.hero.highlightText}
                        onChange={(e) => setEditableSettings({
                          ...editableSettings,
                          hero: { ...editableSettings.hero, highlightText: e.target.value }
                        })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-emerald-700"
                      />
                    </div>

                    {/* Stats */}
                    <div className="pt-3 border-t border-slate-100">
                      <h4 className="font-bold text-slate-800 mb-3">4 Con Số Thống Kê Nổi Bật:</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {editableSettings.hero.stats.map((st, i) => (
                          <div key={i} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                            <label className="block text-[10px] text-slate-500 mb-1">Số hiển thị ({i+1}):</label>
                            <input
                              type="text"
                              value={st.num}
                              onChange={(e) => {
                                const newStats = [...editableSettings.hero.stats];
                                newStats[i].num = e.target.value;
                                setEditableSettings({
                                  ...editableSettings,
                                  hero: { ...editableSettings.hero, stats: newStats }
                                });
                              }}
                              className="w-full p-1.5 rounded-lg border border-slate-300 font-black text-rose-600 mb-1.5"
                            />
                            <label className="block text-[10px] text-slate-500 mb-1">Nhãn mô tả:</label>
                            <input
                              type="text"
                              value={st.label}
                              onChange={(e) => {
                                const newStats = [...editableSettings.hero.stats];
                                newStats[i].label = e.target.value;
                                setEditableSettings({
                                  ...editableSettings,
                                  hero: { ...editableSettings.hero, stats: newStats }
                                });
                              }}
                              className="w-full p-1.5 rounded-lg border border-slate-300 text-[11px]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <button
                        type="submit"
                        className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-2.5 px-6 rounded-xl shadow transition flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        <span>Lưu Cài Đặt Banner Hero</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 4: OFFICES & ADDRESSES */}
              {activeTab === 'offices' && (
                <div className="max-w-4xl space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">
                        Hệ Thống Chi Nhánh & Địa Chỉ Văn Phòng
                      </h3>
                      <p className="text-xs text-slate-500">
                        Quản lý các địa chỉ trụ sở, văn phòng chi nhánh Đồng Nai, Bình Dương, Bắc Ninh...
                      </p>
                    </div>
                  </div>

                  {/* Add office form */}
                  <form onSubmit={handleAddOffice} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-xs">
                    <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-rose-600" />
                      <span>Thêm Chi Nhánh / Địa Điểm Mới</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Tên Chi Nhánh / Khu Vực (*):</label>
                        <input
                          type="text"
                          required
                          value={newOffice.region}
                          onChange={(e) => setNewOffice({ ...newOffice, region: e.target.value })}
                          placeholder="VD: Chi Nhánh Đồng Nai"
                          className="w-full p-2.5 rounded-xl border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Địa Chỉ Cụ Thể (*):</label>
                        <input
                          type="text"
                          required
                          value={newOffice.address}
                          onChange={(e) => setNewOffice({ ...newOffice, address: e.target.value })}
                          placeholder="Số nhà, đường, phường, TP..."
                          className="w-full p-2.5 rounded-xl border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Hotline Chi Nhánh:</label>
                        <input
                          type="text"
                          value={newOffice.hotline}
                          onChange={(e) => setNewOffice({ ...newOffice, hotline: e.target.value })}
                          placeholder="0823 166 683"
                          className="w-full p-2.5 rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-slate-900 hover:bg-black text-white px-4 py-2 rounded-xl font-bold shadow transition"
                    >
                      + Lưu Chi Nhánh Này
                    </button>
                  </form>

                  {/* Office list */}
                  <div className="space-y-3">
                    {editableSettings.offices.map((off) => (
                      <div
                        key={off.id}
                        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-rose-600" />
                            <span>{off.region}</span>
                          </div>
                          <div className="text-slate-600 mt-1">{off.address}</div>
                          <div className="text-rose-600 font-bold mt-0.5">Hotline: {off.hotline}</div>
                        </div>

                        <button
                          onClick={() => handleDeleteOffice(off.id)}
                          className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          title="Xóa địa chỉ này"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: SERVICES */}
              {activeTab === 'services' && (
                <div className="max-w-4xl space-y-6">
                  <div className="pb-3 border-b border-slate-200">
                    <h3 className="text-lg font-black text-slate-900">
                      Quản Lý Các Dịch Vụ Cung Ứng Nhân Lực
                    </h3>
                    <p className="text-xs text-slate-500">
                      Chỉnh sửa tiêu đề, mô tả và các quyền lợi của từng gói dịch vụ dành cho doanh nghiệp.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {editableSettings.services.map((svc, idx) => (
                      <div key={svc.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-xs space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-400">Dịch Vụ #{idx+1}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Tên Dịch Vụ:</label>
                            <input
                              type="text"
                              value={svc.title}
                              onChange={(e) => {
                                const copy = [...editableSettings.services];
                                copy[idx].title = e.target.value;
                                setEditableSettings({ ...editableSettings, services: copy });
                              }}
                              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Mô Tả Ngắn:</label>
                            <input
                              type="text"
                              value={svc.shortDesc}
                              onChange={(e) => {
                                const copy = [...editableSettings.services];
                                copy[idx].shortDesc = e.target.value;
                                setEditableSettings({ ...editableSettings, services: copy });
                              }}
                              className="w-full p-2.5 rounded-xl border border-slate-300"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Các Điểm Nổi Bật (Mỗi dòng 1 ý):</label>
                          <textarea
                            rows={3}
                            value={svc.features.join('\n')}
                            onChange={(e) => {
                              const copy = [...editableSettings.services];
                              copy[idx].features = e.target.value.split('\n').filter(Boolean);
                              setEditableSettings({ ...editableSettings, services: copy });
                            }}
                            className="w-full p-2.5 rounded-xl border border-slate-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      onUpdateSiteSettings(editableSettings);
                      triggerNotice('Đã lưu toàn bộ danh sách dịch vụ thành công!');
                    }}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-2.5 px-6 rounded-xl shadow transition flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu Thay Đổi Dịch Vụ</span>
                  </button>
                </div>
              )}

              {/* TAB: PARTNERS / ENTERPRISE CLIENTS */}
              {activeTab === 'partners' && (
                <div className="max-w-4xl space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">
                        Quản Lý Khách Hàng & Doanh Nghiệp Đối Tác
                      </h3>
                      <p className="text-xs text-slate-500">
                        Thêm mới hoặc chỉnh sửa logo, tên tập đoàn FDI, ngành nghề và số lượng lao động đã cung ứng.
                      </p>
                    </div>

                    {!isEditingPartner && (
                      <button
                        onClick={handleStartAddPartner}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs shadow-md transition flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Thêm Doanh Nghiệp Đối Tác</span>
                      </button>
                    )}
                  </div>

                  {/* Form add/edit partner */}
                  {isEditingPartner ? (
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-md">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                        <h4 className="font-black text-sm text-slate-900">
                          {editingPartnerId ? 'Chỉnh Sửa Doanh Nghiệp Đối Tác' : 'Thêm Mới Doanh Nghiệp Đối Tác'}
                        </h4>
                        <button
                          onClick={() => setIsEditingPartner(false)}
                          className="text-xs text-slate-400 hover:text-slate-700 font-bold"
                        >
                          Hủy Bỏ
                        </button>
                      </div>

                      <form onSubmit={handleSavePartnerSubmit} className="space-y-4 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Tên Doanh Nghiệp / Tập Đoàn (*):</label>
                            <input
                              type="text"
                              required
                              value={partnerName}
                              onChange={(e) => setPartnerName(e.target.value)}
                              placeholder="Ví dụ: Tập Đoàn Foxconn Việt Nam"
                              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Ngành Nghề Sản Xuất:</label>
                            <input
                              type="text"
                              required
                              value={partnerIndustry}
                              onChange={(e) => setPartnerIndustry(e.target.value)}
                              placeholder="Ví dụ: Sản xuất linh kiện điện tử viễn thông"
                              className="w-full p-2.5 rounded-xl border border-slate-300"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Địa Điểm / KCN Hoạt Động:</label>
                            <input
                              type="text"
                              required
                              value={partnerLocation}
                              onChange={(e) => setPartnerLocation(e.target.value)}
                              placeholder="Ví dụ: KCN Quế Võ, Bắc Ninh & KCN Quang Châu, Bắc Giang"
                              className="w-full p-2.5 rounded-xl border border-slate-300"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Quy Mô Nhân Lực Đã Cung Ứng:</label>
                            <input
                              type="text"
                              required
                              value={partnerWorkerCount}
                              onChange={(e) => setPartnerWorkerCount(e.target.value)}
                              placeholder="Ví dụ: 3.500+ Lao động"
                              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-rose-600"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Thời Gian Hợp Tác:</label>
                            <input
                              type="text"
                              value={partnerYear}
                              onChange={(e) => setPartnerYear(e.target.value)}
                              placeholder="Ví dụ: 2021 - Nay"
                              className="w-full p-2.5 rounded-xl border border-slate-300"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">URL Hình Ảnh Logo / Nhà Xưởng:</label>
                            <input
                              type="url"
                              value={partnerLogo}
                              onChange={(e) => setPartnerLogo(e.target.value)}
                              placeholder="https://images.unsplash.com/..."
                              className="w-full p-2.5 rounded-xl border border-slate-300"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Mô Tả Hợp Tác / Dự Án:</label>
                          <textarea
                            rows={3}
                            value={partnerDesc}
                            onChange={(e) => setPartnerDesc(e.target.value)}
                            placeholder="Mô tả các đợt cung ứng lao động, các dây chuyền hỗ trợ..."
                            className="w-full p-2.5 rounded-xl border border-slate-300 leading-relaxed"
                          />
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setIsEditingPartner(false)}
                            className="px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-100 transition"
                          >
                            Hủy
                          </button>
                          <button
                            type="submit"
                            className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-6 py-2 rounded-xl shadow transition"
                          >
                            Lưu Doanh Nghiệp Đối Tác
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    /* Partner list */
                    <div className="space-y-3">
                      {(editableSettings.partners || []).map((p) => (
                        <div
                          key={p.id}
                          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs hover:border-rose-300 transition"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                              <img src={p.logo} alt={p.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-extrabold text-sm text-slate-900">{p.name}</div>
                              <div className="text-slate-500">{p.industry} • {p.location}</div>
                              <div className="text-rose-600 font-bold mt-0.5">
                                Cung ứng: {p.workerCountProvided} • {p.partnershipYear}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() => handleStartEditPartner(p)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                              title="Sửa đối tác này"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePartner(p.id)}
                              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                              title="Xóa đối tác này"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 6: ABOUT US */}
              {activeTab === 'about' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-3xl">
                  <div className="mb-6 pb-3 border-b border-slate-100">
                    <h3 className="text-lg font-black text-slate-900">
                      Chỉnh Sửa Thông Tin Giới Thiệu "Về Chúng Tôi"
                    </h3>
                    <p className="text-xs text-slate-500">
                      Cập nhật lịch sử hình thành, số năm kinh nghiệm, 3 giá trị cốt lõi và các cam kết pháp lý.
                    </p>
                  </div>

                  <form onSubmit={handleSaveAbout} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Tiêu Đề Mục Giới Thiệu:</label>
                      <input
                        type="text"
                        value={editableSettings.about.title}
                        onChange={(e) => setEditableSettings({
                          ...editableSettings,
                          about: { ...editableSettings.about, title: e.target.value }
                        })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Đoạn Văn Giới Thiệu 1:</label>
                      <textarea
                        rows={3}
                        value={editableSettings.about.paragraph1}
                        onChange={(e) => setEditableSettings({
                          ...editableSettings,
                          about: { ...editableSettings.about, paragraph1: e.target.value }
                        })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Đoạn Văn Giới Thiệu 2:</label>
                      <textarea
                        rows={3}
                        value={editableSettings.about.paragraph2}
                        onChange={(e) => setEditableSettings({
                          ...editableSettings,
                          about: { ...editableSettings.about, paragraph2: e.target.value }
                        })}
                        className="w-full p-2.5 rounded-xl border border-slate-300 leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Số Năm Kinh Nghiệm:</label>
                        <input
                          type="text"
                          value={editableSettings.about.experienceYears}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            about: { ...editableSettings.about, experienceYears: e.target.value }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Link Ảnh Minh Họa (URL):</label>
                        <input
                          type="url"
                          value={editableSettings.about.image}
                          onChange={(e) => setEditableSettings({
                            ...editableSettings,
                            about: { ...editableSettings.about, image: e.target.value }
                          })}
                          className="w-full p-2.5 rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <button
                        type="submit"
                        className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-2.5 px-6 rounded-xl shadow transition flex items-center gap-1.5"
                      >
                        <Save className="w-4 h-4" />
                        <span>Lưu Cài Đặt Về Chúng Tôi</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 7: PROCESS */}
              {activeTab === 'process' && (
                <div className="max-w-4xl space-y-6">
                  <div className="pb-3 border-b border-slate-200">
                    <h3 className="text-lg font-black text-slate-900">
                      Quy Trình Làm Việc 5 Bước
                    </h3>
                    <p className="text-xs text-slate-500">
                      Sửa tiêu đề và nội dung mô tả của từng bước trong quy trình tiếp nhận & cung ứng nhân lực.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {editableSettings.processSteps.map((st, i) => (
                      <div key={st.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-xs space-y-2">
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs">
                            {st.num}
                          </span>
                          <span>Bước {st.num}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block font-semibold text-slate-600 mb-1">Tiêu Đề Bước:</label>
                            <input
                              type="text"
                              value={st.title}
                              onChange={(e) => {
                                const copy = [...editableSettings.processSteps];
                                copy[i].title = e.target.value;
                                setEditableSettings({ ...editableSettings, processSteps: copy });
                              }}
                              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold text-slate-600 mb-1">Mô Tả Chi Tiết:</label>
                            <input
                              type="text"
                              value={st.desc}
                              onChange={(e) => {
                                const copy = [...editableSettings.processSteps];
                                copy[i].desc = e.target.value;
                                setEditableSettings({ ...editableSettings, processSteps: copy });
                              }}
                              className="w-full p-2.5 rounded-xl border border-slate-300"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      onUpdateSiteSettings(editableSettings);
                      triggerNotice('Đã lưu quy trình 5 bước thành công!');
                    }}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-2.5 px-6 rounded-xl shadow transition flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu Toàn Bộ Quy Trình</span>
                  </button>
                </div>
              )}

              {/* TAB 8: TESTIMONIALS */}
              {activeTab === 'testimonials' && (
                <div className="max-w-4xl space-y-6">
                  <div className="pb-3 border-b border-slate-200">
                    <h3 className="text-lg font-black text-slate-900">
                      Quản Lý Ý Kiến Đánh Giá Từ Khách Hàng & Công Nhân
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {editableSettings.testimonials.map((test, idx) => (
                      <div key={test.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-xs space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Họ Tên Người Đánh Giá:</label>
                            <input
                              type="text"
                              value={test.name}
                              onChange={(e) => {
                                const copy = [...editableSettings.testimonials];
                                copy[idx].name = e.target.value;
                                setEditableSettings({ ...editableSettings, testimonials: copy });
                              }}
                              className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Vai Trò / Vị Trí:</label>
                            <input
                              type="text"
                              value={test.role}
                              onChange={(e) => {
                                const copy = [...editableSettings.testimonials];
                                copy[idx].role = e.target.value;
                                setEditableSettings({ ...editableSettings, testimonials: copy });
                              }}
                              className="w-full p-2.5 rounded-xl border border-slate-300 text-rose-600 font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Quê Quán / Địa Điểm:</label>
                            <input
                              type="text"
                              value={test.location}
                              onChange={(e) => {
                                const copy = [...editableSettings.testimonials];
                                copy[idx].location = e.target.value;
                                setEditableSettings({ ...editableSettings, testimonials: copy });
                              }}
                              className="w-full p-2.5 rounded-xl border border-slate-300"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Nội Dung Đánh Giá / Chia Sẻ:</label>
                          <textarea
                            rows={2}
                            value={test.content}
                            onChange={(e) => {
                              const copy = [...editableSettings.testimonials];
                              copy[idx].content = e.target.value;
                              setEditableSettings({ ...editableSettings, testimonials: copy });
                            }}
                            className="w-full p-2.5 rounded-xl border border-slate-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      onUpdateSiteSettings(editableSettings);
                      triggerNotice('Đã lưu ý kiến đánh giá thành công!');
                    }}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-2.5 px-6 rounded-xl shadow transition flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu Thay Đổi Đánh Giá</span>
                  </button>
                </div>
              )}

              {/* TAB 9: GALLERY */}
              {activeTab === 'gallery' && (
                <div className="max-w-4xl space-y-6">
                  <div className="pb-3 border-b border-slate-200">
                    <h3 className="text-lg font-black text-slate-900">
                      Quản Lý Hình Ảnh Hoạt Động & Nhà Máy
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {editableSettings.gallery.map((item, idx) => (
                      <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-xs space-y-2">
                        <img src={item.src} alt={item.title} className="w-full h-36 object-cover rounded-xl border mb-2" />
                        
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Tiêu Đề Ảnh:</label>
                          <input
                            type="text"
                            value={item.title}
                            onChange={(e) => {
                              const copy = [...editableSettings.gallery];
                              copy[idx].title = e.target.value;
                              setEditableSettings({ ...editableSettings, gallery: copy });
                            }}
                            className="w-full p-2 rounded-lg border border-slate-300 font-bold"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Link Ảnh (URL):</label>
                          <input
                            type="url"
                            value={item.src}
                            onChange={(e) => {
                              const copy = [...editableSettings.gallery];
                              copy[idx].src = e.target.value;
                              setEditableSettings({ ...editableSettings, gallery: copy });
                            }}
                            className="w-full p-2 rounded-lg border border-slate-300 text-[11px]"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Chú Thích Ảnh:</label>
                          <input
                            type="text"
                            value={item.caption}
                            onChange={(e) => {
                              const copy = [...editableSettings.gallery];
                              copy[idx].caption = e.target.value;
                              setEditableSettings({ ...editableSettings, gallery: copy });
                            }}
                            className="w-full p-2 rounded-lg border border-slate-300 text-[11px]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      onUpdateSiteSettings(editableSettings);
                      triggerNotice('Đã lưu danh mục ảnh hoạt động thành công!');
                    }}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-2.5 px-6 rounded-xl shadow transition flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu Cài Đặt Ảnh</span>
                  </button>
                </div>
              )}

              {/* TAB 10: NEWS */}
              {activeTab === 'news' && (
                <div className="max-w-4xl space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">
                        Quản Lý Bản Tin Tuyển Dụng & Cẩm Nang
                      </h3>
                    </div>

                    {!isEditingNews && (
                      <button
                        onClick={() => {
                          setEditingNewsId(null);
                          setNewsTitle('');
                          setNewsCategory('Thị Trường Lao Động');
                          setNewsSummary('');
                          setNewsContent('');
                          setNewsImage('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop');
                          setNewsAuthor('Ban Tuyển Dụng VTH');
                          setIsEditingNews(true);
                        }}
                        className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Thêm Bài Viết Mới</span>
                      </button>
                    )}
                  </div>

                  {isEditingNews ? (
                    <form onSubmit={handleSaveNewsSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Tiêu Đề Bài Viết (*):</label>
                        <input
                          type="text"
                          required
                          value={newsTitle}
                          onChange={(e) => setNewsTitle(e.target.value)}
                          placeholder="Tiêu đề tin tức..."
                          className="w-full p-2.5 rounded-xl border border-slate-300 font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Chuyên Mục:</label>
                          <input
                            type="text"
                            value={newsCategory}
                            onChange={(e) => setNewsCategory(e.target.value)}
                            placeholder="VD: Cẩm Nang Việc Làm..."
                            className="w-full p-2.5 rounded-xl border border-slate-300"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Tác Giả:</label>
                          <input
                            type="text"
                            value={newsAuthor}
                            onChange={(e) => setNewsAuthor(e.target.value)}
                            placeholder="Người viết bài..."
                            className="w-full p-2.5 rounded-xl border border-slate-300"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Link Ảnh Minh Họa (URL):</label>
                        <input
                          type="url"
                          value={newsImage}
                          onChange={(e) => setNewsImage(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Đoạn Tóm Tắt Ngắn:</label>
                        <textarea
                          rows={2}
                          value={newsSummary}
                          onChange={(e) => setNewsSummary(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Nội Dung Chi Tiết:</label>
                        <textarea
                          rows={5}
                          value={newsContent}
                          onChange={(e) => setNewsContent(e.target.value)}
                          className="w-full p-2.5 rounded-xl border border-slate-300 leading-relaxed"
                        />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="submit"
                          className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-6 py-2.5 rounded-xl shadow"
                        >
                          Lưu Bài Viết
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditingNews(false)}
                          className="bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold"
                        >
                          Hủy
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-3">
                      {newsList.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4 text-xs">
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                            <div>
                              <span className="text-[10px] font-bold text-rose-600 uppercase bg-rose-50 px-2 py-0.5 rounded">
                                {item.category}
                              </span>
                              <h4 className="font-bold text-sm text-slate-900 mt-1">{item.title}</h4>
                              <div className="text-slate-400 text-[11px] mt-0.5">{item.date} • {item.author}</div>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              if (confirm('Xóa bài viết này?')) {
                                onDeleteNews(item.id);
                                triggerNotice('Đã xóa bài viết!');
                              }
                            }}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 11: CANDIDATE APPLICATIONS */}
              {activeTab === 'applications' && (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">
                        Danh Sách Ứng Viên Nộp Hồ Sơ Trực Tuyến
                      </h3>
                      <p className="text-xs text-slate-500">
                        Cập nhật trạng thái liên hệ, gọi điện hướng dẫn nhận việc và xuất file Excel (CSV).
                      </p>
                    </div>

                    {applications.length > 0 && (
                      <button
                        onClick={handleExportCSV}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow transition flex items-center gap-1.5"
                      >
                        <Download className="w-4 h-4" />
                        <span>Xuất File Excel (CSV)</span>
                      </button>
                    )}
                  </div>

                  {applications.length > 0 ? (
                    <div className="space-y-3">
                      {applications.map((app) => (
                        <div
                          key={app.id}
                          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-sm text-slate-900">{app.fullName}</h4>
                              <span className="text-slate-400">({app.birthYear})</span>
                              {app.hometown && (
                                <span className="text-slate-500">• Quê: {app.hometown}</span>
                              )}
                            </div>

                            <div className="text-slate-600 mt-1 flex flex-wrap items-center gap-4">
                              <a href={`tel:${app.phone}`} className="font-bold text-rose-600 hover:underline flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                <span>{app.phone}</span>
                              </a>
                              <span>Ứng tuyển: <strong className="text-slate-800">{app.targetJobName}</strong></span>
                              <span>Ngày: {app.createdAt}</span>
                            </div>

                            {app.notes && (
                              <div className="text-[11px] text-slate-500 mt-1 italic">
                                Ghi chú: "{app.notes}"
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <select
                              value={app.status}
                              onChange={(e) => {
                                onUpdateApplicationStatus(app.id, e.target.value as any);
                                triggerNotice('Đã cập nhật trạng thái ứng viên!');
                              }}
                              className={`text-xs font-bold p-1.5 px-2.5 rounded-lg border focus:outline-none cursor-pointer ${
                                app.status === 'pending'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : app.status === 'contacted'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : app.status === 'hired'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : 'bg-slate-50 text-slate-700 border-slate-300'
                              }`}
                            >
                              <option value="pending">Chờ Liên Hệ</option>
                              <option value="contacted">Đã Gọi Điện</option>
                              <option value="interview_scheduled">Đã Hẹn Phỏng Vấn</option>
                              <option value="hired">Đã Đi Làm</option>
                              <option value="rejected">Không Nhận Việc</option>
                            </select>

                            <button
                              onClick={() => {
                                if (confirm('Xóa ứng viên này khỏi danh sách?')) {
                                  onDeleteApplication(app.id);
                                  triggerNotice('Đã xóa ứng viên!');
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      Chưa có hồ sơ ứng viên nào được nộp trực tuyến.
                    </div>
                  )}
                </div>
              )}

              {/* TAB 12: EMPLOYER REQUESTS */}
              {activeTab === 'employers' && (
                <div>
                  <div className="pb-4 mb-6 border-b border-slate-200">
                    <h3 className="text-lg font-black text-slate-900">
                      Yêu Cầu Cung Ứng Nhân Lực Từ Doanh Nghiệp (B2B)
                    </h3>
                    <p className="text-xs text-slate-500">
                      Danh sách các công ty và xưởng sản xuất gửi thông tin cần bổ sung lao động.
                    </p>
                  </div>

                  {employerRequests.length > 0 ? (
                    <div className="space-y-3">
                      {employerRequests.map((req) => (
                        <div
                          key={req.id}
                          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-sm text-slate-900">{req.companyName}</h4>
                              <span className="text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded">
                                {req.workerCount} công nhân
                              </span>
                            </div>

                            <div className="text-slate-600 mt-1 flex flex-wrap items-center gap-4">
                              <span>Liên hệ: <strong className="text-slate-800">{req.contactPerson}</strong></span>
                              <a href={`tel:${req.phone}`} className="font-bold text-rose-600 hover:underline">
                                {req.phone}
                              </a>
                              {req.email && <span>Email: {req.email}</span>}
                              <span>Địa chỉ: {req.location}</span>
                            </div>

                            <div className="text-slate-500 mt-1">
                              Dịch vụ: <strong className="text-slate-700">{req.serviceType}</strong> • Ngày gửi: {req.createdAt}
                            </div>

                            {req.requirementsNotes && (
                              <div className="text-[11px] text-slate-500 mt-1 italic">
                                Ghi chú: "{req.requirementsNotes}"
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <a
                              href={`tel:${req.phone}`}
                              className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-3 py-1.5 rounded-lg transition"
                            >
                              Gọi Lại Ngay
                            </a>
                            <button
                              onClick={() => {
                                if (confirm('Xóa yêu cầu doanh nghiệp này?')) {
                                  onDeleteEmployerRequest(req.id);
                                  triggerNotice('Đã xóa yêu cầu!');
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      Chưa có yêu cầu cung ứng nhân lực mới từ doanh nghiệp.
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};
