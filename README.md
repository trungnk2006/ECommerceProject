# ECommerce - Dự án Thương mại điện tử

Đây là dự án ECommerce (giao diện tĩnh + backend) được tổ chức trong thư mục `ECommerce`.
Mục tiêu: một trang mua sắm đơn giản với chức năng đăng ký/đăng nhập người dùng và quản lý giỏ hàng.

---

## Tổng quan cấu trúc

- `F4-JS-Project-20242-05/` - Frontend tĩnh (HTML/CSS/JS) cho giao diện sản phẩm, đăng nhập, đăng ký, giỏ hàng.
- `Back-end/` - Backend Node.js (Express) + MongoDB để lưu thông tin người dùng và giỏ hàng.

---

## Backend - nơi lưu trữ và công nghệ

Backend nằm ở `ECommerce/Back-end`.
- Framework: Express (Node.js)
- Database: MongoDB (sử dụng `mongoose` từ package.json)
- Kết nối MongoDB được cấu hình qua biến môi trường `MONGO_URI` (vì vậy dữ liệu được lưu trong cơ sở dữ liệu MongoDB mà bạn cung cấp — có thể là MongoDB Atlas hoặc một instance MongoDB local).

Tóm tắt tệp chính trong `Back-end`:
- `index.js` - entrypoint của server Express. Kết nối tới MongoDB bằng `mongoose.connect(process.env.MONGO_URI)`.
- `model/userModel.js` - định nghĩa schema `User` (username, password, cart).
- `controller/userCtrl.js` - logic xử lý: `login`, `register`, `addToCart`, `removeFromCart`, `getUserById`, `update-info`, `update-order-in-cart`.
- `router/userRoute.js` - định tuyến REST API cho các endpoint liên quan tới người dùng.

Vì backend dùng `process.env.MONGO_URI`, dữ liệu được lưu ở nơi bạn cấu hình (ví dụ: MongoDB Atlas hoặc MongoDB chạy tại `mongodb://localhost:27017/tên_db`).

---

## API chính

Base URL: http://localhost:5000 (mặc định server chạy cổng 5000 trừ khi đặt `PORT` khác)

Endpoints:
- POST /user/login
  - Body: { username, password }
  - Mục đích: kiểm tra tài khoản và trả về user nếu hợp lệ.

- POST /user/register
  - Body: { username, password }
  - Mục đích: tạo tài khoản mới.

- POST /user/add-to-cart
  - Body: { userId, product }
  - Mục đích: thêm sản phẩm vào giỏ (product chứa { productId, quantity }).

- PATCH /user/remove-from-cart
  - Body: { userId, productId }
  - Mục đích: xóa sản phẩm khỏi giỏ hàng.

- GET /user/get-info/:userId
  - Mục đích: lấy thông tin người dùng theo ID.

- PATCH /user/update-info
  - Body: user object (bao gồm _id)
  - Mục đích: cập nhật thông tin người dùng.

- PATCH /user/update-order-in-cart
  - Body: { userId, product }
  - Mục đích: cập nhật số lượng cho 1 sản phẩm trong giỏ hoặc thêm mới nếu chưa tồn tại.

---

## Cài đặt & Chạy (Backend)

1) Mở terminal (PowerShell) và chuyển tới thư mục backend:

```powershell
cd "C:\Users\nguye\WebstormProjects\JSProject\ECommerce\Back-end"
```

2) Cài dependencies:

```powershell
npm install
```

3) Cấu hình biến môi trường

Tạo file `.env` trong `Back-end` (khuyến nghị). Ví dụ `.env`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
```

Thay `MONGO_URI` bằng chuỗi kết nối tới MongoDB của bạn (MongoDB Atlas hoặc local).

4) Chạy server:

```powershell
node index.js
```

Bạn sẽ thấy log `MongoDB connected` và `Server running on http://localhost:5000` nếu mọi thứ OK.

---

## Chạy Frontend

Frontend có thể được mở trực tiếp bằng trình duyệt từ thư mục `F4-JS-Project-20242-05` (mở `index.html`) hoặc bạn có thể phục vụ các file tĩnh bằng một server tĩnh.

Nếu bạn dùng VSCode/Live Server hoặc mở tệp `index.html` bằng trình duyệt, hãy đảm bảo backend đang chạy và endpoint CORS trong `index.js` hiện đang cho phép origin `http://127.0.0.1:5500` (được cấu hình sẵn). Nếu bạn mở frontend từ khác origin, cập nhật cấu hình CORS trong `Back-end/index.js`.

---

## Environment variables

- MONGO_URI - (bắt buộc) chuỗi kết nối tới MongoDB.
- PORT - (tùy chọn) cổng server (mặc định 5000).