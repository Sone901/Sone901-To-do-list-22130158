# 📚 Quick Start Guide - Todo List Application

## 🚀 Getting Started

### 1. Installation
```bash
# Install dependencies
npm install

# Create .env file in project root
MONGODB_URI=your_mongodb_uri
SESSION_SECRET=your_random_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CALLBACK_URL=http://localhost:4000/auth/google/callback
```

### 2. Start Server
```bash
npm start
# or
node index.js

# Visit: http://localhost:4000
```

---

## 👤 Authentication

### Register
1. Click "Register" on home page
2. Fill in name, email, and password
3. Confirm to create account
4. Automatically redirects to login

### Login
1. Email/Password: Enter credentials
2. Google: Click "Login with Google"
3. Dashboard loads automatically

### Logout
1. Click avatar in top right corner
2. Select "Logout"
3. Confirm
4. Redirects to login page

---

## 📋 Task Management

### ➕ Create Task
1. Click **"Add New Task"** button (blue)
2. Fill out form:
   - **Title** (required)
   - **Description** (optional)
   - **Category**: Work | Personal | Shopping | Others
   - **Date** (required, minimum = today)
   - **Time** (optional)
3. Click **"Add Task"**
4. Task appears in "Today" tab

### 📝 Edit Task
1. Click **"Edit"** icon (blue pencil) on task
2. Edit modal opens with pre-filled data
3. Modify desired fields
4. Click **"Update Task"**
5. Task updates immediately

### ✓ Mark Completed
1. Click checkbox on left side of task
2. Task moves to **"Completed"** tab
3. Title gets strikethrough
4. Green "Completed" badge appears
5. Click checkbox again to unmark

### 🗑️ Delete Task
1. Click **"Delete"** icon (red trash)
2. Confirm in dialog
3. Task is removed permanently

---

## 🔍 Search, Filter & Sort

### 🔎 Search Tasks
1. Type in **"Search tasks..."** field at top
2. Tasks filter in real-time
3. Searches by **title** or **description**
4. Click **"X"** to clear search

### 🎯 Filter by Deadline
1. **"Deadline"** dropdown below search
2. Options:
   - **All**: all tasks
   - **Today**: only today's tasks
   - **This Week**: next 7 days
   - **This Month**: next 30 days
   - **Overdue**: overdue tasks
3. Tasks filter automatically

### 📊 Sort Tasks
1. **"Sort"** dropdown next to Deadline
2. Options:
   - **By Deadline**: sort by date (ascending)
   - **By Created Date**: keep original order
   - **By Title**: alphabetical order
3. Tasks reorder automatically

---

## 📁 Sidebar - Projects/Categories

### Filter by Category
1. Click category on left:
   - **Work** 💼
   - **Personal** 👤
   - **Shopping** 🛍️
   - **Others** 📌
2. Shows only tasks from that category
3. Click again to deactivate
4. Visual indicator on active project

---

## 📅 Calendar & Upcoming

### Calendar (Right Side)
1. **Month Navigation**: < and > arrows
2. **Today highlighted** in blue
3. Click days to see tasks (planned feature)

### This Week Tasks
1. "This Week" section below calendar
2. Shows upcoming tasks (next 7 days)
3. Only **incomplete** tasks
4. Format: "Task Name" - "Mon, Dec 16"

---

## 👤 Profile

### Access Profile
1. Click avatar in top right corner
2. Dropdown appears
3. Click **"Profile"**

### Edit Information
1. **Name**: Edit field
2. **Email**: Edit field
3. **Account Type**: View only (not editable)

### Change Avatar
1. **Tab "Upload from Device"**:
   - Drag file or click to select
   - Formats: JPEG, PNG, GIF, WebP
   - Max 5MB
   
2. **Tab "Image URL"**:
   - Paste online image URL
   - Click "Load" to preview

3. Preview updates in real-time
4. Click **"Save"** to confirm

---

## 🎨 Themes

