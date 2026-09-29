import React from 'react';
import { 
  X, 
  MapPin, 
  DollarSign, 
  Gift, 
  CheckCircle2, 
  Clock, 
  Users, 
  FileText, 
  ShieldCheck, 
  MessageSquare,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { FactoryJob, Language } from '../types';

interface JobDetailModalProps {
  job: FactoryJob | null;
  onClose: () => void;
  onApply: (job: FactoryJob) => void;
  currentLang: Language;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  job,
  onClose,
  onApply,
  currentLang
}) => {
  if (!job) return null;

  const formatVND = (num: number) => {
    return (num / 1000000).toLocaleString('vi-VN', { maximumFractionDigits: 1 }) + ' Triệu';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Top Header Card */}
        <div className="relative rounded-2xl overflow-hidden mb-6 bg-slate-900 h-48 sm:h-56">
          <img
            src={job.image}
            alt={job.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="bg-rose-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
                Tuyển Dụng Nóng
              </span>
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded">
                {job.region === 'Bac' ? 'KCN Miền Bắc' : 'KCN Miền Nam'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {job.name}
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              {job.companyName}
            </p>
          </div>
        </div>

        {/* Location & Quick Meta */}
        <div className="space-y-2 mb-6 text-xs text-slate-600 pb-4 border-b border-slate-100">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span>Địa chỉ: <strong className="text-slate-800">{job.industrialPark}</strong></span>
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Độ tuổi: <strong className="text-slate-800">{job.ageRange}</strong></span>
            <span>•</span>
            <span>Ca kíp: <strong className="text-slate-800">{job.shift}</strong></span>
            <span>•</span>
            <span>Ngành nghề: <strong className="text-slate-800">{job.industryName}</strong></span>
          </div>
        </div>

        {/* Salary and Bonus Box */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 border border-emerald-200 mb-6">
          <div className="text-xs text-emerald-800 font-semibold mb-1">
            Mức Thu Nhập Thực Nhận Hàng Tháng:
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 mb-3">
            {formatVND(job.salaryMin)} - {formatVND(job.salaryMax)} <span className="text-xs font-normal text-emerald-600">/tháng</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs pt-3 border-t border-emerald-200/80">
            <div>
              <span className="text-slate-500">Lương cơ bản:</span>
              <div className="font-bold text-slate-900">{(job.basicSalary / 1000000).toFixed(1)} Triệu</div>
            </div>
            <div>
              <span className="text-slate-500">Tổng phụ cấp:</span>
              <div className="font-bold text-slate-900">{(job.allowance / 1000000).toFixed(1)} Triệu</div>
            </div>
            {job.hotBonus && (
              <div className="col-span-2 sm:col-span-1">
                <span className="text-amber-700 font-semibold flex items-center gap-1">
                  <Gift className="w-3.5 h-3.5 text-amber-600" /> Thưởng nóng:
                </span>
                <div className="font-black text-amber-600">Tới {(job.hotBonus / 1000000).toFixed(1)} Triệu</div>
              </div>
            )}
          </div>

          {job.hotBonusNote && (
            <div className="mt-3 p-2.5 bg-white/80 rounded-xl text-[11px] text-amber-800 border border-amber-200">
              {job.hotBonusNote}
            </div>
          )}
        </div>

        {/* Benefits list */}
        <div className="mb-6">
          <h4 className="font-extrabold text-sm text-slate-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-rose-600" />
            <span>Chế Độ Phúc Lợi & Đãi Ngộ</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-700">
            {job.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Job Description */}
        <div className="mb-6">
          <h4 className="font-extrabold text-sm text-slate-900 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span>Mô Tả Công Việc Chi Tiết</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-700">
            {job.jobDescription.map((desc, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                <span>{desc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements */}
        <div className="mb-8">
          <h4 className="font-extrabold text-sm text-slate-900 mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-600" />
            <span>Yêu Cầu Tuyển Dụng & Hồ Sơ Mang Theo</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-700">
            {job.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
          <a
            href={job.zaloUrl || 'https://zalo.me/0823166683'}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Tư Vấn Zalo 24/7</span>
          </a>

          <button
            onClick={() => {
              onClose();
              onApply(job);
            }}
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-lg shadow-rose-600/30 transition transform active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Ứng Tuyển Nhà Máy Này</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
