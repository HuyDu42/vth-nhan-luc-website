/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { AdminBar } from './components/AdminBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { JobFactoryList } from './components/JobFactoryList';
import { SalaryCalculator } from './components/SalaryCalculator';
import { ServicesSection } from './components/ServicesSection';
import { PartnersSection } from './components/PartnersSection';
import { ProcessSection } from './components/ProcessSection';
import { EmployerSection } from './components/EmployerSection';
import { ActivitiesGallery } from './components/ActivitiesGallery';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { NewsSection } from './components/NewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ApplyModal } from './components/ApplyModal';
import { JobDetailModal } from './components/JobDetailModal';
import { EmployerModal } from './components/EmployerModal';
import { AdminModal } from './components/AdminModal';
import { FloatingActions } from './components/FloatingActions';
import { INITIAL_FACTORIES, DEFAULT_SITE_SETTINGS, NEWS_LIST } from './data/mockData';
import { 
  FactoryJob, 
  CandidateApplication, 
  EmployerRequest, 
  Language, 
  SiteSettings, 
  NewsArticle 
} from './types';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('vi');

  // Master Site Settings (All general info, addresses, hero stats, about, services, partners, calculator params)
  // Dữ liệu này giờ lấy từ Firestore (đám mây), không lấy từ trình duyệt nữa,
  // nên mọi người truy cập website đều thấy đúng nội dung mới nhất.
  const [siteSettings, setSiteSettingsLocal] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);

  // News Articles
  const [newsList, setNewsListLocal] = useState<NewsArticle[]>(NEWS_LIST);

  // Factories list state
  const [factories, setFactoriesLocal] = useState<FactoryJob[]>(INITIAL_FACTORIES);

  // Candidate applications state
  const [applications, setApplicationsLocal] = useState<CandidateApplication[]>([]);

  // B2B Employer requests state
  const [employerRequests, setEmployerRequestsLocal] = useState<EmployerRequest[]>([]);

  // Admin authentication state — vẫn lưu trên trình duyệt (mỗi người quản trị
  // tự đăng nhập trên máy của mình, không cần chia sẻ giữa mọi người).
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('vth_admin_logged_in');
      return saved === 'true';
    } catch {
      return false;
    }
  });

  const [adminTab, setAdminTab] = useState<string>('factories');

  useEffect(() => {
    try {
      localStorage.setItem('vth_admin_logged_in', String(isAdminLoggedIn));
    } catch (e) {
      console.error(e);
    }
  }, [isAdminLoggedIn]);

  // ---- Lắng nghe dữ liệu theo thời gian thực từ Firestore ----
  // Bất kỳ ai (kể cả admin trên điện thoại khác) thêm/sửa/xóa, tất cả
  // người đang mở website sẽ tự động thấy thay đổi mà không cần tải lại trang.
  useEffect(() => {
    const unsubSettings = onSnapshot(
      doc(db, 'settings', 'site'),
      (snap) => {
        if (snap.exists()) {
          const parsed = snap.data() as Partial<SiteSettings>;
          setSiteSettingsLocal({
            ...DEFAULT_SITE_SETTINGS,
            ...parsed,
            general: { ...DEFAULT_SITE_SETTINGS.general, ...(parsed.general || {}) },
            hero: { ...DEFAULT_SITE_SETTINGS.hero, ...(parsed.hero || {}) },
            about: { ...DEFAULT_SITE_SETTINGS.about, ...(parsed.about || {}) },
            calculator: { ...DEFAULT_SITE_SETTINGS.calculator, ...(parsed.calculator || {}) },
            offices: parsed.offices || DEFAULT_SITE_SETTINGS.offices,
            services: parsed.services || DEFAULT_SITE_SETTINGS.services,
            partners: parsed.partners || DEFAULT_SITE_SETTINGS.partners,
            testimonials: parsed.testimonials || DEFAULT_SITE_SETTINGS.testimonials,
            gallery: parsed.gallery || DEFAULT_SITE_SETTINGS.gallery,
            processSteps: parsed.processSteps || DEFAULT_SITE_SETTINGS.processSteps,
          });
        } else {
          // Chưa có dữ liệu trên đám mây (lần đầu chạy) -> khởi tạo bằng dữ liệu mặc định
          setDoc(doc(db, 'settings', 'site'), DEFAULT_SITE_SETTINGS).catch((e) =>
            console.error('Lỗi khởi tạo cài đặt:', e)
          );
        }
      },
      (err) => console.error('Lỗi tải cài đặt từ Firestore:', err)
    );

    const unsubFactories = onSnapshot(
      collection(db, 'factories'),
      (snap) => {
        if (snap.empty) {
          setFactoriesLocal(INITIAL_FACTORIES);
        } else {
          setFactoriesLocal(
            snap.docs.map((d) => ({ ...(d.data() as FactoryJob), id: d.id }))
          );
        }
      },
      (err) => console.error('Lỗi tải danh sách nhà máy từ Firestore:', err)
    );

    const unsubNews = onSnapshot(
      collection(db, 'news'),
      (snap) => {
        if (snap.empty) {
          setNewsListLocal(NEWS_LIST);
        } else {
          setNewsListLocal(
            snap.docs.map((d) => ({ ...(d.data() as NewsArticle), id: d.id }))
          );
        }
      },
      (err) => console.error('Lỗi tải tin tức từ Firestore:', err)
    );

    const unsubApplications = onSnapshot(
      collection(db, 'applications'),
      (snap) => {
        setApplicationsLocal(
          snap.docs.map((d) => ({ ...(d.data() as CandidateApplication), id: d.id }))
        );
      },
      (err) => console.error('Lỗi tải hồ sơ ứng tuyển từ Firestore:', err)
    );

    const unsubRequests = onSnapshot(
      collection(db, 'employerRequests'),
      (snap) => {
        setEmployerRequestsLocal(
          snap.docs.map((d) => ({ ...(d.data() as EmployerRequest), id: d.id }))
        );
      },
      (err) => console.error('Lỗi tải yêu cầu doanh nghiệp từ Firestore:', err)
    );

    return () => {
      unsubSettings();
      unsubFactories();
      unsubNews();
      unsubApplications();
      unsubRequests();
    };
  }, []);

  // Filter state for Jobs
  const [filterKeyword, setFilterKeyword] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterRegion, setFilterRegion] = useState('all');

  // Modal triggers
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isJobDetailModalOpen, setIsJobDetailModalOpen] = useState(false);
  const [isEmployerModalOpen, setIsEmployerModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminOpenAddFactory, setAdminOpenAddFactory] = useState(false);
  const [selectedJob, setSelectedJob] = useState<FactoryJob | null>(null);

  // Handlers
  const handleHeroSearch = (keyword: string, location: string, region: string) => {
    setFilterKeyword(keyword);
    setFilterLocation(location);
    setFilterRegion(region);
  };

  const handleResetFilters = () => {
    setFilterKeyword('');
    setFilterLocation('all');
    setFilterRegion('all');
  };

  const handleOpenJobDetail = (job: FactoryJob) => {
    setSelectedJob(job);
    setIsJobDetailModalOpen(true);
  };

  const handleOpenApplyForJob = (job: FactoryJob) => {
    setSelectedJob(job);
    setIsApplyModalOpen(true);
  };

  // Ghi cài đặt tổng (thông tin chung, hero, giới thiệu, dịch vụ, đối tác...)
  // lên Firestore. Mọi người truy cập sẽ thấy thay đổi gần như ngay lập tức.
  const setSiteSettings = (newSettings: SiteSettings) => {
    setDoc(doc(db, 'settings', 'site'), newSettings).catch((e) =>
      console.error('Lỗi lưu cài đặt:', e)
    );
  };

  const handleApplySuccess = (appData: Omit<CandidateApplication, 'id' | 'createdAt' | 'status'>) => {
    addDoc(collection(db, 'applications'), {
      ...appData,
      createdAt: new Date().toLocaleString('vi-VN'),
      status: 'pending',
    }).catch((e) => console.error('Lỗi gửi hồ sơ ứng tuyển:', e));
  };

  const handleAddEmployerRequest = (reqData: Omit<EmployerRequest, 'id' | 'createdAt' | 'status'>) => {
    addDoc(collection(db, 'employerRequests'), {
      ...reqData,
      createdAt: new Date().toLocaleString('vi-VN'),
      status: 'new',
    }).catch((e) => console.error('Lỗi gửi yêu cầu doanh nghiệp:', e));
  };

  const handleSaveFactory = (updatedFactory: FactoryJob) => {
    setDoc(doc(db, 'factories', updatedFactory.id), updatedFactory).catch((e) =>
      console.error('Lỗi lưu nhà máy:', e)
    );
  };

  const handleDeleteFactory = (id: string) => {
    deleteDoc(doc(db, 'factories', id)).catch((e) => console.error('Lỗi xóa nhà máy:', e));
  };

  const handleSaveNews = (updatedNews: NewsArticle) => {
    setDoc(doc(db, 'news', updatedNews.id), updatedNews).catch((e) =>
      console.error('Lỗi lưu tin tức:', e)
    );
  };

  const handleDeleteNews = (id: string) => {
    deleteDoc(doc(db, 'news', id)).catch((e) => console.error('Lỗi xóa tin tức:', e));
  };

  const handleUpdateApplicationStatus = (id: string, status: CandidateApplication['status']) => {
    updateDoc(doc(db, 'applications', id), { status }).catch((e) =>
      console.error('Lỗi cập nhật trạng thái hồ sơ:', e)
    );
  };

  const handleDeleteApplication = (id: string) => {
    deleteDoc(doc(db, 'applications', id)).catch((e) => console.error('Lỗi xóa hồ sơ:', e));
  };

  const handleDeleteEmployerRequest = (id: string) => {
    deleteDoc(doc(db, 'employerRequests', id)).catch((e) =>
      console.error('Lỗi xóa yêu cầu doanh nghiệp:', e)
    );
  };

  const handleOpenAdminWithTab = (tab: string) => {
    setAdminTab(tab);
    if (tab === 'factories_add') {
      setAdminOpenAddFactory(true);
    } else {
      setAdminOpenAddFactory(false);
    }
    setIsAdminModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* 0. Sticky Admin Bar for Live Direct Website Editing */}
      <AdminBar
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminTab={handleOpenAdminWithTab}
        onLogout={() => setIsAdminLoggedIn(false)}
        onLogin={() => {
          setIsAdminLoggedIn(true);
          setIsAdminModalOpen(true);
        }}
      />

      {/* 1. Header Navigation */}
      <Header
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onOpenApplyModal={() => {
          setSelectedJob(null);
          setIsApplyModalOpen(true);
        }}
        onOpenEmployerModal={() => setIsEmployerModalOpen(true)}
        onOpenAdminModal={() => handleOpenAdminWithTab('dashboard')}
        generalSettings={siteSettings.general}
        isAdminLoggedIn={isAdminLoggedIn}
        onEditSection={() => handleOpenAdminWithTab('general')}
      />

      {/* 2. Hero Section with Realtime Search */}
      <Hero
        currentLang={currentLang}
        onSearch={handleHeroSearch}
        onOpenApplyModal={() => {
          setSelectedJob(null);
          setIsApplyModalOpen(true);
        }}
        onOpenEmployerModal={() => setIsEmployerModalOpen(true)}
        heroSettings={siteSettings.hero}
        isAdminLoggedIn={isAdminLoggedIn}
        onEditSection={() => handleOpenAdminWithTab('hero')}
        hotline={siteSettings.general.hotline}
      />

      {/* 3. Hot Recruiting Factories & Jobs List */}
      <JobFactoryList
        factories={factories}
        currentLang={currentLang}
        onSelectJob={handleOpenJobDetail}
        onApplyJob={handleOpenApplyForJob}
        activeFilterRegion={filterRegion}
        activeFilterLocation={filterLocation}
        activeFilterKeyword={filterKeyword}
        onResetFilters={handleResetFilters}
        onOpenAdminAddFactory={() => handleOpenAdminWithTab('factories_add')}
        isAdminLoggedIn={isAdminLoggedIn}
        onEditSection={() => handleOpenAdminWithTab('factories')}
      />

      {/* 4. Interactive Net Take-Home Salary Calculator */}
      <SalaryCalculator
        factories={factories}
        currentLang={currentLang}
        onOpenApplyModal={() => {
          setSelectedJob(null);
          setIsApplyModalOpen(true);
        }}
        calculatorSettings={siteSettings.calculator}
        isAdminLoggedIn={isAdminLoggedIn}
        onEditSection={() => handleOpenAdminWithTab('calculator')}
      />

      {/* 5. Comprehensive Staffing & Labor Services */}
      <ServicesSection
        currentLang={currentLang}
        onOpenEmployerModal={() => setIsEmployerModalOpen(true)}
        services={siteSettings.services}
        isAdminLoggedIn={isAdminLoggedIn}
        onEditSection={() => handleOpenAdminWithTab('services')}
        hotline={siteSettings.general.hotline}
      />

      {/* 6. Corporate Enterprise Clients & Strategic Partners */}
      <PartnersSection
        currentLang={currentLang}
        partners={siteSettings.partners || []}
        isAdminLoggedIn={isAdminLoggedIn}
        onEditSection={() => handleOpenAdminWithTab('partners')}
        onOpenEmployerModal={() => setIsEmployerModalOpen(true)}
      />

      {/* 7. Standard 5-Step Operating Workflow */}
      <ProcessSection 
        currentLang={currentLang} 
        processSteps={siteSettings.processSteps}
        isAdminLoggedIn={isAdminLoggedIn}
        onEditSection={() => handleOpenAdminWithTab('process')}
      />

      {/* 8. Corporate B2B Staffing Portal */}
      <EmployerSection
        currentLang={currentLang}
        onAddEmployerRequest={handleAddEmployerRequest}
        isAdminLoggedIn={isAdminLoggedIn}
        onEditSection={() => handleOpenAdminWithTab('employers')}
        hotline={siteSettings.general.hotline}
      />

      {/* 9. On-site Activities Photo Gallery with Lightbox */}
      <ActivitiesGallery 
        currentLang={currentLang} 
        gallery={siteSettings.gallery}
        isAdminLoggedIn={isAdminLoggedIn}
        onEditSection={() => handleOpenAdminWithTab('gallery')}
      />

      {/* 10. About HCM / VTH Nhan Luc Profile & Legal Licenses */}
      <AboutSection 
        currentLang={currentLang} 
        aboutSettings={siteSettings.about}
        isAdminLoggedIn={isAdminLoggedIn}
        onEditSection={() => handleOpenAdminWithTab('about')}
      />

      {/* 11. Worker and Factory Testimonials */}
      <TestimonialsSection 
        currentLang={currentLang} 
        testimonials={siteSettings.testimonials}
        isAdminLoggedIn={isAdminLoggedIn}
        onEditSection={() => handleOpenAdminWithTab('testimonials')}
      />

      {/* 12. Labor News, Recruitment Surges & Interview Guides */}
      <NewsSection 
        currentLang={currentLang} 
        newsList={newsList}
        isAdminLoggedIn={isAdminLoggedIn}
        onEditSection={() => handleOpenAdminWithTab('news')}
      />

      {/* 13. Office Locations & Contact Form */}
      <ContactSection 
        currentLang={currentLang} 
        offices={siteSettings.offices}
        general={siteSettings.general}
        isAdminLoggedIn={isAdminLoggedIn}
        onEditSection={() => handleOpenAdminWithTab('offices')}
      />

      {/* 14. Comprehensive Footer */}
      <Footer
        currentLang={currentLang}
        onOpenAdminModal={() => handleOpenAdminWithTab('dashboard')}
        onOpenApplyModal={() => {
          setSelectedJob(null);
          setIsApplyModalOpen(true);
        }}
        onOpenEmployerModal={() => setIsEmployerModalOpen(true)}
        general={siteSettings.general}
        isAdminLoggedIn={isAdminLoggedIn}
        onEditSection={() => handleOpenAdminWithTab('general')}
      />

      {/* Floating Action Buttons */}
      <FloatingActions
        onOpenApplyModal={() => {
          setSelectedJob(null);
          setIsApplyModalOpen(true);
        }}
      />

      {/* MODALS */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        selectedJob={selectedJob}
        factories={factories}
        currentLang={currentLang}
        onApplySuccess={handleApplySuccess}
      />

      <JobDetailModal
        job={selectedJob}
        onClose={() => setIsJobDetailModalOpen(false)}
        onApply={(job) => {
          setSelectedJob(job);
          setIsApplyModalOpen(true);
        }}
        currentLang={currentLang}
      />

      <EmployerModal
        isOpen={isEmployerModalOpen}
        onClose={() => setIsEmployerModalOpen(false)}
        currentLang={currentLang}
        onAddEmployerRequest={handleAddEmployerRequest}
      />

      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          setAdminOpenAddFactory(false);
        }}
        isAuthenticated={isAdminLoggedIn}
        onAuthenticate={setIsAdminLoggedIn}
        initialTab={adminTab}
        initialOpenAddFactory={adminOpenAddFactory}
        siteSettings={siteSettings}
        onUpdateSiteSettings={setSiteSettings}
        factories={factories}
        newsList={newsList}
        applications={applications}
        employerRequests={employerRequests}
        onSaveFactory={handleSaveFactory}
        onDeleteFactory={handleDeleteFactory}
        onSaveNews={handleSaveNews}
        onDeleteNews={handleDeleteNews}
        onUpdateApplicationStatus={handleUpdateApplicationStatus}
        onDeleteApplication={handleDeleteApplication}
        onDeleteEmployerRequest={handleDeleteEmployerRequest}
      />
    </div>
  );
}
