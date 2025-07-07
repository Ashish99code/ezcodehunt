import React from 'react';
import Icon from '../../../components/AppIcon';

const OverviewTab = ({ tool }) => {
  const keyFeatures = [
    "AI-powered code completion",
    "Multi-language support",
    "Real-time collaboration",
    "Advanced debugging tools",
    "Integrated version control",
    "Custom extensions support"
  ];

  const supportedLanguages = [
    "JavaScript", "Python", "TypeScript", "Java", "C++", "Go", "Rust", "PHP"
  ];

  return (
    <div className="space-y-6">
      {/* Key Features */}
      <div className="bg-surface rounded-lg p-6 neumorphic">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Zap" size={20} className="text-accent" />
          Key Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {keyFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Icon name="Check" size={16} className="text-accent flex-shrink-0" />
              <span className="text-text-primary">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Supported Languages */}
      <div className="bg-surface rounded-lg p-6 neumorphic">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Code" size={20} className="text-primary" />
          Supported Languages
        </h3>
        <div className="flex flex-wrap gap-2">
          {supportedLanguages.map((language) => (
            <span
              key={language}
              className="px-3 py-1 bg-background text-text-primary text-sm rounded-full border border-border"
            >
              {language}
            </span>
          ))}
        </div>
      </div>

      {/* System Requirements */}
      <div className="bg-surface rounded-lg p-6 neumorphic">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Monitor" size={20} className="text-secondary" />
          System Requirements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-text-primary mb-2">Minimum Requirements</h4>
            <ul className="space-y-1 text-text-secondary text-sm">
              <li>• 4GB RAM</li>
              <li>• 2GB free disk space</li>
              <li>• Internet connection</li>
              <li>• Modern web browser</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-text-primary mb-2">Recommended</h4>
            <ul className="space-y-1 text-text-secondary text-sm">
              <li>• 8GB+ RAM</li>
              <li>• 5GB+ free disk space</li>
              <li>• High-speed internet</li>
              <li>• Latest browser version</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Integration & Compatibility */}
      <div className="bg-surface rounded-lg p-6 neumorphic">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Icon name="Puzzle" size={20} className="text-warning" />
          Integrations
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['GitHub', 'GitLab', 'Bitbucket', 'Jira', 'Slack', 'Discord', 'Trello', 'Notion'].map((integration) => (
            <div key={integration} className="flex items-center gap-2 p-2 bg-background rounded-lg">
              <Icon name="Link" size={16} className="text-text-secondary" />
              <span className="text-sm text-text-primary">{integration}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;