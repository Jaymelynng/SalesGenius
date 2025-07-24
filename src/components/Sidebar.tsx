import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  TrendingDown, 
  Phone, 
  Calendar, 
  FileText, 
  BarChart3,
  Star
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Lead Management', icon: Users },
    { id: 'drop-report', label: 'Drop Report', icon: TrendingDown },
    { id: 'voicemail', label: 'Voicemail Campaign', icon: Phone },
    { id: 'camp-telethon', label: 'Camp Telethon', icon: Calendar },
    { id: 'scripts', label: 'Scripts & Objections', icon: FileText },
    { id: 'reports', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-white shadow-xl border-r border-slate-200 h-screen">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
            <Star className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Sales Genius</h1>
            <p className="text-sm text-slate-500">Manager Dashboard</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-6 py-3 text-left transition-all duration-200 ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-r-3 border-blue-500 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-200">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg text-white">
          <h3 className="font-semibold mb-2">Oasis Gymnastics</h3>
          <p className="text-sm opacity-90">Lead Re-engagement System</p>
        </div>
      </div>
    </div>
  );
};