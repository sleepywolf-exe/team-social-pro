import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Instagram, Linkedin, Music, Clock, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ScheduledPost {
  id: number;
  title: string;
  time: string;
  channel: 'instagram' | 'linkedin' | 'tiktok';
  status: 'scheduled' | 'published' | 'failed';
}

const mockPosts: Record<number, ScheduledPost[]> = {
  18: [
    { id: 1, title: 'Morning motivation post', time: '09:00', channel: 'instagram', status: 'scheduled' },
    { id: 2, title: 'Industry insights', time: '14:00', channel: 'linkedin', status: 'scheduled' }
  ],
  20: [
    { id: 3, title: 'Product demo video', time: '15:00', channel: 'tiktok', status: 'scheduled' },
    { id: 4, title: 'Team spotlight', time: '10:30', channel: 'instagram', status: 'published' }
  ],
  22: [
    { id: 5, title: 'Weekend vibes', time: '12:00', channel: 'instagram', status: 'scheduled' }
  ]
};

export const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'instagram': return <Instagram className="w-3 h-3 text-pink-500" />;
      case 'linkedin': return <Linkedin className="w-3 h-3 text-blue-600" />;
      case 'tiktok': return <Music className="w-3 h-3 text-black" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'success';
      case 'scheduled': return 'default';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Calendar</h1>
          <p className="text-muted-foreground">Plan and schedule your social media posts</p>
        </div>
        <Button variant="hero" size="lg">
          <Plus className="w-5 h-5" />
          Schedule Post
        </Button>
      </div>

      {/* Calendar Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h2 className="text-xl font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Clock className="w-4 h-4" />
                Time Zones
              </Button>
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4" />
                Team View
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Day Headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-3 text-center text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            
            {/* Empty cells for first week */}
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`empty-${i}`} className="p-3 min-h-[120px]" />
            ))}
            
            {/* Calendar Days */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const postsForDay = mockPosts[day] || [];
              const isToday = day === new Date().getDate() && 
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();
              
              return (
                <div 
                  key={day} 
                  className={`p-2 min-h-[120px] border border-border rounded-lg bg-card hover:bg-accent/50 cursor-pointer transition-colors ${
                    isToday ? 'border-primary bg-primary/5' : ''
                  }`}
                >
                  <div className={`text-sm font-medium mb-2 ${isToday ? 'text-primary' : ''}`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {postsForDay.slice(0, 3).map(post => (
                      <div
                        key={post.id}
                        className="p-1 rounded text-xs bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-1 mb-1">
                          {getChannelIcon(post.channel)}
                          <span className="text-xs">{post.time}</span>
                          <Badge variant={getStatusColor(post.status) as any} className="text-xs py-0 px-1">
                            {post.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {post.title}
                        </div>
                      </div>
                    ))}
                    {postsForDay.length > 3 && (
                      <div className="text-xs text-muted-foreground text-center py-1">
                        +{postsForDay.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">47 Posts</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Published</p>
                <p className="text-2xl font-bold text-success">32</p>
              </div>
              <Instagram className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-primary">12</p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold text-warning">3</p>
              </div>
              <Users className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};