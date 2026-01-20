import { Bell, User, ChevronDown, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface TopNavProps {
  userRole: string;
  userName: string;
}

export default function TopNav({ userRole, userName }: TopNavProps) {
  return (
    <div className="h-16 bg-white sticky top-0 z-50 shadow-sm border-b border-transparent">
      <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0b5fff] to-[#06b6d4] rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <div>
              <h1 className="font-bold text-slate-900">AlumniConnect</h1>
              <p className="text-xs text-slate-500">SIH25017</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          </div>

          <div className="h-8 w-px bg-slate-200"></div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-[#06b6d4] to-[#10b981] rounded-full flex items-center justify-center shadow-sm">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-900">{userName}</p>
                  <p className="text-xs text-slate-500 capitalize">{userRole}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/settings" className="cursor-pointer">
                  <User className="w-4 h-4 mr-2" />
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/" className="cursor-pointer text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
