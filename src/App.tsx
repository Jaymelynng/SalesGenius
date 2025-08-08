import React, { useState } from 'react';
import { TrialConversionTracker } from './components/TrialConversionTracker';
import { AutomatedScripts } from './components/AutomatedScripts';
import { AutomatedAnalytics } from './components/AutomatedAnalytics';
import { EmailCampaignTracker } from './components/EmailCampaignTracker';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { LeadManagement } from './components/LeadManagement';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <LeadManagement />;
      case 'tracker':
        return <TrialConversionTracker />;
      case 'scripts':
        return <AutomatedScripts />;
      case 'analytics':
        return <AutomatedAnalytics />;
      case 'email-campaigns':
        return <EmailCampaignTracker />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;