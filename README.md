# Tuan Portfolio

Dự án **Tuan Portfolio** là một ứng dụng web Fullstack cá nhân được xây dựng để giới thiệu bản thân, kỹ năng và các dự án đã thực hiện. Hệ thống bao gồm trang public cho khách truy cập và trang Admin Dashboard để quản lý nội dung động.

---

## 1. Mục Đích Thiết Kế

*   **Giới thiệu bản thân:** Cung cấp thông tin chi tiết về profile, kinh nghiệm và kỹ năng.
*   **Showcase dự án:** Trưng bày các dự án cá nhân kèm theo hình ảnh, mô tả và liên kết (GitHub, Live demo).
*   **Tương tác:** Cho phép người xem gửi tin nhắn liên hệ trực tiếp thông qua form.
*   **Quản trị linh hoạt:** Cung cấp giao diện Admin Dashboard bảo mật để chủ sở hữu có thể thêm, sửa, xóa các thông tin (Profile, Skills, Projects) và xem tin nhắn mà không cần can thiệp vào code.

---

## 2. Công Nghệ Sử Dụng

### Backend (Server-side)
*   **Language:** Java 21
*   **Framework:** Spring Boot 3.2.4
*   **Database Interaction:** Spring Data JPA (Hibernate)
*   **Security:** Spring Security & JWT (JSON Web Token)
*   **Build Tool:** Maven

### Frontend (Client-side)
*   **Language:** JavaScript / TypeScript
*   **Framework:** React 19
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS 4
*   **Icons:** Lucide React
*   **State & HTTP Client:** React Hooks, Axios
*   **UI Libraries:** (Các component tự xây dựng hoặc sử dụng thư viện nhẹ)

### Database
*   **RDBMS:** MySQL
*   **Driver:** MySQL Connector/J

---

## 3. Database Schema

Hệ thống sử dụng cơ sở dữ liệu MySQL với tên database `portfolio_db`. Dưới đây là các bảng chính:

### a. Bảng `profiles`
Lưu trữ thông tin cá nhân hiển thị trên trang chủ và trang About.
*   `id` (PK): ID tự tăng.
*   `full_name`: Tên đầy đủ.
*   `title`: Chức danh (ví dụ: Fullstack Developer).
*   `birth_date`: Ngày sinh.
*   `education`: Thông tin học vấn.
*   `address`: Địa chỉ.
*   `about_me`: Đoạn văn giới thiệu bản thân (TEXT).
*   `github_url`: Link GitHub.
*   `linkedin_url`: Link LinkedIn.

### b. Bảng `projects`
Lưu trữ danh sách các dự án đã thực hiện.
*   `id` (PK): ID tự tăng.
*   `name`: Tên dự án.
*   `description`: Mô tả chi tiết dự án (TEXT).
*   `tech_stack`: Các công nghệ sử dụng trong dự án.
*   `image_url`: Link ảnh minh họa dự án.
*   `github_url`: Link source code.
*   `live_url`: Link demo sản phẩm.
*   `created_at`: Ngày tạo (tự động).

### c. Bảng `skills`
Lưu trữ các kỹ năng chuyên môn.
*   `id` (PK): ID tự tăng.
*   `name`: Tên kỹ năng (Java, React, SQL...).
*   `category`: Phân loại kỹ năng (Frontend, Backend, Tools...).

### d. Bảng `messages`
Lưu trữ tin nhắn từ form liên hệ.
*   `id` (PK): ID tự tăng.
*   `sender_name`: Tên người gửi.
*   `sender_email`: Email người gửi.
*   `content`: Nội dung tin nhắn (TEXT).
*   `is_read`: Trạng thái đã đọc (Boolean).
*   `created_at`: Thời gian gửi (tự động).

**Lưu ý:** Hệ thống hiện tại **không sử dụng bảng User** trong database để quản lý đăng nhập. Tài khoản Admin được cấu hình **In-Memory** cứng trong code (xem mục Cấu hình bên dưới).

---

## 4. Cấu Trúc Thư Mục

Cấu trúc dự án được chia làm 2 phần chính: `backend` và `frontend`.

