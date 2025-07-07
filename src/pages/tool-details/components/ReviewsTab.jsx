import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewsTab = ({ tool }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');

  const reviews = [
    {
      id: 1,
      user: {
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        role: 'Senior Developer',
        verified: true
      },
      rating: 5,
      date: '2024-01-15',
      title: 'Game-changer for my development workflow',
      content: `This tool has completely transformed how I write code. The AI suggestions are incredibly accurate and save me hours every day. The integration with my existing IDE is seamless, and the collaborative features make team projects much more efficient.\n\nThe debugging tools are particularly impressive - they've helped me catch issues that I would have missed otherwise. Highly recommended for any serious developer.`,
      helpful: 24,
      verified: true
    },
    {
      id: 2,
      user: {
        name: 'Michael Rodriguez',avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',role: 'Full Stack Developer',
        verified: false
      },
      rating: 4,
      date: '2024-01-10',title: 'Great tool with minor issues',content: `Overall, this is an excellent coding tool. The AI completion is very helpful and the interface is clean and intuitive. However, I've experienced some occasional lag when working with large files, and the pricing could be more competitive.\n\nThe customer support team is responsive and helpful when issues arise. Looking forward to future updates that address the performance concerns.`,
      helpful: 18,
      verified: false
    },
    {
      id: 3,
      user: {
        name: 'Emily Johnson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        role: 'Frontend Developer',
        verified: true
      },
      rating: 5,
      date: '2024-01-08',
      title: 'Perfect for React development',
      content: `As a React developer, this tool has been invaluable. The component suggestions and prop completions are spot-on. The real-time collaboration feature has made pair programming sessions much more productive.\n\nThe learning curve is minimal, and the documentation is comprehensive. Worth every penny!`,
      helpful: 31,
      verified: true
    },
    {
      id: 4,
      user: {
        name: 'David Park',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        role: 'Backend Developer',
        verified: false
      },
      rating: 3,
      date: '2024-01-05',
      title: 'Good but room for improvement',
      content: `The tool has some great features, especially for frontend development. However, the backend language support could be better. Python and Node.js work well, but I've had issues with Go and Rust support.\n\nThe pricing is reasonable for what you get, but I hope they expand language support in future updates.`,
      helpful: 12,
      verified: false
    }
  ];

  const ratingDistribution = [
    { stars: 5, count: 156, percentage: 65 },
    { stars: 4, count: 48, percentage: 20 },
    { stars: 3, count: 24, percentage: 10 },
    { stars: 2, count: 7, percentage: 3 },
    { stars: 1, count: 5, percentage: 2 }
  ];

  const renderStars = (rating, size = 16) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={size}
        className={index < rating ? 'text-warning fill-current' : 'text-text-secondary'}
      />
    ));
  };

  const filteredReviews = reviews.filter(review => {
    if (filterRating === 'all') return true;
    return review.rating === parseInt(filterRating);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      <div className="bg-surface rounded-lg p-6 neumorphic">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <span className="text-4xl font-bold text-text-primary">{tool.rating}</span>
              <div className="flex">{renderStars(tool.rating, 20)}</div>
            </div>
            <p className="text-text-secondary">
              Based on {tool.reviewCount} reviews
            </p>
          </div>
          
          <div className="space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12">
                  <span className="text-sm text-text-secondary">{item.stars}</span>
                  <Icon name="Star" size={12} className="text-warning fill-current" />
                </div>
                <div className="flex-1 bg-background rounded-full h-2">
                  <div
                    className="bg-warning h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-text-secondary w-8">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="px-3 py-2 bg-surface border border-border rounded-lg text-text-primary text-sm focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-surface border border-border rounded-lg text-text-primary text-sm focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
        
        <Button variant="primary" iconName="Edit" iconPosition="left">
          Write Review
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <div key={review.id} className="bg-surface rounded-lg p-6 neumorphic">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {review.user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-text-primary">{review.user.name}</h4>
                  {review.user.verified && (
                    <Icon name="BadgeCheck" size={16} className="text-primary" />
                  )}
                  <span className="text-sm text-text-secondary">•</span>
                  <span className="text-sm text-text-secondary">{review.user.role}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">{renderStars(review.rating)}</div>
                  <span className="text-sm text-text-secondary">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                  {review.verified && (
                    <span className="text-xs bg-accent bg-opacity-20 text-accent px-2 py-1 rounded-full">
                      Verified Purchase
                    </span>
                  )}
                </div>
                
                <h5 className="font-medium text-text-primary mb-2">{review.title}</h5>
                <p className="text-text-secondary whitespace-pre-line mb-4">{review.content}</p>
                
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-fast">
                    <Icon name="ThumbsUp" size={14} />
                    <span className="text-sm">Helpful ({review.helpful})</span>
                  </button>
                  <button className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-fast">
                    <Icon name="MessageSquare" size={14} />
                    <span className="text-sm">Reply</span>
                  </button>
                  <button className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-fast">
                    <Icon name="Flag" size={14} />
                    <span className="text-sm">Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" iconName="ChevronDown" iconPosition="right">
          Load More Reviews
        </Button>
      </div>
    </div>
  );
};

export default ReviewsTab;