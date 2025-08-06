import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  TrendingUp, 
  Users, 
  MousePointer, 
  Eye,
  DollarSign,
  Filter,
  Search,
  Download,
  RefreshCw,
  BarChart3,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { EmailCampaign, EmailEngagement, CampaignPerformance, ClickedLink } from '../types';

export const EmailCampaignTracker: React.FC = () => {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [engagements, setEngagements] = useState<EmailEngagement[]>([]);
  const [campaignPerformance, setCampaignPerformance] = useState<CampaignPerformance[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string>('all');
  const [engagementFilter, setEngagementFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [enrollmentFilter, setEnrollmentFilter] = useState<string>('all');

  useEffect(() => {
    // TODO: Replace with ActiveCampaign API integration
    fetchCampaignData();
    fetchEngagementData();
    calculatePerformanceMetrics();
  }, []);

  const fetchCampaignData = async () => {
    // TODO: Integrate with ActiveCampaign API
    // Example: const response = await activeCampaignAPI.getCampaigns();
    setCampaigns([]);
  };

  const fetchEngagementData = async () => {
    // TODO: Integrate with ActiveCampaign API
    // Example: const response = await activeCampaignAPI.getEngagementData();
    setEngagements([]);
  };

  const calculatePerformanceMetrics = () => {
    // TODO: Calculate performance metrics from engagement data
    setCampaignPerformance([]);
  };

  const getEngagementLevel = (clicks: number) => {
    if (clicks >= 10) return { level: 'very-high', color: 'bg-red-100 text-red-800', label: 'Very High' };
    if (clicks >= 5) return { level: 'high', color: 'bg-orange-100 text-orange-800', label: 'High' };
    if (clicks >= 2) return { level: 'medium', color: 'bg-yellow-100 text-yellow-800', label: 'Medium' };
    if (clicks >= 1) return { level: 'low', color: 'bg-blue-100 text-blue-800', label: 'Low' };
    return { level: 'none', color: 'bg-gray-100 text-gray-800', label: 'None' };
  };

  const getEnrollmentStatus = (isEnrolled: boolean) => {
    return isEnrolled 
      ? { color: 'bg-green-100 text-green-800', label: 'Enrolled', icon: CheckCircle }
      : { color: 'bg-gray-100 text-gray-800', label: 'Not Enrolled', icon: AlertCircle };
  };

  const filteredEngagements = engagements.filter(engagement => {
    const matchesSearch = engagement.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         engagement.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCampaign = selectedCampaign === 'all' || engagement.campaignId === selectedCampaign;
    const matchesEngagement = engagementFilter === 'all' || 
                             (engagementFilter === 'high' && engagement.totalClicks >= 5) ||
                             (engagementFilter === 'medium' && engagement.totalClicks >= 2 && engagement.totalClicks < 5) ||
                             (engagementFilter === 'low' && engagement.totalClicks === 1) ||
                             (engagementFilter === 'none' && engagement.totalClicks === 0);
    const matchesEnrollment = enrollmentFilter === 'all' ||
                             (enrollmentFilter === 'enrolled' && engagement.isEnrolled) ||
                             (enrollmentFilter === 'not-enrolled' && !engagement.isEnrolled);
    
    return matchesSearch && matchesCampaign && matchesEngagement && matchesEnrollment;
  });

  const totalEngaged = engagements.filter(e => e.totalClicks > 0).length;
  const totalEnrolled = engagements.filter(e => e.isEnrolled).length;
  const averageClicks = engagements.length > 0 
    ? engagements.reduce((sum, e) => sum + e.totalClicks, 0) / engagements.length 
    : 0;
  const enrollmentRate = engagements.length > 0 
    ? (totalEnrolled / engagements.length) * 100 
    : 0;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Email Campaign Tracker</h1>
        <p className="text-slate-600">Track lead engagement, clicks, and conversions from ActiveCampaign</p>
      </div>

      {/* Campaign Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Total Engaged Leads</p>
              <p className="text-3xl font-bold text-blue-600">{totalEngaged}</p>
              <p className="text-sm text-slate-500 mt-1">Clicked at least once</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <MousePointer className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Enrollment Rate</p>
              <p className="text-3xl font-bold text-green-600">{enrollmentRate.toFixed(1)}%</p>
              <p className="text-sm text-slate-500 mt-1">{totalEnrolled} enrolled</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">Avg Clicks per Lead</p>
              <p className="text-3xl font-bold text-purple-600">{averageClicks.toFixed(1)}</p>
              <p className="text-sm text-slate-500 mt-1">Engagement level</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">High Engagement</p>
              <p className="text-3xl font-bold text-orange-600">
                {engagements.filter(e => e.totalClicks >= 5).length}
              </p>
              <p className="text-sm text-slate-500 mt-1">5+ clicks</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={selectedCampaign}
            onChange={(e) => setSelectedCampaign(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Campaigns</option>
            {campaigns.map(campaign => (
              <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
            ))}
          </select>

          <select
            value={engagementFilter}
            onChange={(e) => setEngagementFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Engagement</option>
            <option value="high">High (5+ clicks)</option>
            <option value="medium">Medium (2-4 clicks)</option>
            <option value="low">Low (1 click)</option>
            <option value="none">No Clicks</option>
          </select>

          <select
            value={enrollmentFilter}
            onChange={(e) => setEnrollmentFilter(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="enrolled">Enrolled</option>
            <option value="not-enrolled">Not Enrolled</option>
          </select>

          <div className="flex gap-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Sync
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Engagement Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800">Lead Engagement Details</h3>
          <p className="text-sm text-slate-600">
            Showing {filteredEngagements.length} of {engagements.length} leads
          </p>
        </div>

        {filteredEngagements.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-700">Lead</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Campaign</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Engagement</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Opens/Clicks</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Last Activity</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Enrollment</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Location</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEngagements.map((engagement) => {
                  const engagementLevel = getEngagementLevel(engagement.totalClicks);
                  const enrollmentStatus = getEnrollmentStatus(engagement.isEnrolled);
                  const StatusIcon = enrollmentStatus.icon;

                  return (
                    <tr key={engagement.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-slate-800">{engagement.fullName}</p>
                          <p className="text-sm text-slate-600">{engagement.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            {campaigns.find(c => c.id === engagement.campaignId)?.name || 'Unknown Campaign'}
                          </p>
                          <p className="text-xs text-slate-500">{engagement.leadSource}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${engagementLevel.color}`}>
                          {engagementLevel.label}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-700">{engagement.totalOpens}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MousePointer className="h-4 w-4 text-slate-400" />
                            <span className="text-slate-700 font-medium">{engagement.totalClicks}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="text-sm text-slate-700">
                            {engagement.lastOpened ? 
                              new Date(engagement.lastOpened).toLocaleDateString() : 
                              'Never opened'
                            }
                          </p>
                          <p className="text-xs text-slate-500">
                            {engagement.lastActivity ? 
                              `Active ${new Date(engagement.lastActivity).toLocaleDateString()}` : 
                              'No activity'
                            }
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <StatusIcon className="h-4 w-4" />
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${enrollmentStatus.color}`}>
                            {enrollmentStatus.label}
                          </span>
                        </div>
                        {engagement.isEnrolled && engagement.enrollmentValue && (
                          <p className="text-xs text-green-600 mt-1">
                            ${engagement.enrollmentValue}
                          </p>
                        )}
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-slate-600">
                          {engagement.city && engagement.region ? 
                            `${engagement.city}, ${engagement.region}` : 
                            '--'
                          }
                        </p>
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="View Details">
                            <ExternalLink className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Contact Lead">
                            <Mail className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Mail className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-600 mb-2">No engagement data found</h3>
            <p className="text-slate-500 mb-4">
              {searchTerm || selectedCampaign !== 'all' || engagementFilter !== 'all' || enrollmentFilter !== 'all'
                ? 'Try adjusting your filters to see more results'
                : 'Connect your ActiveCampaign account to start tracking email engagement'
              }
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 mx-auto">
              <RefreshCw className="h-4 w-4" />
              Sync ActiveCampaign Data
            </button>
          </div>
        )}
      </div>

      {/* Campaign Performance Summary */}
      {campaignPerformance.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Campaign Performance Summary</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {campaignPerformance.map((performance) => (
              <div key={performance.campaignId} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-slate-800">{performance.campaignName}</h4>
                  <span className="text-sm font-medium text-green-600">
                    ${performance.revenueGenerated.toLocaleString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{performance.totalEngaged}</p>
                    <p className="text-xs text-slate-600">Engaged</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{performance.totalEnrollments}</p>
                    <p className="text-xs text-slate-600">Enrolled</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{performance.averageClicksPerLead.toFixed(1)}</p>
                    <p className="text-xs text-slate-600">Avg Clicks</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">High Engagement (5+ clicks)</span>
                    <span className="font-medium">{performance.highEngagement}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Medium Engagement (2-4 clicks)</span>
                    <span className="font-medium">{performance.mediumEngagement}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Low Engagement (1 click)</span>
                    <span className="font-medium">{performance.lowEngagement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Integration Instructions */}
      <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">ActiveCampaign Integration</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <Target className="h-8 w-8 mb-2" />
            <h4 className="font-semibold mb-2">Automatic Tracking</h4>
            <p className="text-sm opacity-90">Sync email engagement data automatically from ActiveCampaign</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <CheckCircle className="h-8 w-8 mb-2" />
            <h4 className="font-semibold mb-2">Enrollment Detection</h4>
            <p className="text-sm opacity-90">Identify which leads converted to paid enrollments</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
            <BarChart3 className="h-8 w-8 mb-2" />
            <h4 className="font-semibold mb-2">Performance Analytics</h4>
            <p className="text-sm opacity-90">Track click frequency and campaign effectiveness</p>
          </div>
        </div>
      </div>
    </div>
  );
};