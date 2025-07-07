import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import AdminSidebar from './components/AdminSidebar';
import StatsCard from './components/StatsCard';
import RecentSubmissions from './components/RecentSubmissions';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import SystemStatus from './components/SystemStatus';
import NotificationPanel from './components/NotificationPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const timeRanges = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const dashboardStats = [
    {
      title: 'Total Tools',
      value: '1,247',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Database',
      color: 'primary'
    },
    {
      title: 'Pending Submissions',
      value: '23',
      change: '+5',
      changeType: 'positive',
      icon: 'Clock',
      color: 'warning'
    },
    {
      title: 'Active Users',
      value: '8,934',
      change: '+18.2%',
      changeType: 'positive',
      icon: 'Users',
      color: 'accent'
    },
    {
      title: 'Monthly Revenue',
      value: '$12,450',
      change: '+8.7%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'success'
    },
    {
      title: 'Page Views',
      value: '156.2K',
      change: '+23.1%',
      changeType: 'positive',
      icon: 'Eye',
      color: 'secondary'
    },
    {
      title: 'System Issues',
      value: '3',
      change: '-2',
      changeType: 'negative',
      icon: 'AlertTriangle',
      color: 'error'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex">
          <div className="w-64 h-screen bg-surface animate-pulse"></div>
          <div className="flex-1 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-surface rounded-lg animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - EZCode</title>
        <meta name="description" content="Comprehensive admin dashboard for managing EZCode platform, tool submissions, users, and system analytics." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="flex">
          <AdminSidebar 
            isCollapsed={sidebarCollapsed} 
            onToggle={toggleSidebar}
          />
          
          <main className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
          }`}>
            <div className="p-6 lg:p-8">
              {/* Header Section */}
              <div className="mb-8">
                <BreadcrumbNavigation />
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mt-4">
                  <div>
                    <h1 className="text-3xl font-bold text-text-primary mb-2">
                      Admin Dashboard
                    </h1>
                    <p className="text-text-secondary">
                      Manage your platform, review submissions, and monitor system health
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-4 lg:mt-0">
                    <div className="flex items-center space-x-2">
                      <Icon name="Calendar" size={16} className="text-text-secondary" />
                      <select
                        value={selectedTimeRange}
                        onChange={(e) => setSelectedTimeRange(e.target.value)}
                        className="bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text-primary focus:border-primary focus:ring-1 focus:ring-primary"
                      >
                        {timeRanges.map((range) => (
                          <option key={range.value} value={range.value}>
                            {range.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <Button variant="primary" iconName="Download">
                      Export Report
                    </Button>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {dashboardStats.map((stat, index) => (
                  <StatsCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    change={stat.change}
                    changeType={stat.changeType}
                    icon={stat.icon}
                    color={stat.color}
                  />
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Left Column - 2/3 width */}
                <div className="lg:col-span-2 space-y-8">
                  <RecentSubmissions />
                  <QuickActions />
                  <SystemStatus />
                </div>

                {/* Right Column - 1/3 width */}
                <div className="space-y-8">
                  <NotificationPanel />
                  <ActivityFeed />
                </div>
              </div>

              {/* Bottom Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface border border-border rounded-lg p-6 neumorphic">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Platform Health Score
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-success to-accent rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">94</span>
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">Overall platform health</p>
                      <p className="text-xs text-success mt-1">Excellent performance</p>
                    </div>
                  </div>
                </div>

                <div className="bg-surface border border-border rounded-lg p-6 neumorphic">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Tools Approved Today</span>
                      <span className="text-sm font-semibold text-text-primary">8</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">New User Registrations</span>
                      <span className="text-sm font-semibold text-text-primary">23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Active Sessions</span>
                      <span className="text-sm font-semibold text-text-primary">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-text-secondary">Server Uptime</span>
                      <span className="text-sm font-semibold text-success">99.9%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;