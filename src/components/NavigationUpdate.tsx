import React from 'react';
import { BarChart3, Calendar, PenTool, Image, Users, Settings } from 'lucide-react';
import { Dashboard } from './Dashboard';
import { CalendarView } from './CalendarView';
import { AIComposer } from './AIComposer';
import { AnalyticsView } from './AnalyticsView';

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
      return <div className="p-6"><h1 className="text-3xl font-bold">Media Assets</h1><p className="text-muted-foreground">Manage your media library</p></div>;
    case 'approvals':
      return <div className="p-6"><h1 className="text-3xl font-bold">Approvals</h1><p className="text-muted-foreground">Review pending content</p></div>;
    case 'settings':
      return <div className="p-6"><h1 className="text-3xl font-bold">Settings</h1><p className="text-muted-foreground">Configure your workspace</p></div>;
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
  { key: 'approvals', icon: Users, label: 'Approvals' },
  { key: 'settings', icon: Settings, label: 'Settings' }
];