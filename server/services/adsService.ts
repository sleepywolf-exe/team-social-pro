// Ads Platform Integration Service
export interface AdAccount {
  id: string;
  platform: 'meta' | 'google' | 'tiktok';
  accountId: string;
  accountName: string;
  accessToken: string;
  currency: string;
}

export interface AdMetrics {
  spend: number;
  clicks: number;
  impressions: number;
  ctr: number;
  cpm: number;
  conversions: number;
  dateRange: string;
}

export interface CampaignData {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed';
  spend: number;
  clicks: number;
  impressions: number;
  ctr: number;
  startDate: string;
  endDate?: string;
}

// Meta Ads Service (Facebook & Instagram)
export class MetaAdsService {
  private baseUrl = 'https://graph.facebook.com/v18.0';

  async getAccountMetrics(account: AdAccount, dateRange = 'last_30_days'): Promise<AdMetrics | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/act_${account.accountId}/insights?fields=spend,clicks,impressions,ctr,cpm,conversions&time_range=${dateRange}&access_token=${account.accessToken}`
      );
      
      const data = await response.json();
      
      if (data.error) {
        console.error('Meta Ads API Error:', data.error);
        return null;
      }

      const metrics = data.data[0] || {};
      return {
        spend: parseFloat(metrics.spend || '0'),
        clicks: parseInt(metrics.clicks || '0'),
        impressions: parseInt(metrics.impressions || '0'),
        ctr: parseFloat(metrics.ctr || '0'),
        cpm: parseFloat(metrics.cpm || '0'),
        conversions: parseInt(metrics.conversions || '0'),
        dateRange
      };
    } catch (error) {
      console.error('Error fetching Meta Ads metrics:', error);
      return null;
    }
  }

  async getCampaigns(account: AdAccount): Promise<CampaignData[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/act_${account.accountId}/campaigns?fields=name,status,spend,clicks,impressions,ctr,start_time,end_time&access_token=${account.accessToken}`
      );
      
      const data = await response.json();
      
      if (data.error) {
        console.error('Meta Ads API Error:', data.error);
        return [];
      }

      return data.data.map((campaign: any) => ({
        id: campaign.id,
        name: campaign.name,
        status: campaign.status.toLowerCase(),
        spend: parseFloat(campaign.spend || '0'),
        clicks: parseInt(campaign.clicks || '0'),
        impressions: parseInt(campaign.impressions || '0'),
        ctr: parseFloat(campaign.ctr || '0'),
        startDate: campaign.start_time,
        endDate: campaign.end_time
      }));
    } catch (error) {
      console.error('Error fetching Meta Ads campaigns:', error);
      return [];
    }
  }
}

// Google Ads Service
export class GoogleAdsService {
  private baseUrl = 'https://googleads.googleapis.com/v15';

  async getAccountMetrics(account: AdAccount, dateRange = 'LAST_30_DAYS'): Promise<AdMetrics | null> {
    try {
      const query = `
        SELECT 
          metrics.cost_micros,
          metrics.clicks,
          metrics.impressions,
          metrics.ctr,
          metrics.average_cpm,
          metrics.conversions
        FROM customer 
        WHERE segments.date DURING ${dateRange}
      `;

      const response = await fetch(
        `${this.baseUrl}/customers/${account.accountId}/googleAds:searchStream`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${account.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
        }
      );

      const data = await response.json();
      
      if (data.error) {
        console.error('Google Ads API Error:', data.error);
        return null;
      }

      const metrics = data.results[0]?.metrics || {};
      return {
        spend: (metrics.costMicros || 0) / 1000000, // Convert from micros
        clicks: parseInt(metrics.clicks || '0'),
        impressions: parseInt(metrics.impressions || '0'),
        ctr: parseFloat(metrics.ctr || '0') * 100, // Convert to percentage
        cpm: (metrics.averageCpm || 0) / 1000000, // Convert from micros
        conversions: parseInt(metrics.conversions || '0'),
        dateRange
      };
    } catch (error) {
      console.error('Error fetching Google Ads metrics:', error);
      return null;
    }
  }

  async getCampaigns(account: AdAccount): Promise<CampaignData[]> {
    try {
      const query = `
        SELECT 
          campaign.id,
          campaign.name,
          campaign.status,
          metrics.cost_micros,
          metrics.clicks,
          metrics.impressions,
          metrics.ctr,
          campaign.start_date,
          campaign.end_date
        FROM campaign
      `;

      const response = await fetch(
        `${this.baseUrl}/customers/${account.accountId}/googleAds:searchStream`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${account.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query })
        }
      );

      const data = await response.json();
      
      if (data.error) {
        console.error('Google Ads API Error:', data.error);
        return [];
      }

