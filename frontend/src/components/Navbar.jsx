import React from 'react';

const Navbar = ({ activeTab, setActiveTab, itemCount }) => {
  const tabs = [
    {
      id: 'list',
      label: 'Shopping List',
      icon: '🛒',
      count: itemCount
    },
    {
      id: 'menu',
      label: 'Menu',
      icon: '🛍️'
    },
    {
      id: 'suggestions',
      label: 'Suggestions',
      icon: '💡'
    }
  ];

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">🛒 Voice Shopping Assistant</h1>
          
          {/* Tab Navigation */}
          <nav className="flex flex-wrap gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-md transform scale-105'
                    : 'bg-blue-500 text-white hover:bg-blue-400 hover:shadow-sm'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Active Tab Indicator */}
        <div className="mt-4 flex items-center gap-2 text-blue-100">
          <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
          <span className="text-sm">
            {tabs.find(tab => tab.id === activeTab)?.label}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;