# Frontend Integration Guide: Axios + Auth + RBAC

## Overview

This guide covers the frontend integration with the Alumni Connect backend, including JWT authentication, role-based access control (RBAC), and protected routing.

---

## 1. Axios API Setup

### Files
- [src/api/client.ts](../src/api/client.ts) - Axios instance with interceptors
- [src/api/endpoints.ts](../src/api/endpoints.ts) - API endpoints and types

### Features
- **Base URL**: Reads from `VITE_API_URL` environment variable (default: `http://localhost:5000/api`)
- **Request Interceptor**: Automatically attaches JWT token from localStorage
- **Response Interceptor**: Handles 401 errors and clears auth state

### Usage Example

```typescript
import { authAPI, userAPI, mentorshipAPI } from '@/api/endpoints';

// Register
const { data } = await authAPI.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'securePassword123',
  role: 'student',
  collegeId: 'STU001',
});

// Login
const { data } = await authAPI.login({
  email: 'john@example.com',
  password: 'securePassword123',
});

// Get current user
const { data } = await authAPI.getMe();

// Admin: Get all users
const { data } = await userAPI.getAllUsers();

// Admin: Approve alumni
const { data } = await userAPI.approveAlumni(userId);

// Student: View approved alumni
const { data } = await userAPI.getApprovedAlumni();

// Alumni: Create mentorship post
const { data } = await mentorshipAPI.createPost({
  title: 'Career Growth Tips',
  description: 'How to grow your career in tech...',
});

// Any user: List mentorship posts
const { data } = await mentorshipAPI.listPosts();
```

---

## 2. Authentication Context (AuthProvider)

### File
- [src/context/AuthContext.tsx](../src/context/AuthContext.tsx)

### Features
- Centralized auth state (user, token, loading)
- Automatic token persistence to localStorage
- Methods: `login()`, `register()`, `logout()`, `refreshUser()`
- Exposes `isAuthenticated`, `isLoading` flags

### Usage in Components

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, login, logout, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <button onClick={() => login(email, password)}>Login</button>;
  }

  return (
    <>
      <p>Welcome, {user?.name} ({user?.role})</p>
      <button onClick={logout}>Logout</button>
    </>
  );
}
```

---

## 3. Role-Based Access Control (RBAC)

### Components & Files

#### ProtectedRoute Component
- [src/components/routing/ProtectedRoute.tsx](../src/components/routing/ProtectedRoute.tsx)

Wraps routes to enforce authentication and role-based access.

**Props:**
- `element`: React component to render if authorized
- `allowedRoles?`: Array of roles that can access (undefined = all authenticated users)
- `requiredApproval?`: If true, alumni must be approved

**Example:**

```typescript
// Student-only route
<Route
  path="/alumni-listing"
  element={<ProtectedRoute element={<AlumniListing />} allowedRoles={['student']} />}
/>

// Alumni-only route with approval check
<Route
  path="/alumni/dashboard"
  element={
    <ProtectedRoute
      element={<AlumniDashboard />}
      allowedRoles={['alumni']}
      requiredApproval={true}
    />
  }
/>

// Any authenticated user
<Route
  path="/mentorship"
  element={<ProtectedRoute element={<MentorshipPage />} />}
/>
```

#### Role → Page Mapping
- [src/utils/rolePageMap.ts](../src/utils/rolePageMap.ts)

Defines which pages are accessible by each role.

**Usage:**

```typescript
import { ROLE_PAGE_MAP, isRouteAllowed, getAvailablePages, getDefaultRoute } from '@/utils/rolePageMap';

// Check if route is allowed for a role
const allowed = isRouteAllowed('/student/dashboard', 'student'); // true

// Get all pages available to a role
const studentPages = getAvailablePages('student');
// {
//   dashboard: '/student/dashboard',
//   alumni_listing: '/alumni-listing',
//   mentorship: '/mentorship',
//   ...
// }

// Get default route for role (used in redirect after login)
const defaultRoute = getDefaultRoute('alumni'); // '/alumni/dashboard'
```

---

## 4. Error Handling

### File
- [src/utils/errorHandler.ts](../src/utils/errorHandler.ts)

Consistent error handling across the app.

**Usage:**

```typescript
import { handleAPIError } from '@/utils/errorHandler';

