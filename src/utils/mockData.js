// Mock data for Facebook Ad campaigns
export const mockCampaigns = [
  {
    id: 'campaign1',
    name: 'Summer Sale 2025',
    objective: 'CONVERSIONS',
    status: 'ACTIVE',
    insights: {
      data: [
        {
          impressions: '45678',
          reach: '23456',
          spend: '1500000',
          clicks: '2345',
          ctr: '5.13',
          actions: [
            { action_type: 'purchase', value: '45' },
            { action_type: 'lead', value: '120' }
          ]
        }
      ]
    }
  },
  {
    id: 'campaign2',
    name: 'Brand Awareness Q2',
    objective: 'BRAND_AWARENESS',
    status: 'ACTIVE',
    insights: {
      data: [
        {
          impressions: '98765',
          reach: '65432',
          spend: '2000000',
          clicks: '3456',
          ctr: '3.50',
          actions: [
            { action_type: 'page_engagement', value: '2345' },
            { action_type: 'post_engagement', value: '1234' }
          ]
        }
      ]
    }
  },
  {
    id: 'campaign3',
    name: 'Product Launch - New Collection',
    objective: 'CONVERSIONS',
    status: 'PAUSED',
    insights: {
      data: [
        {
          impressions: '34567',
          reach: '12345',
          spend: '1000000',
          clicks: '1234',
          ctr: '3.57',
          actions: [
            { action_type: 'purchase', value: '25' },
            { action_type: 'lead', value: '78' }
          ]
        }
      ]
    }
  },
  {
    id: 'campaign4',
    name: 'Retargeting - Website Visitors',
    objective: 'CONVERSIONS',
    status: 'ACTIVE',
    insights: {
      data: [
        {
          impressions: '23456',
          reach: '12345',
          spend: '800000',
          clicks: '2345',
          ctr: '10.00',
          actions: [
            { action_type: 'purchase', value: '67' },
            { action_type: 'lead', value: '98' }
          ]
        }
      ]
    }
  }
];

// Calculate ROI for mock campaigns
export const mockRoiData = [
  {
    campaign_name: 'Summer Sale 2025',
    spend: 1500000,
    conversions: 165,
    estimated_value: 8250000,
    roi: '450.00%'
  },
  {
    campaign_name: 'Brand Awareness Q2',
    spend: 2000000,
    conversions: 0,
    estimated_value: 0,
    roi: '-100.00%'
  },
  {
    campaign_name: 'Product Launch - New Collection',
    spend: 1000000,
    conversions: 103,
    estimated_value: 5150000,
    roi: '415.00%'
  },
  {
    campaign_name: 'Retargeting - Website Visitors',
    spend: 800000,
    conversions: 165,
    estimated_value: 8250000,
    roi: '931.25%'
  }
];
