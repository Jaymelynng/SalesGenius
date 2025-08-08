import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  ArrowRight,
  Target,
  Zap,
  Phone,
  Mail,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { Lead, ConversionFunnel, TrialConversionStep } from '../types';

export const TrialConversionTracker: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [conversionSteps, setConversionSteps] = useState<TrialConversionStep[]>([]);
  const [funnelData, setFunnelData] = useState<ConversionFunnel[]>([]);
  const [selectedStage, setSelectedStage] = useState<string>('all');

  // TODO: Replace with API calls
  useEffect(() => {
    async function load() {
      try {
        const [leadsRes, stepsRes, funnelRes] = await Promise.all([
          fetch('/api/leads'),
          fetch('/api/conversion-steps'),
          fetch('/api/funnel')
        ]);
        const [leadsData, stepsData, funnelData] = await Promise.all([
          leadsRes.json(), stepsRes.json(), funnelRes.json()
        ]);
        setLeads(leadsData);
        setConversionSteps(stepsData);
        setFunnelData(funnelData);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Initial Contact': return 'bg-blue-500';
      case 'Trial Booking': return 'bg-purple-500';
      case 'Trial Attendance': return 'bg-orange-500';
      case 'Post-Trial Follow-up': return 'bg-green-500';
      case 'Enrollment Conversion': return 'bg-teal-500';
      default: return 'bg-gray-500';
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />;
      case 'sms': return <MessageSquare className="h-4 w-4" />;
      case 'call-reminder': return <Phone className="h-4 w-4" />;
      case 'task': return <CheckCircle className="h-4 w-4" />;
      case 'follow-up': return <Clock className="h-4 w-4" />;
      default: return <Zap className="h-4 w-4" />;
    }
  };

  const filteredLeads = selectedStage === 'all' 
    ? leads 
    : leads.filter(lead => lead.stage === selectedStage);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Trial-to-Conversion Tracker</h1>
        <p className="text-slate-600">Automated system to track and optimize your trial conversion process</p>
      </div>

      {/* Conversion Funnel Visualization */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-6">Conversion Funnel</h3>
        <div className="space-y-4">
          {funnelData.map((stage, index) => (
            <div key={stage.stage} className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full ${getStageColor(stage.stage)} flex items-center justify-center text-white text-sm font-bold`}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">{stage.stage}</h4>
                    <p className="text-sm text-slate-600">{stage.count} leads • {stage.percentage.toFixed(1)}% of total</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-800">{stage.conversionRate.toFixed(1)}%</p>
                  <p className="text-sm text-slate-600">conversion rate</p>
                </div>
              </div>
              
              <div className="ml-11">
                <div className="bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full ${getStageColor(stage.stage)}`}
                    style={{ width: `${stage.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Avg. time: {stage.averageTime}h</span>
                  <span>Drop-off: {stage.dropOffRate.toFixed(1)}%</span>
                </div>
              </div>
              
              {index < funnelData.length - 1 && (
                <div className="flex justify-center mt-4">
                  <ArrowRight className="h-5 w-5 text-slate-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Automated Actions Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Automated Actions by Stage</h3>
          <div className="space-y-4">
            {conversionSteps.map((step) => (
              <div key={step.id} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-slate-800">{step.name}</h4>
                  <span className="text-sm text-slate-600">{step.timeframe}h window</span>
                </div>
                <p className="text-sm text-slate-600 mb-3">{step.description}</p>
                <div className="space-y-2">
                  {step.automatedActions.map((action) => (
                    <div key={action.id} className="flex items-center space-x-3 p-2 bg-slate-50 rounded">
                      <div className="text-blue-600">
                        {getActionIcon(action.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">
                          {action.type.replace('-', ' ').toUpperCase()}
                        </p>
                        <p className="text-xs text-slate-600">
                          {action.trigger === 'delay' ? `${action.delay}h delay` : action.trigger}
                        </p>
                      </div>
                      <div className="text-xs text-slate-500">
                        {action.subject || action.template}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Real-time Metrics</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{leads.length}</div>
              <div className="text-sm text-blue-700">Active Leads</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {leads.filter(l => l.status === 'trial-scheduled').length}
              </div>
              <div className="text-sm text-green-700">Trials Scheduled</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {leads.filter(l => l.status === 'trial-completed').length}
              </div>
              <div className="text-sm text-purple-700">Trials Completed</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {leads.filter(l => l.status === 'enrolled').length}
              </div>
              <div className="text-sm text-orange-700">Conversions</div>
            </div>
          </div>

          {/* Automated Actions Status */}
          <div className="space-y-3">
            <h4 className="font-medium text-slate-800">Pending Automated Actions</h4>
            {leads.length === 0 ? (
              <div className="text-center py-6">
                <Zap className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-500">No pending actions</p>
              </div>
            ) : (
              <div className="space-y-2">
                {/* TODO: Calculate and display pending automated actions */}
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm text-yellow-800">Follow-up emails</span>
                  </div>
                  <span className="text-sm font-medium text-yellow-700">0 pending</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-blue-600" />
                    <span className="text-sm text-blue-800">Call reminders</span>
                  </div>
                  <span className="text-sm font-medium text-blue-700">0 pending</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lead Pipeline */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Lead Pipeline</h3>
            <div className="flex gap-2">
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
              >
                <option value="all">All Stages</option>
                <option value="initial-contact">Initial Contact</option>
                <option value="trial-booking">Trial Booking</option>
                <option value="trial-attendance">Trial Attendance</option>
                <option value="follow-up">Follow-up</option>
                <option value="conversion">Conversion</option>
              </select>
            </div>
          </div>
        </div>

        {filteredLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left p-4 font-semibold text-slate-700">Lead</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Stage</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Next Action</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Timeline</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Probability</th>
                  <th className="text-left p-4 font-semibold text-slate-700">Value</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4">
                      <div>
                        <p className="font-medium text-slate-800">{lead.name}</p>
                        <p className="text-sm text-slate-600">{lead.studentName} ({lead.studentAge}y)</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lead.stage === 'conversion' ? 'bg-green-100 text-green-800' :
                        lead.stage === 'follow-up' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {lead.stage.replace('-', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-600">Follow-up email</span>
                      </div>
                    </td>
                    <td className="p-4">
                                             <p className="text-sm text-slate-600">
                        {lead.nextFollowUpDate ? 
                          new Date(lead.nextFollowUpDate as unknown as string).toLocaleDateString() : 
                          'Not scheduled'
                        }
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${lead.conversionProbability}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-slate-600">{lead.conversionProbability}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-slate-800">${lead.revenue}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <Target className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-slate-600 mb-2">No leads in pipeline</h4>
            <p className="text-slate-500 mb-4">Start adding leads to see your conversion tracking in action</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Add First Lead
            </button>
          </div>
        )}
      </div>
    </div>
  );
};