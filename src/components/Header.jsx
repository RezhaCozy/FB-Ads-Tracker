import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Facebook Ad Performance Tracker</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Account: Sandbox Roketmarket</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
