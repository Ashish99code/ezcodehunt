import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickFilterBar = ({ 
  activeFilters, 
  onRemoveFilter, 
  onClearAll, 
  onOpenFilters,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  totalResults
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance', icon: 'Target' },
    { value: 'popularity', label: 'Popularity', icon: 'TrendingUp' },
    { value: 'rating', label: 'Rating', icon: 'Star' },
    { value: 'newest', label: 'Newest', icon: 'Clock' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' }
  ];

  const getActiveFilterCount = () => {
    let count = 0;
    Object.values(activeFilters).forEach(filter => {
      if (Array.isArray(filter)) {
        count += filter.length;
      } else if (filter && filter !== 0) {
        count += 1;
      }
    });
    return count;
  };

  const formatFilterLabel = (key, value) => {
    const labels = {
      categories: 'Category',
      languages: 'Language',
      pricing: 'Pricing',
      features: 'Feature',
      rating: 'Rating'
    };
    
    if (key === 'rating') {
      return `${labels[key]}: ${value}+ stars`;
    }
    
    return `${labels[key]}: ${value}`;
  };

  const renderActiveFilters = () => {
    const filterTags = [];
    
    Object.entries(activeFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(item => {
          filterTags.push({
            key: `${key}-${item}`,
            label: formatFilterLabel(key, item),
            onRemove: () => onRemoveFilter(key, item)
          });
        });
      } else if (value && value !== 0) {
        filterTags.push({
          key: `${key}-${value}`,
          label: formatFilterLabel(key, value),
          onRemove: () => onRemoveFilter(key, null)
        });
      }
    });

    return filterTags;
  };

  const activeFilterTags = renderActiveFilters();
  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="sticky top-16 z-40 bg-background border-b border-border">
      <div className="container mx-auto px-4 py-3">
        {/* Top Row - Results count and view controls */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-text-secondary">
              {totalResults.toLocaleString()} tools found
            </span>
            
            {/* Mobile Filter Button */}
            <Button
              variant="ghost"
              onClick={onOpenFilters}
              className="lg:hidden"
              iconName="Filter"
            >
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none bg-surface border border-border rounded-lg px-3 py-2 pr-8 text-sm text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-fast"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary pointer-events-none" 
              />
            </div>

            {/* View Mode Toggle - Desktop only */}
            <div className="hidden md:flex items-center space-x-1 bg-surface border border-border rounded-lg p-1">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded transition-fast ${
                  viewMode === 'grid' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name="Grid3X3" size={16} />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded transition-fast ${
                  viewMode === 'list' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name="List" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Row */}
        {activeFilterTags.length > 0 && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <span className="text-xs text-text-secondary whitespace-nowrap">
              Active filters:
            </span>
            
            <div className="flex items-center space-x-2 min-w-0">
              {activeFilterTags.map(filter => (
                <div
                  key={filter.key}
                  className="flex items-center space-x-1 bg-primary bg-opacity-10 border border-primary border-opacity-30 rounded-full px-3 py-1 text-xs text-primary whitespace-nowrap"
                >
                  <span>{filter.label}</span>
                  <button
                    onClick={filter.onRemove}
                    className="text-primary hover:text-primary-600 transition-fast"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </div>
              ))}
              
              <Button
                variant="ghost"
                onClick={onClearAll}
                className="text-xs px-2 py-1 h-auto whitespace-nowrap"
                iconName="X"
              >
                Clear all
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickFilterBar;