import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ToolCard = ({ tool, showCompareButton = true, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/tool-details?id=${tool.id}`);
  };

  const handleCompare = (e) => {
    e.stopPropagation();
    // Add to comparison cart logic would go here
    const existingItems = JSON.parse(localStorage.getItem('comparisonItems') || '[]');
    const isAlreadyAdded = existingItems.some(item => item.id === tool.id);
    
    if (!isAlreadyAdded && existingItems.length < 3) {
      const updatedItems = [...existingItems, tool];
      localStorage.setItem('comparisonItems', JSON.stringify(updatedItems));
      // Show toast notification
      console.log('Added to comparison:', tool.name);
    }
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    // Favorite logic would go here
    console.log('Toggle favorite:', tool.name);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="StarHalf" size={14} className="text-warning fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-text-secondary" />
      );
    }

    return stars;
  };

  const formatPrice = (price) => {
    if (price === 0 || price === 'Free') return 'Free';
    if (typeof price === 'string') return price;
    return `$${price}/month`;
  };

  return (
    <div 
      className={`group relative bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer neumorphic hover:scale-[1.02] ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
    >
      {/* Image Section */}
      <div className="relative h-48 bg-surface-secondary overflow-hidden">
        <Image
          src={tool.thumbnail}
          alt={tool.name}
          className={`w-full h-full object-cover transition-all duration-300 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            variant="primary"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {tool.isNew && (
            <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
              New
            </span>
          )}
          {tool.isFeatured && (
            <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
              Featured
            </span>
          )}
          {tool.hasDiscount && (
            <span className="px-2 py-1 bg-warning text-warning-foreground text-xs font-medium rounded-full">
              Deal
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-fast"
        >
          <Icon 
            name={tool.isFavorited ? "Heart" : "Heart"} 
            size={16} 
            className={tool.isFavorited ? "text-error fill-current" : "text-white"} 
          />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-text-primary mb-1 line-clamp-1 group-hover:text-primary transition-fast">
            {tool.name}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-2">
            {tool.tagline}
          </p>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {renderStars(tool.rating)}
          </div>
          <span className="text-sm font-medium text-text-primary">
            {tool.rating.toFixed(1)}
          </span>
          <span className="text-sm text-text-secondary">
            ({tool.reviewCount} reviews)
          </span>
        </div>

        {/* Category and Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-2 py-1 bg-surface-secondary text-text-secondary text-xs rounded-md">
            {tool.category}
          </span>
          <span className="text-sm font-semibold text-text-primary">
            {formatPrice(tool.price)}
          </span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-4">
          {tool.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
            >
              {feature}
            </span>
          ))}
          {tool.features.length > 3 && (
            <span className="px-2 py-1 bg-surface-secondary text-text-secondary text-xs rounded-md">
              +{tool.features.length - 3} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleViewDetails}
            className="flex-1"
            iconName="ArrowRight"
            iconPosition="right"
          >
            View Details
          </Button>
          {showCompareButton && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCompare}
              iconName="GitCompare"
            >
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-4 text-xs text-text-secondary">
            <div className="flex items-center gap-1">
              <Icon name="Eye" size={12} />
              <span>{tool.views.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Download" size={12} />
              <span>{tool.downloads.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;