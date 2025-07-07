import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ToolHero = ({ tool, onFavoriteToggle, onAddToComparison }) => {
  const [isFavorited, setIsFavorited] = useState(tool.isFavorited || false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    onFavoriteToggle(tool.id, !isFavorited);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-text-secondary'}
      />
    ));
  };

  const formatPrice = (price) => {
    if (price === 0) return 'Free';
    if (typeof price === 'string') return price;
    return `$${price}/month`;
  };

  return (
    <div className="bg-surface rounded-lg p-6 neumorphic">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tool Image */}
        <div className="flex-shrink-0">
          <div className="w-full lg:w-32 h-48 lg:h-32 bg-background rounded-lg overflow-hidden">
            <Image
              src={tool.image}
              alt={tool.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Tool Information */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl lg:text-3xl font-bold text-text-primary truncate">
                  {tool.name}
                </h1>
                {tool.isVerified && (
                  <Icon name="BadgeCheck" size={24} className="text-primary flex-shrink-0" />
                )}
              </div>
              
              <p className="text-lg text-text-secondary mb-3 line-clamp-2">
                {tool.tagline}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(tool.rating)}
                  <span className="text-sm text-text-secondary ml-1">
                    {tool.rating} ({tool.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-text-secondary">
                  <Icon name="Eye" size={16} />
                  <span className="text-sm">{tool.views.toLocaleString()} views</span>
                </div>

                <div className="flex items-center gap-1 text-text-secondary">
                  <Icon name="Users" size={16} />
                  <span className="text-sm">{tool.users.toLocaleString()} users</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {tool.categories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-primary bg-opacity-10 text-primary text-sm rounded-full"
                  >
                    {category}
                  </span>
                ))}
              </div>

              <p className="text-text-primary leading-relaxed line-clamp-3 lg:line-clamp-none">
                {tool.description}
              </p>
            </div>

            {/* Pricing and Actions */}
            <div className="flex-shrink-0 lg:w-64">
              <div className="bg-background rounded-lg p-4 space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {formatPrice(tool.pricing.startingPrice)}
                  </div>
                  {tool.pricing.hasFreeTier && (
                    <div className="text-sm text-accent">Free tier available</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Button
                    variant="primary"
                    fullWidth
                    iconName="ExternalLink"
                    iconPosition="right"
                    onClick={() => window.open(tool.websiteUrl, '_blank')}
                  >
                    Visit Website
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleFavoriteClick}
                      iconName={isFavorited ? "Heart" : "Heart"}
                      className={isFavorited ? 'text-error border-error' : ''}
                    >
                      {isFavorited ? 'Favorited' : 'Favorite'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => onAddToComparison(tool)}
                      iconName="GitCompare"
                    >
                      Compare
                    </Button>
                  </div>

                  {tool.githubUrl && (
                    <Button
                      variant="ghost"
                      fullWidth
                      iconName="Github"
                      iconPosition="left"
                      onClick={() => window.open(tool.githubUrl, '_blank')}
                    >
                      View on GitHub
                    </Button>
                  )}
                </div>

                <div className="pt-3 border-t border-border">
                  <div className="text-xs text-text-secondary space-y-1">
                    <div>Last updated: {new Date(tool.lastUpdated).toLocaleDateString()}</div>
                    <div>Added: {new Date(tool.dateAdded).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolHero;