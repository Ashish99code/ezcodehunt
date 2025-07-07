import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'submission',
      user: 'John Developer',
      action: 'submitted a new tool',
      target: 'CodeMaster AI',
      timestamp: '2024-01-15T10:30:00Z',
      icon: 'Plus',
      color: 'text-primary'
    },
    {
      id: 2,
      type: 'approval',
      user: 'Admin',
      action: 'approved tool',
      target: 'DevFlow Pro',
      timestamp: '2024-01-15T09:15:00Z',
      icon: 'Check',
      color: 'text-success'
    },
    {
      id: 3,
      type: 'review',
      user: 'Sarah Wilson',
      action: 'left a review for',
      target: 'BugHunter X',
      timestamp: '2024-01-15T08:45:00Z',
      icon: 'Star',
      color: 'text-warning'
    },
    {
      id: 4,
      type: 'user',
      user: 'Mike Chen',
      action: 'registered as new user',
      target: null,
      timestamp: '2024-01-15T07:20:00Z',
      icon: 'UserPlus',
      color: 'text-accent'
    },
    {
      id: 5,
      type: 'report',
      user: 'Lisa Rodriguez',
      action: 'reported an issue with',
      target: 'APIGen Studio',
      timestamp: '2024-01-14T16:30:00Z',
      icon: 'AlertTriangle',
      color: 'text-error'
    },
    {
      id: 6,
      type: 'feature',
      user: 'Alex Thompson',
      action: 'featured tool',
      target: 'CloudSync Dev',
      timestamp: '2024-01-14T15:10:00Z',
      icon: 'Zap',
      color: 'text-secondary'
    },
    {
      id: 7,
      type: 'update',
      user: 'Admin',
      action: 'updated tool information for',
      target: 'CodeMaster AI',
      timestamp: '2024-01-14T14:20:00Z',
      icon: 'Edit',
      color: 'text-primary'
    },
    {
      id: 8,
      type: 'deletion',
      user: 'Admin',
      action: 'removed tool',
      target: 'Deprecated Tool',
      timestamp: '2024-01-14T12:45:00Z',
      icon: 'Trash2',
      color: 'text-error'
    }
  ];

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-surface border border-border rounded-lg neumorphic">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="Filter">
              Filter
            </Button>
            <Button variant="ghost" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        <div className="divide-y divide-border">
          {activities.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-surface-secondary transition-fast">
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full bg-surface-tertiary flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                  <Icon name={activity.icon} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1 text-sm">
                    <span className="font-medium text-text-primary">{activity.user}</span>
                    <span className="text-text-secondary">{activity.action}</span>
                    {activity.target && (
                      <span className="font-medium text-primary">{activity.target}</span>
                    )}
                  </div>
                  <p className="text-xs text-text-secondary mt-1">
                    {formatTime(activity.timestamp)}
                  </p>
                </div>
                
                <div className="flex-shrink-0">
                  <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t border-border text-center">
        <Button variant="ghost" iconName="ArrowDown">
          Load More Activities
        </Button>
      </div>
    </div>
  );
};

export default ActivityFeed;