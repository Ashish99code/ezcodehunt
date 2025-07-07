import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'submission',
      title: 'New Tool Submission',
      message: 'CodeMaster AI has been submitted for review',
      timestamp: '2024-01-15T10:30:00Z',
      read: false,
      priority: 'high',
      actionRequired: true
    },
    {
      id: 2,
      type: 'system',
      title: 'System Alert',
      message: 'API response time is above normal threshold',
      timestamp: '2024-01-15T09:15:00Z',
      read: false,
      priority: 'medium',
      actionRequired: true
    },
    {
      id: 3,
      type: 'user',
      title: 'User Report',
      message: 'User reported inappropriate content',
      timestamp: '2024-01-15T08:45:00Z',
      read: true,
      priority: 'high',
      actionRequired: true
    },
    {
      id: 4,
      type: 'security',
      title: 'Security Scan Complete',
      message: '2 vulnerabilities found in system scan',
      timestamp: '2024-01-15T07:20:00Z',
      read: false,
      priority: 'critical',
      actionRequired: true
    },
    {
      id: 5,
      type: 'info',
      title: 'Backup Complete',
      message: 'Daily database backup completed successfully',
      timestamp: '2024-01-15T06:00:00Z',
      read: true,
      priority: 'low',
      actionRequired: false
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'submission':
        return 'FileText';
      case 'system':
        return 'AlertTriangle';
      case 'user':
        return 'User';
      case 'security':
        return 'Shield';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'text-error';
      case 'high':
        return 'text-warning';
      case 'medium':
        return 'text-primary';
      case 'low':
        return 'text-text-secondary';
      default:
        return 'text-text-secondary';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'critical':
        return 'bg-error bg-opacity-10 border-error';
      case 'high':
        return 'bg-warning bg-opacity-10 border-warning';
      case 'medium':
        return 'bg-primary bg-opacity-10 border-primary';
      case 'low':
        return 'bg-surface-secondary border-border';
      default:
        return 'bg-surface-secondary border-border';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-surface border border-border rounded-lg neumorphic">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
            {unreadCount > 0 && (
              <span className="px-2 py-1 bg-error text-error-foreground text-xs font-semibold rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" iconName="Settings">
              Settings
            </Button>
            <Button variant="ghost" size="sm" iconName="CheckCheck">
              Mark All Read
            </Button>
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Bell" size={32} className="mx-auto text-text-secondary mb-3" />
            <p className="text-text-secondary">No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-surface-secondary transition-fast ${
                  !notification.read ? 'bg-surface-secondary bg-opacity-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getPriorityBg(notification.priority)}`}>
                    <Icon 
                      name={getNotificationIcon(notification.type)} 
                      size={16} 
                      className={getPriorityColor(notification.priority)}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-semibold ${!notification.read ? 'text-text-primary' : 'text-text-secondary'}`}>
                          {notification.title}
                        </h4>
                        <p className="text-sm text-text-secondary mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs text-text-secondary">
                            {formatTime(notification.timestamp)}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityBg(notification.priority)}`}>
                            {notification.priority}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-1 ml-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 text-text-secondary hover:text-primary transition-fast"
                            title="Mark as read"
                          >
                            <Icon name="Check" size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => dismissNotification(notification.id)}
                          className="p-1 text-text-secondary hover:text-error transition-fast"
                          title="Dismiss"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                    </div>
                    
                    {notification.actionRequired && (
                      <div className="mt-3 flex items-center space-x-2">
                        <Button variant="primary" size="sm">
                          Take Action
                        </Button>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;