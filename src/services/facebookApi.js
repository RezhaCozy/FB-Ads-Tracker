import axios from 'axios';

// API Configuration
const FB_API_VERSION = 'v18.0';
const ACCESS_TOKEN = 'EAAIj5zOZBM74BO9ygxSdLaQNRevHAFSzxPr6zcC5AyZCzmX7Y1wgq9ZBBZAAOthg6fMoX3NUZCB2ds3lgqVHMzAo6515bwTCYZCNTYQLqrZCzbJhOZCnnbu5vtkd2jA1UzScDvL0YA35SAMFPNg9hmlfXeRfo8JJRrQ0av4AZCJVyZARnL1oP0BHGclEJNhHzy5LSnCN5S1cUZC';
const ACCOUNT_ID = 'act_1146083873827604';

// Base URL for Facebook Graph API
const baseURL = `https://graph.facebook.com/${FB_API_VERSION}`;

// Create axios instance with common configuration
const api = axios.create({
  baseURL,
  params: {
    access_token: ACCESS_TOKEN,
  },
});

/**
 * Fetch campaign data from Facebook Marketing API
 * @returns {Promise} Promise that resolves to campaign data
 */
export const getCampaignData = async () => {
  try {
    const response = await api.get(`/${ACCOUNT_ID}/campaigns`, {
      params: {
        fields: 'name,objective,status,insights{impressions,reach,spend,clicks,ctr,cost_per_action_type}',
        limit: 25,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching campaign data:', error);
    throw error;
  }
};

/**
 * Fetch ad performance data for a specific ad
 * @param {string} adId - The ID of the ad
 * @returns {Promise} Promise that resolves to ad performance data
 */
export const getAdPerformance = async (adId) => {
  try {
    const response = await api.get(`/${adId}/insights`, {
      params: {
        fields: 'impressions,reach,spend,clicks,actions,cost_per_action_type',
        date_preset: 'last_7_days',
        time_increment: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching ad performance:', error);
    throw error;
  }
};

/**
 * Calculate ROI for campaign data
 * @param {Array} campaignData - Array of campaign data objects
 * @returns {Array} Array of campaign ROI data
 */
export const calculateROI = (campaignData) => {
  return campaignData.map(campaign => {
    const spend = parseFloat(campaign.insights?.data[0]?.spend || 0);
    
    // Find total conversions
    let conversions = 0;
    const actions = campaign.insights?.data[0]?.actions || [];
    actions.forEach(action => {
      if (action.action_type === 'purchase' || action.action_type === 'lead') {
        conversions += parseInt(action.value);
      }
    });
    
    // Calculate estimated value (dummy value of $50 per conversion)
    const estimatedValue = conversions * 50;
    
    const roi = spend > 0 ? ((estimatedValue - spend) / spend) * 100 : 0;
    
    return {
      campaign_name: campaign.name,
      spend,
      conversions,
      estimated_value: estimatedValue,
      roi: roi.toFixed(2) + '%'
    };
  });
};

/**
 * Detect anomalies in ad performance data
 * @param {Array} performanceData - Array of performance data objects
 * @returns {Array} Array of detected anomalies
 */
export const detectAnomalies = (performanceData) => {
  const anomalies = [];
  
  // Simple anomaly detection logic
  performanceData.forEach(day => {
    // Example: If CTR drops more than 50% from average
    const avgCTR = calculateAverage(performanceData, 'ctr');
    if (day.ctr < avgCTR * 0.5) {
      anomalies.push({
        date: day.date_start,
        metric: 'CTR',
        value: day.ctr,
        avgValue: avgCTR,
        percentageChange: ((day.ctr - avgCTR) / avgCTR) * 100
      });
    }
  });
  
  return anomalies;
};

/**
 * Calculate average for a specific metric in performance data
 * @param {Array} data - Array of data objects
 * @param {string} metric - Metric to calculate average for
 * @returns {number} Average value
 */
const calculateAverage = (data, metric) => {
  const sum = data.reduce((acc, item) => acc + parseFloat(item[metric] || 0), 0);
  return sum / data.length;
};

export default {
  getCampaignData,
  getAdPerformance,
  calculateROI,
  detectAnomalies,
};
