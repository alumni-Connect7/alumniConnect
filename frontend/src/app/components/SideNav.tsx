import { Home, Users, MessageCircle, Calendar, FileText, BarChart3, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from './ui/utils';

interface SideNavProps {
  role: 'student' | 'alumni' | 'management';
}

export default function SideNav({ role }: SideNavProps) {
  const location = useLocation();

  const studentLinks = [
    { icon: Home, label: 'Dashboard', path: '/student/dashboard' },
    { icon: Users, label: 'Alumni Network', path: '/alumni-listing' },
    { icon: FileText, label: 'Resume Analysis', path: '/resume-analysis' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const alumniLinks = [
    { icon: Home, label: 'Dashboard', path: '/alumni/dashboard' },
    { icon: Users, label: 'Alumni Network', path: '/alumni-listing' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const managementLinks = [
    { icon: Home, label: 'Dashboard', path: '/management/dashboard' },
    { icon: Users, label: 'Alumni Network', path: '/alumni-listing' },
    { icon: Calendar, label: 'Events', path: '/events' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const links = role === 'student' ? studentLinks : role === 'alumni' ? alumniLinks : managementLinks;

  return (
    <div className="w-64 bg-white h-full overflow-y-auto border-r border-transparent shadow-sm">
      <nav className="p-4 space-y-1">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150',
                isActive
                  ? 'bg-gradient-to-r from-[#0b5fff] to-[#06b6d4] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-50'
              )}
            >
              <div className={cn('w-8 h-8 flex items-center justify-center rounded-md', isActive ? 'bg-white/10' : 'text-slate-500')}> 
                <link.icon className={cn('w-5 h-5', isActive ? 'text-white' : 'text-slate-500')} />
              </div>
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
