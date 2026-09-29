import React from 'react';
import { 
  ClipboardList, 
  FileCheck2, 
  GraduationCap, 
  Bus, 
  Headphones, 
  Sparkles
} from 'lucide-react';
import { Language, ProcessStep } from '../types';
import { SectionEditButton } from './SectionEditButton';

interface ProcessSectionProps {
  currentLang: Language;
  processSteps: ProcessStep[];
  isAdminLoggedIn?: boolean;
  onEditSection?: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ 
  currentLang, 
  processSteps,
  isAdminLoggedIn,
  onEditSection
}) => {
  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0: return ClipboardList;
      case 1: return FileCheck2;
      case 2: return GraduationCap;
      case 3: return Bus;
      case 4: return Headphones;
      default: return ClipboardList;
    }
  };

  const t = {
    vi: {
      badge: 'QUY TRÌNH LÀM VIỆC CHUYÊN NGHIỆP',
      title: 'Quy Trình Cung Ứng Nhân Lực 5 Bước Chuẩn Mực',
      desc: 'Được đúc kết qua hơn 10 năm phục vụ các tập đoàn sản xuất FDI hàng đầu, đảm bảo tốc độ và chất lượng nhân sự tối ưu.'
    },
    zh: {
      badge: '标准化合作流程',
      title: '5步标准高效劳务派遣流程',
      desc: '沉淀成熟经验，保障供工速度与产线稳定。'
    },
    en: {
      badge: 'STANDARD OPERATING PROCEDURE',
      title: '5-Step Professional Staffing Workflow',
      desc: 'Ensuring rapid deployment and strict operational discipline.'
    }
  }[currentLang];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
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
              sectionTitle="5 Bước Quy Trình"
              onClick={onEditSection}
              isAdminLoggedIn={isAdminLoggedIn}
            />
          )}
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {processSteps.map((st, i) => {
            const Icon = getStepIcon(i);
            return (
              <div 
                key={st.id || i}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md hover:shadow-xl hover:border-rose-300 transition-all duration-300 relative flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-rose-600/30 group-hover:text-rose-600 transition">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-rose-50 text-slate-700 group-hover:text-rose-600 flex items-center justify-center transition">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 mb-1 leading-snug group-hover:text-rose-600 transition">
                    {st.title}
                  </h3>
                  {st.titleZh && (
                    <div className="text-[11px] text-slate-400 font-medium mb-3">
                      {st.titleZh}
                    </div>
                  )}

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
