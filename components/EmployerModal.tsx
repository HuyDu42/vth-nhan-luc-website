import React, { useState } from 'react';
import { X, Building2, Send, CheckCircle, PhoneCall } from 'lucide-react';
import { EmployerRequest, Language } from '../types';

interface EmployerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onAddEmployerRequest: (req: Omit<EmployerRequest, 'id' | 'createdAt' | 'status'>) => void;
}

export const EmployerModal: React.FC<EmployerModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onAddEmployerRequest
}) => {
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [workerCount, setWorkerCount] = useState<number>(50);
  const [serviceType, setServiceType] = useState('Cho thuê lại lao động');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !contactPerson || !phone) return;

    onAddEmployerRequest({
      companyName,
      contactPerson,
      phone,
      email,
      location,
      workerCount,
      serviceType,
      startDate: new Date().toISOString().split('T')[0],
      requirementsNotes: notes
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Tiếp Nhận Thành Công!</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              Chuyên viên tư vấn doanh nghiệp của <strong className="text-rose-600">VTH Nhân Lực</strong> sẽ gọi điện thoại báo giá và gửi phương án cung ứng nhân sự trong 60 phút.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase">
                B2B Staffing Services
              </span>
            </div>

            <h2 className="text-2xl font-black text-slate-900 mb-1 leading-tight">
              Yêu Cầu Báo Giá Cung Ứng Nhân Lực
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Đáp ứng 50 - 5.000 lao động trong 24h - 48h • Đầy đủ hợp đồng và hóa đơn VAT
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tên Công ty / Xưởng sản xuất (*):
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="VD: Công ty TNHH Điện Tử Pegatron..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Người đại diện (*):
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Họ tên người liên hệ"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Số điện thoại (*):
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09xx xxx xxx"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none font-bold text-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Khu công nghiệp / Địa chỉ xưởng (*):
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="VD: KCN Quế Võ, Bắc Ninh hoặc KCN VSIP, Bình Dương"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Số lượng công nhân cần:
                  </label>
                  <select
                    value={workerCount}
                    onChange={(e) => setWorkerCount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white font-medium"
                  >
                    <option value={30}>20 - 50 người</option>
                    <option value={80}>50 - 100 người</option>
                    <option value={200}>100 - 300 người</option>
                    <option value={500}>300 - 500+ người</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Loại hình dịch vụ:
                  </label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white font-medium"
                  >
                    <option value="Cho thuê lại lao động">Cho thuê lại lao động</option>
                    <option value="Lao động thời vụ cao điểm">Thời vụ cao điểm</option>
                    <option value="Gia công đóng gói">Gia công đóng gói</option>
                    <option value="Bốc xếp kho vận">Bốc xếp kho vận</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Ghi chú yêu cầu thêm:
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Yêu cầu cụ thể về giới tính, ca kíp, thời gian cần người..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-black text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg transition transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Gửi Yêu Cầu Cung Ứng</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
