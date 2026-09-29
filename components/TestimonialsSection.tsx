import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';
import { TestimonialItem, Language } from '../types';
import { SectionEditButton } from './SectionEditButton';

interface TestimonialsSectionProps {
  currentLang: Language;
  testimonials: TestimonialItem[];
  isAdminLoggedIn?: boolean;
  onEditSection?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ 
  currentLang, 
  testimonials,
  isAdminLoggedIn,
  onEditSection
}) => {
  const t = {
    vi: {
      badge: 'Ý KIẾN ĐÁNH GIÁ',
      title: 'Chia Sẻ Từ Người Lao Động & Đối Tác Doanh Nghiệp',
      desc: 'Sự hài lòng và phát triển của công nhân cùng sự thành công của doanh nghiệp là tôn chỉ hoạt động của VTH Nhân Lực.'
    },
    zh: {
      badge: '客户与员工心声',
      title: '工友与制造企业合作评价',
      desc: '工友的稳定高薪与企业的安心生产，是我们十年如一日的执着追求。'
    },
    en: {
      badge: 'TESTIMONIALS & REVIEWS',
      title: 'What Workers & Factory Partners Say',
      desc: 'Our success is built on transparent compensation for workers and reliable operational support for employers.'
    }
  }[currentLang];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              sectionTitle="Ý Kiến Đánh Giá"
              onClick={onEditSection}
              isAdminLoggedIn={isAdminLoggedIn}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-2xl p-7 border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-rose-300 mb-3 opacity-60" />

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{item.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-rose-500 shadow"
                />
                <div>
                  <div className="font-extrabold text-sm text-slate-900">{item.name}</div>
                  <div className="text-xs text-rose-600 font-medium">{item.role}</div>
                  <div className="text-[11px] text-slate-400">{item.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
