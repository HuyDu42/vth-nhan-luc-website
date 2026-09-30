/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Cấu hình kết nối Firebase. Các giá trị được lấy từ biến môi trường
// (xem file .env.example) để không lộ thông tin khi đưa code lên GitHub.
// Sau khi tạo dự án Firebase, dán các giá trị tương ứng vào file .env
// (khi chạy trên máy) hoặc vào phần "Environment Variables" của
// Vercel/Netlify (khi triển khai thật) — xem hướng dẫn trong FIREBASE-SETUP.md
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// db dùng để đọc/ghi dữ liệu (nhà máy, tin tức, cài đặt, hồ sơ ứng tuyển...)
// theo thời gian thực — mọi người truy cập website đều thấy cùng một dữ liệu.
export const db = getFirestore(app);

// auth dùng để đăng nhập Admin thật (email + mật khẩu tạo trong Firebase
// Console > Authentication), thay cho mật khẩu viết cứng trong code trước đây.
export const auth = getAuth(app);