```
tuan-portfolio/
├── backend/                        # Mã nguồn Backend (Spring Boot)
│   └── portfolio/
│       ├── pom.xml                 # Cấu hình dependencies Maven
│       └── src/
│           ├── main/
│           │   ├── java/com/tuan/portfolio/
│           │   │   ├── config/     # Cấu hình Security (SecurityConfig.java), CORS
│           │   │   ├── controller/ # API Controllers (AuthController, ProjectController...)
│           │   │   ├── dto/        # Data Transfer Objects (Request/Response)
│           │   │   ├── entity/     # JPA Entities (Project, Profile, Skill, Message)
│           │   │   ├── repository/ # Data Access Layer (JPA Repositories)
│           │   │   ├── security/   # JWT Authentication Filter & Provider
│           │   │   └── service/    # Business Logic (nếu có tách biệt)
│           │   └── resources/
│           │       └── application.yaml # Cấu hình Database, Server Port, JWT Secret
│
├── frontend/                       # Mã nguồn Frontend (React + Vite)
│   ├── index.html
│   ├── package.json                # Dependencies Frontend
│   ├── vite.config.ts              # Cấu hình Vite
│   ├── tailwind.config.js          # Cấu hình Tailwind CSS (nếu có file riêng hoặc tích hợp)
│   └── src/
│       ├── api/                    # Cấu hình Axios (axios.js)
│       ├── assets/                 # Hình ảnh, icons (hero.png...)
│       ├── components/             # React Components
│       │   ├── admin/              # Các component cho trang Admin (Dashboard, Messages...)
│       │   ├── Hero.jsx            # Banner trang chủ
│       │   ├── ProjectList.jsx     # Danh sách dự án
│       │   ├── ContactForm.jsx     # Form liên hệ
│       │   └── ...
│       ├── App.jsx                 # Component gốc, cấu hình Routing
│       └── main.tsx                # Entry point
```

---

## 5. Hướng Dẫn Cài Đặt & Chạy Dự Án

### Yêu cầu
*   Java JDK 21
*   Node.js (v18 trở lên)
*   MySQL Server

### Bước 1: Cấu hình Database
1.  Tạo database MySQL tên `portfolio_db`.
2.  Mở file `backend/portfolio/src/main/resources/application.yaml`.
3.  Cập nhật `username` và `password` khớp với cấu hình MySQL của bạn:
    ```yaml
    spring:
      datasource:
        url: jdbc:mysql://localhost:3306/portfolio_db...
        username: root
        password: YOUR_PASSWORD
    ```

### Bước 2: Chạy Backend
1.  Mở terminal tại thư mục `backend/portfolio`.
2.  Chạy lệnh:
    ```bash
    ./mvnw spring-boot:run
    ```
    (Trên Windows dùng `mvnw.cmd spring-boot:run`)
3.  Backend sẽ khởi chạy tại `http://localhost:8080`.

### Bước 3: Chạy Frontend
1.  Mở terminal mới tại thư mục `frontend`.
2.  Cài đặt dependencies:
    ```bash
    npm install
    ```
3.  Chạy server development:
    ```bash
    npm run dev
    ```
4.  Truy cập ứng dụng tại `http://localhost:5173`.

### Tài Khoản Admin Mặc Định
Để truy cập vào trang Admin (`/login`), sử dụng tài khoản sau:
*   **Username:** `tuan123`
*   **Password:** `Tuan@123`

---

## 6. API References

Các endpoints chính (Prefix: `/api`):

*   **Auth:**
    *   `POST /auth/login`: Đăng nhập lấy Token.
*   **Projects:**
    *   `GET /projects`: Lấy danh sách dự án (Public).
    *   `POST /projects`: Thêm dự án (Admin).
    *   `PUT /projects/{id}`: Sửa dự án (Admin).
    *   `DELETE /projects/{id}`: Xóa dự án (Admin).
*   **Skills:**
    *   `GET /skills`: Lấy danh sách kỹ năng (Public).
    *   `POST /skills`: Thêm kỹ năng (Admin).
    *   `DELETE /skills/{id}`: Xóa kỹ năng (Admin).
*   **Profile:**
    *   `GET /profile`: Lấy thông tin profile (Public).
    *   `PUT /profile`: Cập nhật profile (Admin).
*   **Messages:**
    *   `POST /messages`: Gửi tin nhắn (Public).
    *   `GET /messages`: Xem danh sách tin nhắn (Admin).
    *   `PUT /messages/{id}/read`: Đánh dấu đã đọc (Admin).
