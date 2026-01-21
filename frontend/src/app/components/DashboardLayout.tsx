import { ReactNode, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BarChart3, 
  Settings, 
  Bell, 
  LogOut,
  Menu,
  X,
  Brain,
  Star,
  Briefcase
} from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';

interface NavItem {
  label: string;
  icon: ReactNode;
  path: string;
}

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'student' | 'alumni' | 'management';
  userName?: string;
}

export default function DashboardLayout({ children, role, userName = "User" }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Auto-close the mobile sidebar after navigation (only on small screens)
  useEffect(() => {
    try {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    } catch (e) {
      // noop (SSR-safe guard)
    }
  }, [location.pathname]);

  const commonNavItems: NavItem[] = [
    { label: 'Alumni Directory', icon: <Users className="w-5 h-5" />, path: '/alumni-listing' },
    { label: 'Events', icon: <Calendar className="w-5 h-5" />, path: '/events' },
    { label: 'Jobs & Internships', icon: <Briefcase className="w-5 h-5" />, path: '/jobs' },
    { label: 'Success Stories', icon: <Star className="w-5 h-5" />, path: '/success-stories' },
  ];

  const studentNavItems: NavItem[] = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: `/${role}/dashboard` },
    ...commonNavItems,
    { label: 'Career Recommendation', icon: <Brain className="w-5 h-5" />, path: '/career-recommendation' },
  ];

  const alumniNavItems: NavItem[] = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: `/${role}/dashboard` },
    ...commonNavItems,
  ];

  const managementNavItems: NavItem[] = [
    { label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: `/${role}/dashboard` },
    ...commonNavItems,
    { label: 'Reports', icon: <BarChart3 className="w-5 h-5" />, path: '/reports' },
  ];

  const navItems = 
    role === 'management' ? managementNavItems : 
    role === 'alumni' ? alumniNavItems : 
    studentNavItems;

  const getRoleColor = () => {
    switch (role) {
      case 'student': return 'bg-blue-900';
      case 'alumni': return 'bg-teal-600';
      case 'management': return 'bg-green-600';
      default: return 'bg-blue-900';
    }
  };

  const getRoleLabel = () => {
    switch (role) {
      case 'student': return 'Student';
      case 'alumni': return 'Alumni';
      case 'management': return 'Management';
      default: return 'User';
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('authToken');
    } catch (e) {
      // ignore
    }
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto w-full px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
              <GraduationCap className="w-7 h-7 text-slate-900" />
              <span className="font-semibold text-lg text-slate-900 hidden sm:block">AlumniConnect</span>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2" 
              onClick={() => navigate('/profile')}
            >
              <div className={`w-8 h-8 rounded-full ${getRoleColor()} flex items-center justify-center text-white`}>
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm">{userName}</div>
                <div className="text-xs text-slate-500">{getRoleLabel()}</div>
              </div>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className={`
          fixed lg:sticky top-[57px] left-0 z-30 w-64 h-[calc(100vh-57px)] bg-white border-r transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex flex-col h-full">
            <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="p-4 border-t space-y-2">
              <button
                onClick={() => {
                  navigate('/settings');
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>

              <button
                onClick={() => {
                  handleLogout();
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
