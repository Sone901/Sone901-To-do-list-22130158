# 🚀 Hướng Dẫn Deploy Lên Render

## Bước 1: Upload Code Lên GitHub

Bạn đã có repository: `https://github.com/Sone901/To-do-list-22130158`

### Cách upload (chọn 1 trong 3):

**A. Dùng GitHub Desktop (Dễ nhất):**
1. Tải: https://desktop.github.com
2. Đăng nhập GitHub
3. File → Add Local Repository
4. Chọn thư mục: `d:\Document\web\Todo-List-nodejs-master\Todo-List-nodejs-master`
5. Publish repository
6. Push to GitHub

**B. Dùng Git Command (Nếu đã cài Git):**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Sone901/To-do-list-22130158.git
git push -u origin main
```

**C. Upload thủ công:**
1. Vào https://github.com/Sone901/To-do-list-22130158
2. Add file → Upload files
3. Kéo tất cả file vào (trừ `node_modules/` và `.env`)

## Bước 2: Deploy Lên Render

### 2.1. Tạo tài khoản Render
1. Vào: https://render.com
2. Sign Up (dùng GitHub để dễ dàng)

### 2.2. Tạo Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect GitHub repository: `Sone901/To-do-list-22130158`
3. Cấu hình:
   - **Name**: `todo-list-22130158` (hoặc tên bạn muốn)
   - **Environment**: `Node`
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 2.3. Thêm Environment Variables (QUAN TRỌNG!)
Click **"Advanced"** → **"Add Environment Variable"**, thêm:

```
mongoDbUrl
mongodb+srv://ankitvis609:Sonu135790@cluster0.esi3ulq.mongodb.net/todolistDb

SESSION_SECRET
todo_app_secret_key_2024_secure_random_string

GOOGLE_CLIENT_ID
6924001518-c4q95f9getncrg3t10nv28qod36vv27g.apps.googleusercontent.com

GOOGLE_CLIENT_SECRET
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

PORT
4000

NODE_ENV
production
```

4. Click **"Create Web Service"**

⏳ **Đợi 5-10 phút** để Render build và deploy. Bạn sẽ có URL kiểu:
```
https://todo-list-22130158.onrender.com
```

## Bước 3: Cấu Hình Google OAuth

### 3.1. Vào Google Cloud Console
1. Truy cập: https://console.cloud.google.com/
2. Đăng nhập tài khoản đã tạo OAuth credentials

### 3.2. Thêm Authorized Redirect URI
1. Chọn project của bạn
2. Vào **"APIs & Services"** → **"Credentials"**
3. Click vào **OAuth 2.0 Client ID** của bạn
4. Trong **"Authorized redirect URIs"**, click **"ADD URI"**
5. Thêm URL mới (thay `todo-list-22130158` bằng tên app của bạn):
   ```
   https://todo-list-22130158.onrender.com/auth/google/callback
   ```
6. Click **"SAVE"**

### 3.3. Cấu Hình MongoDB Atlas
1. Vào: https://cloud.mongodb.com/
2. Đăng nhập
3. Chọn Cluster → **"Network Access"**
4. Click **"Add IP Address"**
5. Chọn **"Allow Access From Anywhere"** (0.0.0.0/0)
6. Confirm

## Bước 4: Test App

1. Mở URL Render của bạn: `https://todo-list-22130158.onrender.com`
2. Test các tính năng:
   - ✅ Đăng ký tài khoản mới
   - ✅ Đăng nhập bằng email/password
   - ✅ Đăng nhập bằng Google (OAuth)
   - ✅ Tạo task mới
   - ✅ Edit/Delete task
   - ✅ Search, Filter, Sort
   - ✅ View statistics

## Lưu Ý Quan Trọng ⚠️

### Free Tier của Render:
- ✅ **Ưu điểm**: Miễn phí hoàn toàn, không cần thẻ tín dụng
- ⏱️ **Giới hạn**: App sẽ "ngủ" sau 15 phút không hoạt động
- 🐌 **Khởi động lại**: Mất ~1 phút để wake up khi có người truy cập
- 📊 **Giới hạn**: 750 giờ/tháng (đủ dùng)

### Nếu App "Ngủ":
- Lần đầu truy cập sau khi ngủ sẽ chậm (~30-60 giây)
- Sau đó hoạt động bình thường
- Để giữ app "thức", có thể dùng UptimeRobot để ping mỗi 5 phút

### Bảo Mật:
- ✅ File `.env` đã được exclude khỏi Git
- ✅ Credentials được lưu trên Render (an toàn)
- ✅ Session cookies dùng HTTPS trên production
- ⚠️ **KHÔNG** commit file `.env` lên GitHub!

## Cập Nhật App Sau Này

### Sau khi sửa code:
```bash
git add .
git commit -m "Mô tả thay đổi"
git push origin main
```

Render sẽ **tự động deploy** lại sau mỗi lần push!

## Troubleshooting

### 1. App không chạy
- Check Logs trên Render Dashboard
- Verify environment variables đã nhập đúng
- Check MongoDB connection string

### 2. OAuth không hoạt động
- Verify redirect URI trên Google Console chính xác
- Check GOOGLE_CLIENT_ID và SECRET trên Render
- Test lại sau khi save settings

### 3. Database connection failed
- Verify MongoDB Atlas cho phép IP 0.0.0.0/0
- Check connection string format
- Test connection string locally trước

### 4. App bị "sleep"
- Đây là bình thường với Free tier
- Đợi 30-60 giây cho app wake up
- Hoặc nâng cấp lên Paid plan ($7/tháng)

## Các Platform Khác (Thay Thế)

### Railway (https://railway.app)
- Tương tự Render
- Free $5 credit/tháng
- Không bị sleep

### Heroku (https://heroku.com)
- Trước đây free, giờ phải trả phí
- $5/tháng/app

### Vercel (https://vercel.com)
- Tốt cho Next.js
- Có free tier

## Link Tham Khảo

- 🎥 Video hướng dẫn Render: https://www.youtube.com/results?search_query=deploy+nodejs+render
- 📖 Render Docs: https://render.com/docs
- 🔐 Google OAuth Setup: https://developers.google.com/identity/protocols/oauth2
- 🍃 MongoDB Atlas: https://www.mongodb.com/docs/atlas/

---

**Chúc bạn deploy thành công!** 🎉

Nếu gặp vấn đề, check logs trên Render Dashboard hoặc MongoDB Atlas.
