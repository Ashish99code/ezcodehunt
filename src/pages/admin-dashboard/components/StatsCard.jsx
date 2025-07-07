import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'from-primary to-primary-600',
    secondary: 'from-secondary to-secondary-600',
    accent: 'from-accent to-accent-600',
    success: 'from-success to-success',
    warning: 'from-warning to-warning',
    error: 'from-error to-error'
  };

  const changeColor = changeType === 'positive' ? 'text-success' : 
                     changeType === 'negative' ? 'text-error' : 'text-text-secondary';

  return (
    <div className="bg-surface border border-border rounded-lg p-6 neumorphic hover:shadow-elevation-2 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <p className="text-2xl font-bold text-text-primary mb-2">{value}</p>
          {change && (
            <div className="flex items-center space-x-1">
              <Icon 
                name={changeType === 'positive' ? 'TrendingUp' : changeType === 'negative' ? 'TrendingDown' : 'Minus'} 
                size={14} 
                className={changeColor}
              />
              <span className={`text-sm font-medium ${changeColor}`}>
                {change}
              </span>
              <span className="text-xs text-text-secondary">vs last month</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;