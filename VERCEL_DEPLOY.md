# 🚀 Hướng Dẫn Deploy Lên Vercel

## Bước 1: Upload Code Lên GitHub

### Cách 1: Dùng GitHub Desktop (Dễ nhất - KHUYÊN DÙNG)

1. **Tải GitHub Desktop**: https://desktop.github.com
2. **Cài đặt và đăng nhập** tài khoản GitHub
3. **File → Add Local Repository**
4. **Chọn thư mục**: `d:\Document\web\Todo-List-nodejs-master\Todo-List-nodejs-master`
5. Click **"Publish repository"**
6. Chọn repository: **To-do-list-22130158**
7. ✅ **Bỏ check** "Keep this code private" (để public)
8. Click **"Publish repository"**

✅ **Xong!** Code đã lên GitHub.

### Cách 2: Upload Thủ Công

1. Vào: https://github.com/Sone901/To-do-list-22130158
2. Click **"uploading an existing file"** hoặc **"Add file → Upload files"**
3. **Kéo tất cả files vào** (trừ folder `node_modules/`)
4. **Quan trọng**: KHÔNG upload file `.env` 
5. Click **"Commit changes"**

---

## Bước 2: Deploy Lên Vercel

### 2.1. Tạo Tài Khoản Vercel

1. Vào: https://vercel.com
2. Click **"Sign Up"**
3. Chọn **"Continue with GitHub"** (dễ nhất)
4. Authorize Vercel truy cập GitHub

### 2.2. Import Project

1. Trên Vercel Dashboard, click **"Add New... → Project"**
2. Tìm repository: **To-do-list-22130158**
3. Click **"Import"**

### 2.3. Cấu Hình Project

**Configure Project:**
- **Framework Preset**: Other
- **Root Directory**: `./`
- **Build Command**: (để trống hoặc `npm install`)
- **Output Directory**: (để trống)
- **Install Command**: `npm install`

### 2.4. Thêm Environment Variables (QUAN TRỌNG!)

Click **"Environment Variables"**, thêm từng biến:

**Variable 1:**
```
Name: mongoDbUrl
Value: mongodb+srv://ankitvis609:Sonu135790@cluster0.esi3ulq.mongodb.net/todolistDb
```

**Variable 2:**
```
Name: SESSION_SECRET
Value: vercel_todo_app_secret_key_2024_secure
```

**Variable 3:**
```
Name: GOOGLE_CLIENT_ID
Value: 6924001518-c4q95f9getncrg3t10nv28qod36vv27g.apps.googleusercontent.com
```

**Variable 4:**
```
Name: GOOGLE_CLIENT_SECRET
Value: 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
```

**Variable 5:**
```
Name: NODE_ENV
Value: production
```

### 2.5. Deploy

1. Click **"Deploy"**
2. ⏳ Đợi 2-5 phút Vercel build và deploy
3. ✅ Khi xong, bạn sẽ có URL kiểu:

```
https://to-do-list-22130158.vercel.app
```

hoặc

```
https://to-do-list-22130158-sone901.vercel.app
```

---

## Bước 3: Cấu Hình Google OAuth

**⚠️ QUAN TRỌNG** - OAuth sẽ không hoạt động nếu bỏ qua bước này!

### 3.1. Vào Google Cloud Console

1. Truy cập: https://console.cloud.google.com/
2. Đăng nhập tài khoản Google đã tạo OAuth credentials

### 3.2. Thêm Authorized Redirect URI

1. Chọn project của bạn (hoặc tạo project mới)
2. Vào **Menu (≡) → APIs & Services → Credentials**
3. Tìm **OAuth 2.0 Client IDs** trong danh sách
4. Click vào **OAuth 2.0 Client** của bạn (hoặc tạo mới nếu chưa có)

### 3.3. Thêm URIs

Trong **"Authorized redirect URIs"**, click **"+ ADD URI"** và thêm:

**URI 1** (thay tên domain của bạn):
```
https://to-do-list-22130158.vercel.app/auth/google/callback
```

**URI 2** (nếu có custom domain):
```
https://to-do-list-22130158-sone901.vercel.app/auth/google/callback
```

**URI 3** (giữ lại cho local development):
```
http://localhost:4000/auth/google/callback
```

6. Click **"SAVE"**

