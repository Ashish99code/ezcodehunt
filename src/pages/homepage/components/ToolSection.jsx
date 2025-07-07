import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ToolCard from './ToolCard';

const ToolSection = ({ 
  title, 
  subtitle, 
  tools, 
  sectionType, 
  showViewAll = true,
  className = '' 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const handleViewAll = () => {
    const routes = {
      featured: '/tools-directory?filter=featured',
      trending: '/tools-directory?filter=trending',
      'just-launched': '/tools-directory?filter=new',
      deals: '/tools-directory?filter=deals'
    };
    navigate(routes[sectionType] || '/tools-directory');
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, tools.length - getVisibleCount());
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
      scrollToIndex(currentIndex + 1);
    }
  };

  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.offsetWidth || 0;
      const gap = 16; // gap-4 = 16px
      const scrollPosition = index * (cardWidth + gap);
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1280) return 4; // xl
    if (window.innerWidth >= 1024) return 3; // lg
    if (window.innerWidth >= 768) return 2;  // md
    return 1; // sm
  };

  const canScrollPrev = currentIndex > 0;
  const canScrollNext = currentIndex < Math.max(0, tools.length - getVisibleCount());

  const getSectionIcon = () => {
    const icons = {
      featured: 'Star',
      trending: 'TrendingUp',
      'just-launched': 'Rocket',
      deals: 'Tag'
    };
    return icons[sectionType] || 'Grid3X3';
  };

  const getSectionColor = () => {
    const colors = {
      featured: 'text-warning',
      trending: 'text-accent',
      'just-launched': 'text-primary',
      deals: 'text-secondary'
    };
    return colors[sectionType] || 'text-primary';
  };

  if (!tools || tools.length === 0) {
    return null;
  }

  return (
    <section className={`py-12 lg:py-16 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center neumorphic`}>
              <Icon name={getSectionIcon()} size={20} color="#FFFFFF" />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                {title}
              </h2>
              {subtitle && (
                <p className="text-text-secondary mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {showViewAll && (
            <Button
              variant="outline"
              onClick={handleViewAll}
              iconName="ArrowRight"
              iconPosition="right"
              className="hidden sm:flex"
            >
              View All
            </Button>
          )}
        </div>

        {/* Tools Grid/Carousel */}
        <div className="relative">
          {/* Navigation Buttons - Desktop */}
          <div className="hidden lg:flex absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
            <button
              onClick={handlePrevious}
              disabled={!canScrollPrev}
              className={`w-12 h-12 rounded-full glassmorphic flex items-center justify-center transition-fast ${
                canScrollPrev 
                  ? 'text-text-primary hover:text-primary hover:border-primary' :'text-text-secondary cursor-not-allowed opacity-50'
              }`}
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
          </div>

          <div className="hidden lg:flex absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
            <button
              onClick={handleNext}
              disabled={!canScrollNext}
              className={`w-12 h-12 rounded-full glassmorphic flex items-center justify-center transition-fast ${
                canScrollNext 
                  ? 'text-text-primary hover:text-primary hover:border-primary' :'text-text-secondary cursor-not-allowed opacity-50'
              }`}
            >
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>

          {/* Tools Container */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide lg:overflow-hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tools.map((tool, index) => (
              <div
                key={tool.id}
                className="flex-shrink-0 w-80 sm:w-72 lg:w-full lg:flex-1"
              >
                <ToolCard tool={tool} />
              </div>
            ))}
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex lg:hidden justify-center mt-6 gap-2">
            {Array.from({ length: Math.ceil(tools.length / getVisibleCount()) }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  scrollToIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-fast ${
                  index === currentIndex ? 'bg-primary' : 'bg-text-secondary'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile View All Button */}
        {showViewAll && (
          <div className="flex sm:hidden justify-center mt-6">
            <Button
              variant="outline"
              onClick={handleViewAll}
              iconName="ArrowRight"
              iconPosition="right"
              fullWidth
            >
              View All {title}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ToolSection;