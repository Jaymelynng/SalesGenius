import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  Filter,
  Users,
  Phone,
  Target,
  DollarSign,
  CheckCircle,
  Clock
} from 'lucide-react';

export const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [reportType, setReportType] = useState('overview');

  // TODO: Replace with API calls to fetch analytics data
  const overviewMetrics = {
    totalLeads: 0,
    conversions: 0,
    conversionRate: 0,
    revenue: 0,
    avgRevenuePerLead: 0,
    voicemailSuccessRate: 0,
    reEngagements: 0,
    dropReportResults: 0
  };

  // TODO: Replace with API calls to fetch campaign performance data
  const campaignPerformance: Array<{
    name: string;
    calls: number;
    success: number;
    conversions: number;
    revenue: number;
  }> = [];

  // TODO: Replace with API calls to fetch monthly trends data
  const monthlyTrends: Array<{
    month: string;
    leads: number;
    conversions: number;
    revenue: number;
  }> = [];

  // TODO: Replace with API calls to fetch lead sources data
  const leadSources: Array<{
    source: string;
    leads: number;
    percentage: number;
  }> = [];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Analytics & Reports</h1>
        <p className="text-slate-600">Comprehensive performance analytics and campaign insights</p>
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
                <option value="last-7-days">Last 7 Days</option>
                <option value="last-30-days">Last 30 Days</option>
                <option value="last-90-days">Last 90 Days</option>
                <option value="this-year">This Year</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="overview">Overview</option>
                <option value="campaigns">Campaign Performance</option>
                <option value="leads">Lead Analysis</option>
                <option value="revenue">Revenue Tracking</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Total Leads</p>
              <p className="text-3xl font-bold text-blue-600">{overviewMetrics.totalLeads}</p>
              {overviewMetrics.totalLeads > 0 && (
                <p className="text-sm text-green-600 mt-1">↑ 12% vs last period</p>
              )}
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Conversion Rate</p>
              <p className="text-3xl font-bold text-green-600">{overviewMetrics.conversionRate}%</p>
              {overviewMetrics.conversionRate > 0 && (
                <p className="text-sm text-green-600 mt-1">↑ 3.2% vs last period</p>
              )}
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-purple-600">${overviewMetrics.revenue.toLocaleString()}</p>
              {overviewMetrics.revenue > 0 && (
                <p className="text-sm text-green-600 mt-1">↑ 18% vs last period</p>
              )}
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Voicemail Success</p>
              <p className="text-3xl font-bold text-orange-600">{overviewMetrics.voicemailSuccessRate}%</p>
              {overviewMetrics.voicemailSuccessRate > 0 && (
                <p className="text-sm text-green-600 mt-1">↑ 2.1% vs last period</p>
              )}
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Phone className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Campaign Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Campaign Performance</h3>
          {campaignPerformance.length > 0 ? (
            <div className="space-y-4">
              {campaignPerformance.map((campaign, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-800">{campaign.name}</h4>
                    <span className="text-sm font-medium text-green-600">
                      ${campaign.revenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600">Calls Made</p>
                      <p className="font-semibold text-slate-800">{campaign.calls}</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Success Rate</p>
                      <p className="font-semibold text-slate-800">
                        {((campaign.success / campaign.calls) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-600">Conversions</p>
                      <p className="font-semibold text-slate-800">{campaign.conversions}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${(campaign.success / campaign.calls) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-slate-600 mb-2">No campaign data</h4>
              <p className="text-slate-500">Start running campaigns to see performance metrics</p>
            </div>
          )}
        </div>

        {/* Lead Sources */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Lead Sources</h3>
          {leadSources.length > 0 ? (
            <div className="space-y-4">
              {leadSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-blue-500 rounded" style={{
                      backgroundColor: `hsl(${210 + index * 30}, 70%, 50%)`
                    }}></div>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{source.source}</p>
                      <p className="text-xs text-slate-600">{source.percentage}%</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-800">{source.leads}</p>
                    <p className="text-xs text-slate-600">leads</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-slate-600 mb-2">No lead source data</h4>
              <p className="text-slate-500">Lead sources will appear here as you collect leads</p>
            </div>
          )}
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Monthly Performance Trends</h3>
        {monthlyTrends.length > 0 ? (
          <>
            <div className="grid grid-cols-6 gap-4">
              {monthlyTrends.map((month, index) => (
                <div key={index} className="text-center">
                  <div className="mb-2">
                    <div 
                      className="bg-blue-500 rounded-t mx-auto"
                      style={{ 
                        width: '40px', 
                        height: `${(month.conversions / 25) * 100}px`,
                        minHeight: '20px'
                      }}
                    ></div>
                    <div 
                      className="bg-blue-300 rounded-b mx-auto"
                      style={{ 
                        width: '40px', 
                        height: `${(month.leads / 80) * 60}px`,
                        minHeight: '10px'
                      }}
                    ></div>
                  </div>
                  <p className="text-sm font-medium text-slate-800">{month.month}</p>
                  <p className="text-xs text-slate-600">{month.conversions} conv</p>
                  <p className="text-xs text-green-600">${month.revenue}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-slate-600">Conversions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-300 rounded"></div>
                <span className="text-slate-600">Total Leads</span>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <TrendingUp className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-slate-600 mb-2">No trend data available</h4>
            <p className="text-slate-500">Monthly trends will appear here as you collect more data</p>
          </div>
        )}
      </div>

      {/* Performance Insights */}
      {overviewMetrics.totalLeads > 0 ? (
        <div className="mt-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-4">Performance Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <CheckCircle className="h-8 w-8 mb-2" />
              <h4 className="font-semibold mb-2">Campaign Performance</h4>
              <p className="text-sm opacity-90">Track your most successful campaigns and optimize based on performance data</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <TrendingUp className="h-8 w-8 mb-2" />
              <h4 className="font-semibold mb-2">Growth Opportunities</h4>
              <p className="text-sm opacity-90">Identify high-potential lead sources and focus your efforts for maximum impact</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <Target className="h-8 w-8 mb-2" />
              <h4 className="font-semibold mb-2">Optimization Focus</h4>
              <p className="text-sm opacity-90">Monitor success rates and maintain quality standards across all campaigns</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white text-center">
          <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
          <p className="text-lg opacity-90 mb-4">Begin tracking your sales performance with comprehensive analytics</p>
          <p className="text-sm opacity-75 mb-6">Start by adding leads, running campaigns, and tracking your success rates</p>
          <button className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 hover:bg-white/30 transition-colors">
            Start Your First Campaign
          </button>
        </div>
      )}
    </div>
  );
};