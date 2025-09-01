import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { SocialMediaManager, PostContent, SocialMediaAccount } from "./services/socialMediaService";
import { AdsManager, AdAccount } from "./services/adsService";
import { EnhancedSocialMediaManager } from "./services/additionalPlatformsService";

export async function registerRoutes(app: Express): Promise<Server> {
  // Social Media OS API Routes
  const socialMediaManager = new SocialMediaManager();
  const adsManager = new AdsManager();
  const enhancedSocialManager = new EnhancedSocialMediaManager();
  
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

  // Social Media Publishing
  app.post('/api/social/publish', async (req, res) => {
    try {
      const { accounts, content } = req.body;
      const mainResults = await socialMediaManager.publishToAllPlatforms(accounts, content);
      const additionalResults = await enhancedSocialManager.publishToAdditionalPlatforms(accounts, content);
      const allResults = [...mainResults, ...additionalResults];
      res.json({ success: true, results: allResults });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  });

  // Social Traffic Analytics
  app.get('/api/analytics/social-traffic', async (req, res) => {
    try {
      const dateRange = req.query.dateRange as string;
      const report = await enhancedSocialManager.getSocialTrafficReport(dateRange);
      res.json({ success: true, data: report });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  });

  // Social Media Metrics
  app.get('/api/social/metrics/:accountId', async (req, res) => {
    try {
      const { accountId } = req.params;
      // This would fetch from database in real implementation
      const account: SocialMediaAccount = {
        id: accountId,
        platform: req.query.platform as string || 'instagram',
        accountId: accountId,
        accountName: 'Sample Account',
        accessToken: 'token',
        permissions: ['publish', 'read_insights'],
        isActive: true
      };
      
      const metrics = await socialMediaManager.getAccountMetrics(account);
      res.json({ success: true, metrics });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  });

  // Ads Dashboard Data
  app.get('/api/ads/metrics', async (req, res) => {
    try {
      // Mock ad accounts for demo - in real app these would come from database
      const mockAdAccounts: AdAccount[] = [
        {
          id: '1',
          platform: 'meta',
          accountId: 'act_123456789',
          accountName: 'Acme Corp Meta Ads',
          accessToken: 'meta_token',
          currency: 'USD'
        },
        {
          id: '2',
          platform: 'google',
          accountId: '987-654-3210',
          accountName: 'Acme Corp Google Ads',
          accessToken: 'google_token',
          currency: 'USD'
        }
      ];

      const consolidatedMetrics = await adsManager.getConsolidatedMetrics(mockAdAccounts);
      res.json({ success: true, data: consolidatedMetrics });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  });

  app.get('/api/ads/campaigns/:platform', async (req, res) => {
    try {
      const { platform } = req.params;
      // Mock account for demo
      const mockAccount: AdAccount = {
        id: '1',
        platform: platform as 'meta' | 'google' | 'tiktok',
        accountId: 'demo_account',
        accountName: `Demo ${platform} Account`,
        accessToken: 'demo_token',
        currency: 'USD'
      };

      const campaigns = await adsManager.getCampaigns(mockAccount);
      res.json({ success: true, campaigns });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
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
