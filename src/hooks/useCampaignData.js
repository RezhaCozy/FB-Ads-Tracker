import { useState, useEffect } from 'react';
import { getCampaignData, calculateROI } from '../services/facebookApi';
import { mockCampaigns, mockRoiData } from '../utils/mockData';

/**
 * Custom hook to fetch and manage campaign data
 * @returns {Object} Object containing campaign data, loading state, error state, and ROI data
 */
const useCampaignData = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roiData, setRoiData] = useState([]);
  const [useMockData, setUseMockData] = useState(true); // Set to true to use mock data

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        if (useMockData) {
          // Use mock data
          setTimeout(() => {
            setCampaigns(mockCampaigns);
            setRoiData(mockRoiData);
            setLoading(false);
          }, 1000); // Simulate loading delay
        } else {
          // Use real API
          const data = await getCampaignData();
          
          if (data && data.data) {
            setCampaigns(data.data);
            
            // Calculate ROI for campaigns
            const roi = calculateROI(data.data);
            setRoiData(roi);
          } else {
            setError('No campaign data available');
          }
          setLoading(false);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch campaign data');
        console.error('Error in useCampaignData hook:', err);
        setLoading(false);
      }
    };

    fetchData();
  }, [useMockData]);

  return { campaigns, loading, error, roiData };
};

export default useCampaignData;
