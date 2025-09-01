import { PostContent, PostResult, SocialMediaAccount } from './socialMediaService';

// Google Business Profile API Service
export class GoogleBusinessProfileService {
  private baseUrl = 'https://mybusinessbusinessinformation.googleapis.com/v1';
  
  async publishPost(account: SocialMediaAccount, content: PostContent): Promise<PostResult> {
    try {
      const postData = {
        summary: content.text,
        ...(content.imageUrls?.length && {
          media: content.imageUrls.map(url => ({
            mediaFormat: 'PHOTO',
            sourceUrl: url
          }))
        })
      };

      const response = await fetch(
        `${this.baseUrl}/accounts/${account.accountId}/locations/${account.accountId}/localPosts`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${account.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        }
      );

      const result = await response.json();
      
      if (!response.ok) {
        return { success: false, error: result.error?.message || 'Google Business Profile API error', platform: 'google_business' };
      }
      
      return { success: true, postId: result.name, platform: 'google_business' };
    } catch (error) {
      return { success: false, error: (error as Error).message, platform: 'google_business' };
    }
  }
}

// Threads API Simulator (until stable API is available)
export class ThreadsService {
  async publishPost(account: SocialMediaAccount, content: PostContent): Promise<PostResult> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Threads doesn't have a stable public API yet, so this is a simulator
      const success = Math.random() > 0.1; // 90% success rate for simulation
      
      if (success) {
        return { 
          success: true, 
          postId: `threads_sim_${Date.now()}`, 
          platform: 'threads' 
        };
      } else {
        return { 
          success: false, 
          error: 'Threads API temporarily unavailable', 
          platform: 'threads' 
        };
      }
    } catch (error) {
      return { success: false, error: (error as Error).message, platform: 'threads' };
    }
  }
}

// Bluesky API Service
export class BlueskyService {
  private baseUrl = 'https://bsky.social/xrpc';
  
