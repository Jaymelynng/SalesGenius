import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Clock,
  Users,
  DollarSign,
  Zap,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Calendar,
  Filter
} from 'lucide-react';
import { Analytics, ConversionFunnel } from '../types';

export const AutomatedAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [timeRange, setTimeRange] = useState<string>('30-days');
  const [selectedMetric, setSelectedMetric] = useState<string>('conversion-rate');

  useEffect(() => {
    // TODO: Replace with API calls
    setAnalytics({
      totalLeads: 0,
      trialsScheduled: 0,
      trialsCompleted: 0,
      conversions: 0,
      overallConversionRate: 0,
      averageTimeToConversion: 0,
      revenueGenerated: 0,
      averageRevenuePerLead: 0,
      stageMetrics: [
        { stage: 'Initial Contact', count: 0, percentage: 100, conversionRate: 0, averageTime: 0, dropOffRate: 0 },
        { stage: 'Trial Booking', count: 0, percentage: 0, conversionRate: 0, averageTime: 0, dropOffRate: 0 },
        { stage: 'Trial Attendance', count: 0, percentage: 0, conversionRate: 0, averageTime: 0, dropOffRate: 0 },
        { stage: 'Post-Trial Follow-up', count: 0, percentage: 0, conversionRate: 0, averageTime: 0, dropOffRate: 0 },
        { stage: 'Enrollment Conversion', count: 0, percentage: 0, conversionRate: 0, averageTime: 0, dropOffRate: 0 }
      ],
      topPerformingScripts: [],
      topPerformingEmails: []
    });
  }, [timeRange]);

  const getMetricChange = (current: number, previous: number) => {
    if (previous === 0) return { change: 0, isPositive: true };
    const change = ((current - previous) / previous) * 100;
    return { change: Math.abs(change), isPositive: change >= 0 };
  };

  const formatDuration = (hours: number) => {
    if (hours < 24) return `${hours}h`;
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days}d`;
  };

  if (!analytics) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="grid grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Automated Analytics Dashboard</h1>
        <p className="text-slate-600">Real-time insights into your trial-to-conversion performance</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Time Range</label>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="7-days">Last 7 Days</option>
                <option value="30-days">Last 30 Days</option>
                <option value="90-days">Last 90 Days</option>
                <option value="1-year">Last Year</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Focus Metric</label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="conversion-rate">Conversion Rate</option>
                <option value="time-to-conversion">Time to Conversion</option>
                <option value="revenue-per-lead">Revenue per Lead</option>
                <option value="stage-performance">Stage Performance</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-slate-600">
            <Calendar className="h-4 w-4 inline mr-1" />
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Total Leads</p>
              <p className="text-3xl font-bold text-blue-600">{analytics.totalLeads}</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">0% vs last period</span>
              </div>
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
              <p className="text-3xl font-bold text-green-600">{analytics.overallConversionRate.toFixed(1)}%</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">0% vs last period</span>
              </div>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Avg. Time to Convert</p>
              <p className="text-3xl font-bold text-purple-600">
                {formatDuration(analytics.averageTimeToConversion)}
              </p>
              <div className="flex items-center mt-2">
                <ArrowDown className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">0% faster</span>
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Revenue Generated</p>
              <p className="text-3xl font-bold text-orange-600">${analytics.revenueGenerated.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">0% vs last period</span>
              </div>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Funnel Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Conversion Funnel Performance</h3>
          <div className="space-y-4">
            {analytics.stageMetrics.map((stage, index) => (
              <div key={stage.stage} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-purple-500' :
                      index === 2 ? 'bg-orange-500' :
                      index === 3 ? 'bg-green-500' : 'bg-teal-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-800">{stage.stage}</h4>
                      <p className="text-sm text-slate-600">{stage.count} leads</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-800">{stage.conversionRate.toFixed(1)}%</p>
                    <p className="text-sm text-slate-600">conversion</p>
                  </div>
                </div>
                
                <div className="ml-11">
                  <div className="bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className={`h-3 rounded-full ${
                        index === 0 ? 'bg-blue-500' :
                        index === 1 ? 'bg-purple-500' :
                        index === 2 ? 'bg-orange-500' :
                        index === 3 ? 'bg-green-500' : 'bg-teal-500'
                      }`}
                      style={{ width: `${stage.percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Avg. time: {formatDuration(stage.averageTime)}</span>
                    <span>Drop-off: {stage.dropOffRate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Automation Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Automation Performance</h3>
          
          {analytics.topPerformingScripts.length > 0 || analytics.topPerformingEmails.length > 0 ? (
            <div className="space-y-6">
              {analytics.topPerformingScripts.length > 0 && (
                <div>
                  <h4 className="font-medium text-slate-700 mb-3">Top Performing Scripts</h4>
                  <div className="space-y-2">
                    {analytics.topPerformingScripts.slice(0, 3).map((script) => (
                      <div key={script.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-800">{script.title}</p>
                          <p className="text-sm text-slate-600">{script.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{script.successRate}%</p>
                          <p className="text-xs text-slate-500">success rate</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {analytics.topPerformingEmails.length > 0 && (
                <div>
                  <h4 className="font-medium text-slate-700 mb-3">Top Performing Emails</h4>
                  <div className="space-y-2">
                    {analytics.topPerformingEmails.slice(0, 3).map((email) => (
                      <div key={email.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-800">{email.name}</p>
                          <p className="text-sm text-slate-600">{email.stage}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">{email.conversionRate}%</p>
                          <p className="text-xs text-slate-500">conversion</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <Zap className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-slate-600 mb-2">No automation data yet</h4>
              <p className="text-slate-500">Start using scripts and email templates to see performance metrics</p>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Detailed Performance Metrics</h3>
        
        {analytics.totalLeads > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {((analytics.trialsScheduled / analytics.totalLeads) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-blue-700 mb-2">Trial Booking Rate</div>
              <div className="text-xs text-slate-600">
                {analytics.trialsScheduled} of {analytics.totalLeads} leads
              </div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {analytics.trialsScheduled > 0 ? 
                  ((analytics.trialsCompleted / analytics.trialsScheduled) * 100).toFixed(1) : 0}%
              </div>
              <div className="text-sm text-green-700 mb-2">Trial Attendance Rate</div>
              <div className="text-xs text-slate-600">
                {analytics.trialsCompleted} of {analytics.trialsScheduled} scheduled
              </div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                ${analytics.averageRevenuePerLead.toFixed(0)}
              </div>
              <div className="text-sm text-purple-700 mb-2">Revenue per Lead</div>
              <div className="text-xs text-slate-600">
                ${analytics.revenueGenerated} total revenue
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-slate-600 mb-2">No data available</h4>
            <p className="text-slate-500">Start tracking leads to see detailed performance metrics</p>
          </div>
        )}
      </div>

      {/* Insights and Recommendations */}
      <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">AI-Powered Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <TrendingUp className="h-8 w-8 mb-2" />
            <h4 className="font-semibold mb-2">Optimization Opportunities</h4>
            <p className="text-sm opacity-90">Identify bottlenecks in your conversion funnel and get actionable recommendations</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <Target className="h-8 w-8 mb-2" />
            <h4 className="font-semibold mb-2">Performance Benchmarks</h4>
            <p className="text-sm opacity-90">Compare your metrics against industry standards and top performers</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <CheckCircle className="h-8 w-8 mb-2" />
            <h4 className="font-semibold mb-2">Automated Alerts</h4>
            <p className="text-sm opacity-90">Get notified when metrics drop below thresholds or opportunities arise</p>
          </div>
        </div>
      </div>
    </div>
  );
};