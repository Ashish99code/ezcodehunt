import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ToolCard = ({ tool, viewMode = 'grid', onAddToComparison, isInComparison = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToComparison = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToComparison(tool);
  };

  const formatPrice = (pricing) => {
    if (!pricing || pricing.toLowerCase() === 'free') return 'Free';
    if (pricing.toLowerCase().includes('freemium')) return 'Freemium';
    return pricing;
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-text-secondary'}
      />
    ));
  };

  const renderFeatureIcons = (features) => {
    const featureIconMap = {
      'Code Completion': 'Code',
      'Syntax Highlighting': 'Palette',
      'Debugging': 'Bug',
      'Version Control': 'GitBranch',
      'Collaboration': 'Users',
      'Cloud Sync': 'Cloud',
      'Plugin Support': 'Puzzle',
      'Multi-language': 'Globe',
      'Real-time Preview': 'Eye',
      'Code Analysis': 'Search',
      'Refactoring': 'RefreshCw',
      'Testing Integration': 'TestTube'
    };

    return features.slice(0, 4).map((feature, index) => (
      <div
        key={index}
        className="group relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-8 h-8 bg-surface border border-border rounded-lg flex items-center justify-center hover:border-primary transition-fast">
          <Icon 
            name={featureIconMap[feature] || 'Code'} 
            size={14} 
            className="text-text-secondary group-hover:text-primary transition-fast" 
          />
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-surface-secondary border border-border rounded text-xs text-text-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-fast z-10">
          {feature}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-surface-secondary"></div>
        </div>
      </div>
    ));
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-surface border border-border rounded-lg p-4 hover:border-primary transition-fast neumorphic">
        <div className="flex items-start space-x-4">
          {/* Tool Image */}
          <div className="flex-shrink-0 w-16 h-16 bg-surface-secondary rounded-lg overflow-hidden">
            <Image
              src={tool.thumbnail}
              alt={tool.title}
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* Tool Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <Link 
                  to={`/tool-details?id=${tool.id}`}
                  className="block"
                >
                  <h3 className="text-lg font-semibold text-text-primary hover:text-primary transition-fast truncate">
                    {tool.title}
                  </h3>
                </Link>
                <p className="text-sm text-text-secondary mb-1">{tool.tagline}</p>
                
                {/* Rating and Price */}
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center space-x-1">
                    {renderStars(tool.rating)}
                    <span className="text-sm text-text-secondary ml-1">
                      ({tool.reviewCount})
                    </span>
                  </div>
                  <span className="text-sm font-medium text-accent">
                    {formatPrice(tool.pricing)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant={isInComparison ? "success" : "ghost"}
                  onClick={handleAddToComparison}
                  iconName={isInComparison ? "Check" : "GitCompare"}
                  className="whitespace-nowrap"
                >
                  {isInComparison ? 'Added' : 'Compare'}
                </Button>
                <Link to={`/tool-details?id=${tool.id}`}>
                  <Button variant="primary" iconName="ArrowRight">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary mb-3 line-clamp-2">
              {tool.description}
            </p>

            {/* Features */}
            <div className="flex items-center space-x-2">
              {renderFeatureIcons(tool.features)}
              {tool.features.length > 4 && (
                <span className="text-xs text-text-secondary">
                  +{tool.features.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="bg-surface border border-border rounded-lg overflow-hidden hover:border-primary transition-fast neumorphic group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tool Image */}
      <div className="relative h-48 bg-surface-secondary overflow-hidden">
        <Image
          src={tool.thumbnail}
          alt={tool.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-slow"
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-fast ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-2">
            <Link to={`/tool-details?id=${tool.id}`}>
              <Button variant="primary" iconName="Eye">
                View Details
              </Button>
            </Link>
            <Button
              variant={isInComparison ? "success" : "ghost"}
              onClick={handleAddToComparison}
              iconName={isInComparison ? "Check" : "GitCompare"}
            >
              {isInComparison ? 'Added' : 'Compare'}
            </Button>
          </div>
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
            {formatPrice(tool.pricing)}
          </span>
        </div>
      </div>

      {/* Tool Content */}
      <div className="p-4">
        <Link 
          to={`/tool-details?id=${tool.id}`}
          className="block mb-2"
        >
          <h3 className="text-lg font-semibold text-text-primary hover:text-primary transition-fast line-clamp-1">
            {tool.title}
          </h3>
        </Link>
        
        <p className="text-sm text-text-secondary mb-3 line-clamp-1">
          {tool.tagline}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          {renderStars(tool.rating)}
          <span className="text-sm text-text-secondary ml-1">
            ({tool.reviewCount})
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-3">
          {tool.description}
        </p>

        {/* Features */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {renderFeatureIcons(tool.features)}
          </div>
          {tool.features.length > 4 && (
            <span className="text-xs text-text-secondary">
              +{tool.features.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Link to={`/tool-details?id=${tool.id}`} className="flex-1">
            <Button variant="primary" className="w-full" iconName="ArrowRight">
              View Details
            </Button>
          </Link>
          <Button
            variant={isInComparison ? "success" : "ghost"}
            onClick={handleAddToComparison}
            iconName={isInComparison ? "Check" : "GitCompare"}
          >
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;