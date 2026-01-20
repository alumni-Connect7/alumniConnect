# Frontend Integration Quick Reference

## 1. Use Authentication Hook

```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated, login, logout, isLoading } = useAuth();
  // Use these in your component
}
```

---

## 2. Call API Endpoints

```typescript
import { authAPI, userAPI, mentorshipAPI } from '@/api/endpoints';

// Login
await authAPI.login({ email, password });

// Get approved alumni
const { data } = await userAPI.getApprovedAlumni();

// Create mentorship post
await mentorshipAPI.createPost({ title, description });
```

---

## 3. Protect Routes

```typescript
import { ProtectedRoute } from '@/components/routing/ProtectedRoute';

<Route
  path="/admin/dashboard"
  element={<ProtectedRoute element={<Dashboard />} allowedRoles={['admin']} />}
/>
```

---

## 4. Handle Errors

```typescript
import { handleAPIError } from '@/utils/errorHandler';

try {
  await someAPI.call();
} catch (error) {
  const { message, status } = handleAPIError(error);
  console.error(message);
}
```

---

## 5. Check User Role

```typescript
const { user } = useAuth();

if (user?.role === 'admin') {
  // Show admin controls
}
```

---

## 6. Get Available Pages for Role

```typescript
import { getAvailablePages, getDefaultRoute } from '@/utils/rolePageMap';

const pages = getAvailablePages('student');
const defaultRoute = getDefaultRoute('admin');
```

---

## Common Patterns

### Pattern: Redirect After Login

```typescript
const { user } = useAuth();
const navigate = useNavigate();

useEffect(() => {
  if (user) {
    navigate(getDefaultRoute(user.role));
  }
}, [user]);
```

### Pattern: Conditional Rendering by Role

```typescript
{user?.role === 'alumni' && user?.isApproved && <div>Approved Content</div>}
{user?.role === 'student' && <div>Student Content</div>}
{user?.role === 'admin' && <div>Admin Content</div>}
```

### Pattern: Fetch Data After Login

```typescript
const { user } = useAuth();
const [data, setData] = useState(null);

useEffect(() => {
  if (user?.role === 'student') {
    userAPI.getApprovedAlumni().then(({ data }) => setData(data.alumni));
  }
}, [user]);
```

---

## Environment Setup

### `.env.local`

```
VITE_API_URL=http://localhost:5000/api
```

---

## File Structure Reference

```
src/
├── api/
│   ├── client.ts           # Axios instance
│   └── endpoints.ts        # API calls
├── context/
│   └── AuthContext.tsx     # Auth state
├── hooks/
│   └── useAuth.ts          # useAuth hook
├── components/
│   └── routing/
│       └── ProtectedRoute.tsx
├── pages/
│   ├── error/
│   │   ├── UnauthorizedPage.tsx
│   │   └── PendingApprovalPage.tsx
│   └── [other pages]
├── examples/
│   ├── LoginPageExample.tsx
│   ├── RegisterPageExample.tsx
│   ├── AdminUserManagementExample.tsx
│   └── MentorshipPageExample.tsx
└── utils/
    ├── rolePageMap.ts      # Role definitions
    └── errorHandler.ts     # Error handling
```

---

## Role → Pages Mapping

### Student
- `/student/dashboard`
- `/alumni-listing`
- `/mentorship`
- `/resume-analysis`
- `/events`
- `/career-recommendation`
- `/profile`
- `/settings`

### Alumni (require approval)
- `/alumni/dashboard`
- `/mentorship`
- `/profile`
- `/settings`
- `/events`

### Admin
- `/management/dashboard`
- `/reports`
- `/settings`

---

## API Endpoints

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | Public | Register new user |
| POST | `/auth/login` | Public | Login |
| GET | `/auth/me` | Authenticated | Get current user |
| GET | `/users` | Admin | Get all users |
| PATCH | `/users/:id/approve` | Admin | Approve alumni |
| GET | `/users/alumni/approved` | Student | Get approved alumni |
| POST | `/mentorship` | Alumni | Create post |
| GET | `/mentorship` | Authenticated | List posts |

---

## Troubleshooting

### 401 Unauthorized
- Token expired or invalid
- Check localStorage for `authToken`
- User will be redirected to `/login`

### 403 Forbidden
- User lacks required role
- Check `user?.role`
- User redirected to `/unauthorized`

### Token Not Attached
- Axios interceptor checks localStorage
- Make sure `login()` stores token correctly
- Verify `authToken` key in localStorage

---

## Next Steps

1. Replace example pages with actual implementations
2. Customize error messages and styling
3. Implement loading skeletons for better UX
4. Add toast notifications for user feedback
5. Implement token refresh for long sessions
