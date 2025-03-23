import React from 'react';

const CampaignMetrics = ({ campaign }) => {
  // Check if insights data exists
  const insights = campaign.insights?.data?.[0];
  
  if (!insights) {
    return (
      <div className="bg-yellow-50 p-4 rounded-md border border-yellow-200">
        <p className="text-yellow-700">No insights data available for this campaign.</p>
      </div>
    );
  }

  // Format metrics for display
  const formatNumber = (num) => {
    return new Intl.NumberFormat('id-ID').format(parseFloat(num || 0));
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(parseFloat(num || 0));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-sm font-medium text-gray-500">Spend</h3>
        <p className="text-2xl font-bold text-gray-800">{formatCurrency(insights.spend)}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-sm font-medium text-gray-500">Impressions</h3>
        <p className="text-2xl font-bold text-gray-800">{formatNumber(insights.impressions)}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-sm font-medium text-gray-500">Reach</h3>
        <p className="text-2xl font-bold text-gray-800">{formatNumber(insights.reach)}</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-sm font-medium text-gray-500">CTR</h3>
        <p className="text-2xl font-bold text-gray-800">{insights.ctr}%</p>
      </div>
    </div>
  );
};

export default CampaignMetrics;
