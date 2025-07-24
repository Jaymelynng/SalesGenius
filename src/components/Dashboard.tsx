import React from 'react';
import { 
  Users, 
  Phone, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Calendar,
  Target,
  Award
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Free Trials Scheduled Today', value: '6', icon: Calendar, color: 'from-blue-500 to-blue-600' },
    { label: 'Pending Follow-ups', value: '5', icon: Clock, color: 'from-orange-500 to-orange-600' },
    { label: 'Successful Voicemails', value: '311', icon: Phone, color: 'from-green-500 to-green-600' },
    { label: 'Total Inactive Accounts', value: '352', icon: Users, color: 'from-purple-500 to-purple-600' },
  ];

  const recentActivity = [
    { name: 'Carissa Flores', action: 'Trial Scheduled', time: '2 hours ago', status: 'completed' },
    { name: 'Stacey Ritchie', action: 'Enrollment Complete', time: '3 hours ago', status: 'completed' },
    { name: 'Kari Hooley', action: 'Awaiting Response', time: '4 hours ago', status: 'pending' },
    { name: 'Jenna Mullen', action: 'Email Sent', time: '5 hours ago', status: 'pending' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Sales Dashboard</h1>
        <p className="text-slate-600">Track your lead engagement and campaign performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                </div>
                <div className={`bg-gradient-to-r ${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Campaign Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Campaign Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Voicemail Success Rate</p>
                  <p className="text-sm text-slate-600">311 out of 362 calls</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">85.9%</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-slate-800">Re-engagement Rate</p>
                  <p className="text-sm text-slate-600">From drop report outreach</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">12.3%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-slate-800">{activity.name}</p>
                    <p className="text-sm text-slate-600">{activity.action}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left hover:bg-white/30 transition-colors">
            <Phone className="h-6 w-6 mb-2" />
            <p className="font-medium">Start Voicemail Campaign</p>
            <p className="text-sm opacity-90">Begin outreach to inactive accounts</p>
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left hover:bg-white/30 transition-colors">
            <Calendar className="h-6 w-6 mb-2" />
            <p className="font-medium">Schedule Free Trials</p>
            <p className="text-sm opacity-90">Manage trial class bookings</p>
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left hover:bg-white/30 transition-colors">
            <Award className="h-6 w-6 mb-2" />
            <p className="font-medium">Camp Telethon</p>
            <p className="text-sm opacity-90">Launch camp enrollment campaign</p>
          </button>
        </div>
      </div>
    </div>
  );
};