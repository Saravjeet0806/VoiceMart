import React, { useState } from "react";
import { Menu } from "lucide-react";

const Navbar = ({ activeTab, setActiveTab, itemCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    {
      id: "list",
      label: "Shopping List",
      icon: "🛒",
      count: itemCount,
    },
    {
      id: "menu",
      label: "Menu",
      icon: "🛍️",
    },
    {
      id: "suggestions",
      label: "Suggestions",
      icon: "💡",
    },
  ];

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          {/* Logo / Title */}
          <h1 className="text-2xl font-bold">🛒 Voice Shopping Assistant</h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-md transform scale-105"
                    : "bg-blue-500 text-white hover:bg-blue-400 hover:shadow-sm"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-blue-500 hover:bg-blue-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6 text-white" />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="mt-3 flex flex-col gap-2 md:hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-white text-blue-600 shadow-md"
                    : "bg-blue-500 text-white hover:bg-blue-400"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Active Tab Indicator */}
        <div className="mt-4 flex items-center gap-2 text-blue-100">
          <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
          <span className="text-sm">
            {tabs.find((tab) => tab.id === activeTab)?.label}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