  async publishPost(account: SocialMediaAccount, content: PostContent): Promise<PostResult> {
    try {
      const postData = {
        repo: account.accountId,
        collection: 'app.bsky.feed.post',
        record: {
          text: content.text,
          createdAt: new Date().toISOString(),
          ...(content.hashtags && {
            facets: this.extractHashtagFacets(content.text, content.hashtags)
          })
        }
      };

      const response = await fetch(`${this.baseUrl}/com.atproto.repo.createRecord`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${account.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      const result = await response.json();
      
      if (!response.ok) {
        return { success: false, error: result.error?.message || 'Bluesky API error', platform: 'bluesky' };
      }
      
      return { success: true, postId: result.uri, platform: 'bluesky' };
    } catch (error) {
      return { success: false, error: (error as Error).message, platform: 'bluesky' };
    }
  }

  private extractHashtagFacets(text: string, hashtags: string[]): Array<{
    index: { byteStart: number; byteEnd: number };
    features: Array<{ $type: string; tag: string }>;
  }> {
    const facets: Array<{
      index: { byteStart: number; byteEnd: number };
      features: Array<{ $type: string; tag: string }>;
    }> = [];
    
    hashtags.forEach(tag => {
      const index = text.indexOf(tag);
      if (index !== -1) {
        facets.push({
          index: {
            byteStart: index,
            byteEnd: index + tag.length
          },
          features: [{
            $type: 'app.bsky.richtext.facet#tag',
            tag: tag.replace('#', '')
          }]
        });
      }
    });
    return facets;
  }
}

// Twitch API Service (for channel posts/announcements)
export class TwitchService {
  private baseUrl = 'https://api.twitch.tv/helix';
  
  async publishPost(account: SocialMediaAccount, content: PostContent): Promise<PostResult> {
    try {
      // Twitch doesn't have direct posting, but we can create announcements
      const announcementData = {
        broadcaster_id: account.accountId,
        moderator_id: account.accountId,
        message: content.text,
        color: 'primary'
      };

      const response = await fetch(`${this.baseUrl}/chat/announcements`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${account.accessToken}`,
          'Client-Id': process.env.TWITCH_CLIENT_ID || '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(announcementData)
      });

      const result = await response.json();
      
      if (!response.ok) {
        return { success: false, error: result.message || 'Twitch API error', platform: 'twitch' };
      }
      
      return { success: true, postId: 'twitch_announcement', platform: 'twitch' };
    } catch (error) {
      return { success: false, error: (error as Error).message, platform: 'twitch' };
    }
  }

  async getChannelInfo(account: SocialMediaAccount) {
    try {
      const response = await fetch(
        `${this.baseUrl}/channels?broadcaster_id=${account.accountId}`,
        {
          headers: {
            'Authorization': `Bearer ${account.accessToken}`,
            'Client-Id': process.env.TWITCH_CLIENT_ID || ''
          }
        }
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching Twitch channel info:', error);
      return null;
    }
  }
}

// Analytics Integration Service for Website/Blog Attribution
export class WebAnalyticsService {
  async trackSocialTraffic(postId: string, platform: string, websiteUrl: string) {
    try {
      // This would integrate with Google Analytics 4 or similar
      const trackingData = {
        event_name: 'social_media_click',
        parameters: {
          source: platform,
          medium: 'social',
          campaign: `post_${postId}`,
          content: postId
        }
      };

      // In a real implementation, this would send to GA4 Measurement Protocol
      console.log('Tracking social media attribution:', trackingData);
      
      return { success: true, trackingId: `track_${Date.now()}` };
    } catch (error) {
      console.error('Error tracking social media attribution:', error);
      return { success: false, error: (error as Error).message };
    }
  }

  async getSocialTrafficReport(dateRange = 'last_30_days') {
    try {
      // Mock data for demonstration - in real app would query GA4 API
      return {
        totalSessions: 12543,
        socialSessions: 3421,
        socialConversionRate: 2.4,
        topSocialSources: [
          { source: 'instagram', sessions: 1456, conversions: 23 },
          { source: 'linkedin', sessions: 987, conversions: 31 },
          { source: 'tiktok', sessions: 634, conversions: 12 },
          { source: 'facebook', sessions: 344, conversions: 8 }
        ],
        periodComparison: {
          sessionsChange: '+12.3%',
          conversionRateChange: '+0.8%'
        }
      };
    } catch (error) {
      console.error('Error fetching social traffic report:', error);
      return null;
    }
  }
}

// Enhanced Social Media Manager with Additional Platforms
export class EnhancedSocialMediaManager {
  private googleBusinessService = new GoogleBusinessProfileService();
  private threadsService = new ThreadsService();
  private blueskyService = new BlueskyService();
  private twitchService = new TwitchService();
  private analyticsService = new WebAnalyticsService();

  async publishToAdditionalPlatforms(accounts: SocialMediaAccount[], content: PostContent): Promise<PostResult[]> {
    const results: PostResult[] = [];
    
    for (const account of accounts) {
      if (!account.isActive) continue;
      
      let result: PostResult;
      
      switch (account.platform.toLowerCase()) {
        case 'google_business':
        case 'google_business_profile':
          result = await this.googleBusinessService.publishPost(account, content);
          break;
        case 'threads':
          result = await this.threadsService.publishPost(account, content);
          break;
        case 'bluesky':
          result = await this.blueskyService.publishPost(account, content);
          break;
        case 'twitch':
          result = await this.twitchService.publishPost(account, content);
          break;
        default:
          result = { success: false, error: 'Platform not supported by additional platforms service', platform: account.platform };
      }
      
      results.push(result);
      
      // Track successful posts for analytics
      if (result.success && result.postId) {
        await this.analyticsService.trackSocialTraffic(result.postId, account.platform, 'https://your-website.com');
      }
    }
    
    return results;
  }

  async getSocialTrafficReport(dateRange?: string) {
    return await this.analyticsService.getSocialTrafficReport(dateRange);
  }
}