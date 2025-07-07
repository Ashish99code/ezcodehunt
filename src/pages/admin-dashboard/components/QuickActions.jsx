import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      id: 'approve-submissions',
      title: 'Review Submissions',
      description: 'Review and approve pending tool submissions',
      icon: 'FileCheck',
      color: 'primary',
      count: 12,
      action: () => console.log('Navigate to submissions')
    },
    {
      id: 'manage-users',
      title: 'User Management',
      description: 'Manage user accounts and permissions',
      icon: 'Users',
      color: 'secondary',
      count: 3,
      action: () => console.log('Navigate to users')
    },
    {
      id: 'feature-tools',
      title: 'Feature Tools',
      description: 'Promote tools to featured section',
      icon: 'Star',
      color: 'warning',
      count: null,
      action: () => console.log('Navigate to featured tools')
    },
    {
      id: 'system-reports',
      title: 'System Reports',
      description: 'View system health and error reports',
      icon: 'AlertTriangle',
      color: 'error',
      count: 2,
      action: () => console.log('Navigate to reports')
    },
    {
      id: 'analytics',
      title: 'View Analytics',
      description: 'Check platform performance metrics',
      icon: 'BarChart3',
      color: 'accent',
      count: null,
      action: () => console.log('Navigate to analytics')
    },
    {
      id: 'bulk-actions',
      title: 'Bulk Operations',
      description: 'Perform bulk actions on tools and users',
      icon: 'Package',
      color: 'primary',
      count: null,
      action: () => console.log('Open bulk actions modal')
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700',
      secondary: 'from-secondary to-secondary-600 hover:from-secondary-600 hover:to-secondary-700',
      accent: 'from-accent to-accent-600 hover:from-accent-600 hover:to-accent-700',
      warning: 'from-warning to-warning hover:from-warning hover:to-warning',
      error: 'from-error to-error hover:from-error hover:to-error',
      success: 'from-success to-success hover:from-success hover:to-success'
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="bg-surface border border-border rounded-lg neumorphic">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
        <p className="text-sm text-text-secondary mt-1">Common administrative tasks</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="relative p-4 bg-surface-secondary border border-border rounded-lg hover:border-primary transition-all duration-300 group text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${getColorClasses(action.color)} rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110`}>
                  <Icon name={action.icon} size={20} className="text-white" />
                </div>
                {action.count && (
                  <span className="px-2 py-1 bg-error text-error-foreground text-xs font-semibold rounded-full">
                    {action.count}
                  </span>
                )}
              </div>
              
              <h4 className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-fast">
                {action.title}
              </h4>
              <p className="text-sm text-text-secondary group-hover:text-text-primary transition-fast">
                {action.description}
              </p>
              
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Icon name="ArrowRight" size={16} className="text-primary" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Need help? Check the admin documentation
          </div>
          <Button variant="ghost" iconName="HelpCircle">
            Help Center
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;