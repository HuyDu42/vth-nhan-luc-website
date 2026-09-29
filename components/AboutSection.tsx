import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { Language, AboutSettings } from '../types';
import { SectionEditButton } from './SectionEditButton';

interface AboutSectionProps {
  currentLang: Language;
  aboutSettings: AboutSettings;
  isAdminLoggedIn?: boolean;
  onEditSection?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ 
  currentLang, 
  aboutSettings,
  isAdminLoggedIn,
  onEditSection
}) => {
  return (
    <section id="ve-chung-toi" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual collage (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={aboutSettings.image}
                alt="Đội ngũ VTH Nhân Lực"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-2xl font-black text-rose-400">{aboutSettings.experienceYears}</div>
                <p className="text-xs text-slate-200 mt-1">{aboutSettings.experienceSub}</p>
              </div>
            </div>

            {/* Overlapping Trust Card */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 max-w-xs flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="font-extrabold text-xs text-slate-900">Giấy Phép Bộ LĐ-TB&XH</div>
                <div className="text-[11px] text-slate-500">Hoạt động hợp pháp 100%</div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase bg-rose-100 text-rose-700 border border-rose-200">
                <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                {aboutSettings.badge}
              </div>

              {onEditSection && (
                <SectionEditButton
                  sectionTitle="Về Chúng Tôi"
                  onClick={onEditSection}
                  isAdminLoggedIn={isAdminLoggedIn}
                />
              )}
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
              {aboutSettings.title}
            </h2>

            <div className="text-sm font-extrabold text-rose-600 mb-4 tracking-wide uppercase">
              {aboutSettings.companyName}
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {aboutSettings.paragraph1}
            </p>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {aboutSettings.paragraph2}
            </p>

            {/* 3 Core values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {aboutSettings.coreValues.map((cv, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                  <h4 className="font-extrabold text-sm text-slate-900 mb-1 text-rose-600">
                    {cv.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 leading-normal">
                    {cv.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Commitments checklist */}
            <div className="space-y-2.5">
              {aboutSettings.commitments.map((c, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
