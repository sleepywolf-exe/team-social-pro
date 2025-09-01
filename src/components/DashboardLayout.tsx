import React, { useState } from 'react';
import { Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { navigationItems, getViewComponent } from './NavigationUpdate';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Social Media OS</span>
            </div>
            
            <div className="flex items-center gap-2 ml-8">
              <span className="text-sm text-muted-foreground">Workspace:</span>
              <Badge variant="secondary">Acme Corp Marketing</Badge>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4" />
              Invite Team
            </Button>
            <Button variant="ai" size="sm">
              <Zap className="w-4 h-4" />
              AI Assistant
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 bg-card/30 border-r border-border p-6">
          <nav className="space-y-2">
            {navigationItems.map(({ key, icon: Icon, label }) => (
              <Button
                key={key}
                variant={activeView === key ? "default" : "ghost"}
                className="w-full justify-start"
                size="sm"
                onClick={() => setActiveView(key)}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground">Quick Stats</h3>
            <Card className="bg-gradient-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Posts Published</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Engagement Rate</span>
                    <span className="font-semibold text-success">+12%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pending Approval</span>
                    <Badge variant="warning" className="text-xs">3</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {getViewComponent(activeView)}
        </main>
      </div>
    </div>
  );
};