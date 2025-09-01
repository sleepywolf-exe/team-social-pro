import React from 'react';
import { TrendingUp, TrendingDown, Calendar, Download, Filter, Instagram, Linkedin, Music } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ElementType;
}

const metrics: MetricCard[] = [
  { title: 'Total Reach', value: '2.4M', change: '+15%', trend: 'up', icon: TrendingUp },
  { title: 'Engagement Rate', value: '4.2%', change: '+8%', trend: 'up', icon: TrendingUp },
  { title: 'Followers Growth', value: '+1,247', change: '+23%', trend: 'up', icon: TrendingUp },
  { title: 'Click-through Rate', value: '2.8%', change: '-5%', trend: 'down', icon: TrendingDown }
];

const channelPerformance = [
  { channel: 'instagram', name: 'Instagram', posts: 18, reach: '890K', engagement: '4.8%', growth: '+12%' },
  { channel: 'linkedin', name: 'LinkedIn', posts: 12, reach: '245K', engagement: '6.2%', growth: '+18%' },
  { channel: 'tiktok', name: 'TikTok', posts: 8, reach: '1.2M', engagement: '8.4%', growth: '+35%' }
];

const topPosts = [
  {
    id: 1,
    title: 'Product launch video',
    channel: 'instagram',
    reach: '124K',
    engagement: '7.2%',
    date: '2 days ago'
  },
  {
    id: 2,
    title: 'Industry insights article',
    channel: 'linkedin',
    reach: '89K',
    engagement: '9.1%',
    date: '5 days ago'
  },
  {
    id: 3,
    title: 'Behind the scenes content',
    channel: 'tiktok',
    reach: '245K',
    engagement: '12.3%',
    date: '1 week ago'
  }
];

export const AnalyticsView: React.FC = () => {
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'instagram': return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'linkedin': return <Linkedin className="w-4 h-4 text-blue-600" />;
      case 'tiktok': return <Music className="w-4 h-4 text-black" />;
      default: return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Insights</h1>
          <p className="text-muted-foreground">Track performance and optimize your social media strategy</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="bg-gradient-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className={`text-sm flex items-center gap-1 ${
                      metric.trend === 'up' ? 'text-success' : 'text-warning'
                    }`}>
                      <Icon className="w-3 h-3" />
                      {metric.change}
                    </div>
                  </div>
                  <Icon className={`w-8 h-8 ${
                    metric.trend === 'up' ? 'text-success' : 'text-warning'
                  }`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Channel Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {channelPerformance.map((channel) => (
                <div key={channel.channel} className="flex items-center justify-between p-4 border border-border rounded-lg bg-gradient-card">
                  <div className="flex items-center gap-3">
                    {getChannelIcon(channel.channel)}
                    <div>
                      <h4 className="font-medium">{channel.name}</h4>
                      <p className="text-sm text-muted-foreground">{channel.posts} posts this month</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-4 text-sm">
                      <div>
                        <div className="font-medium">{channel.reach}</div>
                        <div className="text-muted-foreground">Reach</div>
                      </div>
                      <div>
                        <div className="font-medium">{channel.engagement}</div>
                        <div className="text-muted-foreground">Engagement</div>
                      </div>
                      <div>
                        <Badge variant="success" className="text-xs">
                          {channel.growth}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPosts.map((post, index) => (
                <div key={post.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-gradient-card">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-medium">{post.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {getChannelIcon(post.channel)}
                        {post.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{post.reach} reach</div>
                    <div className="text-sm text-success">{post.engagement} engagement</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engagement Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Best Times to Post</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-8 gap-2 text-center text-sm">
              <div></div>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="font-medium text-muted-foreground">{day}</div>
              ))}
            </div>
            
            {['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'].map(time => (
              <div key={time} className="grid grid-cols-8 gap-2">
                <div className="text-sm text-muted-foreground font-medium">{time}</div>
                {Array.from({ length: 7 }, (_, i) => {
                  const intensity = Math.random();
                  return (
                    <div
                      key={i}
                      className={`h-8 rounded-md flex items-center justify-center text-xs font-medium ${
                        intensity > 0.7 ? 'bg-success text-success-foreground' :
                        intensity > 0.4 ? 'bg-primary/50 text-primary-foreground' :
                        intensity > 0.2 ? 'bg-warning/50 text-warning-foreground' :
                        'bg-muted text-muted-foreground'
                      }`}
                    >
                      {Math.round(intensity * 100)}%
                    </div>
                  );
                })}
              </div>
            ))}
            
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 bg-muted rounded-sm"></div>
                Low engagement
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 bg-success rounded-sm"></div>
                High engagement
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};