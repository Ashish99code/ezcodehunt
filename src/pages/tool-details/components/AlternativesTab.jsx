import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AlternativesTab = ({ tool, onAddToComparison }) => {
  const [sortBy, setSortBy] = useState('similarity');

  const alternatives = [
    {
      id: 2,
      name: 'CodeWhisperer',
      tagline: 'Amazon\'s AI-powered coding companion',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300',
      rating: 4.6,
      reviewCount: 1250,
      pricing: { startingPrice: 0, hasFreeTier: true },
      categories: ['AI Assistant', 'Code Completion'],
      similarity: 95,
      pros: ['Free tier available', 'AWS integration', 'Security scanning'],
      cons: ['Limited language support', 'Requires AWS account'],
      keyDifferences: 'More focused on AWS ecosystem and security'
    },
    {
      id: 3,
      name: 'Tabnine',
      tagline: 'AI assistant for software developers',
      image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300',
      rating: 4.4,
      reviewCount: 890,
      pricing: { startingPrice: 12, hasFreeTier: true },
      categories: ['AI Assistant', 'Code Completion'],
      similarity: 88,
      pros: ['Privacy-focused', 'On-premise deployment', 'Team features'],
      cons: ['Higher pricing', 'Smaller model'],
      keyDifferences: 'Emphasizes privacy and on-premise deployment options'
    },
    {
      id: 4,
      name: 'Codeium',
      tagline: 'Free AI-powered code acceleration toolkit',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300',
      rating: 4.3,
      reviewCount: 650,
      pricing: { startingPrice: 0, hasFreeTier: true },
      categories: ['AI Assistant', 'Code Completion'],
      similarity: 82,
      pros: ['Completely free', 'Fast suggestions', 'Good IDE support'],
      cons: ['Newer platform', 'Limited advanced features'],
      keyDifferences: 'Completely free with focus on speed and simplicity'
    },
    {
      id: 5,
      name: 'IntelliCode',
      tagline: 'AI-assisted development for Visual Studio',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300',
      rating: 4.2,
      reviewCount: 420,
      pricing: { startingPrice: 0, hasFreeTier: true },
      categories: ['AI Assistant', 'IDE Extension'],
      similarity: 75,
      pros: ['Microsoft integration', 'Free', 'Good for .NET'],
      cons: ['Limited to Microsoft stack', 'Basic features'],
      keyDifferences: 'Tightly integrated with Microsoft development tools'
    },
    {
      id: 6,
      name: 'Sourcegraph Cody',
      tagline: 'AI coding assistant that knows your codebase',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300',
      rating: 4.1,
      reviewCount: 320,
      pricing: { startingPrice: 9, hasFreeTier: true },
      categories: ['AI Assistant', 'Code Search'],
      similarity: 70,
      pros: ['Codebase awareness', 'Code search', 'Enterprise features'],
      cons: ['Complex setup', 'Higher learning curve'],
      keyDifferences: 'Focuses on understanding your entire codebase context'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-text-secondary'}
      />
    ));
  };

  const formatPrice = (price) => {
    if (price === 0) return 'Free';
    return `$${price}/month`;
  };

  const getSimilarityColor = (similarity) => {
    if (similarity >= 90) return 'text-accent';
    if (similarity >= 80) return 'text-warning';
    if (similarity >= 70) return 'text-primary';
    return 'text-text-secondary';
  };

  const sortedAlternatives = [...alternatives].sort((a, b) => {
    switch (sortBy) {
      case 'similarity':
        return b.similarity - a.similarity;
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return a.pricing.startingPrice - b.pricing.startingPrice;
      case 'reviews':
        return b.reviewCount - a.reviewCount;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">Similar Tools</h3>
          <p className="text-text-secondary">
            Discover alternatives that might better fit your needs
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-secondary">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 bg-surface border border-border rounded-lg text-text-primary text-sm focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="similarity">Similarity</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
            <option value="reviews">Reviews</option>
          </select>
        </div>
      </div>

      {/* Alternatives Grid */}
      <div className="space-y-4">
        {sortedAlternatives.map((alternative) => (
          <div key={alternative.id} className="bg-surface rounded-lg p-6 neumorphic">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Tool Info */}
              <div className="flex gap-4 flex-1">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-background rounded-lg overflow-hidden">
                    <Image
                      src={alternative.image}
                      alt={alternative.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="text-lg font-semibold text-text-primary">{alternative.name}</h4>
                    <span className={`text-sm font-medium ${getSimilarityColor(alternative.similarity)}`}>
                      {alternative.similarity}% similar
                    </span>
                  </div>
                  
                  <p className="text-text-secondary mb-3">{alternative.tagline}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      {renderStars(alternative.rating)}
                      <span className="text-sm text-text-secondary ml-1">
                        {alternative.rating} ({alternative.reviewCount})
                      </span>
                    </div>
                    
                    <div className="text-sm font-medium text-primary">
                      {formatPrice(alternative.pricing.startingPrice)}
                      {alternative.pricing.hasFreeTier && (
                        <span className="text-accent ml-1">• Free tier</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {alternative.categories.map((category) => (
                      <span
                        key={category}
                        className="px-2 py-1 bg-primary bg-opacity-10 text-primary text-xs rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-3">
                    <strong>Key difference:</strong> {alternative.keyDifferences}
                  </p>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="lg:w-80 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-accent mb-2 flex items-center gap-1">
                      <Icon name="Plus" size={14} />
                      Pros
                    </h5>
                    <ul className="space-y-1">
                      {alternative.pros.map((pro, index) => (
                        <li key={index} className="text-xs text-text-secondary flex items-start gap-1">
                          <Icon name="Check" size={12} className="text-accent flex-shrink-0 mt-0.5" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-error mb-2 flex items-center gap-1">
                      <Icon name="Minus" size={14} />
                      Cons
                    </h5>
                    <ul className="space-y-1">
                      {alternative.cons.map((con, index) => (
                        <li key={index} className="text-xs text-text-secondary flex items-start gap-1">
                          <Icon name="X" size={12} className="text-error flex-shrink-0 mt-0.5" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="right"
                    onClick={() => window.open(`/tool-details?id=${alternative.id}`, '_blank')}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="GitCompare"
                    onClick={() => onAddToComparison(alternative)}
                  >
                    Compare
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison CTA */}
      <div className="bg-surface rounded-lg p-6 neumorphic text-center">
        <Icon name="GitCompare" size={32} className="mx-auto text-primary mb-3" />
        <h4 className="text-lg font-semibold text-text-primary mb-2">
          Can't decide between options?
        </h4>
        <p className="text-text-secondary mb-4">
          Compare up to 3 tools side-by-side to see detailed feature comparisons, pricing, and user reviews.
        </p>
        <Button
          variant="primary"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => window.open('/tool-comparison', '_blank')}
        >
          Start Comparison
        </Button>
      </div>
    </div>
  );
};

export default AlternativesTab;