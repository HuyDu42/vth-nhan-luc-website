import React from 'react';
import { 
  Building2, 
  MapPin, 
  Users, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight,
  Handshake,
  CheckCircle2
} from 'lucide-react';
import { Language, PartnerItem } from '../types';
import { SectionEditButton } from './SectionEditButton';

interface PartnersSectionProps {
  currentLang: Language;
  partners: PartnerItem[];
  isAdminLoggedIn?: boolean;
  onEditSection?: () => void;
  onOpenEmployerModal: () => void;
}

export const PartnersSection: React.FC<PartnersSectionProps> = ({
  currentLang,
  partners,
  isAdminLoggedIn,
  onEditSection,
  onOpenEmployerModal
}) => {
  const t = {
    vi: {
      badge: 'DOANH NGHIỆP & ĐỐI TÁC CHIẾN LƯỢC',
      title: 'Khách Hàng & Doanh Nghiệp Tiêu Biểu Đồng Hành Cùng VTH Nhân Lực',
      desc: 'Hơn 350+ tập đoàn sản xuất FDI và doanh nghiệp hàng đầu tại các KCN Đồng Nai, Bình Dương, Bắc Ninh, Bắc Giang đã tin tưởng lựa chọn giải pháp cung ứng lao động của chúng tôi.',
      workersProvided: 'Đã cung ứng',
      partnerSince: 'Hợp tác từ',
      btnJoin: 'Hợp Tác Cung Ứng Nhân Lực Cùng VTH',
      stat1: '350+ Doanh Nghiệp FDI',
      stat2: '98.5% Tỷ Lệ Đi Làm Đầy Đủ',
      stat3: '24h - 48h Cung Ứng Tốc Hành'
    },
    zh: {
      badge: '战略合作企业与客户案例',
      title: '携手VTH人力资源的知名企业客户',
      desc: '常年服务于平阳、同奈、北宁、北江等各大工业区超过350家大型制造企业与外资集团。',
      workersProvided: '累计派遣',
      partnerSince: '合作时间',
      btnJoin: '立即开启企业用工合作',
      stat1: '350+ 外资及本土名企',
      stat2: '98.5% 到岗率保证',
      stat3: '24-48小时 极速供工'
    },
    en: {
      badge: 'ENTERPRISE CLIENTS & PARTNERS',
      title: 'Distinguished Corporate Partners Trusting VTH Workforce',
      desc: 'Over 350+ manufacturing corporations across industrial parks rely on our scalable workforce solutions.',
      workersProvided: 'Workforce Supplied',
      partnerSince: 'Partnership Since',
      btnJoin: 'Partner With Us For Staffing',
      stat1: '350+ FDI Enterprises',
      stat2: '98.5% Punctual Attendance',
      stat3: '24h Rapid Deployment'
    }
  }[currentLang];

  return (
    <section id="doanh-nghiep-doi-tac" className="py-20 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase bg-rose-100 text-rose-700 border border-rose-200 mb-3">
            <Handshake className="w-3.5 h-3.5 text-rose-600" />
            {t.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            {t.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.desc}
          </p>
          <div className="w-20 h-1 bg-rose-600 mx-auto mt-4 rounded-full" />

          {/* Admin Edit Button */}
          {onEditSection && (
            <SectionEditButton
              sectionTitle="Khách Hàng & Doanh Nghiệp"
              onClick={onEditSection}
              isAdminLoggedIn={isAdminLoggedIn}
            />
          )}
        </div>

        {/* Highlight Trust Metric Pills */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">{t.stat1}</div>
              <div className="text-xs text-slate-500">Mạng lưới nhà máy rộng khắp cả nước</div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">{t.stat2}</div>
              <div className="text-xs text-slate-500">Kỷ luật cao, tác phong công nghiệp</div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">{t.stat3}</div>
              <div className="text-xs text-slate-500">Ứng phó kịp thời mùa cao điểm đơn hàng</div>
            </div>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-rose-400 p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header with logo & name */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm leading-snug group-hover:text-rose-600 transition-colors">
                      {partner.name}
                    </h3>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{partner.industry}</span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-1.5 text-xs text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{partner.location}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {partner.description}
                </p>
              </div>

              {/* Footer specs */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg">
                  <Users className="w-3.5 h-3.5 text-rose-600" />
                  <span>{partner.workerCountProvided}</span>
                </div>

                <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                  <Calendar className="w-3 h-3" />
                  <span>{partner.partnershipYear}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA B2B Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenEmployerModal}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-rose-600 hover:to-rose-700 text-white font-extrabold text-sm py-3.5 px-8 rounded-2xl shadow-lg transition-all duration-300 group"
          >
            <ShieldCheck className="w-5 h-5 text-amber-400 group-hover:text-white" />
            <span>{t.btnJoin}</span>
            <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
