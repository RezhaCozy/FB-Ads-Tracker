import React, { useState } from 'react';
import CampaignMetrics from './CampaignMetrics';

const CampaignList = ({ campaigns }) => {
  const [expandedCampaign, setExpandedCampaign] = useState(null);

  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
        <p className="text-yellow-700">No campaigns found.</p>
      </div>
    );
  }

  const toggleCampaign = (campaignId) => {
    if (expandedCampaign === campaignId) {
      setExpandedCampaign(null);
    } else {
      setExpandedCampaign(campaignId);
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'deleted':
      case 'archived':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-blue-50 border-b border-blue-100">
        <h2 className="text-xl font-semibold text-blue-800">Campaigns</h2>
      </div>
      
      <ul className="divide-y divide-gray-200">
        {campaigns.map((campaign) => (
          <li key={campaign.id} className="hover:bg-gray-50">
            <div 
              className="px-6 py-4 cursor-pointer"
              onClick={() => toggleCampaign(campaign.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{campaign.name}</h3>
                  <p className="text-sm text-gray-500">Objective: {campaign.objective}</p>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                  <svg 
                    className={`ml-2 w-5 h-5 text-gray-500 transform transition-transform ${expandedCampaign === campaign.id ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            
            {expandedCampaign === campaign.id && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <CampaignMetrics campaign={campaign} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignList;
