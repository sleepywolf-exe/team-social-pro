import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Social Media OS API Routes
  
  // Dashboard metrics
  app.get('/api/metrics', (req, res) => {
    res.json({
      totalReach: '2.4M',
      engagementRate: '4.2%',
      postsThisWeek: 24,
      pendingApproval: 3
    });
  });

  // Posts management
  app.get('/api/posts', (req, res) => {
    res.json({
      posts: [
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
        }
      ]
    });
  });

  // AI Content Generation
  app.post('/api/ai/generate', (req, res) => {
    const { brief, tone, channels } = req.body;
    
    // Simulate AI generation delay
    setTimeout(() => {
      res.json({
        variants: [
          {
            channel: 'instagram',
            content: `🚀 Exciting ${brief.goal || 'announcement'}! Our team has been working tirelessly to bring you something revolutionary. Stay tuned for the big reveal! ✨`,
            hashtags: '#innovation #productlaunch #startup #technology',
            charCount: 145,
            maxChars: 2200
          },
          {
            channel: 'linkedin',
            content: `I'm thrilled to announce ${brief.goal || 'our latest initiative'} that represents months of dedicated work from our incredible team.\n\nThis launch embodies our philosophy of solving real problems and making meaningful impact.`,
            hashtags: '#Innovation #ProductDevelopment #Leadership',
            charCount: 234,
            maxChars: 3000
          }
        ]
      });
    }, 2000);
  });

  // Approvals management
  app.post('/api/approvals/:id/approve', (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    
    res.json({ 
      success: true, 
      message: `Post ${id} approved`,
      comment 
    });
  });

  app.post('/api/approvals/:id/reject', (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    
    res.json({ 
      success: true, 
      message: `Post ${id} rejected`,
      comment 
    });
  });

  // Assets management
  app.post('/api/assets/upload', (req, res) => {
    res.json({
      success: true,
      asset: {
        id: Date.now(),
        name: 'uploaded_file.jpg',
        type: 'image',
        size: '2.1 MB',
        uploadDate: new Date().toISOString().split('T')[0]
      }
    });
  });

  // Social accounts management
  app.get('/api/social-accounts', (req, res) => {
    res.json({
      accounts: [
        {
          id: 1,
          platform: 'Instagram',
          account: '@acmecorp',
          followers: '125K',
          status: 'connected'
        },
        {
          id: 2,
          platform: 'LinkedIn',
          account: 'Acme Corporation',
          followers: '45K',
          status: 'connected'
        },
        {
          id: 3,
          platform: 'TikTok',
          account: '@acme_official',
          followers: '89K',
          status: 'error'
        }
      ]
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