### 3.4. Xác Nhận Thông Tin

Đảm bảo:
- ✅ **Client ID** trên Google Console khớp với Vercel
- ✅ **Client Secret** trên Google Console khớp với Vercel
- ✅ **Redirect URIs** có domain chính xác

---

## Bước 4: Cấu Hình MongoDB Atlas

### 4.1. Cho Phép Truy Cập Từ Mọi IP

1. Vào: https://cloud.mongodb.com/
2. Đăng nhập
3. Chọn **Cluster** của bạn
4. Vào tab **"Network Access"** (bên trái)
5. Click **"+ ADD IP ADDRESS"**
6. Chọn **"ALLOW ACCESS FROM ANYWHERE"**
7. IP sẽ là: `0.0.0.0/0`
8. Click **"Confirm"**

⚠️ **Lưu ý**: Để bảo mật hơn, có thể whitelist IP của Vercel, nhưng phức tạp hơn.

---

## Bước 5: Test Ứng Dụng

1. Mở URL Vercel của bạn: `https://to-do-list-22130158.vercel.app`

2. **Test các tính năng:**
   - ✅ Trang chủ load được
   - ✅ Đăng ký tài khoản mới
   - ✅ Đăng nhập bằng email/password
   - ✅ Đăng nhập bằng Google OAuth
   - ✅ Tạo task mới
   - ✅ Edit/Delete task
   - ✅ Search tasks
   - ✅ Filter theo category
   - ✅ Sort tasks
   - ✅ Xem statistics
   - ✅ Upload avatar
   - ✅ Mark completed/pending

---

## Ưu Điểm Của Vercel

✅ **Miễn phí hoàn toàn**
✅ **Không cần thẻ tín dụng**
✅ **Tự động deploy** khi push code mới lên GitHub
✅ **HTTPS tự động** (SSL certificate miễn phí)
✅ **CDN toàn cầu** - load nhanh
✅ **Không bị sleep** như Render free tier
✅ **URL đẹp**: `.vercel.app`
✅ **Logs và monitoring** real-time

---

## Cập Nhật Ứng Dụng

Sau này khi bạn sửa code:

### Cách 1: Dùng GitHub Desktop
1. Mở GitHub Desktop
2. Xem changes ở tab **"Changes"**
3. Nhập commit message
4. Click **"Commit to main"**
5. Click **"Push origin"**

**→ Vercel tự động deploy lại sau vài giây!**

### Cách 2: Dùng Git Command
```bash
git add .
git commit -m "Mô tả thay đổi"
git push origin main
```

### Theo Dõi Deploy
1. Vào Vercel Dashboard
2. Xem tab **"Deployments"**
3. Click vào deployment đang chạy để xem logs

---

## Troubleshooting (Xử Lý Lỗi)

### 1. **App không chạy / 404 Error**

**Nguyên nhân**: Vercel không tìm thấy entry point

**Giải pháp**:
- Verify file `vercel.json` tồn tại
- Verify file `index.js` có `module.exports = app;`
- Check Vercel logs: Dashboard → Deployment → Logs

### 2. **Database Connection Failed**

**Nguyên nhân**: MongoDB không cho phép kết nối

**Giải pháp**:
- Vào MongoDB Atlas → Network Access
- Thêm IP `0.0.0.0/0` (Allow All)
- Check connection string trên Vercel Environment Variables
- Verify username/password không có ký tự đặc biệt

### 3. **Google OAuth Không Hoạt Động**

**Lỗi**: `redirect_uri_mismatch`

**Giải pháp**:
- Vào Google Cloud Console → Credentials
- Verify Authorized Redirect URIs có đúng domain Vercel
- Format: `https://your-app.vercel.app/auth/google/callback`
- Không có dấu `/` ở cuối
- Check GOOGLE_CLIENT_ID và SECRET trên Vercel

### 4. **Session Không Lưu / Bị Logout Liên Tục**

**Nguyên nhân**: Session cookie settings

**Giải pháp**:
- Verify `NODE_ENV=production` trên Vercel
- Session cookie `secure: true` chỉ hoạt động với HTTPS
- Vercel tự động có HTTPS nên không cần lo

### 5. **Static Files (CSS/JS) Không Load**

**Nguyên nhân**: Path không đúng

