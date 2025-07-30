import React, { useState } from 'react';
import { 
  TrendingDown, 
  Users, 
  Calendar, 
  Target, 
  Filter,
  Download,
  RefreshCw,
  UserX,
  UserCheck
} from 'lucide-react';

export const DropReport: React.FC = () => {
  const [dateRange, setDateRange] = useState('aug-2023-aug-2024');
  const [showSiblings, setShowSiblings] = useState(false);

  // TODO: Replace with API calls to fetch drop report data
  const dropData = {
    totalInactive: 0,
    inactiveWithSiblings: 0,
    reEngagementRate: 0,
    successfulContacts: 0,
    reEnrollments: 0
  };

  // TODO: Replace with API calls to fetch inactive accounts
  const inactiveAccounts: Array<{
    id: number;
    family: string;
    student: string;
    age: number;
    program: string;
    dropDate: string;
    reason: string;
    hasSiblings: boolean;
    lastContact: string | null;
    status: 'contacted' | 'voicemail' | 'enrolled' | 'no-contact';
  }> = [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enrolled': return 'bg-green-100 text-green-800';
      case 'contacted': return 'bg-blue-100 text-blue-800';
      case 'voicemail': return 'bg-orange-100 text-orange-800';
      case 'no-contact': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAccounts = showSiblings 
    ? inactiveAccounts.filter(account => account.hasSiblings)
    : inactiveAccounts;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Drop Report Analysis</h1>
        <p className="text-slate-600">Track and re-engage families who have left the program</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Total Inactive Accounts</p>
              <p className="text-3xl font-bold text-red-600">{dropData.totalInactive}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <UserX className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">With Active Siblings</p>
              <p className="text-3xl font-bold text-orange-600">{dropData.inactiveWithSiblings}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Re-engagement Rate</p>
              <p className="text-3xl font-bold text-blue-600">{dropData.reEngagementRate}%</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Successful Re-enrollments</p>
              <p className="text-3xl font-bold text-green-600">{dropData.reEnrollments}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date Range</label>
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="aug-2023-aug-2024">Aug 2023 - Aug 2024</option>
                <option value="current-year">Current Year</option>
                <option value="last-6-months">Last 6 Months</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="siblings"
                checked={showSiblings}
                onChange={(e) => setShowSiblings(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="siblings" className="text-sm font-medium text-slate-700">
                Show only families with active siblings
              </label>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Refresh Report
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Inactive Accounts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Inactive Accounts</h3>
          <p className="text-sm text-slate-600">
            Showing {filteredAccounts.length} of {inactiveAccounts.length} inactive accounts
          </p>
        </div>
        
        {filteredAccounts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-700">Family</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Student</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Program</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Drop Date</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Reason</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Siblings</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Last Contact</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4">
                      <p className="font-medium text-slate-800">{account.family}</p>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-slate-800">{account.student}</p>
                        <p className="text-sm text-slate-600">{account.age} years old</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-slate-800">{account.program}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-slate-800">{account.dropDate}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-slate-600">{account.reason}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        account.hasSiblings 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {account.hasSiblings ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="p-4">
                      <p className="text-slate-600">{account.lastContact || 'Never'}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
                        {account.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <TrendingDown className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">No inactive accounts found</h3>
            <p className="text-slate-500 mb-4">
              {showSiblings 
                ? 'No inactive accounts with active siblings in the selected date range' 
                : 'No inactive accounts found in the selected date range'}
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto">
              <RefreshCw className="h-4 w-4" />
              Refresh Report
            </button>
          </div>
        )}
      </div>

      {/* Re-engagement Campaign */}
      <div className="mt-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Launch Re-engagement Campaign</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left hover:bg-white/30 transition-colors">
            <TrendingDown className="h-6 w-6 mb-2" />
            <p className="font-medium">Voicemail Campaign</p>
            <p className="text-sm opacity-90">Target all inactive accounts</p>
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left hover:bg-white/30 transition-colors">
            <Users className="h-6 w-6 mb-2" />
            <p className="font-medium">Sibling Outreach</p>
            <p className="text-sm opacity-90">Focus on families with active siblings</p>
          </button>
          <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left hover:bg-white/30 transition-colors">
            <Calendar className="h-6 w-6 mb-2" />
            <p className="font-medium">Trial Offers</p>
            <p className="text-sm opacity-90">Send special comeback offers</p>
          </button>
        </div>
      </div>
    </div>
  );
};