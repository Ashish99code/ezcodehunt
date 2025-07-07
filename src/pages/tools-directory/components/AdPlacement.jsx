import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AdPlacement = ({ type = 'tool-grid', position = 1, viewMode = 'grid' }) => {
  // Mock ad data - in real app, this would come from ad service
  const mockAds = [
    {
      id: 1,
      title: "Boost Your Coding Speed",
      description: "Try our AI-powered code completion tool and increase productivity by 40%",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
      cta: "Try Free",
      sponsor: "CodeBoost Pro",
      url: "#"
    },
    {
      id: 2,
      title: "Debug Faster Than Ever",
      description: "Advanced debugging tools with AI-powered error detection and solutions",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      cta: "Learn More",
      sponsor: "DebugMaster",
      url: "#"
    },
    {
      id: 3,
      title: "Cloud IDE Revolution",
      description: "Code anywhere, anytime with our cloud-based development environment",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      cta: "Start Coding",
      sponsor: "CloudCode",
      url: "#"
    }
  ];

  const ad = mockAds[position % mockAds.length];

  const handleAdClick = () => {
    // Track ad click analytics
    console.log(`Ad clicked: ${ad.title} - Position: ${position}`);
    // In real app, would track with analytics service
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-surface border border-border rounded-lg p-4 relative overflow-hidden">
        {/* Sponsored label */}
        <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium">
          Sponsored
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 w-16 h-16 bg-surface-secondary rounded-lg overflow-hidden">
            <Image
              src={ad.image}
              alt={ad.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-text-primary mb-1">
              {ad.title}
            </h3>
            <p className="text-sm text-text-secondary mb-2 line-clamp-2">
              {ad.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-text-secondary">
                by {ad.sponsor}
              </span>
              <button
                onClick={handleAdClick}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-fast"
              >
                {ad.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden relative group hover:border-primary transition-fast">
      {/* Sponsored label */}
      <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium z-10">
        Sponsored
      </div>
      
      {/* Ad Image */}
      <div className="relative h-48 bg-surface-secondary overflow-hidden">
        <Image
          src={ad.image}
          alt={ad.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-slow"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="text-lg font-semibold mb-1">
            {ad.title}
          </h3>
          <p className="text-sm opacity-90 line-clamp-2">
            {ad.description}
          </p>
        </div>
      </div>

      {/* Ad Content */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="ExternalLink" size={14} className="text-text-secondary" />
            <span className="text-xs text-text-secondary">
              by {ad.sponsor}
            </span>
          </div>
          
          <button
            onClick={handleAdClick}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-600 transition-fast flex items-center space-x-1"
          >
            <span>{ad.cta}</span>
            <Icon name="ArrowRight" size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdPlacement;