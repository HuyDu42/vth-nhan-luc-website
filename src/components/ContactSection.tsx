import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle, 
  QrCode, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { Language, OfficeLocation, GeneralSettings } from '../types';
import { SectionEditButton } from './SectionEditButton';

interface ContactSectionProps {
  currentLang: Language;
  offices: OfficeLocation[];
  general: GeneralSettings;
  isAdminLoggedIn?: boolean;
  onEditSection?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ 
  currentLang,
  offices,
  general,
  isAdminLoggedIn,
  onEditSection
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  const t = {
    vi: {
      badge: 'KẾT NỐI VỚI CHÚNG TÔI',
      title: 'Liên Hệ & Hệ Thống Văn Phòng Tuyển Dụng',
      desc: 'Đội ngũ chuyên viên tư vấn luôn túc trực 24/7 để tiếp nhận hồ sơ xin việc và phản hồi nhu cầu nhân lực của quý doanh nghiệp.',
      form: {
        title: 'Gửi Tin Nhắn / Yêu Cầu Gọi Lại',
        name: 'Họ và tên của bạn (*)',
        phone: 'Số điện thoại liên hệ (*)',
        msg: 'Nội dung cần hỗ trợ (tìm việc nhà máy nào hoặc cần báo giá dịch vụ...)',
        submit: 'Gửi Yêu Cầu Tư Vấn Ngay',
        success: 'Cảm ơn bạn! Chúng tôi đã nhận được thông tin và sẽ gọi lại trong ít phút.'
      }
    },
    zh: {
      badge: '联系与分支机构',
      title: '联系我们与各区域招聘联络处',
      desc: '专线团队全天候24小时为您提供招募咨询、工厂求职与企业派遣报价服务。',
      form: {
        title: '在线留言 / 预约专属顾问回电',
        name: '您的姓名 (*)',
        phone: '您的联系电话 (*)',
        msg: '咨询内容 (意向求职工厂或企业用工需求...)',
        submit: '立即提交咨询',
        success: '已收到您的信息！专员将以最快速度回电协助。'
      }
    },
    en: {
      badge: 'GET IN TOUCH',
      title: 'Contact Us & Regional Recruitment Hubs',
      desc: 'Our consulting personnel are available 24/7 to receive worker applications and corporate staffing briefs.',
      form: {
        title: 'Send a Message / Request Callback',
        name: 'Your Full Name (*)',
        phone: 'Your Phone Number (*)',
        msg: 'Inquiry details (Factory applying for or staffing inquiry...)',
        submit: 'Request Callback Now',
        success: 'Thank you! We have received your request and will call you shortly.'
      }
    }
  }[currentLang];

  return (
    <section id="lien-he" className="py-20 bg-white relative">
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
              sectionTitle="Chi Nhánh & Hotline"
              onClick={onEditSection}
              isAdminLoggedIn={isAdminLoggedIn}
            />
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Office network & Zalo (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {offices.map((off) => (
                <div
                  key={off.id}
                  className="bg-slate-50 p-5 rounded-2xl border border-slate-200 hover:border-rose-300 transition"
                >
                  <div className="flex items-center gap-2 text-rose-600 font-extrabold text-sm mb-2">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{off.region}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {off.address}
                  </p>
                  <a
                    href={`tel:${off.hotline.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-rose-600 transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-rose-500" />
                    <span>Hotline: {off.hotline}</span>
                  </a>
                </div>
              ))}
            </div>

            {/* Direct Zalo Card */}
            <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white p-2 rounded-2xl shrink-0 flex items-center justify-center shadow-lg">
                  <div className="w-full h-full border-2 border-dashed border-blue-400 rounded-xl flex flex-col items-center justify-center text-center">
                    <QrCode className="w-8 h-8 text-blue-600" />
                    <span className="text-[9px] font-bold text-slate-800 mt-0.5">ZALO QR</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-extrabold text-base sm:text-lg text-white mb-1">
                    Nhắn Tin Zalo Tuyển Dụng 24/7
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
                    Quét mã hoặc bấm vào đây để được chuyên viên {general.brandName} tư vấn chọn nhà máy lương cao nhất ngay lập tức.
                  </p>
                </div>
              </div>

              <a
                href={general.zaloLink || 'https://zalo.me/0823166683'}
                target="_blank"
                rel="noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition flex items-center gap-2 shrink-0 active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Nhắn Zalo Ngay</span>
              </a>
            </div>
          </div>

          {/* Right Column: Callback Request Form (5 cols) */}
          <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg">
            <h3 className="font-extrabold text-lg text-slate-900 mb-2">
              {t.form.title}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Để lại thông tin, chuyên viên tư vấn sẽ liên hệ lại ngay trong vòng 5 - 15 phút.
            </p>

            {submitted ? (
              <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base">Gửi Yêu Cầu Thành Công!</h4>
                <p className="text-xs">{t.form.success}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.form.name}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.form.phone}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09xx xxx xxx"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    {t.form.msg}
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="VD: Tôi muốn xin làm tại nhà máy tại Đồng Nai / Bình Dương, có ký túc xá không?"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold py-3.5 px-4 rounded-xl shadow-md transition transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.form.submit}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
