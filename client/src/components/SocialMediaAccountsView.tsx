import React, { useState } from 'react';
import { Plus, Settings, Trash2, RefreshCw, AlertCircle, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const connectedAccounts = [
  {
    id: 1,
    platform: 'Instagram',
    account: '@acmecorp',
    followers: '125K',
    status: 'connected',
    lastSync: '2024-02-20 14:30',
    brandId: 'acme-main',
    permissions: ['publish', 'read_insights'],
    icon: '📸'
  },
  {
    id: 2,
    platform: 'LinkedIn',
    account: 'Acme Corporation',
    followers: '45K',
    status: 'connected',
    lastSync: '2024-02-20 14:25',
    brandId: 'acme-main',
    permissions: ['publish', 'read_insights'],
    icon: '💼'
  },
  {
    id: 3,
    platform: 'TikTok',
    account: '@acme_official',
    followers: '89K',
    status: 'error',
    lastSync: '2024-02-19 10:15',
    brandId: 'acme-main',
    permissions: ['publish'],
    icon: '🎵'
  },
  {
    id: 4,
    platform: 'Instagram',
    account: '@acme_lifestyle',
    followers: '67K',
    status: 'pending',
    lastSync: null,
    brandId: 'acme-lifestyle',
    permissions: ['publish', 'read_insights'],
    icon: '📸'
  },
  {
    id: 5,
    platform: 'X (Twitter)',
    account: '@acmecorp',
    followers: '234K',
    status: 'connected',
    lastSync: '2024-02-20 14:20',
    brandId: 'acme-main',
    permissions: ['publish', 'read_insights'],
    icon: '🐦'
  }
];

const availablePlatforms = [
  { name: 'Instagram', icon: '📸', description: 'Connect Instagram Business accounts' },
  { name: 'LinkedIn', icon: '💼', description: 'Connect LinkedIn Company pages' },
  { name: 'TikTok', icon: '🎵', description: 'Connect TikTok Business accounts' },
  { name: 'X (Twitter)', icon: '🐦', description: 'Connect X/Twitter accounts' },
  { name: 'Facebook', icon: '👥', description: 'Connect Facebook pages' },
  { name: 'YouTube', icon: '📺', description: 'Connect YouTube channels' }
];

export const SocialMediaAccountsView = () => {
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'success';
      case 'error': return 'destructive';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredAccounts = connectedAccounts.filter(account => 
    selectedBrand === 'all' || account.brandId === selectedBrand
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Social Media Accounts</h1>
          <p className="text-muted-foreground">Manage connected social media platforms and accounts</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary">
              <Plus className="w-4 h-4" />
              Connect Account
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Connect Social Media Account</DialogTitle>
              <DialogDescription>
                Choose a platform to connect your social media account and start managing your content.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {availablePlatforms.map((platform) => (
                <Card key={platform.name} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{platform.icon}</div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">{platform.name}</h3>
                        <p className="text-sm text-muted-foreground">{platform.description}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Connected Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Across 5 platforms</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">560K</div>
            <p className="text-xs text-success">+12K this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Account Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">1 needs attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Publishing Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Platforms ready</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            <SelectItem value="acme-main">Acme Main</SelectItem>
            <SelectItem value="acme-lifestyle">Acme Lifestyle</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Connected Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAccounts.map((account) => (
          <Card key={account.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{account.icon}</div>
                  <div>
                    <CardTitle className="text-lg">{account.platform}</CardTitle>
                    <p className="text-sm text-muted-foreground">{account.account}</p>
                  </div>
                </div>
                <Badge variant={getStatusColor(account.status)} className="flex items-center gap-1">
                  {getStatusIcon(account.status)}
                  {account.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Followers:</span>
                  <div className="text-lg font-bold">{account.followers}</div>
                </div>
                <div>
                  <span className="font-medium">Brand:</span>
                  <div className="capitalize">{account.brandId.replace('-', ' ')}</div>
                </div>
              </div>
              
              <div>
                <span className="font-medium text-sm">Permissions:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {account.permissions.map((permission) => (
                    <Badge key={permission} variant="secondary" className="text-xs">
                      {permission.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>

              {account.lastSync && (
                <div className="text-sm text-muted-foreground">
                  Last sync: {account.lastSync}
                </div>
              )}

              {account.status === 'error' && (
                <div className="text-sm text-destructive">
                  ⚠️ Connection error - please reconnect to resume publishing
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <RefreshCw className="w-3 h-3" />
                  Sync
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="w-3 h-3" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Platform Analytics Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { platform: 'Instagram', engagement: '4.2%', reach: '89K', posts: '24' },
              { platform: 'LinkedIn', engagement: '6.8%', reach: '34K', posts: '12' },
              { platform: 'TikTok', engagement: '8.1%', reach: '156K', posts: '18' }
            ].map((stats) => (
              <div key={stats.platform} className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">{stats.platform}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Engagement Rate:</span>
                    <span className="font-semibold">{stats.engagement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekly Reach:</span>
                    <span className="font-semibold">{stats.reach}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Posts This Month:</span>
                    <span className="font-semibold">{stats.posts}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};