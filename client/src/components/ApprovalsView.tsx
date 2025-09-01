import React, { useState } from 'react';
import { Check, X, MessageCircle, Clock, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const mockApprovals = [
  {
    id: 1,
    postTitle: 'Summer Product Launch Campaign',
    creator: 'Sarah Johnson',
    createdDate: '2024-02-20',
    scheduledDate: '2024-02-25 14:30',
    status: 'pending',
    content: 'Excited to announce our new summer collection! ☀️ Perfect for beach days and outdoor adventures. Get 20% off with code SUMMER20 #SummerVibes #NewCollection',
    channel: 'Instagram',
    comments: []
  },
  {
    id: 2,
    postTitle: 'LinkedIn Thought Leadership',
    creator: 'Mike Chen',
    createdDate: '2024-02-19',
    scheduledDate: '2024-02-24 09:00',
    status: 'pending',
    content: 'The future of B2B marketing lies in authentic storytelling and data-driven insights. Here are 5 key trends shaping our industry in 2024...',
    channel: 'LinkedIn',
    comments: [
      { author: 'Lisa Park', comment: 'Great insights! Could we add some statistics to support point 3?', date: '2024-02-20' }
    ]
  },
  {
    id: 3,
    postTitle: 'TikTok Dance Challenge',
    creator: 'Alex Rodriguez',
    createdDate: '2024-02-18',
    scheduledDate: '2024-02-23 16:00',
    status: 'approved',
    content: 'Join our #BrandDanceChallenge! Show us your moves with our new track 🎵 Winner gets a year supply of products!',
    channel: 'TikTok',
    comments: []
  },
  {
    id: 4,
    postTitle: 'Product Demo Video',
    creator: 'Emily Davis',
    createdDate: '2024-02-17',
    scheduledDate: '2024-02-22 11:00',
    status: 'rejected',
    content: 'Check out how easy it is to use our new app feature! Swipe up for the full tutorial.',
    channel: 'Instagram',
    comments: [
      { author: 'Tom Wilson', comment: 'The video quality needs improvement. Please reshoot with better lighting.', date: '2024-02-18' }
    ]
  }
];

export const ApprovalsView = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [comment, setComment] = useState('');

  const filteredApprovals = mockApprovals.filter(approval => 
    statusFilter === 'all' || approval.status === statusFilter
  );

  const handleApproval = (postId: number, action: 'approve' | 'reject') => {
    console.log(`${action} post ${postId} with comment: ${comment}`);
    setComment('');
    setSelectedPost(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Approvals</h1>
          <p className="text-muted-foreground">Review and approve pending content before publishing</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Waiting for review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-success">+3 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Review Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground">-30min from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-success">+2% this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Approvals List */}
      <div className="space-y-4">
        {filteredApprovals.map((approval) => (
          <Card key={approval.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CardTitle className="text-lg">{approval.postTitle}</CardTitle>
                  <Badge variant={getStatusColor(approval.status)} className="capitalize">
                    {approval.status}
                  </Badge>
                  <Badge variant="outline">{approval.channel}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  {approval.status === 'pending' && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedPost(approval)}>
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Review Post: {approval.postTitle}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <p className="font-medium mb-2">Content Preview:</p>
                            <p className="text-sm">{approval.content}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium">Creator:</span> {approval.creator}
                            </div>
                            <div>
                              <span className="font-medium">Channel:</span> {approval.channel}
                            </div>
                            <div>
                              <span className="font-medium">Created:</span> {approval.createdDate}
                            </div>
                            <div>
                              <span className="font-medium">Scheduled:</span> {approval.scheduledDate}
                            </div>
                          </div>
                          {approval.comments.length > 0 && (
                            <div>
                              <p className="font-medium mb-2">Comments:</p>
                              <div className="space-y-2">
                                {approval.comments.map((comment, index) => (
                                  <div key={index} className="bg-muted/30 p-3 rounded">
                                    <p className="text-sm">{comment.comment}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {comment.author} • {comment.date}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          <div>
                            <label className="block text-sm font-medium mb-2">Add Comment (Optional)</label>
                            <Textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Add feedback or approval notes..."
                              className="min-h-[80px]"
                            />
                          </div>
                          <div className="flex items-center gap-2 pt-4">
                            <Button
                              variant="success"
                              onClick={() => handleApproval(approval.id, 'approve')}
                              className="flex-1"
                            >
                              <Check className="w-4 h-4" />
                              Approve
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => handleApproval(approval.id, 'reject')}
                              className="flex-1"
                            >
                              <X className="w-4 h-4" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm">{approval.content}</p>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{approval.creator}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Scheduled: {approval.scheduledDate}</span>
                    </div>
                  </div>
                  {approval.comments.length > 0 && (
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{approval.comments.length} comment{approval.comments.length !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};