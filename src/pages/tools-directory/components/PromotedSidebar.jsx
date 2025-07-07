import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PromotedSidebar = () => {
  // Mock promoted tools data
  const promotedTools = [
    {
      id: 1,
      title: "GitHub Copilot",
      tagline: "AI pair programmer",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop",
      rating: 4.8,
      pricing: "$10/month",
      category: "AI Assistant",
      isSponsored: true
    },
    {
      id: 2,
      title: "Cursor IDE",
      tagline: "AI-first code editor",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
      rating: 4.7,
      pricing: "Free",
      category: "Code Editor",
      isSponsored: true
    },
    {
      id: 3,
      title: "Tabnine",
      tagline: "AI code completion",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop",
      rating: 4.6,
      pricing: "Freemium",
      category: "AI Assistant",
      isSponsored: false
    }
  ];

  // Mock banner ads
  const bannerAds = [
    {
      id: 1,
      title: "Supercharge Your Development",
      description: "Get 50% off premium AI coding tools",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=150&fit=crop",
      cta: "Claim Offer",
      sponsor: "DevTools Pro"
    },
    {
      id: 2,
      title: "Learn AI-Powered Coding",
      description: "Free course on integrating AI into your workflow",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=150&fit=crop",
      cta: "Start Learning",
      sponsor: "CodeAcademy"
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={12}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-text-secondary'}
      />
    ));
  };

  const PromotedToolCard = ({ tool }) => (
    <div className="bg-surface border border-border rounded-lg overflow-hidden hover:border-primary transition-fast group">
      {tool.isSponsored && (
        <div className="bg-accent text-accent-foreground px-2 py-1 text-xs font-medium">
          <Icon name="Star" size={12} className="inline mr-1" />
          Sponsored
        </div>
      )}
      
      <div className="relative h-24 bg-surface-secondary overflow-hidden">
        <Image
          src={tool.thumbnail}
          alt={tool.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>
      
      <div className="p-3">
        <Link to={`/tool-details?id=${tool.id}`}>
          <h4 className="font-semibold text-text-primary hover:text-primary transition-fast text-sm line-clamp-1 mb-1">
            {tool.title}
          </h4>
        </Link>
        
        <p className="text-xs text-text-secondary mb-2 line-clamp-1">
          {tool.tagline}
        </p>
        
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1">
            {renderStars(tool.rating)}
            <span className="text-text-secondary ml-1">{tool.rating}</span>
          </div>
          <span className="text-accent font-medium">{tool.pricing}</span>
        </div>
      </div>
    </div>
  );

  const BannerAd = ({ ad }) => (
    <div className="bg-surface border border-border rounded-lg overflow-hidden relative group hover:border-primary transition-fast">
      <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-medium z-10">
        Ad
      </div>
      
      <div className="relative h-32 bg-surface-secondary overflow-hidden">
        <Image
          src={ad.image}
          alt={ad.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
          <h4 className="font-semibold text-sm mb-1 line-clamp-1">
            {ad.title}
          </h4>
          <p className="text-xs opacity-90 line-clamp-2 mb-2">
            {ad.description}
          </p>
          <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-medium hover:bg-primary-600 transition-fast">
            {ad.cta}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-80 space-y-6 sticky top-20">
      {/* Promoted Tools Section */}
      <div className="glassmorphic border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            Featured Tools
          </h3>
          <Icon name="TrendingUp" size={18} className="text-primary" />
        </div>
        
        <div className="space-y-3">
          {promotedTools.map(tool => (
            <PromotedToolCard key={tool.id} tool={tool} />
          ))}
        </div>
        
        <Link to="/featured-tools" className="block mt-4">
          <Button variant="ghost" className="w-full" iconName="ArrowRight" iconPosition="right">
            View All Featured
          </Button>
        </Link>
      </div>

      {/* Banner Ads Section */}
      <div className="space-y-4">
        {bannerAds.map(ad => (
          <BannerAd key={ad.id} ad={ad} />
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="glassmorphic border border-border rounded-lg p-4">
        <div className="text-center mb-4">
          <Icon name="Mail" size={24} className="text-primary mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            Stay Updated
          </h3>
          <p className="text-sm text-text-secondary">
            Get weekly updates on new AI coding tools
          </p>
        </div>
        
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary transition-fast"
          />
          <Button variant="primary" className="w-full" iconName="Send">
            Subscribe
          </Button>
        </div>
        
        <p className="text-xs text-text-secondary mt-2 text-center">
          No spam, unsubscribe anytime
        </p>
      </div>

      {/* Quick Stats */}
      <div className="glassmorphic border border-border rounded-lg p-4">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Platform Stats
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Code" size={16} className="text-primary" />
              <span className="text-sm text-text-secondary">Total Tools</span>
            </div>
            <span className="text-sm font-semibold text-text-primary">1,247</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-primary" />
              <span className="text-sm text-text-secondary">Active Users</span>
            </div>
            <span className="text-sm font-semibold text-text-primary">45.2K</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={16} className="text-primary" />
              <span className="text-sm text-text-secondary">Reviews</span>
            </div>
            <span className="text-sm font-semibold text-text-primary">12.8K</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotedSidebar;