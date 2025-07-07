import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyComparison = () => {
  const navigate = useNavigate();

  const handleBrowseTools = () => {
    navigate('/tools-directory');
  };

  const handleViewFeatured = () => {
    navigate('/tools-directory?filter=featured');
  };

  const handleViewTrending = () => {
    navigate('/tools-directory?filter=trending');
  };

  const popularCategories = [
    { name: 'AI Assistants', icon: 'Bot', count: 24 },
    { name: 'Code Editors', icon: 'Code', count: 18 },
    { name: 'DevOps Tools', icon: 'Settings', count: 32 },
    { name: 'API Testing', icon: 'Zap', count: 15 },
    { name: 'Design Tools', icon: 'Palette', count: 21 },
    { name: 'Productivity', icon: 'Clock', count: 28 }
  ];

  const quickStartSteps = [
    {
      step: 1,
      title: 'Browse Tools',
      description: 'Explore our directory of AI coding tools',
      icon: 'Search'
    },
    {
      step: 2,
      title: 'Add to Compare',
      description: 'Click the compare button on tools you\'re interested in',
      icon: 'Plus'
    },
    {
      step: 3,
      title: 'Compare Features',
      description: 'View side-by-side comparisons of features and pricing',
      icon: 'GitCompare'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 neumorphic">
          <Icon name="GitCompare" size={40} className="text-white" />
        </div>
        
        <h1 className="text-4xl lg:text-5xl font-heading font-bold text-text-primary mb-4">
          Compare AI Coding Tools
        </h1>
        
        <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
          Make informed decisions by comparing features, pricing, and user reviews of the best AI-powered development tools side by side.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            iconName="Search"
            onClick={handleBrowseTools}
            className="px-8 py-3"
          >
            Browse All Tools
          </Button>
          <Button
            variant="outline"
            iconName="TrendingUp"
            onClick={handleViewTrending}
            className="px-8 py-3"
          >
            View Trending
          </Button>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-text-primary text-center mb-12">
            How Tool Comparison Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickStartSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto neumorphic">
                    <Icon name={step.icon} size={24} className="text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">{step.title}</h3>
                <p className="text-text-secondary">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-text-primary text-center mb-12">
            Popular Tool Categories
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => navigate(`/tools-directory?category=${encodeURIComponent(category.name)}`)}
                className="bg-surface border border-border rounded-lg p-6 hover:border-primary transition-fast neumorphic group"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-fast">
                    <Icon name={category.icon} size={20} className="text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-text-primary group-hover:text-primary transition-fast">
                      {category.name}
                    </h3>
                    <p className="text-sm text-text-secondary">{category.count} tools available</p>
                  </div>
                  <Icon name="ArrowRight" size={16} className="text-text-secondary group-hover:text-primary transition-fast" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Tools Preview */}
      <div className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-text-primary mb-4">
              Start with Featured Tools
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Explore our hand-picked selection of the most popular and highly-rated AI coding tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              { name: 'GitHub Copilot', category: 'AI Assistant', rating: 4.8, price: '$10/month' },
              { name: 'VS Code', category: 'Editor', rating: 4.9, price: 'Free' },
              { name: 'Docker Desktop', category: 'DevOps', rating: 4.6, price: 'Free' }
            ].map((tool, index) => (
              <div key={index} className="bg-background border border-border rounded-lg p-6 neumorphic">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Icon name="Code" size={16} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary">{tool.name}</h3>
                    <p className="text-sm text-text-secondary">{tool.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                    <span className="text-sm text-text-secondary">{tool.rating}</span>
                  </div>
                  <span className="text-sm font-medium text-primary">{tool.price}</span>
                </div>

                <Button
                  variant="outline"
                  iconName="Plus"
                  onClick={() => navigate(`/tools-directory?highlight=${encodeURIComponent(tool.name)}`)}
                  className="w-full"
                >
                  Add to Compare
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="primary"
              iconName="Star"
              onClick={handleViewFeatured}
              className="px-8 py-3"
            >
              View All Featured Tools
            </Button>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-heading font-bold mb-4">
              Ready to Find Your Perfect Tools?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of developers who use EZCode to discover and compare the best AI coding tools
            </p>
            <Button
              variant="secondary"
              iconName="ArrowRight"
              onClick={handleBrowseTools}
              className="px-8 py-3 bg-white text-primary hover:bg-gray-100"
            >
              Start Comparing Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyComparison;