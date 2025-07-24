import React, { useState } from 'react';
import { 
  Calendar, 
  Target, 
  Phone, 
  Users, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  Gift
} from 'lucide-react';

export const CampTelethon: React.FC = () => {
  const [activeCamp, setActiveCamp] = useState('winter');

  const campStats = {
    winter: {
      totalCalls: 156,
      conversions: 23,
      revenue: 3450,
      conversionRate: 14.7,
      avgRevenue: 150
    },
    summer: {
      totalCalls: 0,
      conversions: 0,
      revenue: 0,
      conversionRate: 0,
      avgRevenue: 175
    }
  };

  const promoOffers = {
    winter: {
      code: 'THANKS15',
      discount: '15% off',
      description: 'Winter Camp Early Bird Special',
      expires: 'Today Only',
      eligibility: 'All families'
    },
    summer: {
      code: 'FLEXIBLE2024',
      discount: 'Early Bird Pricing',
      description: 'Flexible Prepaid Summer Camp',
      expires: 'March 1st deadline',
      eligibility: 'Advanced bookings'
    }
  };

  const recentCalls = [
    {
      family: 'Thompson Family',
      student: 'Mia Thompson',
      outcome: 'enrolled',
      weeks: 2,
      revenue: 280,
      time: '2:30 PM',
      notes: 'Enrolled for both Winter Break weeks'
    },
    {
      family: 'Rodriguez Family',
      student: 'Carlos Rodriguez',
      outcome: 'interested',
      weeks: 1,
      revenue: 0,
      time: '2:15 PM',
      notes: 'Requested callback tomorrow'
    },
    {
      family: 'Chen Family',
      student: 'Lily Chen',
      outcome: 'enrolled',
      weeks: 1,
      revenue: 140,
      time: '2:00 PM',
      notes: 'Used THANKS15 promo code'
    },
    {
      family: 'Anderson Family',
      student: 'Jake Anderson',
      outcome: 'declined',
      weeks: 0,
      revenue: 0,
      time: '1:45 PM',
      notes: 'Schedule conflict during Winter Break'
    }
  ];

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'enrolled': return 'bg-green-100 text-green-800';
      case 'interested': return 'bg-blue-100 text-blue-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentStats = campStats[activeCamp as keyof typeof campStats];
  const currentPromo = promoOffers[activeCamp as keyof typeof promoOffers];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Camp Telethon Dashboard</h1>
        <p className="text-slate-600">Manage camp enrollment campaigns and track performance</p>
      </div>

      {/* Camp Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-slate-800">Active Campaign:</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveCamp('winter')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCamp === 'winter'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Winter Camp
            </button>
            <button
              onClick={() => setActiveCamp('summer')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCamp === 'summer'
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Summer Camp
            </button>
          </div>
        </div>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Total Calls</p>
              <p className="text-3xl font-bold text-blue-600">{currentStats.totalCalls}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Enrollments</p>
              <p className="text-3xl font-bold text-green-600">{currentStats.conversions}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Conversion Rate</p>
              <p className="text-3xl font-bold text-purple-600">{currentStats.conversionRate}%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Target className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Revenue</p>
              <p className="text-3xl font-bold text-orange-600">${currentStats.revenue}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Avg Per Family</p>
              <p className="text-3xl font-bold text-teal-600">${currentStats.avgRevenue}</p>
            </div>
            <div className="bg-teal-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-teal-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Promotion */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Gift className="h-8 w-8" />
            <h3 className="text-xl font-semibold">Active Promotion</h3>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold">{currentPromo.code}</span>
              <span className="bg-white/30 px-3 py-1 rounded-full text-sm font-medium">
                {currentPromo.discount}
              </span>
            </div>
            <p className="text-lg font-medium mb-1">{currentPromo.description}</p>
            <p className="text-sm opacity-90">Expires: {currentPromo.expires}</p>
            <p className="text-sm opacity-90">Eligible: {currentPromo.eligibility}</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Quick Talking Points:</h4>
            <div className="text-sm space-y-1 opacity-90">
              <p>• Limited time offer - {activeCamp} camp special</p>
              <p>• Save money while securing your spot</p>
              <p>• Popular weeks fill up quickly</p>
              <p>• Flexible scheduling options available</p>
            </div>
          </div>
        </div>

        {/* Call Script */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            {activeCamp === 'winter' ? 'Winter Camp' : 'Summer Camp'} Script
          </h3>
          
          <div className="bg-slate-50 rounded-lg p-4 mb-4">
            <div className="space-y-3 text-sm text-slate-700">
              <div>
                <strong>Opening:</strong>
                <p>"Hi [Parent's Name], this is [Your Name] from Oasis Gymnastics! I hope you're doing well today."</p>
              </div>
              
              <div>
                <strong>Purpose:</strong>
                <p>"I'm reaching out to share some exciting updates about our upcoming {activeCamp} camps. We're running a special promotion today for families who sign up early."</p>
              </div>
              
              {activeCamp === 'winter' ? (
                <div>
                  <strong>Winter Offer:</strong>
                  <p>"We've reactivated our THANKS15 promo code, which gives you 15% off Winter Camp if you sign up today. This offer was originally just for Thanksgiving camp families, but we've extended it to everyone for today only!"</p>
                </div>
              ) : (
                <div>
                  <strong>Summer Offer:</strong>
                  <p>"For Summer Camp, we're offering a Flexible Prepaid option with early bird pricing. You can secure your spot now and decide on your camp weeks later, as long as you finalize your weeks by March 1st."</p>
                </div>
              )}
              
              <div>
                <strong>Close:</strong>
                <p>"This is a great opportunity to lock in your child's spot and save. Can I help you with the enrollment process right now?"</p>
              </div>
            </div>
          </div>

          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Start Calling
          </button>
        </div>
      </div>

      {/* Recent Calls */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Recent Campaign Calls</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left p-4 font-semibold text-slate-700">Family</th>
                <th className="text-left p-4 font-semibold text-slate-700">Student</th>
                <th className="text-left p-4 font-semibold text-slate-700">Outcome</th>
                <th className="text-left p-4 font-semibold text-slate-700">Weeks</th>
                <th className="text-left p-4 font-semibold text-slate-700">Revenue</th>
                <th className="text-left p-4 font-semibold text-slate-700">Time</th>
                <th className="text-left p-4 font-semibold text-slate-700">Notes</th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((call, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4">
                    <p className="font-medium text-slate-800">{call.family}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-slate-800">{call.student}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOutcomeColor(call.outcome)}`}>
                      {call.outcome.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-slate-800">{call.weeks}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-slate-800">
                      {call.revenue > 0 ? `$${call.revenue}` : '-'}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="text-slate-600">{call.time}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-slate-600">{call.notes}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};