try {
  await authAPI.login(credentials);
} catch (error) {
  const { message, status } = handleAPIError(error);
  if (status === 401) {
    // Handle unauthorized
  }
  console.error(message);
}
```

---

## 5. Error Pages

### Unauthorized Page
- [src/pages/error/UnauthorizedPage.tsx](../src/pages/error/UnauthorizedPage.tsx)
- Route: `/unauthorized`

Displayed when a user lacks permission (403 Forbidden).

### Pending Approval Page
- [src/pages/error/PendingApprovalPage.tsx](../src/pages/error/PendingApprovalPage.tsx)
- Route: `/pending-approval`

Displayed when an alumni user's account is pending approval.

---

## 6. Integration Steps

### Step 1: Wrap App with AuthProvider

**File:** [src/app/App.tsx](../src/app/App.tsx)

```typescript
import { AuthProvider } from '@/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Routes */}
      </Router>
    </AuthProvider>
  );
}
```

### Step 2: Update Routes with ProtectedRoute

```typescript
import { ProtectedRoute } from '@/components/routing/ProtectedRoute';

<Routes>
  {/* Public routes */}
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />

  {/* Student-only */}
  <Route
    path="/student/dashboard"
    element={<ProtectedRoute element={<StudentDashboard />} allowedRoles={['student']} />}
  />

  {/* Alumni-only with approval */}
  <Route
    path="/alumni/dashboard"
    element={
      <ProtectedRoute
        element={<AlumniDashboard />}
        allowedRoles={['alumni']}
        requiredApproval={true}
      />
    }
  />

  {/* Admin-only */}
  <Route
    path="/management/dashboard"
    element={<ProtectedRoute element={<ManagementDashboard />} allowedRoles={['admin']} />}
  />

  {/* Any authenticated user */}
  <Route
    path="/mentorship"
    element={<ProtectedRoute element={<MentorshipPage />} />}
  />
</Routes>
```

### Step 3: Use Auth in Components

```typescript
import { useAuth } from '@/hooks/useAuth';

function LoginForm() {
  const { login, isLoading } = useAuth();

  const handleSubmit = async (email, password) => {
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
    </form>
  );
}
```

---

## 7. Environment Variables

### File: `.env.local`

```
VITE_API_URL=http://localhost:5000/api
```

---

## 8. Scalable Role-Based Routing Best Practices

### 1. **Centralized Role Definitions**
Define all roles and their accessible pages in one place:

```typescript
// src/utils/rolePageMap.ts
export const ROLE_PAGE_MAP = {
  student: { ... },
  alumni: { ... },
  admin: { ... },
};
```

### 2. **Dynamic Navigation Menu**
Generate sidebar/menu items based on user role:

```typescript
function SideNav() {
  const { user } = useAuth();
  const availablePages = getAvailablePages(user!.role);

  return (
    <nav>
      {Object.entries(availablePages).map(([key, route]) => (
        <Link key={key} to={route}>
          {key.replace('_', ' ')}
        </Link>
      ))}
    </nav>
  );
}
```

### 3. **Consistent Error Handling**
Always catch and handle API errors:

```typescript
try {
  const { data } = await userAPI.getAllUsers();
} catch (error) {
  const { message, status } = handleAPIError(error);
  // Show toast/modal with error
}
```

### 4. **Token Refresh Strategy**
For long-lived sessions, implement token refresh:

```typescript
export const AuthProvider = ({ children }) => {
  useEffect(() => {
    const interval = setInterval(async () => {
      await refreshUser(); // Refresh user data before token expires
    }, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

### 5. **Permission-Based Components**
Create a `CanAccess` component for fine-grained control:

```typescript
function CanAccess({ roles, children }) {
  const { user } = useAuth();
  if (!roles.includes(user?.role)) return null;
  return children;
}

// Usage
<CanAccess roles={['admin', 'alumni']}>
  <button>Approve Users</button>
</CanAccess>
```

---

## 9. Running the App

### Backend
```bash
cd backend
cp .env.example .env  # Add MONGO_URI and JWT_SECRET
npm install
npm run dev  # Starts on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev  # Starts on http://localhost:5173
```

---

## 10. Testing Protected Routes

### Login as Student
```
Email: student@example.com
Password: password123
Access: /student/dashboard, /alumni-listing, /mentorship
```

### Login as Alumni
```
Email: alumni@example.com
Password: password123
Access: /alumni/dashboard (if approved), /mentorship
```

### Login as Admin
```
Email: admin@example.com
Password: password123
Access: /management/dashboard, /reports
```

---

## Summary

- **Axios Setup**: Automatic JWT injection via interceptors
- **AuthContext**: Centralized auth state with persistence
- **ProtectedRoute**: Enforces authentication and role-based access
- **RBAC Utilities**: Role-to-page mapping for scalability
- **Error Handling**: Consistent error handling across the app
- **Best Practices**: Dynamic menus, token refresh, permission-based components

All code is production-ready with comprehensive comments.
