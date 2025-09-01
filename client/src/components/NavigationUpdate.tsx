import React from 'react';
import { BarChart3, Calendar, PenTool, Image, Users, Settings, Share2 } from 'lucide-react';
import { Dashboard } from './Dashboard';
import { CalendarView } from './CalendarView';
import { AIComposer } from './AIComposer';
import { AnalyticsView } from './AnalyticsView';
import { AssetsView } from './AssetsView';
import { ApprovalsView } from './ApprovalsView';
import { SettingsView } from './SettingsView';
import { SocialMediaAccountsView } from './SocialMediaAccountsView';

interface NavigationProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export const getViewComponent = (activeView: string) => {
  switch (activeView) {
    case 'dashboard':
      return <Dashboard />;
    case 'calendar':
      return <CalendarView />;
    case 'composer':
      return <AIComposer />;
    case 'analytics':
      return <AnalyticsView />;
    case 'assets':
      return <AssetsView />;
    case 'approvals':
      return <ApprovalsView />;
    case 'accounts':
      return <SocialMediaAccountsView />;
    case 'settings':
      return <SettingsView />;
    default:
      return <Dashboard />;
  }
};

export const navigationItems = [
  { key: 'dashboard', icon: BarChart3, label: 'Dashboard' },
  { key: 'calendar', icon: Calendar, label: 'Calendar' },
  { key: 'composer', icon: PenTool, label: 'Composer' },
  { key: 'analytics', icon: BarChart3, label: 'Analytics' },
  { key: 'assets', icon: Image, label: 'Assets' },
  { key: 'accounts', icon: Share2, label: 'Social Accounts' },
  { key: 'approvals', icon: Users, label: 'Approvals' },
  { key: 'settings', icon: Settings, label: 'Settings' }
];