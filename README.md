<<<<<<< HEAD

# 📝 Todo List Application - Full Stack Node.js

> Full-featured todo list application with authentication, task management, and Google OAuth integration.

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://to-do-list-22130158.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)

## 🌟 Overview

A comprehensive full-stack todo list application built with Node.js, Express, MongoDB, and EJS. Features include user authentication with email/password and Google OAuth, task management with categories, search functionality, and real-time statistics.

**Technologies Used:** Node.js, Express.js, MongoDB, Mongoose, EJS, Passport.js, bcrypt, Multer

## ✨ Features

- **🔐 User Authentication**
  - Email/Password registration and login with bcrypt encryption
  - Google OAuth 2.0 integration
  - Secure session management
  - Profile picture upload

- **📋 Task Management**
  - Create, edit, and delete tasks
  - Mark tasks as completed/pending
  - Task descriptions and due dates
  - Category assignment (Work, Personal, Shopping, Health, Other)

- **🔍 Advanced Filtering**
  - Search tasks by title or description
  - Filter by category
  - Sort by date, priority, or status
  - View all tasks, pending tasks, or completed tasks separately

- **📊 Statistics Dashboard**
  - Total tasks count
  - Completed vs pending tasks
  - Progress tracking with visual indicators
  - Category-based statistics

- **👤 User Profile**
  - Update name and email
  - Change password
  - Upload profile picture
  - View account statistics

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Google Cloud Console account (for OAuth)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Sone901/To-do-list-22130158.git
cd To-do-list-22130158
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```env
mongoDbUrl=mongodb+srv://your_username:your_password@cluster.mongodb.net/todolistDb
SESSION_SECRET=your_random_session_secret_here
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
PORT=4000
NODE_ENV=development
```

4. **Start the application**
```bash
npm start
```

Visit `http://localhost:4000` in your browser.

## 📦 Deployment

### Deploy to Vercel (Recommended)

See [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) for detailed deployment instructions.

**Quick steps:**
1. Push code to GitHub
2. Import project on Vercel
3. Add environment variables
4. Deploy!

**Live URL:** `https://to-do-list-22130158.vercel.app`

### Alternative Platforms

- **Render:** See [HUONG_DAN_DEPLOY.md](./HUONG_DAN_DEPLOY.md)
- **Heroku:** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 📂 Project Structure

```
├── assets/
│   ├── css/           # Stylesheets
│   ├── js/            # Client-side JavaScript
│   └── uploads/       # User uploaded files
├── config/
│   ├── mongoose.js    # MongoDB connection
│   └── passport.js    # Authentication strategies
├── controllers/       # Route controllers
├── models/           # Mongoose schemas
├── routes/           # Express routes
├── views/            # EJS templates
├── .env.example      # Environment variables template
├── .gitignore        # Git ignore rules
├── index.js          # Application entry point
└── package.json      # Dependencies
```

## 🔧 Configuration

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI:
   - Local: `http://localhost:4000/auth/google/callback`
   - Production: `https://your-domain.com/auth/google/callback`

### MongoDB Atlas Setup

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Add database user
4. Whitelist IP address (0.0.0.0/0 for production)
5. Get connection string

## 🛠️ Development

```bash
# Run in development mode with auto-reload
npm run dev

# Run in production mode
npm start
```

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**Sone901**

- GitHub: [@Sone901](https://github.com/Sone901)
- Repository: [To-do-list-22130158](https://github.com/Sone901/To-do-list-22130158)

## 🙏 Acknowledgements

- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Passport.js](http://www.passportjs.org/) - Authentication
- [EJS](https://ejs.co/) - Templating engine
- [Font Awesome](https://fontawesome.com/) - Icons

## 📞 Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

**⭐ Star this repository if you find it helpful!**

=======
# Sone901-To-do-list-22130158
>>>>>>> e97d038ed3dda502884e5603993a8f6edf997c68
