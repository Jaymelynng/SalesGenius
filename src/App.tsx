import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { LeadManagement } from './components/LeadManagement';
import { DropReport } from './components/DropReport';
import { VoicemailCampaign } from './components/VoicemailCampaign';
import { CampTelethon } from './components/CampTelethon';
import { Scripts } from './components/Scripts';
import { Reports } from './components/Reports';
import { Sidebar } from './components/Sidebar';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <LeadManagement />;
      case 'drop-report':
        return <DropReport />;
      case 'voicemail':
        return <VoicemailCampaign />;
      case 'camp-telethon':
        return <CampTelethon />;
      case 'scripts':
        return <Scripts />;
      case 'reports':
        return <Reports />;
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