import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AdPlacement = ({ 
  type = 'banner', // 'banner', 'sidebar', 'card'
  position = 'between-sections', // 'between-sections', 'sidebar', 'footer'
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [adData, setAdData] = useState(null);

  // Mock ad data - in real app, this would come from ad server
  const mockAds = {
    banner: {
      id: 'banner-1',
      title: 'Boost Your Coding Productivity',
      description: 'Try GitHub Copilot - AI pair programmer that helps you write code faster',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      cta: 'Start Free Trial',
      url: '#',
      sponsor: 'GitHub',
      type: 'sponsored'
    },
    sidebar: {
      id: 'sidebar-1',
      title: 'VS Code Extensions',
      description: 'Discover the best extensions to supercharge your development workflow',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop',
      cta: 'Explore Now',
      url: '#',
      sponsor: 'Microsoft',
      type: 'promoted'
    },
    card: {
      id: 'card-1',
      title: 'AI Code Review Tool',
      description: 'Automated code review with AI-powered suggestions and security scanning',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
      cta: 'Learn More',
      url: '#',
      sponsor: 'CodeClimate',
      type: 'sponsored'
    }
  };

  useEffect(() => {
    // Simulate ad loading
    const loadAd = () => {
      setTimeout(() => {
        setAdData(mockAds[type]);
      }, 500);
    };

    loadAd();
  }, [type]);

  const handleAdClick = () => {
    if (adData?.url) {
      // Track ad click
      console.log('Ad clicked:', adData.id);
      // In real app, would open URL
      window.open(adData.url, '_blank');
    }
  };

  const handleCloseAd = (e) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  if (!isVisible || !adData) {
    return null;
  }

  // Banner Ad (Full width between sections)
  if (type === 'banner') {
    return (
      <div className={`py-8 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="relative glassmorphic rounded-xl overflow-hidden cursor-pointer group hover:border-primary/50 transition-fast" onClick={handleAdClick}>
            {/* Close Button */}
            <button
              onClick={handleCloseAd}
              className="absolute top-3 right-3 z-10 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-fast"
            >
              <Icon name="X" size={12} className="text-white" />
            </button>

            {/* Sponsor Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full backdrop-blur-sm">
                {adData.type === 'sponsored' ? 'Sponsored' : 'Promoted'}
              </span>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="lg:w-1/3 h-48 lg:h-auto">
                <Image
                  src={adData.image}
                  alt={adData.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <h3 className="text-xl lg:text-2xl font-bold text-text-primary mb-2 group-hover:text-primary transition-fast">
                    {adData.title}
                  </h3>
                  <p className="text-text-secondary">
                    {adData.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Icon name="Building" size={16} />
                    <span>by {adData.sponsor}</span>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    {adData.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sidebar Ad (Compact vertical)
  if (type === 'sidebar') {
    return (
      <div className={`glassmorphic rounded-xl overflow-hidden cursor-pointer group hover:border-primary/50 transition-fast ${className}`} onClick={handleAdClick}>
        {/* Close Button */}
        <button
          onClick={handleCloseAd}
          className="absolute top-2 right-2 z-10 w-5 h-5 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-fast"
        >
          <Icon name="X" size={10} className="text-white" />
        </button>

        {/* Sponsor Badge */}
        <div className="absolute top-2 left-2 z-10">
          <span className="px-1.5 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded-full backdrop-blur-sm">
            {adData.type === 'sponsored' ? 'Ad' : 'Promoted'}
          </span>
        </div>

        {/* Image */}
        <div className="relative h-32">
          <Image
            src={adData.image}
            alt={adData.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h4 className="font-semibold text-text-primary mb-2 text-sm group-hover:text-primary transition-fast line-clamp-2">
            {adData.title}
          </h4>
          <p className="text-xs text-text-secondary mb-3 line-clamp-2">
            {adData.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary">
              by {adData.sponsor}
            </span>
            <Button
              variant="primary"
              size="xs"
              iconName="ArrowRight"
              iconPosition="right"
            >
              {adData.cta}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Card Ad (Tool card size)
  if (type === 'card') {
    return (
      <div className={`glassmorphic rounded-xl overflow-hidden cursor-pointer group hover:border-primary/50 transition-fast ${className}`} onClick={handleAdClick}>
        {/* Close Button */}
        <button
          onClick={handleCloseAd}
          className="absolute top-3 right-3 z-10 w-6 h-6 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-fast"
        >
          <Icon name="X" size={12} className="text-white" />
        </button>

        {/* Sponsor Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full backdrop-blur-sm">
            {adData.type === 'sponsored' ? 'Sponsored' : 'Promoted'}
          </span>
        </div>

        {/* Image */}
        <div className="relative h-48">
          <Image
            src={adData.image}
            alt={adData.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h4 className="font-semibold text-text-primary mb-2 group-hover:text-primary transition-fast line-clamp-1">
            {adData.title}
          </h4>
          <p className="text-sm text-text-secondary mb-4 line-clamp-2">
            {adData.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-text-secondary">
              <Icon name="Building" size={12} />
              <span>by {adData.sponsor}</span>
            </div>
            <Button
              variant="primary"
              size="sm"
              iconName="ArrowRight"
              iconPosition="right"
            >
              {adData.cta}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AdPlacement;