import React from 'react';
import { 
  Target,
  FileText, 
  BarChart3,
  Mail,
  Star,
  Zap,
  LayoutGrid,
  Users
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'leads', label: 'Leads', icon: Users },
    { id: 'tracker', label: 'Trial Conversion Tracker', icon: Target },
    { id: 'scripts', label: 'Automated Scripts & Emails', icon: FileText },
    { id: 'email-campaigns', label: 'Email Campaign Tracker', icon: Mail },
    { id: 'analytics', label: 'Performance Analytics', icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-white shadow-xl border-r border-slate-200 h-screen">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-lg">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">ConversionPro</h1>
            <p className="text-sm text-slate-500">Automated Trial Tracker</p>
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
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-r-3 border-indigo-500 text-indigo-700'
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
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-lg text-white">
          <h3 className="font-semibold mb-2">Automated System</h3>
          <p className="text-sm opacity-90">Trial-to-Conversion Tracking</p>
        </div>
      </div>
    </div>
  );
};