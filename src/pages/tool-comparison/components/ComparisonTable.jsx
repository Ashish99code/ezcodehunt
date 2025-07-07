import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ComparisonTable = ({ comparisonTools, onRemoveTool }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const navigate = useNavigate();

  const comparisonSections = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'features', label: 'Features', icon: 'CheckSquare' },
    { id: 'pricing', label: 'Pricing', icon: 'DollarSign' },
    { id: 'ratings', label: 'Ratings', icon: 'Star' },
    { id: 'pros-cons', label: 'Pros & Cons', icon: 'Scale' },
    { id: 'specifications', label: 'Specifications', icon: 'Settings' }
  ];

  // Mock detailed comparison data
  const getToolDetails = (toolId) => {
    const toolData = {
      1: { // GitHub Copilot
        overview: {
          description: `AI-powered code completion tool that suggests whole lines or entire functions right inside your editor. Trained on billions of lines of code, it turns natural language prompts into coding suggestions across dozens of languages.`,
          category: 'AI Assistant',
          developer: 'GitHub',
          releaseDate: '2021-06-29',
          lastUpdated: '2024-01-15',
          platforms: ['VS Code', 'Visual Studio', 'Neovim', 'JetBrains IDEs'],
          languages: ['Python', 'JavaScript', 'TypeScript', 'Ruby', 'Go', 'C#', 'C++', 'Java', 'PHP', 'Swift']
        },
        features: {
          'Code Completion': true,
          'Multi-language Support': true,
          'Context Awareness': true,
          'Function Generation': true,
          'Comment to Code': true,
          'Code Explanation': true,
          'Bug Detection': false,
          'Code Refactoring': true,
          'Team Collaboration': true,
          'Offline Mode': false,
          'Custom Training': false,
          'API Integration': true
        },
        pricing: {
          free: false,
          plans: [
            { name: 'Individual', price: '$10/month', features: ['Personal use', 'Code suggestions', 'Multi-language support'] },
            { name: 'Business', price: '$19/month', features: ['Commercial use', 'Policy management', 'SAML SSO'] }
          ]
        },
        ratings: {
          overall: 4.8,
          ease_of_use: 4.9,
          features: 4.7,
          value: 4.6,
          support: 4.5,
          reviews_count: 12847
        },
        pros: [
          'Excellent code suggestions',
          'Supports many programming languages',
          'Integrates seamlessly with popular IDEs',
          'Constantly improving with updates'
        ],
        cons: [
          'Requires subscription for full features',
          'Sometimes suggests incorrect code',
          'Limited offline functionality',
          'Can be resource intensive'
        ],
        specifications: {
          'System Requirements': 'VS Code 1.74+, 4GB RAM minimum',
          'Internet Required': 'Yes',
          'File Size': '~50MB extension',
          'Supported OS': 'Windows, macOS, Linux',
          'API Rate Limits': '100 requests/hour (Individual)',
          'Data Privacy': 'Code snippets processed by OpenAI'
        }
      },
      2: { // VS Code
        overview: {
          description: `Free, open-source code editor developed by Microsoft. Features IntelliSense, debugging, Git integration, and extensive customization through extensions. Supports hundreds of programming languages and frameworks.`,
          category: 'Editor',
          developer: 'Microsoft',
          releaseDate: '2015-04-29',
          lastUpdated: '2024-01-10',
          platforms: ['Windows', 'macOS', 'Linux'],
          languages: ['All major programming languages via extensions']
        },
        features: {
          'Code Completion': true,
          'Multi-language Support': true,
          'Context Awareness': true,
          'Function Generation': false,
          'Comment to Code': false,
          'Code Explanation': false,
          'Bug Detection': true,
          'Code Refactoring': true,
          'Team Collaboration': true,
          'Offline Mode': true,
          'Custom Training': false,
          'API Integration': true
        },
        pricing: {
          free: true,
          plans: [
            { name: 'Free', price: 'Free', features: ['Full editor features', 'Extensions marketplace', 'Git integration'] }
          ]
        },
        ratings: {
          overall: 4.9,
          ease_of_use: 4.8,
          features: 4.9,
          value: 5.0,
          support: 4.7,
          reviews_count: 45632
        },
        pros: [
          'Completely free and open source',
          'Huge extension ecosystem',
          'Excellent performance',
          'Regular updates and improvements'
        ],
        cons: [
          'Can become slow with many extensions',
          'Memory usage can be high',
          'Learning curve for advanced features',
          'Some extensions may conflict'
        ],
        specifications: {
          'System Requirements': '1GB RAM, 200MB disk space',
          'Internet Required': 'No (for basic functionality)',
          'File Size': '~100MB',
          'Supported OS': 'Windows 7+, macOS 10.11+, Linux',
          'API Rate Limits': 'N/A',
          'Data Privacy': 'Telemetry can be disabled'
        }
      },
      3: { // Docker Desktop
        overview: {
          description: `Application for MacOS and Windows machines that provides an easy-to-use development environment for building, shipping, and running containerized applications. Includes Docker Engine, Docker CLI client, Docker Compose, and Kubernetes.`,
          category: 'DevOps',
          developer: 'Docker Inc.',
          releaseDate: '2016-07-28',
          lastUpdated: '2024-01-08',
          platforms: ['Windows', 'macOS', 'Linux'],
          languages: ['Language agnostic - containerization platform']
        },
        features: {
          'Code Completion': false,
          'Multi-language Support': true,
          'Context Awareness': false,
          'Function Generation': false,
          'Comment to Code': false,
          'Code Explanation': false,
          'Bug Detection': false,
          'Code Refactoring': false,
          'Team Collaboration': true,
          'Offline Mode': true,
          'Custom Training': false,
          'API Integration': true
        },
        pricing: {
          free: true,
          plans: [
            { name: 'Personal', price: 'Free', features: ['Personal use', 'Small teams', 'Community support'] },
            { name: 'Pro', price: '$5/month', features: ['Commercial use', 'Priority support', 'Advanced features'] },
            { name: 'Team', price: '$7/month', features: ['Team management', 'Audit logs', 'SAML SSO'] }
          ]
        },
        ratings: {
          overall: 4.6,
          ease_of_use: 4.4,
          features: 4.7,
          value: 4.8,
          support: 4.3,
          reviews_count: 8934
        },
        pros: [
          'Simplifies container management',
          'Great for development environments',
          'Excellent documentation',
          'Strong community support'
        ],
        cons: [
          'Resource intensive',
          'Can be complex for beginners',
          'Licensing changes for commercial use',
          'Occasional stability issues'
        ],
        specifications: {
          'System Requirements': '4GB RAM, WSL2 (Windows)',
          'Internet Required': 'For image downloads',
          'File Size': '~500MB',
          'Supported OS': 'Windows 10+, macOS 10.15+, Linux',
          'API Rate Limits': 'Docker Hub rate limits apply',
          'Data Privacy': 'Local container data'
        }
      }
    };

    return toolData[toolId] || {};
  };

  const handleViewDetails = (toolId) => {
    navigate(`/tool-details?id=${toolId}`);
  };

  const renderOverviewSection = () => (
    <div className="space-y-6">
      {comparisonTools.map((tool) => {
        const details = getToolDetails(tool.id);
        return (
          <div key={tool.id} className="lg:hidden bg-surface border border-border rounded-lg p-4 neumorphic">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Code" size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary">{tool.name}</h3>
                <p className="text-sm text-text-secondary">{details.overview?.category}</p>
              </div>
              <button
                onClick={() => onRemoveTool(tool.id)}
                className="text-text-secondary hover:text-error transition-fast"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            <p className="text-sm text-text-secondary mb-4">{details.overview?.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Developer:</span>
                <span className="text-text-primary ml-2">{details.overview?.developer}</span>
              </div>
              <div>
                <span className="text-text-secondary">Rating:</span>
                <span className="text-text-primary ml-2">{tool.rating}/5</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-text-secondary font-medium">Attribute</th>
              {comparisonTools.map((tool) => (
                <th key={tool.id} className="text-center p-4 min-w-64">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <Icon name="Code" size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">{tool.name}</h3>
                      <p className="text-sm text-text-secondary">{getToolDetails(tool.id).overview?.category}</p>
                    </div>
                    <button
                      onClick={() => onRemoveTool(tool.id)}
                      className="text-text-secondary hover:text-error transition-fast"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Description', key: 'description' },
              { label: 'Developer', key: 'developer' },
              { label: 'Release Date', key: 'releaseDate' },
              { label: 'Last Updated', key: 'lastUpdated' },
              { label: 'Platforms', key: 'platforms' }
            ].map((row) => (
              <tr key={row.key} className="border-b border-border-secondary">
                <td className="p-4 font-medium text-text-primary">{row.label}</td>
                {comparisonTools.map((tool) => {
                  const details = getToolDetails(tool.id);
                  const value = details.overview?.[row.key];
                  return (
                    <td key={tool.id} className="p-4 text-center text-text-secondary">
                      {Array.isArray(value) ? value.join(', ') : value || 'N/A'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFeaturesSection = () => (
    <div className="space-y-6">
      {/* Mobile Accordion View */}
      <div className="lg:hidden space-y-4">
        {comparisonTools.map((tool) => {
          const details = getToolDetails(tool.id);
          return (
            <div key={tool.id} className="bg-surface border border-border rounded-lg p-4 neumorphic">
              <h3 className="font-semibold text-text-primary mb-4">{tool.name}</h3>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(details.features || {}).map(([feature, supported]) => (
                  <div key={feature} className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">{feature}</span>
                    <div className="flex items-center">
                      {supported ? (
                        <Icon name="Check" size={16} className="text-success" />
                      ) : (
                        <Icon name="X" size={16} className="text-error" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-text-secondary font-medium">Feature</th>
              {comparisonTools.map((tool) => (
                <th key={tool.id} className="text-center p-4 text-text-primary font-medium">
                  {tool.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonTools.length > 0 && Object.keys(getToolDetails(comparisonTools[0].id).features || {}).map((feature) => (
              <tr key={feature} className="border-b border-border-secondary">
                <td className="p-4 font-medium text-text-primary">{feature}</td>
                {comparisonTools.map((tool) => {
                  const details = getToolDetails(tool.id);
                  const supported = details.features?.[feature];
                  return (
                    <td key={tool.id} className="p-4 text-center">
                      {supported ? (
                        <Icon name="Check" size={20} className="text-success mx-auto" />
                      ) : (
                        <Icon name="X" size={20} className="text-error mx-auto" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPricingSection = () => (
    <div className="space-y-6">
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {comparisonTools.map((tool) => {
          const details = getToolDetails(tool.id);
          return (
            <div key={tool.id} className="bg-surface border border-border rounded-lg p-4 neumorphic">
              <h3 className="font-semibold text-text-primary mb-4">{tool.name}</h3>
              <div className="space-y-3">
                {details.pricing?.plans?.map((plan, index) => (
                  <div key={index} className="bg-background rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-text-primary">{plan.name}</span>
                      <span className="text-primary font-bold">{plan.price}</span>
                    </div>
                    <ul className="text-sm text-text-secondary space-y-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <Icon name="Check" size={12} className="text-success" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {comparisonTools.map((tool) => {
          const details = getToolDetails(tool.id);
          return (
            <div key={tool.id} className="space-y-4">
              <h3 className="font-semibold text-text-primary text-center">{tool.name}</h3>
              {details.pricing?.plans?.map((plan, index) => (
                <div key={index} className="bg-surface border border-border rounded-lg p-4 neumorphic">
                  <div className="text-center mb-4">
                    <h4 className="font-medium text-text-primary">{plan.name}</h4>
                    <div className="text-2xl font-bold text-primary mt-2">{plan.price}</div>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2 text-sm">
                        <Icon name="Check" size={14} className="text-success" />
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderRatingsSection = () => (
    <div className="space-y-6">
      {comparisonTools.map((tool) => {
        const details = getToolDetails(tool.id);
        const ratings = details.ratings || {};
        return (
          <div key={tool.id} className="bg-surface border border-border rounded-lg p-6 neumorphic">
            <h3 className="font-semibold text-text-primary mb-4">{tool.name}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="text-3xl font-bold text-text-primary">{ratings.overall}</div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        name="Star"
                        size={20}
                        className={star <= Math.floor(ratings.overall) ? 'text-yellow-400 fill-current' : 'text-gray-600'}
                      />
                    ))}
                  </div>
                  <span className="text-text-secondary">({ratings.reviews_count?.toLocaleString()} reviews)</span>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Ease of Use', value: ratings.ease_of_use },
                  { label: 'Features', value: ratings.features },
                  { label: 'Value', value: ratings.value },
                  { label: 'Support', value: ratings.support }
                ].map((rating) => (
                  <div key={rating.label} className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">{rating.label}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 h-2 bg-background rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(rating.value / 5) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-text-primary w-8">{rating.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderProsConsSection = () => (
    <div className="space-y-6">
      {comparisonTools.map((tool) => {
        const details = getToolDetails(tool.id);
        return (
          <div key={tool.id} className="bg-surface border border-border rounded-lg p-6 neumorphic">
            <h3 className="font-semibold text-text-primary mb-4">{tool.name}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-success mb-3 flex items-center">
                  <Icon name="ThumbsUp" size={16} className="mr-2" />
                  Pros
                </h4>
                <ul className="space-y-2">
                  {details.pros?.map((pro, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Plus" size={14} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-error mb-3 flex items-center">
                  <Icon name="ThumbsDown" size={16} className="mr-2" />
                  Cons
                </h4>
                <ul className="space-y-2">
                  {details.cons?.map((con, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <Icon name="Minus" size={14} className="text-error mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderSpecificationsSection = () => (
    <div className="space-y-6">
      {/* Mobile Accordion */}
      <div className="lg:hidden space-y-4">
        {comparisonTools.map((tool) => {
          const details = getToolDetails(tool.id);
          return (
            <div key={tool.id} className="bg-surface border border-border rounded-lg p-4 neumorphic">
              <h3 className="font-semibold text-text-primary mb-4">{tool.name}</h3>
              <div className="space-y-3">
                {Object.entries(details.specifications || {}).map(([spec, value]) => (
                  <div key={spec} className="flex flex-col space-y-1">
                    <span className="text-sm font-medium text-text-primary">{spec}</span>
                    <span className="text-sm text-text-secondary">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-text-secondary font-medium">Specification</th>
              {comparisonTools.map((tool) => (
                <th key={tool.id} className="text-center p-4 text-text-primary font-medium">
                  {tool.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonTools.length > 0 && Object.keys(getToolDetails(comparisonTools[0].id).specifications || {}).map((spec) => (
              <tr key={spec} className="border-b border-border-secondary">
                <td className="p-4 font-medium text-text-primary">{spec}</td>
                {comparisonTools.map((tool) => {
                  const details = getToolDetails(tool.id);
                  const value = details.specifications?.[spec];
                  return (
                    <td key={tool.id} className="p-4 text-center text-text-secondary">
                      {value || 'N/A'}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverviewSection();
      case 'features':
        return renderFeaturesSection();
      case 'pricing':
        return renderPricingSection();
      case 'ratings':
        return renderRatingsSection();
      case 'pros-cons':
        return renderProsConsSection();
      case 'specifications':
        return renderSpecificationsSection();
      default:
        return renderOverviewSection();
    }
  };

  if (comparisonTools.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="GitCompare" size={64} className="mx-auto text-text-secondary mb-4" />
        <h2 className="text-xl font-semibold text-text-primary mb-2">No Tools Selected</h2>
        <p className="text-text-secondary mb-6">Add tools to start comparing their features and pricing</p>
        <Button
          variant="primary"
          iconName="Plus"
          onClick={() => navigate('/tools-directory')}
        >
          Browse Tools
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-surface border border-border rounded-lg p-2 neumorphic">
        <div className="flex flex-wrap gap-1">
          {comparisonSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-fast ${
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background'
              }`}
            >
              <Icon name={section.icon} size={16} />
              <span className="hidden sm:inline">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <div className="bg-background border border-border rounded-lg p-6">
        {renderSectionContent()}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {comparisonTools.map((tool) => (
          <Button
            key={tool.id}
            variant="primary"
            iconName="ExternalLink"
            iconPosition="right"
            onClick={() => handleViewDetails(tool.id)}
            className="flex-1 sm:flex-none"
          >
            View {tool.name} Details
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ComparisonTable;