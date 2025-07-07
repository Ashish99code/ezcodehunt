import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FeaturesTab = ({ tool }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const featureCategories = [
    {
      id: 'core',
      name: 'Core Features',
      icon: 'Cpu',
      features: [
        { name: 'AI Code Completion', available: true, description: 'Intelligent code suggestions powered by machine learning' },
        { name: 'Syntax Highlighting', available: true, description: 'Advanced syntax highlighting for 100+ languages' },
        { name: 'Error Detection', available: true, description: 'Real-time error detection and suggestions' },
        { name: 'Code Refactoring', available: true, description: 'Automated code refactoring tools' },
        { name: 'Smart Indentation', available: true, description: 'Automatic code formatting and indentation' },
        { name: 'Code Folding', available: false, description: 'Collapse and expand code blocks' }
      ]
    },
    {
      id: 'collaboration',
      name: 'Collaboration',
      icon: 'Users',
      features: [
        { name: 'Real-time Collaboration', available: true, description: 'Work together with team members in real-time' },
        { name: 'Code Reviews', available: true, description: 'Built-in code review and commenting system' },
        { name: 'Shared Workspaces', available: true, description: 'Create and manage shared development environments' },
        { name: 'Live Chat', available: false, description: 'Integrated chat for team communication' },
        { name: 'Screen Sharing', available: false, description: 'Share your screen during pair programming' }
      ]
    },
    {
      id: 'debugging',
      name: 'Debugging & Testing',
      icon: 'Bug',
      features: [
        { name: 'Interactive Debugger', available: true, description: 'Step-through debugging with breakpoints' },
        { name: 'Unit Testing', available: true, description: 'Integrated unit testing framework' },
        { name: 'Performance Profiling', available: true, description: 'Analyze code performance and bottlenecks' },
        { name: 'Memory Analysis', available: false, description: 'Monitor memory usage and detect leaks' },
        { name: 'Load Testing', available: false, description: 'Test application performance under load' }
      ]
    },
    {
      id: 'deployment',
      name: 'Deployment & DevOps',
      icon: 'Rocket',
      features: [
        { name: 'CI/CD Integration', available: true, description: 'Seamless integration with CI/CD pipelines' },
        { name: 'Docker Support', available: true, description: 'Built-in Docker containerization' },
        { name: 'Cloud Deployment', available: true, description: 'One-click deployment to major cloud providers' },
        { name: 'Environment Management', available: true, description: 'Manage multiple deployment environments' },
        { name: 'Monitoring & Alerts', available: false, description: 'Application monitoring and alerting' }
      ]
    }
  ];

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const getAvailabilityStats = () => {
    const totalFeatures = featureCategories.reduce((sum, category) => sum + category.features.length, 0);
    const availableFeatures = featureCategories.reduce(
      (sum, category) => sum + category.features.filter(f => f.available).length, 
      0
    );
    return { total: totalFeatures, available: availableFeatures };
  };

  const stats = getAvailabilityStats();

  return (
    <div className="space-y-6">
      {/* Feature Summary */}
      <div className="bg-surface rounded-lg p-6 neumorphic">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Feature Overview</h3>
          <div className="text-sm text-text-secondary">
            {stats.available} of {stats.total} features available
          </div>
        </div>
        
        <div className="w-full bg-background rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${(stats.available / stats.total) * 100}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-xs text-text-secondary mt-2">
          <span>0%</span>
          <span>{Math.round((stats.available / stats.total) * 100)}% Complete</span>
          <span>100%</span>
        </div>
      </div>

      {/* Feature Categories */}
      <div className="space-y-4">
        {featureCategories.map((category) => (
          <div key={category.id} className="bg-surface rounded-lg neumorphic overflow-hidden">
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-background transition-fast"
            >
              <div className="flex items-center gap-3">
                <Icon name={category.icon} size={20} className="text-primary" />
                <h4 className="font-medium text-text-primary">{category.name}</h4>
                <span className="text-sm text-text-secondary">
                  ({category.features.filter(f => f.available).length}/{category.features.length})
                </span>
              </div>
              <Icon 
                name={expandedCategory === category.id ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-text-secondary" 
              />
            </button>

            {expandedCategory === category.id && (
              <div className="px-4 pb-4 space-y-3 animate-slide-in-down">
                {category.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-background rounded-lg">
                    <div className="flex-shrink-0 mt-0.5">
                      {feature.available ? (
                        <Icon name="CheckCircle" size={16} className="text-accent" />
                      ) : (
                        <Icon name="XCircle" size={16} className="text-text-secondary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className={`font-medium ${feature.available ? 'text-text-primary' : 'text-text-secondary'}`}>
                          {feature.name}
                        </h5>
                        {!feature.available && (
                          <span className="text-xs bg-text-secondary bg-opacity-20 text-text-secondary px-2 py-0.5 rounded-full">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Feature Request */}
      <div className="bg-surface rounded-lg p-6 neumorphic">
        <div className="flex items-center gap-3 mb-3">
          <Icon name="Lightbulb" size={20} className="text-warning" />
          <h3 className="text-lg font-semibold text-text-primary">Missing a Feature?</h3>
        </div>
        <p className="text-text-secondary mb-4">
          Don't see a feature you need? Let the developers know what you're looking for.
        </p>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-600 transition-fast">
          <Icon name="MessageSquare" size={16} />
          Request Feature
        </button>
      </div>
    </div>
  );
};

export default FeaturesTab;