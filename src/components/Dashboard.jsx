import React from 'react';
import useCampaignData from '../hooks/useCampaignData';
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';
import CampaignList from './CampaignList';
import ROIAnalysis from './ROIAnalysis';

const Dashboard = () => {
  const { campaigns, loading, error, roiData } = useCampaignData();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        
        {error && (
          <div className="bg-red-50 p-4 rounded-md border border-red-200 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-8">
            <CampaignList campaigns={campaigns} />
            <ROIAnalysis roiData={roiData} />
          </div>
        )}
      </main>
      
      <footer className="bg-white py-4 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>Facebook Ad Performance Tracker &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
