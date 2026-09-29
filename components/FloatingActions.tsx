import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Calculator, ArrowUp } from 'lucide-react';

interface FloatingActionsProps {
  onOpenApplyModal: () => void;
  hotline?: string;
  zaloLink?: string;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ 
  onOpenApplyModal,
  hotline = '0823 166 683',
  zaloLink = 'https://zalo.me/0823166683'
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('tinh-luong');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      <div className="flex flex-col gap-3 pointer-events-auto">
        {/* Scroll To Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Lên đầu trang"
            className="w-11 h-11 bg-white hover:bg-slate-100 text-slate-700 rounded-full flex items-center justify-center shadow-lg border border-slate-200 transition transform hover:scale-105 active:scale-95"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Quick Salary Calc jump */}
        <button
          onClick={scrollToCalculator}
          aria-label="Tính thu nhập"
          className="w-11 h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition transform hover:scale-105 active:scale-95 group relative"
          title="Bảng tính lương thực nhận"
        >
          <Calculator className="w-5 h-5" />
          <span className="absolute right-12 whitespace-nowrap bg-slate-900 text-white text-[11px] font-bold px-2 py-1 rounded shadow pointer-events-none opacity-0 group-hover:opacity-100 transition">
            Tính Thu Nhập
          </span>
        </button>

        {/* Zalo Button */}
        <a
          href={zaloLink}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat Zalo Tuyển Dụng"
          className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl transition transform hover:scale-110 active:scale-95 group relative"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-400" />
          </span>
          <span className="absolute right-14 whitespace-nowrap bg-slate-900 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow pointer-events-none opacity-0 group-hover:opacity-100 transition">
            Zalo: {hotline}
          </span>
        </a>

        {/* Call Phone Hotline */}
        <a
          href={`tel:${hotline.replace(/\s/g, '')}`}
          aria-label={`Gọi Hotline ${hotline}`}
          className="w-13 h-13 bg-rose-600 hover:bg-rose-700 text-white rounded-full flex items-center justify-center shadow-2xl transition transform hover:scale-110 active:scale-95 animate-bounce group relative border-2 border-white"
        >
          <Phone className="w-6 h-6" />
          <span className="absolute right-14 whitespace-nowrap bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-lg shadow pointer-events-none opacity-0 group-hover:opacity-100 transition">
            Hotline: {hotline}
          </span>
        </a>
      </div>
    </div>
  );
};
