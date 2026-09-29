import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  DollarSign, 
  HelpCircle, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Calendar, 
  Moon, 
  Gift, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { FactoryJob, Language, CalculatorSettings } from '../types';
import { SectionEditButton } from './SectionEditButton';

interface SalaryCalculatorProps {
  factories: FactoryJob[];
  currentLang: Language;
  onOpenApplyModal: () => void;
  calculatorSettings?: CalculatorSettings;
  isAdminLoggedIn?: boolean;
  onEditSection?: () => void;
}

export const SalaryCalculator: React.FC<SalaryCalculatorProps> = ({
  factories,
  currentLang,
  onOpenApplyModal,
  calculatorSettings,
  isAdminLoggedIn,
  onEditSection
}) => {
  const defaultBase = calculatorSettings?.defaultBaseSalary || 5200000;
  const defaultAttendance = calculatorSettings?.defaultAttendanceBonus || 500000;
  const defaultLiving = calculatorSettings?.defaultHousingAllowance || 600000;
  const defaultMeal = calculatorSettings?.defaultMealAllowance || 750000;
  const overtimeRate = calculatorSettings?.overtimeWeekdayRate || 1.5;
  const nightPercent = (calculatorSettings?.nightShiftAllowancePercent || 30) / 100;

  const [selectedFactoryId, setSelectedFactoryId] = useState<string>('custom');
  const [basicSalary, setBasicSalary] = useState<number>(defaultBase);
  const [workDays, setWorkDays] = useState<number>(26);
  const [otHoursPerDay, setOtHoursPerDay] = useState<number>(2);
  const [nightShiftDays, setNightShiftDays] = useState<number>(13);
  const [allowanceAttendance, setAllowanceAttendance] = useState<number>(defaultAttendance);
  const [allowanceLiving, setAllowanceLiving] = useState<number>(defaultLiving);
  const [allowanceTransport, setAllowanceTransport] = useState<number>(defaultMeal);
  const [joiningBonus, setJoiningBonus] = useState<number>(1000000); // Thưởng nóng chia theo tháng

  useEffect(() => {
    if (calculatorSettings && selectedFactoryId === 'custom') {
      setBasicSalary(calculatorSettings.defaultBaseSalary);
      setAllowanceAttendance(calculatorSettings.defaultAttendanceBonus);
      setAllowanceLiving(calculatorSettings.defaultHousingAllowance);
      setAllowanceTransport(calculatorSettings.defaultMealAllowance);
    }
  }, [calculatorSettings, selectedFactoryId]);

  // Handle preset selection
  const handleSelectFactoryPreset = (factoryId: string) => {
    setSelectedFactoryId(factoryId);
    if (factoryId === 'custom') {
      setBasicSalary(defaultBase);
      setAllowanceAttendance(defaultAttendance);
      setAllowanceLiving(defaultLiving);
      setAllowanceTransport(defaultMeal);
      setJoiningBonus(0);
      return;
    }
    const f = factories.find((item) => item.id === factoryId);
    if (f) {
      setBasicSalary(f.basicSalary);
      setAllowanceAttendance(500000);
      setAllowanceLiving(f.allowance > 1200000 ? 1000000 : 600000);
      setAllowanceTransport(400000);
      setJoiningBonus(f.hotBonus ? Math.round(f.hotBonus / 6) : 0);
    }
  };

  // Calculations:
  // Luong 1 gio co ban = basicSalary / (26 * 8)
  const hourlyRate = basicSalary / (workDays * 8);

  // Tien luong tieu chuan
  const standardPay = basicSalary;

  // Tien lam them gio (OT thuong x overtimeRate)
  const totalOtHours = workDays * otHoursPerDay;
  const otPay = totalOtHours * (hourlyRate * overtimeRate);

  // Phu cap ca dem (theo Luat Lao Dong: them nightPercent luong gio)
  // Gia dinh moi ngay dem lam 8 tieng ca dem
  const nightPay = nightShiftDays * 8 * (hourlyRate * nightPercent);

  // Tong phu cap
  const totalAllowances = allowanceAttendance + allowanceLiving + allowanceTransport + joiningBonus;

  // Tong thu nhap uoc tinh
  const totalEstimatedIncome = Math.round(standardPay + otPay + nightPay + totalAllowances);

  const formatVND = (num: number) => {
    return num.toLocaleString('vi-VN') + ' đ';
  };

  const t = {
    vi: {
      badge: 'CÔNG CỤ TIỆN ÍCH DÀNH CHO NGƯỜI LAO ĐỘNG',
      title: 'Bảng Dự Tính Thu Nhập & Tiền Lương Thực Nhận',
      desc: 'Dễ dàng ước tính mức thu nhập thực tế hàng tháng bao gồm Lương cơ bản, Tăng ca (OT), Phụ cấp ca đêm và Thưởng nóng.',
      selectPreset: 'Chọn nhà máy mẫu hoặc tự nhập số liệu:',
      customOption: '-- Tự nhập số liệu tùy chỉnh --',
      basicSalaryLabel: 'Lương cơ bản (đồng/tháng):',
      workDaysLabel: 'Số ngày công chuẩn (ngày):',
      otLabel: 'Số giờ tăng ca trung bình (giờ/ngày):',
      nightShiftLabel: 'Số ngày làm ca đêm trong tháng (ngày):',
      allowanceAttendanceLabel: 'Phụ cấp chuyên cần:',
      allowanceLivingLabel: 'Phụ cấp nhà ở / Ký túc xá:',
      allowanceTransportLabel: 'Phụ cấp đi lại / xăng xe:',
      joiningBonusLabel: 'Thưởng nóng tuyển dụng (chia tháng):',
      resultTitle: 'DỰ TÍNH THU NHẬP CẦM TAY',
      perMonth: '/tháng',
      breakdown: {
        standard: 'Lương thời gian (26 ngày x 8h):',
        ot: `Làm thêm giờ (OT ~${totalOtHours}h x 150%):`,
        night: `Phụ cấp ca đêm (~${nightShiftDays} ngày x 30%):`,
        allowances: 'Tổng phụ cấp & Thưởng chuyên cần:',
        bonus: 'Thưởng tuyển dụng / thưởng nóng:'
      },
      note: '* Mức lương thực tế phụ thuộc vào lịch điều độ sản xuất của xưởng và đánh giá chuyên cần cá nhân.',
      applyCTA: 'Ứng Tuyển Để Nhận Mức Lương Này Ngay'
    },
    zh: {
      badge: '求职员工实用薪酬计算器',
      title: '工厂月度实发工资在线测算',
      desc: '轻松估算每月实际到手收入，包含底薪、加班费 (OT)、夜班补贴与入职热招奖金。',
      selectPreset: '选择参考工厂或自定义输入:',
      customOption: '-- 自定义输入各项数据 --',
      basicSalaryLabel: '基本底薪 (越南盾/月):',
      workDaysLabel: '标准出勤天数 (天):',
      otLabel: '日均加班时长 (小时/天):',
      nightShiftLabel: '月度夜班天数 (天):',
      allowanceAttendanceLabel: '满勤奖金:',
      allowanceLivingLabel: '住房/宿舍补贴:',
      allowanceTransportLabel: '交通交通补贴:',
      joiningBonusLabel: '入职奖励月度分摊:',
      resultTitle: '月度预计实发到手薪资',
      perMonth: '/月',
      breakdown: {
        standard: '基础工资 (26天 x 8小时):',
        ot: `加班费 (约${totalOtHours}小时 x 150%):`,
        night: `夜班津贴 (约${nightShiftDays}天 x 30%):`,
        allowances: '各项津贴与全勤奖:',
        bonus: '入职热招奖励月均分摊:'
      },
      note: '* 实际到手工资视车间订单排产与个人出勤考核而定。',
      applyCTA: '立即报名应聘该薪资岗位'
    },
    en: {
      badge: 'WORKER UTILITY TOOL',
      title: 'Factory Net Take-Home Salary Calculator',
      desc: 'Accurately estimate monthly net income including Base Salary, Overtime (OT), Night-shift differential, and Sign-on Bonuses.',
      selectPreset: 'Select a factory template or enter custom values:',
      customOption: '-- Custom input --',
      basicSalaryLabel: 'Basic Base Salary (VND/month):',
      workDaysLabel: 'Standard Working Days (days):',
      otLabel: 'Average Overtime Hours (hrs/day):',
      nightShiftLabel: 'Night Shift Days (days):',
      allowanceAttendanceLabel: 'Attendance bonus:',
      allowanceLivingLabel: 'Housing allowance:',
      allowanceTransportLabel: 'Transport allowance:',
      joiningBonusLabel: 'Sign-on hot bonus (monthly share):',
      resultTitle: 'ESTIMATED TAKE-HOME NET SALARY',
      perMonth: '/month',
      breakdown: {
        standard: 'Standard work time (26 days x 8h):',
        ot: `Overtime (OT ~${totalOtHours} hrs x 150%):`,
        night: `Night differential (~${nightShiftDays} days x 30%):`,
        allowances: 'Total allowances & attendance:',
        bonus: 'Sign-on recruitment bonus:'
      },
      note: '* Actual income may vary based on factory production scheduling and personal attendance records.',
      applyCTA: 'Apply Now For This Salary'
    }
  }[currentLang];

  return (
    <section id="tinh-luong" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase bg-blue-100 text-blue-800 border border-blue-200 mb-3">
            <Calculator className="w-3.5 h-3.5 text-blue-600" />
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
            <div className="mt-3">
              <SectionEditButton
                sectionTitle="Công Cụ Tính Lương & Nhà Máy"
                onClick={onEditSection}
                isAdminLoggedIn={isAdminLoggedIn}
              />
            </div>
          )}
        </div>

        {/* Calculator layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* Left Column: Input Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200/80">
            {/* Preset select */}
            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t.selectPreset}
              </label>
              <select
                value={selectedFactoryId}
                onChange={(e) => handleSelectFactoryPreset(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="custom">{t.customOption}</option>
                {factories.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.location}) - Lương CB: {(f.basicSalary / 1000000).toFixed(1)}Tr
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Basic Salary */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>{t.basicSalaryLabel}</span>
                  <span className="text-blue-600 font-bold">{formatVND(basicSalary)}</span>
                </label>
                <input
                  type="range"
                  min="4600000"
                  max="8000000"
                  step="100000"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Work days */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>{t.workDaysLabel}</span>
                  <span className="text-blue-600 font-bold">{workDays} ngày</span>
                </label>
                <input
                  type="range"
                  min="22"
                  max="28"
                  step="1"
                  value={workDays}
                  onChange={(e) => setWorkDays(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* OT Hours */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>{t.otLabel}</span>
                  <span className="text-rose-600 font-bold">{otHoursPerDay} h/ngày (~{totalOtHours}h/tháng)</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="0.5"
                  value={otHoursPerDay}
                  onChange={(e) => setOtHoursPerDay(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
              </div>

              {/* Night shift days */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
                  <span>{t.nightShiftLabel}</span>
                  <span className="text-indigo-600 font-bold">{nightShiftDays} đêm</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={nightShiftDays}
                  onChange={(e) => setNightShiftDays(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Allowances section */}
            <div className="mt-6 pt-6 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                Các Khoản Phụ Cấp & Thưởng Chuyên Cần
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-medium">{t.allowanceAttendanceLabel}</span>
                  <span className="font-bold text-slate-800 text-xs">{formatVND(allowanceAttendance)}</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-medium">{t.allowanceLivingLabel}</span>
                  <span className="font-bold text-slate-800 text-xs">{formatVND(allowanceLiving)}</span>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-medium">{t.allowanceTransportLabel}</span>
                  <span className="font-bold text-slate-800 text-xs">{formatVND(allowanceTransport)}</span>
                </div>

                <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 flex items-center justify-between">
                  <span className="text-xs text-amber-800 font-semibold">{t.joiningBonusLabel}</span>
                  <span className="font-bold text-amber-700 text-xs">{formatVND(joiningBonus)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Results Card (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-slate-800 relative overflow-hidden">
            {/* Glowing effect */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="text-xs uppercase tracking-wider font-extrabold text-rose-400 mb-2 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                {t.resultTitle}
              </div>

              {/* Grand Total */}
              <div className="my-4">
                <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                  {formatVND(totalEstimatedIncome)}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Thu nhập thực nhận ước tính {t.perMonth}
                </div>
              </div>

              {/* Line item breakdown */}
              <div className="space-y-3 py-4 my-4 border-y border-slate-800 text-xs text-slate-300">
                <div className="flex justify-between items-center">
                  <span>{t.breakdown.standard}</span>
                  <span className="font-bold text-white">{formatVND(standardPay)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-rose-300">{t.breakdown.ot}</span>
                  <span className="font-bold text-rose-400">+{formatVND(Math.round(otPay))}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-indigo-300">{t.breakdown.night}</span>
                  <span className="font-bold text-indigo-300">+{formatVND(Math.round(nightPay))}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Phụ cấp chuyên cần, nhà ở, xe:</span>
                  <span className="font-bold text-white">+{formatVND(allowanceAttendance + allowanceLiving + allowanceTransport)}</span>
                </div>
                {joiningBonus > 0 && (
                  <div className="flex justify-between items-center text-amber-300">
                    <span>{t.breakdown.bonus}</span>
                    <span className="font-bold">+{formatVND(joiningBonus)}</span>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-slate-400 leading-normal italic mb-6">
                {t.note}
              </p>

              {/* Action Button */}
              <button
                onClick={onOpenApplyModal}
                className="w-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-extrabold py-3.5 px-4 rounded-xl text-sm shadow-xl shadow-rose-950 transition transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{t.applyCTA}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
