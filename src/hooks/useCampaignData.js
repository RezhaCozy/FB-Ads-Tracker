import { useState, useEffect } from 'react';
import { getCampaignData, calculateROI } from '../services/facebookApi';

/**
 * Custom hook to fetch and manage campaign data
 * @returns {Object} Object containing campaign data, loading state, error state, and ROI data
 */
const useCampaignData = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roiData, setRoiData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCampaignData();
        
        if (data && data.data) {
          setCampaigns(data.data);
          
          // Calculate ROI for campaigns
          const roi = calculateROI(data.data);
          setRoiData(roi);
        } else {
          setError('No campaign data available');
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch campaign data');
        console.error('Error in useCampaignData hook:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { campaigns, loading, error, roiData };
};

export default useCampaignData;
