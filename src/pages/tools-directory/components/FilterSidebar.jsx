import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  onClearFilters,
  isMobile = false 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const categories = [
    'AI Assistant', 'Code Editor', 'IDE Extensions', 'Browser IDE', 
    'Debugging Tools', 'Code Generators', 'Platform Integration', 
    'Testing Tools', 'DevOps', 'Documentation'
  ];

  const programmingLanguages = [
    'JavaScript', 'Python', 'Java', 'TypeScript', 'C++', 'C#', 
    'Go', 'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin'
  ];

  const pricingTiers = [
    { id: 'free', label: 'Free', value: 'free' },
    { id: 'freemium', label: 'Freemium', value: 'freemium' },
    { id: 'paid', label: 'Paid', value: 'paid' },
    { id: 'enterprise', label: 'Enterprise', value: 'enterprise' }
  ];

  const features = [
    'Code Completion', 'Syntax Highlighting', 'Debugging', 'Version Control',
    'Collaboration', 'Cloud Sync', 'Plugin Support', 'Multi-language',
    'Real-time Preview', 'Code Analysis', 'Refactoring', 'Testing Integration'
  ];

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (filterType, value, checked = null) => {
    const newFilters = { ...localFilters };
    
    if (filterType === 'priceRange') {
      newFilters.priceRange = value;
      setPriceRange(value);
    } else if (filterType === 'rating') {
      newFilters.rating = value;
    } else if (Array.isArray(newFilters[filterType])) {
      if (checked) {
        newFilters[filterType] = [...newFilters[filterType], value];
      } else {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      }
    } else {
      newFilters[filterType] = value;
    }
    
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    if (isMobile) {
      onClose();
    }
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      categories: [],
      languages: [],
      pricing: [],
      features: [],
      rating: 0,
      priceRange: [0, 1000]
    };
    setLocalFilters(clearedFilters);
    setPriceRange([0, 1000]);
    onClearFilters();
  };

  const FilterSection = ({ title, children, isCollapsible = true }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
      <div className="mb-6">
        <div 
          className={`flex items-center justify-between mb-3 ${isCollapsible ? 'cursor-pointer' : ''}`}
          onClick={() => isCollapsible && setIsExpanded(!isExpanded)}
        >
          <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide">
            {title}
          </h3>
          {isCollapsible && (
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-text-secondary" 
            />
          )}
        </div>
        {isExpanded && children}
      </div>
    );
  };

  const CheckboxFilter = ({ items, filterType, selectedItems }) => (
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {items.map((item) => (
        <label key={item} className="flex items-center space-x-2 cursor-pointer group">
          <Input
            type="checkbox"
            checked={selectedItems.includes(item)}
            onChange={(e) => handleFilterChange(filterType, item, e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm text-text-secondary group-hover:text-text-primary transition-fast">
            {item}
          </span>
        </label>
      ))}
    </div>
  );

  const RatingFilter = () => (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((rating) => (
        <label key={rating} className="flex items-center space-x-2 cursor-pointer group">
          <Input
            type="radio"
            name="rating"
            checked={localFilters.rating === rating}
            onChange={() => handleFilterChange('rating', rating)}
            className="w-4 h-4"
          />
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={14}
                className={i < rating ? 'text-yellow-400 fill-current' : 'text-text-secondary'}
              />
            ))}
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-fast">
              & up
            </span>
          </div>
        </label>
      ))}
    </div>
  );

  const PriceRangeFilter = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="number"
          placeholder="Min"
          value={priceRange[0]}
          onChange={(e) => {
            const newRange = [parseInt(e.target.value) || 0, priceRange[1]];
            setPriceRange(newRange);
            handleFilterChange('priceRange', newRange);
          }}
          className="w-20 text-sm"
        />
        <span className="text-text-secondary">-</span>
        <Input
          type="number"
          placeholder="Max"
          value={priceRange[1]}
          onChange={(e) => {
            const newRange = [priceRange[0], parseInt(e.target.value) || 1000];
            setPriceRange(newRange);
            handleFilterChange('priceRange', newRange);
          }}
          className="w-20 text-sm"
        />
      </div>
      <div className="text-xs text-text-secondary">
        Price range: ${priceRange[0]} - ${priceRange[1]}
      </div>
    </div>
  );

  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
        {isMobile && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-fast"
          >
            <Icon name="X" size={20} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <FilterSection title="Categories">
          <CheckboxFilter 
            items={categories}
            filterType="categories"
            selectedItems={localFilters.categories}
          />
        </FilterSection>

        <FilterSection title="Programming Languages">
          <CheckboxFilter 
            items={programmingLanguages}
            filterType="languages"
            selectedItems={localFilters.languages}
          />
        </FilterSection>

        <FilterSection title="Pricing">
          <CheckboxFilter 
            items={pricingTiers.map(tier => tier.label)}
            filterType="pricing"
            selectedItems={localFilters.pricing}
          />
        </FilterSection>

        <FilterSection title="Price Range">
          <PriceRangeFilter />
        </FilterSection>

        <FilterSection title="Rating">
          <RatingFilter />
        </FilterSection>

        <FilterSection title="Features">
          <CheckboxFilter 
            items={features}
            filterType="features"
            selectedItems={localFilters.features}
          />
        </FilterSection>
      </div>

      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="primary"
          onClick={applyFilters}
          className="w-full"
          iconName="Filter"
        >
          Apply Filters
        </Button>
        <Button
          variant="ghost"
          onClick={clearAllFilters}
          className="w-full"
          iconName="X"
        >
          Clear All
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
            <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] glassmorphic animate-slide-in-right">
              {sidebarContent}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="w-80 glassmorphic border border-border rounded-lg h-fit sticky top-20">
      {sidebarContent}
    </div>
  );
};

export default FilterSidebar;