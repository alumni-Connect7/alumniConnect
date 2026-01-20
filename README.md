# Alumni Connect - College Alumni Management System

A full-stack web application connecting students, alumni, and administrators for mentorship, networking, and career development.

## 🚀 Quick Start

```bash
# Backend
cd backend
npm install
npm run dev  # http://localhost:5000

# Frontend (in another terminal)
cd frontend
npm install
npm run dev  # http://localhost:5173
```

See [SETUP_AND_RUN.md](SETUP_AND_RUN.md) for detailed setup instructions.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Documentation](#documentation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Role-Based Access](#role-based-access)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### For Students
- 👥 View approved alumni profiles
- 📚 Access mentorship posts and career advice
- 📊 Resume analysis and career recommendations
- 📅 Browse and register for events
- 💬 Connect with alumni for guidance

### For Alumni
- ✍️ Create mentorship posts to share expertise
- 🤝 Connect with current students
- 📅 Participate in campus events
- 📈 Track impact and engagement
- 🎓 Give back to their alma mater

### For Administrators
- 👨‍💼 Manage all users (students, alumni, admins)
- ✅ Approve alumni account registrations
- 📊 View system reports and analytics
- 🔧 Configure system settings
- 📧 Send announcements and notifications

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas (Cloud NoSQL)
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcryptjs
- **CORS**: Cross-origin resource sharing enabled

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Material UI
- **State Management**: React Context API

### DevOps
- **Environment Management**: dotenv
- **Development Server**: Nodemon (backend), Vite HMR (frontend)
- **Version Control**: Git

---

## 🏗️ Architecture

### Backend Architecture (MVC Pattern)

```
┌─────────────┐
│   Client    │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│   Routes Layer      │  (authRoutes, userRoutes, mentorshipRoutes)
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Middleware Layer   │  (auth, roles, errorHandler)
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ Controllers Layer   │  (authController, userController, mentorshipController)
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   Models Layer      │  (User, MentorshipPost)
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   MongoDB Atlas     │
└─────────────────────┘
```

### Frontend Architecture

```
┌─────────────────────┐
│      App.tsx        │  (AuthProvider wrapper)
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   React Router      │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  ProtectedRoute     │  (Role-based access control)
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   Page Components   │  (Dashboards, Listings, etc.)
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   API Client        │  (Axios with JWT interceptor)
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Backend API        │
└─────────────────────┘
```

---

## 🎯 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- MongoDB Atlas account (free tier)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd alumniConnect
```

2. **Backend Setup**
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm install
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
```

4. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

See [SETUP_AND_RUN.md](SETUP_AND_RUN.md) for detailed instructions.

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [SETUP_AND_RUN.md](SETUP_AND_RUN.md) | Complete setup and run guide |
| [API_DOCUMENTATION.md](API_DOCUMENTATION.md) | Backend API reference |
| [FRONTEND_INTEGRATION_COMPLETE.md](FRONTEND_INTEGRATION_COMPLETE.md) | Frontend integration summary |
| [frontend/INTEGRATION_GUIDE.md](frontend/INTEGRATION_GUIDE.md) | Frontend integration guide |
| [frontend/QUICK_REFERENCE.md](frontend/QUICK_REFERENCE.md) | Quick reference for developers |
| [IMPLEMENTATION_CHECKLIST.md](IMPLEMENTATION_CHECKLIST.md) | Implementation status |

---

## 📁 Project Structure

```
alumniConnect/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── models/          # Mongoose schemas
│   │   ├── middleware/      # Auth, roles, error handling
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API routes
│   │   ├── app.js           # Express app
│   │   └── server.js        # Server entry point
│   ├── .env                 # Environment variables
│   └── package.json         # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── api/             # Axios client & endpoints
│   │   ├── context/         # Auth context
│   │   ├── hooks/           # Custom hooks
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Utilities
│   │   ├── examples/        # Example implementations
│   │   ├── app/             # Main app component
│   │   └── main.tsx         # Entry point
│   ├── .env.local           # Environment variables
│   └── package.json         # Frontend dependencies
│
└── [documentation files]
```

---

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### User Management
- `GET /api/users` - Get all users (admin only)
- `PATCH /api/users/:id/approve` - Approve alumni (admin only)
- `GET /api/users/alumni/approved` - Get approved alumni (student only)

### Mentorship
- `POST /api/mentorship` - Create mentorship post (alumni only)
- `GET /api/mentorship` - List mentorship posts (authenticated)

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for complete API reference.

---

## 🔐 Role-Based Access

### Student
- `/student/dashboard`
- `/alumni-listing`
- `/resume-analysis`
- `/career-recommendation`
- `/mentorship` (view only)
- `/events`
- `/profile`
- `/settings`

### Alumni (requires approval)
- `/alumni/dashboard`
- `/mentorship` (create & view)
- `/events`
- `/profile`
- `/settings`

### Admin
- `/management/dashboard`
- `/reports`
- `/settings`

---

## 🖼️ Screenshots

### Student Dashboard
[Placeholder - Add screenshot]

### Alumni Mentorship Page
[Placeholder - Add screenshot]

### Admin User Management
[Placeholder - Add screenshot]

---

## 🔑 Key Features Implementation

### JWT Authentication
- Tokens expire in 7 days
- Automatic token attachment via Axios interceptors
- Secure password hashing with bcrypt (10 salt rounds)
- Protected routes require valid JWT

### Role-Based Access Control (RBAC)
- Three roles: student, alumni, admin
- ProtectedRoute component enforces access
- Middleware validates roles on backend
- Alumni require admin approval

### Error Handling
- Centralized error handler
- Consistent error responses
- User-friendly error pages (403, 401)
- Automatic redirect on authentication failure

---

## 🧪 Testing

### Manual Testing

1. **Register as Student**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "student",
    "collegeId": "STU001"
  }'
