# Hướng dẫn nối website với Firebase (để dữ liệu Admin dùng chung cho mọi người)

Website đã được sửa: thay vì lưu dữ liệu Admin (nhà máy, tin tức, cài đặt,
hồ sơ ứng tuyển, yêu cầu doanh nghiệp) trong trình duyệt (localStorage),
giờ dữ liệu được lưu trên **Firebase Firestore** — một cơ sở dữ liệu đám mây
miễn phí của Google. Nhờ vậy, khi bạn thêm/sửa/xóa trong Admin, **mọi người
mở website (trên máy khác, điện thoại khác) đều thấy thay đổi ngay lập tức.**

Làm theo đúng thứ tự các bước dưới đây.

## Bước 1: Tạo dự án Firebase (miễn phí)

1. Vào **console.firebase.google.com**, đăng nhập bằng tài khoản Google.
2. Bấm **"Add project" / "Tạo dự án"**.
3. Đặt tên dự án, ví dụ `vth-nhan-luc`. Bấm Tiếp tục.
4. Ở bước hỏi về Google Analytics, bạn có thể **tắt** (không bắt buộc).
5. Bấm **Create project / Tạo dự án**, chờ vài giây.

## Bước 2: Tạo cơ sở dữ liệu Firestore

1. Trong menu bên trái, vào **Build → Firestore Database**.
2. Bấm **Create database / Tạo cơ sở dữ liệu**.
3. Chọn khu vực gần Việt Nam nhất, ví dụ `asia-southeast1 (Singapore)`.
4. Ở bước chọn chế độ bảo mật, chọn **Start in test mode** (chế độ thử
   nghiệm, dễ dùng khi mới bắt đầu). *Lưu ý: chế độ này cho phép ai cũng
   đọc/ghi được dữ liệu trong 30 ngày đầu — xem mục "Bảo mật" cuối file
   này để khóa lại sau khi mọi thứ đã chạy ổn.*
5. Bấm **Enable / Bật**.

## Bước 3: Lấy thông tin kết nối (config)

1. Bấm biểu tượng **⚙️ (bánh răng)** ở góc trên bên trái → **Project settings**.
2. Kéo xuống mục **"Your apps"**, bấm biểu tượng **`</>`  (Web)**.
3. Đặt tên app, ví dụ `vth-website`, bấm **Register app**.
4. Firebase sẽ hiện ra một đoạn mã như sau — **giữ lại trang này**, bạn sẽ
   cần copy từng giá trị:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "vth-nhan-luc.firebaseapp.com",
  projectId: "vth-nhan-luc",
  storageBucket: "vth-nhan-luc.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

## Bước 4: Điền thông tin vào website

Trong thư mục code của website, có file `.env.example`. Bạn:

1. Tạo một bản sao, đổi tên thành **`.env`** (chỉ khi chạy thử trên máy tính).
2. Dán 6 giá trị ở Bước 3 vào đúng chỗ tương ứng:

```
VITE_FIREBASE_API_KEY="AIzaSy..."
VITE_FIREBASE_AUTH_DOMAIN="vth-nhan-luc.firebaseapp.com"
VITE_FIREBASE_PROJECT_ID="vth-nhan-luc"
VITE_FIREBASE_STORAGE_BUCKET="vth-nhan-luc.appspot.com"
VITE_FIREBASE_MESSAGING_SENDER_ID="123456789"
VITE_FIREBASE_APP_ID="1:123456789:web:abcdef123456"
```

**Khi đưa web lên Vercel hoặc Netlify (chạy thật cho mọi người xem),**
bạn KHÔNG upload file `.env` lên (vì nó không được đưa lên GitHub — đây là
điều nên làm, để bảo mật). Thay vào đó:

- **Vercel:** vào project → **Settings → Environment Variables** → thêm
  từng dòng ở trên (tên biến và giá trị tương ứng) → **Save** → sau đó
  **Redeploy** lại project.
- **Netlify:** vào **Site settings → Environment variables** → làm tương tự.

## Bước 5: Kiểm tra

1. Chạy thử website (hoặc mở bản đã publish).
2. Vào Admin, thêm 1 nhà máy mới.
3. Quay lại **Firebase Console → Firestore Database → Data**, bạn sẽ thấy
   xuất hiện collection `factories` với dữ liệu vừa thêm.
4. Mở website bằng **một thiết bị khác** (điện thoại, mạng 4G) — nếu thấy
   nhà máy vừa thêm, vậy là đã thành công.

## Bảo mật (nên làm sau khi mọi thứ chạy ổn)

Chế độ "test mode" ở Bước 2 cho phép **bất kỳ ai** (không chỉ bạn) có thể
ghi/xóa dữ liệu nếu họ biết cách. Sau khi website chạy ổn, vào
**Firestore Database → Rules**, thay nội dung bằng:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Ai cũng xem được thông tin nhà máy, tin tức, cài đặt (để web hiển thị)
    match /settings/{docId} {
      allow read: if true;
      allow write: if false; // chỉ sửa qua Admin sẽ cần thêm xác thực, xem ghi chú bên dưới
    }
    match /factories/{docId} {
      allow read: if true;
      allow write: if false;
    }
    match /news/{docId} {
      allow read: if true;
      allow write: if false;
    }
    // Hồ sơ ứng tuyển & yêu cầu doanh nghiệp: ai cũng được GỬI (create),
    // nhưng không ai xem/sửa/xóa được từ bên ngoài (chỉ bạn xem qua Admin)
    match /applications/{docId} {
      allow create: if true;
      allow read, update, delete: if false;
    }
    match /employerRequests/{docId} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

*Ghi chú:* khóa `write: if false` như trên sẽ khiến Admin (thêm/sửa/xóa nhà
máy, tin tức...) cũng bị chặn theo, vì hiện tại trang Admin không có hệ
thống đăng nhập thật (mật khẩu chỉ kiểm tra ở trình duyệt, không phải qua
Firebase). Nếu muốn vừa an toàn vừa dùng Admin bình thường, cách đơn giản
nhất là **nhắn cho AI**: "Hãy thêm đăng nhập Firebase Authentication cho
trang Admin, để chỉ tài khoản admin mới sửa được dữ liệu, người khác chỉ
xem được." — đây là bước nên làm nhưng không gấp; có thể để chế độ test
mode thêm một thời gian trong lúc mới vận hành.