### Dark Mode (Default)
- Enabled if system prefers dark mode
- Dark background, light text
- Saves battery on OLED screens

### Light Mode
- Enabled if system prefers light mode
- Light background, dark text
- Better readability in bright light

**Change Theme**: Adjust "Appearance" in your OS settings

---

## ⌨️ Keyboard Shortcuts & Tips

### Keyboard Shortcuts
- **Tab**: Navigate between form fields
- **Enter**: Submit modal form
- **Esc**: Close modal (in some browsers)

### Useful Tips
1. **Minimum Date**: Cannot create task for past dates
2. **Search Case-Insensitive**: Uppercase = lowercase
3. **Confirmations**: Always asks before delete/logout
4. **Real-time Sync**: Updates reflect immediately
5. **Multiple Tabs**: Data syncs across tabs (with F5)

---

## 🐛 Troubleshooting

### "Please log in first"
- Your session expired
- Log in again
- Check if cookies are enabled

### Task not appearing
- Check if you're on "Today" tab
- Check deadline filter
- Verify category is active
- Press F5 to refresh

### Cannot upload image
- Check format (JPEG, PNG, GIF, WebP)
- File must be < 5MB
- Check internet connection
- Try URL instead

### Search not working
- Check spelling
- Search is by title OR description
- Click "X" to clear filters
- Verify tasks exist

### Error 403 (Forbidden)
- Tried to edit/delete another user's task
- This is blocked for security
- Log out and log in again

### Error 401 (Unauthorized)
- Not authenticated
- Log in
- Check if cookies are enabled

---

## 📱 Compatibility

### Supported Browsers
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

### Devices
- ✅ Desktop
- ✅ Tablet (partial)
- ⚠️ Mobile (optimization in progress)

### Dark/Light Mode
- ✅ Detects system preference
- ✅ Supports both themes
- ✅ Smooth transitions

---

## 🔒 Security & Privacy

### Your Data
- ✅ Passwords are hashed
- ✅ Tasks isolated per user
- ✅ HTTPS recommended in production
- ✅ Session with expiration

### What We DON'T Do
- ❌ Share data with third parties
- ❌ Store plaintext passwords
- ❌ Access camera/microphone
- ❌ Send data to social networks

---

## 💡 Best Practices

1. **Clear Descriptions**: Use detailed descriptions
2. **Realistic Dates**: Don't overcommit on tasks
3. **Categorize**: Use categories for better filtering
4. **Review**: Check weekly what was completed
5. **Logout**: Logout on public devices
6. **Backup**: Data saved on server (secure)

---

## 📞 Support

### Technical Issues
1. Check browser (use recent version)
2. Clear cache: Ctrl+Shift+Del (Chrome)
3. Disable extensions (may interfere)
4. Try incognito/private mode
5. Report bug with screenshot

### Data Loss
- Deleted tasks are **permanent**
- No trash/recycle bin
- Always confirms before delete
- Data auto-saved

---

## 🎓 Tutoriais Video

Próximas atualizações incluirão:
- [ ] Criar primeira tarefa
- [ ] Buscar tarefas
- [ ] Colaboração (planejado)
- [ ] Integração calendário (planejado)

---

## 🔄 Atualizações Frequentes

### v1.0 (Atual)
- ✅ CRUD completo
- ✅ Search/Filter/Sort
- ✅ Autenticação (Email + Google)
- ✅ Perfil de usuário

### v1.1 (Planejado)
- 🔜 Categorias customizadas
- 🔜 Tags
- 🔜 Prioridade
- 🔜 Recorrência

### v2.0 (Roadmap)
- 🔜 Compartilhamento de tarefas
- 🔜 Colaboração em tempo real
- 🔜 API REST
- 🔜 App Mobile

---

**Última atualização**: 14 de Dezembro de 2025

**Precisa de ajuda?** Verifique IMPLEMENTATION_SUMMARY.md para detalhes técnicos.
