import React, { useState } from 'react';
import { Sparkles, Calendar, User, ArrowRight, X } from 'lucide-react';
import { NewsArticle, Language } from '../types';
import { SectionEditButton } from './SectionEditButton';

interface NewsSectionProps {
  currentLang: Language;
  newsList: NewsArticle[];
  isAdminLoggedIn?: boolean;
  onEditSection?: () => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ 
  currentLang, 
  newsList,
  isAdminLoggedIn,
  onEditSection
}) => {
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);

  const t = {
    vi: {
      badge: 'BẢN TIN & CẨM NANG LAO ĐỘNG',
      title: 'Tin Tức Tuyển Dụng & Chính Sách Mới Nhất',
      desc: 'Cập nhật kịp thời tình hình tuyển dụng tại các KCN, chính sách thưởng Tết, thưởng nóng và kỹ năng phỏng vấn xưởng.',
      readMore: 'Đọc Tiếp',
      closeModal: 'Đóng'
    },
    zh: {
      badge: '最新劳务资讯与求职指南',
      title: '招聘动态与劳动政策解读',
      desc: '即时获取各大工业区用工缺口、入职高额奖励、年终奖发放及车间面试通关秘籍。',
      readMore: '阅读全文',
      closeModal: '关闭'
    },
    en: {
      badge: 'NEWS & WORKFORCE INSIGHTS',
      title: 'Labor Market Updates & Career Guidance',
      desc: 'Stay informed with recruitment surges across industrial parks, sign-on bonuses, and interview best practices.',
      readMore: 'Read Article',
      closeModal: 'Close'
    }
  }[currentLang];

  return (
    <section id="tin-tuc" className="py-20 bg-slate-50 border-b border-slate-200 relative">
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
              sectionTitle="Tin Tức & Cẩm Nang"
              onClick={onEditSection}
              isAdminLoggedIn={isAdminLoggedIn}
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsList.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl hover:border-rose-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={art.image}
                    alt={art.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <span className="absolute top-3 left-3 bg-rose-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow">
                    {art.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-[11px] text-slate-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-rose-500" />
                      {art.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {art.author}
                    </span>
                  </div>

                  <h3 
                    onClick={() => setSelectedNews(art)}
                    className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-rose-600 transition cursor-pointer mb-2 leading-snug line-clamp-2"
                  >
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6">
                <button
                  onClick={() => setSelectedNews(art)}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 group-hover:underline"
                >
                  <span>{t.readMore}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedNews && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100"
            >
              <X className="w-6 h-6" />
            </button>

            <span className="inline-block bg-rose-100 text-rose-700 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider mb-3">
              {selectedNews.category}
            </span>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 leading-snug">
              {selectedNews.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 pb-4 border-b border-slate-100">
              <span>{selectedNews.date}</span>
              <span>•</span>
              <span>Tác giả: {selectedNews.author}</span>
            </div>

            <img
              src={selectedNews.image}
              alt={selectedNews.title}
              className="w-full h-64 object-cover rounded-2xl mb-6 shadow"
            />

            <div className="prose text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
              <p className="font-semibold text-slate-900 text-sm">
                {selectedNews.summary}
              </p>
              <p>
                {selectedNews.content}
              </p>
              <p>
                Với hệ thống quản lý chuẩn hóa và tinh thần trách nhiệm cao, VTH Nhân Lực luôn sát cánh cùng công nhân trong từng ca làm việc, đảm bảo cuộc sống ấm no và mức thu nhập xứng đáng.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedNews(null)}
                className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold text-xs"
              >
                {t.closeModal}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
