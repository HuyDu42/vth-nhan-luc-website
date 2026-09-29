import React, { useState, useEffect } from 'react';
import { X, UserCheck, Phone, CheckCircle, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { FactoryJob, CandidateApplication, Language } from '../types';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedJob: FactoryJob | null;
  factories: FactoryJob[];
  currentLang: Language;
  onApplySuccess: (app: Omit<CandidateApplication, 'id' | 'createdAt' | 'status'>) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  selectedJob,
  factories,
  currentLang,
  onApplySuccess
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthYear, setBirthYear] = useState('2000');
  const [hometown, setHometown] = useState('');
  const [targetJobId, setTargetJobId] = useState('');
  const [gender, setGender] = useState('all');
  const [hasExperience, setHasExperience] = useState(false);
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (selectedJob) {
      setTargetJobId(selectedJob.id);
    } else if (factories.length > 0) {
      setTargetJobId(factories[0].id);
    }
  }, [selectedJob, factories]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const matchedJob = factories.find((f) => f.id === targetJobId);
    const targetJobName = matchedJob ? matchedJob.name : 'Chưa chỉ định';

    onApplySuccess({
      fullName,
      phone,
      birthYear,
      hometown,
      targetJobId,
      targetJobName,
      gender,
      hasExperience,
      notes
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      // Reset form
      setFullName('');
      setPhone('');
      setHometown('');
      setNotes('');
    }, 3500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Nộp Hồ Sơ Thành Công!</h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              Chuyên viên tuyển dụng của <strong className="text-rose-600">VTH Nhân Lực</strong> sẽ gọi điện thoại hoặc nhắn tin Zalo cho bạn trong ít phút để hướng dẫn thủ tục nhận việc và xe đưa đón.
            </p>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
              Hotline hỗ trợ khẩn cấp: <strong className="text-rose-600">0823 166 683</strong> (Zalo 24/7)
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
                Ứng Tuyển Miễn Phí 100%
              </span>
            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-1 leading-tight">
              Đăng Ký Đi Làm Nhà Máy Ngay
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Không qua trung gian • Không mất phí • Hỗ trợ ký túc xá & xe đưa đón
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* Target Job selection */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nhà máy bạn muốn làm việc (*):
                </label>
                <select
                  value={targetJobId}
                  onChange={(e) => setTargetJobId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-slate-50 font-semibold text-slate-800"
                >
                  {factories.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.location}) - Thu nhập {Math.round(f.salaryMin/1000000)}-{Math.round(f.salaryMax/1000000)}Tr
                    </option>
                  ))}
                  <option value="other">Nhà máy khác (Chuyên viên tư vấn giúp tôi)</option>
                </select>
              </div>

              {/* Full name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Họ và tên của bạn (*):
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="VD: Nguyễn Văn Nam"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              {/* Phone & Birth year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Số điện thoại / Zalo (*):
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09xx xxx xxx"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none font-bold text-rose-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Năm sinh:
                  </label>
                  <input
                    type="number"
                    min="1970"
                    max="2008"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Hometown & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Quê quán / Tỉnh thành:
                  </label>
                  <input
                    type="text"
                    value={hometown}
                    onChange={(e) => setHometown(e.target.value)}
                    placeholder="VD: Nghệ An, Thanh Hóa, Tuyên Quang..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Giới tính:
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
                  >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="all">Không yêu cầu</option>
                  </select>
                </div>
              </div>

              {/* Experience checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="exp"
                  checked={hasExperience}
                  onChange={(e) => setHasExperience(e.target.checked)}
                  className="w-4 h-4 text-rose-600 rounded focus:ring-0"
                />
                <label htmlFor="exp" className="text-xs text-slate-700 font-medium cursor-pointer">
                  Tôi đã từng có kinh nghiệm làm việc tại xưởng / nhà máy
                </label>
              </div>

              {/* Notes */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Yêu cầu / Ghi chú thêm:
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="VD: Muốn ở ký túc xá, đi làm theo cặp đôi, muốn đi làm ngay ngày mai..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg shadow-rose-600/30 transition transform active:scale-95 flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Nộp Hồ Sơ Nhận Việc Ngay</span>
              </button>
            </form>

            {/* Quick alternative: Direct Zalo */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Hoặc chat trực tiếp:</span>
              <a
                href="https://zalo.me/0823166683"
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline font-bold flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Nhắn tin Zalo 0823 166 683</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
