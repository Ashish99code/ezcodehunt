import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="bg-surface rounded-lg p-1 neumorphic">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-fast ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground'
                : 'text-text-secondary hover:text-text-primary hover:bg-background'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="bg-accent text-accent-foreground text-xs px-1.5 py-0.5 rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;