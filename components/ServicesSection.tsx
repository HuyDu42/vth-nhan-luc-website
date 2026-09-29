import React from 'react';
import { 
  Users, 
  Clock, 
  PackageCheck, 
  Truck, 
  FileSpreadsheet, 
  Wrench, 
  CheckCircle2, 
  ShieldCheck, 
  Building2,
  PhoneCall,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { StaffingService, Language } from '../types';
import { SectionEditButton } from './SectionEditButton';

interface ServicesSectionProps {
  currentLang: Language;
  onOpenEmployerModal: () => void;
  services: StaffingService[];
  isAdminLoggedIn?: boolean;
  onEditSection?: () => void;
  hotline: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  currentLang,
  onOpenEmployerModal,
  services,
  isAdminLoggedIn,
  onEditSection,
  hotline
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="w-7 h-7 text-rose-600" />;
      case 'Clock': return <Clock className="w-7 h-7 text-rose-600" />;
      case 'PackageCheck': return <PackageCheck className="w-7 h-7 text-rose-600" />;
      case 'Truck': return <Truck className="w-7 h-7 text-rose-600" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-7 h-7 text-rose-600" />;
      case 'Wrench': return <Wrench className="w-7 h-7 text-rose-600" />;
      default: return <Users className="w-7 h-7 text-rose-600" />;
    }
  };

  const t = {
    vi: {
      badge: 'GIẢI PHÁP NHÂN SỰ TOÀN DIỆN CHO DOANH NGHIỆP',
      title: 'Dịch Vụ Cung Ứng Nhân Lực Của Chúng Tôi',
      desc: 'Đồng hành cùng hàng trăm doanh nghiệp FDI, giải quyết bài toán thiếu hụt lao động, tối ưu chi phí vận hành và rủi ro pháp lý.',
      btnContact: 'Nhận Báo Giá Dịch Vụ Cấp Tốc',
      consultantHotline: `Hotline Doanh Nghiệp: ${hotline}`
    },
    zh: {
      badge: '企业级人力资源综合解决方案',
      title: '我们的核心劳务与外包服务',
      desc: '常年服务数百家外资与本土制造企业，高效解决用工荒、降低企业用工成本与法律合规风险。',
      btnContact: '即刻获取企业用工报价方案',
      consultantHotline: `企业专线: ${hotline}`
    },
    en: {
      badge: 'ENTERPRISE WORKFORCE SOLUTIONS',
      title: 'Our Comprehensive Labor Services',
      desc: 'Partnering with hundreds of multinational enterprises to solve labor shortages, optimize operational costs, and ensure strict legal compliance.',
      btnContact: 'Request Corporate Quote in 1 Hour',
      consultantHotline: `B2B Hotline: ${hotline}`
    }
  }[currentLang];

  return (
    <section id="dich-vu" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase bg-rose-100 text-rose-700 border border-rose-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            {t.badge}
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.desc}
          </p>
          <div className="w-20 h-1 bg-rose-600 mx-auto mt-4 rounded-full" />

          {onEditSection && (
            <SectionEditButton
              sectionTitle="Dịch Vụ Cung Ứng"
              onClick={onEditSection}
              isAdminLoggedIn={isAdminLoggedIn}
            />
          )}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-slate-50 hover:bg-white rounded-2xl p-7 border border-slate-200/90 hover:border-rose-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Service Icon */}
                <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition duration-300">
                  {getIcon(svc.icon)}
                </div>

                {/* Title */}
                <h3 className="font-extrabold text-xl text-slate-900 group-hover:text-rose-600 transition mb-2">
                  {svc.title}
                </h3>
                {svc.titleZh && (
                  <div className="text-xs text-slate-400 font-medium mb-3">
                    {svc.titleZh}
                  </div>
                )}

                {/* Short desc */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  {svc.shortDesc}
                </p>

                {/* Key features bullet points */}
                <ul className="space-y-2.5 text-xs text-slate-700 mb-6">
                  {svc.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <button
                onClick={onOpenEmployerModal}
                className="mt-2 w-full py-2.5 px-4 rounded-xl border border-slate-300 group-hover:border-rose-600 text-slate-700 group-hover:text-rose-600 group-hover:bg-rose-50/50 font-bold text-xs transition flex items-center justify-center gap-1.5"
              >
                <span>Yêu Cầu Tư Vấn Gói Này</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Corporate Trust Banner */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 text-rose-400 font-bold text-xs uppercase mb-2">
              <ShieldCheck className="w-4 h-4 text-rose-400" />
              Cam kết dịch vụ chuẩn quốc tế
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              Bạn Cần Cung Ứng Nhân Lực Cấp Tốc Trong 24H?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Đội ngũ chuyên viên tư vấn luôn sẵn sàng khảo sát thực địa nhà xưởng và lên phương án điều động quân số ngay trong ngày.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={onOpenEmployerModal}
              className="bg-rose-600 hover:bg-rose-700 text-white font-extrabold px-6 py-3.5 rounded-xl text-sm shadow-lg shadow-rose-900/30 transition transform active:scale-95"
            >
              {t.btnContact}
            </button>
            <a
              href={`tel:${hotline.replace(/\s/g, '')}`}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-5 py-3.5 rounded-xl text-sm transition flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>{hotline}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
