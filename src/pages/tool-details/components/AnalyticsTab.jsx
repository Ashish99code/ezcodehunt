import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsTab = ({ tool }) => {
  const [timeRange, setTimeRange] = useState('6months');

  // Mock analytics data
  const usageData = [
    { month: 'Jul', users: 12000, sessions: 45000 },
    { month: 'Aug', users: 15000, sessions: 52000 },
    { month: 'Sep', users: 18000, sessions: 61000 },
    { month: 'Oct', users: 22000, sessions: 75000 },
    { month: 'Nov', users: 28000, sessions: 89000 },
    { month: 'Dec', users: 35000, sessions: 105000 }
  ];

  const geographyData = [
    { country: 'United States', users: 12500, percentage: 35.7 },
    { country: 'India', users: 7000, percentage: 20.0 },
    { country: 'Germany', users: 4200, percentage: 12.0 },
    { country: 'United Kingdom', users: 3500, percentage: 10.0 },
    { country: 'Canada', users: 2800, percentage: 8.0 },
    { country: 'Others', users: 5000, percentage: 14.3 }
  ];

  const deviceData = [
    { name: 'Desktop', value: 65, color: '#3B82F6' },
    { name: 'Mobile', value: 25, color: '#8B5CF6' },
    { name: 'Tablet', value: 10, color: '#10B981' }
  ];

  const trafficSources = [
    { source: 'Direct', visits: 45000, percentage: 42.9 },
    { source: 'Google Search', visits: 32000, percentage: 30.5 },
    { source: 'Social Media', visits: 15000, percentage: 14.3 },
    { source: 'Referrals', visits: 8000, percentage: 7.6 },
    { source: 'Email', visits: 5000, percentage: 4.7 }
  ];

  const topKeywords = [
    { keyword: 'AI code completion', searches: 8500, difficulty: 'High' },
    { keyword: 'VS Code extension', searches: 6200, difficulty: 'Medium' },
    { keyword: 'code assistant', searches: 4800, difficulty: 'Medium' },
    { keyword: 'programming helper', searches: 3600, difficulty: 'Low' },
    { keyword: 'developer tools', searches: 2900, difficulty: 'High' }
  ];

  const stats = [
    { label: 'Monthly Active Users', value: '35,000', change: '+12.5%', trend: 'up', icon: 'Users' },
    { label: 'Total Sessions', value: '105K', change: '+18.2%', trend: 'up', icon: 'Activity' },
    { label: 'Avg. Session Duration', value: '24m 32s', change: '+5.8%', trend: 'up', icon: 'Clock' },
    { label: 'User Retention', value: '78%', change: '-2.1%', trend: 'down', icon: 'TrendingUp' }
  ];

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-text-primary">Analytics Overview</h3>
        <div className="bg-surface rounded-lg p-1 neumorphic">
          <div className="flex">
            {['1month', '3months', '6months', '1year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-fast ${
                  timeRange === range
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {range === '1month' && '1M'}
                {range === '3months' && '3M'}
                {range === '6months' && '6M'}
                {range === '1year' && '1Y'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-surface rounded-lg p-4 neumorphic">
            <div className="flex items-center justify-between mb-2">
              <Icon name={stat.icon} size={20} className="text-primary" />
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-accent' : 'text-error'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{stat.value}</div>
            <div className="text-sm text-text-secondary">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Usage Trends */}
      <div className="bg-surface rounded-lg p-6 neumorphic">
        <h4 className="text-lg font-semibold text-text-primary mb-4">Usage Trends</h4>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#111111', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="users" 
                stroke="#3B82F6" 
                fill="rgba(59, 130, 246, 0.2)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="sessions" 
                stroke="#8B5CF6" 
                fill="rgba(139, 92, 246, 0.2)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geographic Distribution */}
        <div className="bg-surface rounded-lg p-6 neumorphic">
          <h4 className="text-lg font-semibold text-text-primary mb-4">Geographic Distribution</h4>
          <div className="space-y-3">
            {geographyData.map((country, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-text-primary">{country.country}</span>
                </div>
                <div className="text-right">
                  <div className="text-text-primary font-medium">{country.users.toLocaleString()}</div>
                  <div className="text-text-secondary text-sm">{country.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-surface rounded-lg p-6 neumorphic">
          <h4 className="text-lg font-semibold text-text-primary mb-4">Device Breakdown</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {deviceData.map((device, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: device.color }}
                ></div>
                <span className="text-sm text-text-secondary">
                  {device.name} ({device.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="bg-surface rounded-lg p-6 neumorphic">
        <h4 className="text-lg font-semibold text-text-primary mb-4">Traffic Sources</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trafficSources} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis type="number" stroke="#9CA3AF" />
              <YAxis dataKey="source" type="category" stroke="#9CA3AF" width={100} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#111111', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="visits" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Keywords */}
      <div className="bg-surface rounded-lg p-6 neumorphic">
        <h4 className="text-lg font-semibold text-text-primary mb-4">Top Keywords</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-text-secondary font-medium">Keyword</th>
                <th className="text-right py-2 text-text-secondary font-medium">Searches</th>
                <th className="text-right py-2 text-text-secondary font-medium">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {topKeywords.map((keyword, index) => (
                <tr key={index} className="border-b border-border-secondary">
                  <td className="py-3 text-text-primary">{keyword.keyword}</td>
                  <td className="py-3 text-right text-text-primary">{keyword.searches.toLocaleString()}</td>
                  <td className="py-3 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      keyword.difficulty === 'High' ? 'bg-error bg-opacity-20 text-error' :
                      keyword.difficulty === 'Medium'? 'bg-warning bg-opacity-20 text-warning' : 'bg-accent bg-opacity-20 text-accent'
                    }`}>
                      {keyword.difficulty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-surface rounded-lg p-4 neumorphic border-l-4 border-warning">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="font-medium text-text-primary mb-1">Analytics Disclaimer</h5>
            <p className="text-sm text-text-secondary">
              The analytics data shown here is for demonstration purposes only and may not reflect actual usage statistics. 
              Real analytics would be provided by the tool's official dashboard or third-party analytics services.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsTab;