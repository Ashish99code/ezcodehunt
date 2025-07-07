import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatus = () => {
  const systemMetrics = [
    {
      id: 'server-status',
      name: 'Server Status',
      status: 'healthy',
      value: '99.9%',
      description: 'Uptime last 30 days',
      icon: 'Server'
    },
    {
      id: 'database',
      name: 'Database',
      status: 'healthy',
      value: '2.3ms',
      description: 'Average response time',
      icon: 'Database'
    },
    {
      id: 'api-performance',
      name: 'API Performance',
      status: 'warning',
      value: '145ms',
      description: 'Average response time',
      icon: 'Zap'
    },
    {
      id: 'storage',
      name: 'Storage Usage',
      status: 'healthy',
      value: '67%',
      description: 'of allocated space',
      icon: 'HardDrive'
    },
    {
      id: 'cdn',
      name: 'CDN Status',
      status: 'healthy',
      value: '100%',
      description: 'Global availability',
      icon: 'Globe'
    },
    {
      id: 'security',
      name: 'Security Scan',
      status: 'error',
      value: '2 Issues',
      description: 'Requires attention',
      icon: 'Shield'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'healthy':
        return 'bg-success bg-opacity-10 border-success';
      case 'warning':
        return 'bg-warning bg-opacity-10 border-warning';
      case 'error':
        return 'bg-error bg-opacity-10 border-error';
      default:
        return 'bg-surface-secondary border-border';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg neumorphic">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text-primary">System Status</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm text-success font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {systemMetrics.map((metric) => (
            <div
              key={metric.id}
              className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-elevation-1 ${getStatusBg(metric.status)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name={metric.icon} size={18} className="text-text-secondary" />
                  <span className="text-sm font-medium text-text-primary">{metric.name}</span>
                </div>
                <Icon 
                  name={getStatusIcon(metric.status)} 
                  size={16} 
                  className={getStatusColor(metric.status)}
                />
              </div>
              
              <div className="space-y-1">
                <div className="text-xl font-bold text-text-primary">{metric.value}</div>
                <div className="text-xs text-text-secondary">{metric.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
          <button className="flex items-center space-x-2 text-sm text-primary hover:text-primary-600 transition-fast">
            <Icon name="RefreshCw" size={14} />
            <span>Refresh Status</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;