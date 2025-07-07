import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const Sidebar = ({ tool }) => {
  const relatedTools = [
    {
      id: 2,
      name: 'VS Code Extensions',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150',
      rating: 4.8,
      price: 'Free'
    },
    {
      id: 3,
      name: 'Postman',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=150',
      rating: 4.7,
      price: '$12/month'
    },
    {
      id: 4,
      name: 'Docker Desktop',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150',
      rating: 4.6,
      price: 'Free'
    }
  ];

  const quickStats = [
    { label: 'Downloads', value: '2.5M+', icon: 'Download' },
    { label: 'GitHub Stars', value: '45.2K', icon: 'Star' },
    { label: 'Contributors', value: '1.2K', icon: 'Users' },
    { label: 'Last Release', value: '2 days ago', icon: 'Calendar' }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-text-secondary'}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="bg-surface rounded-lg p-4 neumorphic">
        <h3 className="font-semibold text-text-primary mb-4">Quick Stats</h3>
        <div className="space-y-3">
          {quickStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name={stat.icon} size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">{stat.label}</span>
              </div>
              <span className="text-sm font-medium text-text-primary">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Tools */}
      <div className="bg-surface rounded-lg p-4 neumorphic">
        <h3 className="font-semibold text-text-primary mb-4">Related Tools</h3>
        <div className="space-y-3">
          {relatedTools.map((relatedTool) => (
            <div key={relatedTool.id} className="flex items-center gap-3 p-2 bg-background rounded-lg hover:bg-surface-secondary transition-fast cursor-pointer">
              <div className="w-10 h-10 bg-background rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={relatedTool.image}
                  alt={relatedTool.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-text-primary truncate">{relatedTool.name}</h4>
                <div className="flex items-center gap-1 mt-1">
                  {renderStars(relatedTool.rating)}
                  <span className="text-xs text-text-secondary ml-1">{relatedTool.rating}</span>
                </div>
              </div>
              <div className="text-xs font-medium text-primary">{relatedTool.price}</div>
            </div>
          ))}
        </div>
        <Button variant="ghost" fullWidth className="mt-3" iconName="ArrowRight" iconPosition="right">
          View More
        </Button>
      </div>

      {/* Advertisement Placeholder */}
      <div className="bg-surface rounded-lg p-4 neumorphic border-2 border-dashed border-border">
        <div className="text-center py-8">
          <Icon name="Megaphone" size={32} className="mx-auto text-text-secondary mb-2" />
          <p className="text-sm text-text-secondary mb-2">Advertisement</p>
          <p className="text-xs text-text-secondary">
            Promote your coding tool here
          </p>
        </div>
      </div>

      {/* Support */}
      <div className="bg-surface rounded-lg p-4 neumorphic">
        <h3 className="font-semibold text-text-primary mb-4">Need Help?</h3>
        <div className="space-y-3">
          <Button variant="outline" fullWidth iconName="MessageCircle" iconPosition="left">
            Contact Support
          </Button>
          <Button variant="outline" fullWidth iconName="FileText" iconPosition="left">
            Documentation
          </Button>
          <Button variant="outline" fullWidth iconName="Users" iconPosition="left">
            Community
          </Button>
        </div>
      </div>

      {/* Share */}
      <div className="bg-surface rounded-lg p-4 neumorphic">
        <h3 className="font-semibold text-text-primary mb-4">Share This Tool</h3>
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 p-2 bg-background rounded-lg hover:bg-surface-secondary transition-fast">
            <Icon name="Twitter" size={16} className="text-primary" />
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 p-2 bg-background rounded-lg hover:bg-surface-secondary transition-fast">
            <Icon name="Facebook" size={16} className="text-primary" />
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 p-2 bg-background rounded-lg hover:bg-surface-secondary transition-fast">
            <Icon name="Linkedin" size={16} className="text-primary" />
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 p-2 bg-background rounded-lg hover:bg-surface-secondary transition-fast">
            <Icon name="Link" size={16} className="text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;