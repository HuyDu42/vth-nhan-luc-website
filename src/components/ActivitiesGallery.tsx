import React, { useState } from 'react';
import { Sparkles, Maximize2, X } from 'lucide-react';
import { GalleryItem, Language } from '../types';
import { SectionEditButton } from './SectionEditButton';

interface ActivitiesGalleryProps {
  currentLang: Language;
  gallery: GalleryItem[];
  isAdminLoggedIn?: boolean;
  onEditSection?: () => void;
}

export const ActivitiesGallery: React.FC<ActivitiesGalleryProps> = ({ 
  currentLang, 
  gallery,
  isAdminLoggedIn,
  onEditSection
}) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const t = {
    vi: {
      badge: 'HÌNH ẢNH HOẠT ĐỘNG THỰC TẾ',
      title: 'Hình Ảnh Thực Tế Tại Các Nhà Máy & Khu Công Nghiệp',
      desc: 'Minh chứng cho quy trình bài bản, môi trường làm việc văn minh và sự đồng hành tận tâm của VTH Nhân Lực.'
    },
    zh: {
      badge: '现场纪实与活动剪影',
      title: '工厂现场与驻厂保障实录',
      desc: '展现规范的岗前培训、优质车间环境与全程贴心的后勤生活保障。'
    },
    en: {
      badge: 'OPERATIONAL HIGHLIGHTS',
      title: 'On-site Factory Activities & Operations',
      desc: 'Real snapshots of safety orientations, cleanroom operations, and worker welfare.'
    }
  }[currentLang];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200 relative">
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
              sectionTitle="Ảnh Hoạt Động"
              onClick={onEditSection}
              isAdminLoggedIn={isAdminLoggedIn}
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item.src)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl hover:border-rose-300 transition-all duration-300 cursor-pointer group flex flex-col"
            >
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500 opacity-95 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/80 text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition duration-300 shadow-lg">
                    <Maximize2 className="w-5 h-5 text-rose-600" />
                  </div>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-rose-600 transition mb-1">
                    {item.title}
                  </h4>
                  {item.titleZh && (
                    <div className="text-[11px] text-slate-400 font-medium mb-2">
                      {item.titleZh}
                    </div>
                  )}
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setActiveImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-rose-400 p-2 transition"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={activeImage}
              alt="Chi tiết hoạt động"
              className="rounded-2xl max-w-full max-h-[85vh] object-contain shadow-2xl border border-white/20"
            />
          </div>
        </div>
      )}
    </section>
  );
};