**Giải pháo**:
- Check `vercel.json` có config routes cho `/assets/`
- Verify trong HTML dùng đúng path: `/assets/css/style.css`
- Không dùng relative path: `../assets/`

### 6. **Environment Variables Không Load**

**Lỗi**: `undefined` khi truy cập `process.env.XXX`

**Giải pháp**:
- Vào Vercel Dashboard → Project → Settings → Environment Variables
- Verify tất cả variables đã được thêm
- Click **"Redeploy"** sau khi thêm variables mới

### 7. **Build Failed**

**Lỗi**: Deployment failed during build

**Giải pháp**:
- Check Vercel build logs
- Verify `package.json` có tất cả dependencies
- Không commit folder `node_modules/`
- Verify không có syntax errors trong code

---

## Giới Hạn Free Tier Vercel

- ✅ **100 GB bandwidth/tháng** (rất đủ dùng)
- ✅ **Unlimited deployments**
- ✅ **Unlimited projects**
- ⚠️ **10 second execution limit** cho serverless functions
- ⚠️ **50 MB max deployment size**

**Lưu ý**: App này không vượt quá giới hạn nào!

---

## So Sánh Với Render

| Tính Năng | Vercel | Render |
|-----------|--------|--------|
| Giá | Free | Free |
| Sleep | ❌ Không | ✅ Sau 15 phút |
| Deploy Speed | 🚀 Nhanh (1-2 phút) | 🐢 Chậm (5-10 phút) |
| Auto Deploy | ✅ | ✅ |
| Custom Domain | ✅ Free | ✅ Free |
| HTTPS | ✅ Auto | ✅ Auto |
| Bandwidth | 100GB/tháng | 100GB/tháng |

**→ Vercel tốt hơn cho app này!**

---

## Custom Domain (Tùy Chọn)

Nếu bạn muốn domain riêng (vd: `todoapp.com`):

1. Mua domain (GoDaddy, Namecheap, etc.)
2. Vào Vercel Dashboard → Project → Settings → Domains
3. Thêm domain của bạn
4. Config DNS theo hướng dẫn Vercel
5. ✅ SSL certificate tự động cài đặt

---

## Monitoring & Logs

### Xem Logs Real-time:
1. Vercel Dashboard → Project
2. Tab **"Deployments"** → Click vào deployment
3. Tab **"Functions"** → Xem execution logs
4. Tab **"Runtime Logs"** → Xem server logs

### Analytics:
1. Tab **"Analytics"** → Xem traffic, response time
2. Free tier có basic analytics

---

## Bảo Mật

✅ **Đã được bảo vệ:**
- File `.env` không được commit (có trong `.gitignore`)
- Environment variables lưu an toàn trên Vercel
- HTTPS tự động (SSL/TLS)
- Session cookies với `httpOnly: true`
- MongoDB connection string không lộ ra public

⚠️ **Khuyến nghị thêm:**
- Thay `SESSION_SECRET` bằng random string mạnh
- Enable 2FA cho GitHub và Vercel
- Định kỳ rotate credentials

---

## Video Hướng Dẫn

🎥 Tìm trên YouTube: "Deploy Node.js app to Vercel"

Hoặc xem:
- Vercel official docs: https://vercel.com/docs
- Video: https://www.youtube.com/results?search_query=deploy+nodejs+vercel

---

## Hỗ Trợ

- 📧 Vercel Support: https://vercel.com/support
- 📖 Docs: https://vercel.com/docs
- 💬 Community: https://github.com/vercel/vercel/discussions

---

## Tóm Tắt Các Bước

1. ✅ Upload code lên GitHub (dùng GitHub Desktop)
2. ✅ Tạo tài khoản Vercel và kết nối GitHub
3. ✅ Import project từ GitHub
4. ✅ Thêm Environment Variables
5. ✅ Deploy
6. ✅ Config Google OAuth redirect URIs
7. ✅ Config MongoDB Network Access (0.0.0.0/0)
8. ✅ Test app trên Vercel URL

**Thời gian**: ~15-20 phút

**Link cuối cùng**: `https://to-do-list-22130158.vercel.app`

---

🎉 **Chúc bạn deploy thành công!**

Sau khi deploy, chỉ cần push code lên GitHub là Vercel tự động update!
