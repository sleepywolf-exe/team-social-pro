import React from 'react';
import { TrendingUp, Calendar, Users, Zap, Instagram, Linkedin, Music, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import heroImage from '@/assets/hero-dashboard.jpg';

export const Dashboard: React.FC = () => {
  const upcomingPosts = [
    {
      id: 1,
      title: "Product Launch Announcement",
      scheduledFor: "Today, 2:00 PM",
      channels: ['instagram', 'linkedin'],
      status: 'approved'
    },
    {
      id: 2,
      title: "Behind the Scenes Video",
      scheduledFor: "Tomorrow, 10:00 AM",
      channels: ['instagram', 'tiktok'],
      status: 'pending'
    },
    {
      id: 3,
      title: "Customer Success Story",
      scheduledFor: "Dec 20, 3:00 PM",
      channels: ['linkedin'],
      status: 'draft'
    }
  ];

  const metrics = [
    { label: 'Total Reach', value: '2.4M', change: '+15%', trend: 'up' },
    { label: 'Engagement Rate', value: '4.2%', change: '+8%', trend: 'up' },
    { label: 'Posts This Week', value: '24', change: '+12%', trend: 'up' },
    { label: 'Pending Approval', value: '3', change: '-2', trend: 'down' }
  ];

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'instagram': return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'linkedin': return <Linkedin className="w-4 h-4 text-blue-600" />;
      case 'tiktok': return <Music className="w-4 h-4 text-black" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'draft': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-hero shadow-elevation">
        <img 
          src={heroImage} 
          alt="Social Media OS Dashboard"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="relative p-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-white mb-4">
              Welcome back to Social Media OS
            </h1>
            <p className="text-white/80 text-lg mb-6">
              Your unified platform for managing social media campaigns across Instagram, LinkedIn, TikTok, and more.
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" size="lg" onClick={() => window.location.hash = '#calendar'}>
                <Calendar className="w-5 h-5" />
                View Calendar
              </Button>
              <Button variant="ai" size="lg" onClick={() => window.location.hash = '#composer'}>
                <Zap className="w-5 h-5" />
                Create with AI
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="bg-gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className={`text-sm flex items-center gap-1 ${
                    metric.trend === 'up' ? 'text-success' : 'text-warning'
                  }`}>
                    <ArrowUpRight className={`w-3 h-3 ${
                      metric.trend === 'down' ? 'rotate-180' : ''
                    }`} />
                    {metric.change}
                  </div>
                </div>
                <TrendingUp className={`w-8 h-8 ${
                  metric.trend === 'up' ? 'text-success' : 'text-warning'
                }`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Posts */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Posts</CardTitle>
              <Button variant="outline" size="sm" onClick={() => window.location.hash = '#calendar'}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-gradient-card">
                  <div className="flex-1">
                    <h4 className="font-medium">{post.title}</h4>
                    <p className="text-sm text-muted-foreground">{post.scheduledFor}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {post.channels.map((channel, idx) => (
                        <div key={idx} className="flex items-center">
                          {getChannelIcon(channel)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Badge variant={getStatusColor(post.status) as any}>
                    {post.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Channel Health */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="hero" className="w-full justify-start" size="sm" onClick={() => window.location.hash = '#composer'}>
                <Zap className="w-4 h-4" />
                Create AI Campaign
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm" onClick={() => window.location.hash = '#calendar'}>
                <Calendar className="w-4 h-4" />
                Schedule Post
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm" onClick={() => window.location.hash = '#approvals'}>
                <Users className="w-4 h-4" />
                Review Approvals
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Channel Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-500" />
                    <span className="text-sm">Instagram</span>
                  </div>
                  <Badge variant="success">Connected</Badge>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">LinkedIn</span>
                  </div>
                  <Badge variant="success">Connected</Badge>
                </div>
                <Progress value={88} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Music className="w-4 h-4" />
                    <span className="text-sm">TikTok</span>
                  </div>
                  <Badge variant="warning">Reauth Needed</Badge>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};