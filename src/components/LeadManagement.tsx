import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  User
} from 'lucide-react';

export const LeadManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // TODO: Replace with API calls to fetch leads data
  const leads: Array<{
    id: number;
    name: string;
    email: string;
    phone: string;
    student: string;
    age: number;
    action: string;
    details: string;
    status: 'completed' | 'pending' | 'needs-contact' | 'new';
    date: string;
    priority: 'high' | 'medium' | 'low';
  }> = [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'needs-contact': return 'bg-blue-100 text-blue-800';
      case 'new': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.student.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Lead Management</h1>
        <p className="text-slate-600">Track and manage all your leads and follow-ups</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search leads by name or student..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="needs-contact">Needs Contact</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Lead
            </button>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {filteredLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-700">Lead</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Contact</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Student</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Last Action</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Status</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Priority</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{lead.name}</p>
                          <p className="text-sm text-slate-600">{lead.date}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-600">{lead.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-600">{lead.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-slate-800">{lead.student}</p>
                        <p className="text-sm text-slate-600">{lead.age} years old</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-slate-800">{lead.action}</p>
                        <p className="text-sm text-slate-600">{lead.details}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {lead.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(lead.priority)}`}></div>
                        <span className="text-sm text-slate-600 capitalize">{lead.priority}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Phone className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                          <Mail className="h-4 w-4" />
                        </button>
                        <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg">
                          <Calendar className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">No leads found</h3>
            <p className="text-slate-500 mb-4">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'Add your first lead to get started'}
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto">
              <Plus className="h-4 w-4" />
              Add Lead
            </button>
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-medium text-green-800">Completed</span>
          </div>
          <p className="text-2xl font-bold text-green-700 mt-2">
            {leads.filter(l => l.status === 'completed').length}
          </p>
        </div>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <span className="font-medium text-orange-800">Pending</span>
          </div>
          <p className="text-2xl font-bold text-orange-700 mt-2">
            {leads.filter(l => l.status === 'pending').length}
          </p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-blue-800">Needs Contact</span>
          </div>
          <p className="text-2xl font-bold text-blue-700 mt-2">
            {leads.filter(l => l.status === 'needs-contact').length}
          </p>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-800">New Leads</span>
          </div>
          <p className="text-2xl font-bold text-purple-700 mt-2">
            {leads.filter(l => l.status === 'new').length}
          </p>
        </div>
      </div>
    </div>
  );
};