```

2. **Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

3. **Access Protected Route**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Automated Testing (Future)
- Unit tests with Jest
- Integration tests with Supertest
- E2E tests with Playwright

---

## 🚢 Deployment

### Backend (Railway/Render/Heroku)
1. Set environment variables on hosting platform
2. Deploy from Git repository
3. Use `npm start` command

### Frontend (Vercel/Netlify)
1. Build production version: `npm run build`
2. Deploy `dist/` folder
3. Set `VITE_API_URL` to production backend URL

---

## 🔒 Security Best Practices

- ✅ Passwords hashed with bcryptjs
- ✅ JWT tokens with expiration
- ✅ CORS configured for specific origins
- ✅ Role-based access control
- ✅ No sensitive data in API responses
- ✅ Input validation on all endpoints
- ⚠️ For production: Add rate limiting, HTTPS, monitoring

---

## 🛣️ Roadmap

### Phase 1 (Complete) ✅
- Backend API with authentication
- Frontend integration with RBAC
- Basic user management
- Mentorship posts

### Phase 2 (Next)
- [ ] Messaging system
- [ ] Email notifications
- [ ] Advanced search & filtering
- [ ] File uploads (resume, photos)
- [ ] Analytics dashboard

### Phase 3 (Future)
- [ ] Real-time chat (WebSocket)
- [ ] Mobile app (React Native)
- [ ] AI-powered resume analysis
- [ ] Job board integration
- [ ] Event registration & tracking

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Authors

- Your Name - Initial work

---

## 🙏 Acknowledgments

- Express.js team for the excellent framework
- React team for the UI library
- MongoDB for the database solution
- All contributors who helped improve this project

---

## 📞 Support

For issues or questions:
- Check the [documentation](#documentation)
- Review [example implementations](frontend/src/examples/)
- Open an issue on GitHub
- Contact the development team

---

## 🎓 About Alumni Connect

Alumni Connect bridges the gap between current students and successful alumni, fostering mentorship, knowledge sharing, and career development. By facilitating meaningful connections, we help students navigate their academic journey and prepare for professional success while enabling alumni to give back to their alma mater.

**Built with ❤️ for educational institutions worldwide.**