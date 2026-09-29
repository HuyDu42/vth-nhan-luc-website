import React, { useState } from 'react';
import { 
  Building2, 
  Send, 
  ShieldCheck, 
  Users, 
  Clock, 
  CheckCircle, 
  PhoneCall, 
  Sparkles,
  FileText
} from 'lucide-react';
import { EmployerRequest, Language } from '../types';
import { SectionEditButton } from './SectionEditButton';

interface EmployerSectionProps {
  currentLang: Language;
  onAddEmployerRequest: (req: Omit<EmployerRequest, 'id' | 'createdAt' | 'status'>) => void;
  isAdminLoggedIn?: boolean;
  onEditSection?: () => void;
  hotline?: string;
}

export const EmployerSection: React.FC<EmployerSectionProps> = ({
  currentLang,
  onAddEmployerRequest,
  isAdminLoggedIn,
  onEditSection,
  hotline = '0823 166 683'
}) => {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [workerCount, setWorkerCount] = useState<number>(50);
  const [serviceType, setServiceType] = useState('Cho thuê lại lao động');
  const [startDate, setStartDate] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactPerson || !phone) return;

    onAddEmployerRequest({
      companyName,
      contactPerson,
      phone,
      email,
      location,
      workerCount,
      serviceType,
      startDate: startDate || new Date().toISOString().split('T')[0],
      requirementsNotes: notes
    });

    setSubmitted(true);
    setTimeout(() => {
      setCompanyName('');
      setContactPerson('');
      setPhone('');
      setEmail('');
      setLocation('');
      setNotes('');
      setSubmitted(false);
    }, 4000);
  };

  const t = {
    vi: {
      badge: 'DÀNH CHO DOANH NGHIỆP & NHÀ MÁY',
      title: 'Đăng Ký Yêu Cầu Cung Ứng Nhân Lực Cấp Tốc',
      desc: 'Điền thông tin nhu cầu tuyển dụng của doanh nghiệp bạn. VTH Nhân Lực sẽ liên hệ lại kèm bảng báo giá chi tiết và phương án điều phối trong vòng 60 phút.',
      form: {
        companyName: 'Tên Công Ty / Nhà Máy (*)',
        contactPerson: 'Người Liên Hệ (*)',
        phone: 'Số Điện Thoại (*)',
        email: 'Email Doanh Nghiệp',
        location: 'Địa Chỉ Xưởng / Khu Công Nghiệp (*)',
        workerCount: 'Số Lượng Lao Động Cần Tuyển:',
        serviceType: 'Loại Hình Dịch Vụ Cần Cung Ứng:',
        startDate: 'Ngày Dự Kiến Nhận Quân:',
        notes: 'Yêu cầu cụ thể khác (Ca kíp, giới tính, tay nghề...):',
        submitBtn: 'Gửi Yêu Cầu Cung Ứng Ngay',
        successMsg: 'Yêu cầu của quý doanh nghiệp đã được gửi thành công! Chuyên viên của VTH Nhân Lực sẽ gọi lại trong 60 phút.'
      },
      benefits: [
        {
          title: 'Đáp Ứng Cấp Tốc 24H - 48H',
          desc: 'Có sẵn nguồn dự trữ hơn 10.000 hồ sơ lao động sẵn sàng nhận việc tại các KCN trọng điểm.'
        },
        {
          title: '100% Pháp Lý Minh Bạch',
          desc: 'Ký hợp đồng dịch vụ chuẩn Nghị định 145/2020/NĐ-CP, xuất hóa đơn VAT đầy đủ, miễn trừ rủi ro lao động.'
        },
        {
          title: 'Cán Bộ Onsite Túc Trực Tại Xưởng',
          desc: 'Đội ngũ quản lý hiện trường túc trực theo dõi chấm công, kỷ luật, an toàn lao động và sinh hoạt công nhân.'
        },
        {
          title: 'Đổi Người Miễn Phí',
          desc: 'Cam kết thay thế nhân sự ngay lập tức nếu lao động không đáp ứng được yêu cầu công việc.'
        }
      ]
    },
    zh: {
      badge: '制造企业与用人单位专区',
      title: '企业紧急用工需求提报',
      desc: '请填写贵司用工需求，HCM 人力资源专员将在60分钟内回电并提供详细的用工测算方案与报价。',
      form: {
        companyName: '公司/工厂名称 (*)',
        contactPerson: '联系人姓名 (*)',
        phone: '联系电话 (*)',
        email: '企业邮箱',
        location: '厂区地址 / 所在工业区 (*)',
        workerCount: '所需用工人数:',
        serviceType: '所需外包服务类型:',
        startDate: '预计进厂用工时间:',
        notes: '具体用工要求 (班次、男女比例、技能要求等):',
        submitBtn: '立即提报用工需求',
        successMsg: '您的用工需求已成功提交！HCM 资深业务经理将在60分钟内与您联系。'
      },
      benefits: [
        {
          title: '24-48小时极速响应',
          desc: '储备超过10,000名合格劳动力档案，随时整队进厂。'
        },
        {
          title: '100% 劳动法律合规',
          desc: '严格依据越南145号法令正规派遣，开具正规发票，免除企业劳务纠纷风险。'
        },
        {
          title: '驻厂专员现场驻扎管理',
          desc: '专业驻厂管理员全程跟进考勤、纪律、劳保与食宿协调。'
        },
        {
          title: '不合格人员即刻免费替换',
          desc: '凡不符合岗位作业标准的人员，承诺迅速调配补齐，保障产线连续性。'
        }
      ]
    },
    en: {
      badge: 'FOR ENTERPRISES & FACTORIES',
      title: 'Request Urgent Workforce Supply',
      desc: 'Submit your factory staffing requirements. HCM Human Resources team will contact you within 60 minutes with an execution plan and formal quotation.',
      form: {
        companyName: 'Company / Factory Name (*)',
        contactPerson: 'Contact Person (*)',
        phone: 'Phone Number (*)',
        email: 'Corporate Email',
        location: 'Facility Location / Industrial Park (*)',
        workerCount: 'Number of Workers Needed:',
        serviceType: 'Service Type:',
        startDate: 'Target Start Date:',
        notes: 'Specific Requirements (Shifts, gender, skill set...):',
        submitBtn: 'Submit Workforce Request',
        successMsg: 'Request successfully submitted! Our account manager will contact you within 60 minutes.'
      },
      benefits: [
        {
          title: '24-48 Hour Fast Deployment',
          desc: 'Active pool of 10,000+ vetted candidates ready for immediate mobilization.'
        },
        {
          title: '100% Legal Compliance',
          desc: 'Compliant with Decree 145/2020/ND-CP, full VAT invoicing, zero employer liability.'
        },
        {
          title: 'On-site Supervisor Support',
          desc: 'Dedicated on-site coordinators managing attendance, safety, and operational discipline.'
        },
        {
          title: 'Immediate Free Replacement',
          desc: 'Guaranteed swift replacement of personnel who do not meet your operational standard.'
        }
      ]
    }
  }[currentLang];

  return (
    <section id="doanh-nghiep" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Prop & Trust (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/30">
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                {t.badge}
              </div>

              {onEditSection && (
                <SectionEditButton
                  sectionTitle="Yêu Cầu Doanh Nghiệp"
                  onClick={onEditSection}
                  isAdminLoggedIn={isAdminLoggedIn}
                />
              )}
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-5 leading-tight">
              {t.title}
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed mb-8">
              {t.desc}
            </p>

            {/* 4 B2B pillars */}
            <div className="space-y-4">
              {t.benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/60">
                  <div className="w-8 h-8 rounded-lg bg-rose-600/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    {i === 0 && <Clock className="w-4 h-4" />}
                    {i === 1 && <ShieldCheck className="w-4 h-4" />}
                    {i === 2 && <Users className="w-4 h-4" />}
                    {i === 3 && <CheckCircle className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{b.title}</h4>
                    <p className="text-xs text-slate-400 leading-normal mt-0.5">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Direct phone box */}
            <div className="mt-8 p-4 rounded-xl bg-slate-800/40 border border-slate-700 flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 font-semibold">Tư Vấn Doanh Nghiệp Trực Tiếp:</div>
                <div className="text-lg font-black text-amber-400">{hotline}</div>
              </div>
              <a
                href={`tel:${hotline.replace(/\s/g, '')}`}
                className="bg-rose-600 hover:bg-rose-700 text-white p-2.5 rounded-xl shadow transition"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-2 mb-6">
              <Building2 className="w-5 h-5 text-rose-600" />
              <h3 className="font-extrabold text-xl text-slate-900">
                Phiếu Đăng Ký Yêu Cầu Cung Ứng Lao Động
              </h3>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-black text-lg">Gửi Yêu Cầu Thành Công!</h4>
                <p className="text-xs sm:text-sm font-medium">{t.form.successMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Company Name */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {t.form.companyName}
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="VD: Công ty TNHH Điện Tử Pegatron..."
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>

                  {/* Contact Person */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {t.form.contactPerson}
                    </label>
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="Họ tên người phụ trách tuyển dụng"
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {t.form.phone}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="09xx xxx xxx"
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {t.form.email}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="hr@company.com"
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.form.location}
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="VD: KCN Quế Võ, Bắc Ninh hoặc KCN VSIP 1, Bình Dương"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Worker Count */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {t.form.workerCount} <strong className="text-rose-600">{workerCount} người</strong>
                    </label>
                    <select
                      value={workerCount}
                      onChange={(e) => setWorkerCount(Number(e.target.value))}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white font-medium"
                    >
                      <option value={20}>20 - 50 người</option>
                      <option value={50}>50 - 100 người</option>
                      <option value={100}>100 - 300 người</option>
                      <option value={300}>300 - 500 người</option>
                      <option value={500}>500 - 1.000+ người</option>
                    </select>
                  </div>

                  {/* Service Type */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {t.form.serviceType}
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white font-medium"
                    >
                      <option value="Cho thuê lại lao động">Cho thuê lại lao động</option>
                      <option value="Cung ứng thời vụ cao điểm">Cung ứng thời vụ cao điểm</option>
                      <option value="Gia công đóng gói khoán trọn gói">Gia công đóng gói trọn gói</option>
                      <option value="Bốc xếp kho bãi & vận hành cảng">Bốc xếp kho bãi logistics</option>
                      <option value="Dịch vụ tính lương Payroll">Dịch vụ tính lương Payroll</option>
                    </select>
                  </div>

                  {/* Target start date */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      {t.form.startDate}
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
                    />
                  </div>
                </div>

                {/* Specific Notes */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.form.notes}
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Mô tả ca kíp, yêu cầu độ tuổi, tay nghề hoặc tiến độ gấp..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold py-3.5 px-6 rounded-xl shadow-lg shadow-rose-600/30 transition transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.form.submitBtn}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
