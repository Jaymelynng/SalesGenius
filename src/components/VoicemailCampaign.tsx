import React, { useState } from 'react';
import { 
  Phone, 
  Play, 
  Pause, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Target,
  Users,
  TrendingUp,
  Download,
  RefreshCw
} from 'lucide-react';

export const VoicemailCampaign: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentScript, setCurrentScript] = useState('reengagement');

  const campaignStats = {
    totalCalls: 362,
    successfulVoicemails: 311,
    failedVoicemails: 51,
    successRate: 85.91,
    inactiveAccounts: 352,
    responses: 43,
    reEnrollments: 15
  };

  const scripts = {
    reengagement: `Hi, it's Jocelyn from Oasis Gymnastics. I'm reaching out because you were previously enrolled with us, and I have some exciting updates to share. We're under new leadership and have made some fantastic improvements that I think you'll love. Plus, we've introduced a new Membership Program offering perks like up to 50% off open gyms and Kids' Nights Out. I'd love to invite you to a free trial class, either in the program you were previously enrolled in or perhaps try something new. We're reopening tumbling and open gyms, and we're also offering programs in gymnastics and ninja. Keep an eye out for a follow-up email with all our program details. You can easily register through our customer portal or sign up for a free trial. If you have any questions, just give us a call. We'd love to welcome you back to Oasis Gymnastics!`,
    siblings: `Hi, this is Jocelyn from Oasis Gymnastics. I noticed that while your family still has active members with us, one of your children hasn't been enrolled recently. We have some exciting new programs and improvements that I'd love to share with you. As a current family, you're eligible for our special member rates and our new Membership Program benefits. I'd love to invite your child back for a free trial class to see all the improvements we've made. You can register through your existing customer portal or give us a call. We'd love to have your whole family active with us again!`,
    newLeads: `Hi, this is [Your Name] from Oasis Gymnastics. Thank you for your interest in our programs! I wanted to personally reach out to let you know about our current offerings and help answer any questions you might have. We're currently offering free trial classes for new families, and I'd love to help you find the perfect program for your child. You can schedule online through our customer portal, or feel free to call us directly. We're excited about the possibility of welcoming your family to Oasis Gymnastics!`
  };

  const recentCalls = [
    { name: 'Johnson Family', phone: '(555) 123-4567', status: 'success', response: 'trial-scheduled', time: '10:30 AM' },
    { name: 'Smith Family', phone: '(555) 234-5678', status: 'success', response: 'pending', time: '10:45 AM' },
    { name: 'Davis Family', phone: '(555) 345-6789', status: 'failed', response: 'full-mailbox', time: '11:00 AM' },
    { name: 'Wilson Family', phone: '(555) 456-7890', status: 'success', response: 'enrolled', time: '11:15 AM' },
    { name: 'Brown Family', phone: '(555) 567-8901', status: 'success', response: 'callback-requested', time: '11:30 AM' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'failed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getResponseColor = (response: string) => {
    switch (response) {
      case 'enrolled': return 'bg-green-100 text-green-800';
      case 'trial-scheduled': return 'bg-blue-100 text-blue-800';
      case 'callback-requested': return 'bg-orange-100 text-orange-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Voicemail Campaign Manager</h1>
        <p className="text-slate-600">Manage and track your lead re-engagement voicemail campaigns</p>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Total Calls Made</p>
              <p className="text-3xl font-bold text-blue-600">{campaignStats.totalCalls}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Success Rate</p>
              <p className="text-3xl font-bold text-green-600">{campaignStats.successRate}%</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${campaignStats.successRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Responses Generated</p>
              <p className="text-3xl font-bold text-purple-600">{campaignStats.responses}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Re-enrollments</p>
              <p className="text-3xl font-bold text-orange-600">{campaignStats.reEnrollments}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Script Manager */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Campaign Scripts</h3>
          
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setCurrentScript('reengagement')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentScript === 'reengagement'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Re-engagement
            </button>
            <button
              onClick={() => setCurrentScript('siblings')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentScript === 'siblings'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Siblings
            </button>
            <button
              onClick={() => setCurrentScript('newLeads')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentScript === 'newLeads'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              New Leads
            </button>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <span className="text-sm font-medium text-slate-700">
                {isPlaying ? 'Playing Script' : 'Click to Practice'}
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {scripts[currentScript as keyof typeof scripts]}
            </p>
          </div>

          <div className="flex gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Start Campaign
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Script
            </button>
          </div>
        </div>

        {/* Recent Campaign Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Recent Campaign Activity</h3>
            <button className="text-blue-600 hover:text-blue-700">
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            {recentCalls.map((call, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {call.status === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium text-slate-800">{call.name}</p>
                    <p className="text-sm text-slate-600">{call.phone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getResponseColor(call.response)}`}>
                    {call.response.replace('-', ' ').toUpperCase()}
                  </span>
                  <p className="text-sm text-slate-500 mt-1">{call.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Results Summary */}
      <div className="mt-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Campaign Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{campaignStats.successfulVoicemails}</div>
            <div className="text-sm opacity-90">Successful Voicemails</div>
            <div className="text-xs opacity-75">Out of {campaignStats.totalCalls} calls</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{campaignStats.responses}</div>
            <div className="text-sm opacity-90">Active Responses</div>
            <div className="text-xs opacity-75">From voicemail recipients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">{((campaignStats.reEnrollments / campaignStats.responses) * 100).toFixed(1)}%</div>
            <div className="text-sm opacity-90">Conversion Rate</div>
            <div className="text-xs opacity-75">Responses to enrollments</div>
          </div>
        </div>
      </div>
    </div>
  );
};