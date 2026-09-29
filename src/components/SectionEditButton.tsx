import React from 'react';
import { Edit3 } from 'lucide-react';

interface SectionEditButtonProps {
  sectionTitle: string;
  onClick: () => void;
  isAdminLoggedIn?: boolean;
}

export const SectionEditButton: React.FC<SectionEditButtonProps> = ({
  sectionTitle,
  onClick,
  isAdminLoggedIn
}) => {
  return (
    <div className="inline-block my-2">
      <button
        onClick={onClick}
        type="button"
        title={`Chỉnh sửa ${sectionTitle} trực tiếp`}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-sm border ${
          isAdminLoggedIn
            ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-300 ring-2 ring-amber-400/40 animate-pulse hover:animate-none'
            : 'bg-slate-800/80 hover:bg-amber-500 text-slate-200 hover:text-slate-950 border-slate-600 hover:border-amber-400 backdrop-blur'
        }`}
      >
        <Edit3 className="w-3.5 h-3.5" />
        <span>Sửa {sectionTitle} (Admin)</span>
      </button>
    </div>
  );
};
