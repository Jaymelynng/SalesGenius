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
  // TODO: Replace with API calls to fetch real data
  const stats = [
    { label: 'Free Trials Scheduled Today', value: '0', icon: Calendar, color: 'from-blue-500 to-blue-600' },
    { label: 'Pending Follow-ups', value: '0', icon: Clock, color: 'from-orange-500 to-orange-600' },
    { label: 'Successful Voicemails', value: '0', icon: Phone, color: 'from-green-500 to-green-600' },
    { label: 'Total Inactive Accounts', value: '0', icon: Users, color: 'from-purple-500 to-purple-600' },
  ];

  // TODO: Replace with API calls to fetch recent activity
  const recentActivity: Array<{
    name: string;
    action: string;
    time: string;
    status: 'completed' | 'pending';
  }> = [];

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
          <div className="text-center py-8">
            <p className="text-slate-500">No campaign data available</p>
            <p className="text-sm text-slate-400 mt-2">Start a campaign to see performance metrics</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
          {recentActivity.length > 0 ? (
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
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-500">No recent activity</p>
              <p className="text-sm text-slate-400 mt-2">Activity will appear here as you work with leads</p>
            </div>
          )}
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