      return data.results.map((result: any) => ({
        id: result.campaign.id.toString(),
        name: result.campaign.name,
        status: result.campaign.status.toLowerCase(),
        spend: (result.metrics.costMicros || 0) / 1000000,
        clicks: parseInt(result.metrics.clicks || '0'),
        impressions: parseInt(result.metrics.impressions || '0'),
        ctr: parseFloat(result.metrics.ctr || '0') * 100,
        startDate: result.campaign.startDate,
        endDate: result.campaign.endDate
      }));
    } catch (error) {
      console.error('Error fetching Google Ads campaigns:', error);
      return [];
    }
  }
}

// TikTok Ads Service
export class TikTokAdsService {
  private baseUrl = 'https://business-api.tiktok.com/open_api/v1.3';

  async getAccountMetrics(account: AdAccount, dateRange = 'LAST_30_DAYS'): Promise<AdMetrics | null> {
    try {
      const startDate = this.getDateFromRange(dateRange, 'start');
      const endDate = this.getDateFromRange(dateRange, 'end');

      const response = await fetch(
        `${this.baseUrl}/report/integrated/get/`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${account.accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            advertiser_id: account.accountId,
            report_type: 'BASIC',
            data_level: 'ADVERTISER',
            dimensions: ['advertiser_id'],
            metrics: ['spend', 'clicks', 'impressions', 'ctr', 'cpm', 'conversions'],
            start_date: startDate,
            end_date: endDate
          })
        }
      );

      const data = await response.json();
      
      if (data.code !== 0) {
        console.error('TikTok Ads API Error:', data.message);
        return null;
      }

      const metrics = data.data.list[0]?.metrics || {};
      return {
        spend: parseFloat(metrics.spend || '0'),
        clicks: parseInt(metrics.clicks || '0'),
        impressions: parseInt(metrics.impressions || '0'),
        ctr: parseFloat(metrics.ctr || '0'),
        cpm: parseFloat(metrics.cpm || '0'),
        conversions: parseInt(metrics.conversions || '0'),
        dateRange
      };
    } catch (error) {
      console.error('Error fetching TikTok Ads metrics:', error);
      return null;
    }
  }

  private getDateFromRange(range: string, type: 'start' | 'end'): string {
    const today = new Date();
    const daysBack = range === 'LAST_30_DAYS' ? 30 : 7;
    
    if (type === 'start') {
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - daysBack);
      return startDate.toISOString().split('T')[0];
    } else {
      return today.toISOString().split('T')[0];
    }
  }
}

// Central Ads Manager
export class AdsManager {
  private metaService = new MetaAdsService();
  private googleService = new GoogleAdsService();
  private tiktokService = new TikTokAdsService();

  async getAccountMetrics(account: AdAccount, dateRange = 'LAST_30_DAYS'): Promise<AdMetrics | null> {
    switch (account.platform) {
      case 'meta':
        return await this.metaService.getAccountMetrics(account, dateRange);
      case 'google':
        return await this.googleService.getAccountMetrics(account, dateRange);
      case 'tiktok':
        return await this.tiktokService.getAccountMetrics(account, dateRange);
      default:
        return null;
    }
  }

  async getCampaigns(account: AdAccount): Promise<CampaignData[]> {
    switch (account.platform) {
      case 'meta':
        return await this.metaService.getCampaigns(account);
      case 'google':
        return await this.googleService.getCampaigns(account);
      default:
        return [];
    }
  }

  async getConsolidatedMetrics(accounts: AdAccount[]): Promise<{
    totalSpend: number;
    totalClicks: number;
    totalImpressions: number;
    averageCtr: number;
    averageCpm: number;
    totalConversions: number;
    platformBreakdown: Record<string, AdMetrics>;
  }> {
    const metrics = await Promise.all(
      accounts.map(async (account) => ({
        platform: account.platform,
        metrics: await this.getAccountMetrics(account)
      }))
    );

    const validMetrics = metrics.filter(m => m.metrics !== null);
    
    const totals = validMetrics.reduce(
      (acc, { metrics: m }) => ({
        spend: acc.spend + (m?.spend || 0),
        clicks: acc.clicks + (m?.clicks || 0),
        impressions: acc.impressions + (m?.impressions || 0),
        conversions: acc.conversions + (m?.conversions || 0),
        ctrSum: acc.ctrSum + (m?.ctr || 0),
        cpmSum: acc.cpmSum + (m?.cpm || 0),
        count: acc.count + 1
      }),
      { spend: 0, clicks: 0, impressions: 0, conversions: 0, ctrSum: 0, cpmSum: 0, count: 0 }
    );

    const platformBreakdown: Record<string, AdMetrics> = {};
    validMetrics.forEach(({ platform, metrics: m }) => {
      if (m) platformBreakdown[platform] = m;
    });

    return {
      totalSpend: totals.spend,
      totalClicks: totals.clicks,
      totalImpressions: totals.impressions,
      averageCtr: totals.count > 0 ? totals.ctrSum / totals.count : 0,
      averageCpm: totals.count > 0 ? totals.cpmSum / totals.count : 0,
      totalConversions: totals.conversions,
      platformBreakdown
    };
  }
}