import React from 'react';
import ToolCard from './ToolCard';
import AdPlacement from './AdPlacement';
import SkeletonLoader from './SkeletonLoader';

const ToolGrid = ({ 
  tools, 
  viewMode, 
  onAddToComparison, 
  comparisonItems,
  isLoading,
  hasMore,
  onLoadMore 
}) => {
  const isInComparison = (toolId) => {
    return comparisonItems.some(item => item.id === toolId);
  };

  const renderToolsWithAds = () => {
    const items = [];
    
    tools.forEach((tool, index) => {
      // Add tool card
      items.push(
        <ToolCard
          key={tool.id}
          tool={tool}
          viewMode={viewMode}
          onAddToComparison={onAddToComparison}
          isInComparison={isInComparison(tool.id)}
        />
      );

      // Add ad placement after every 3 tools (index 2, 5, 8, etc.)
      if ((index + 1) % 3 === 0 && index < tools.length - 1) {
        items.push(
          <AdPlacement
            key={`ad-${index}`}
            type="tool-grid"
            position={Math.floor((index + 1) / 3)}
            viewMode={viewMode}
          />
        );
      }
    });

    return items;
  };

  const renderSkeletonLoaders = () => {
    const skeletonCount = viewMode === 'list' ? 5 : 8;
    return [...Array(skeletonCount)].map((_, index) => (
      <SkeletonLoader key={`skeleton-${index}`} viewMode={viewMode} />
    ));
  };

  if (isLoading && tools.length === 0) {
    return (
      <div className={`grid gap-6 ${
        viewMode === 'list' ?'grid-cols-1' :'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {renderSkeletonLoaders()}
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-12 h-12 text-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.007-5.691-2.709M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          No tools found
        </h3>
        <p className="text-text-secondary mb-4">
          Try adjusting your filters or search terms to find more tools.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={`grid gap-6 ${
        viewMode === 'list' ?'grid-cols-1' :'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {renderToolsWithAds()}
      </div>

      {/* Loading more indicator */}
      {isLoading && tools.length > 0 && (
        <div className={`grid gap-6 ${
          viewMode === 'list' ?'grid-cols-1' :'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
          {renderSkeletonLoaders()}
        </div>
      )}

      {/* Load more button */}
      {hasMore && !isLoading && (
        <div className="text-center py-8">
          <button
            onClick={onLoadMore}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary-600 transition-fast font-medium"
          >
            Load More Tools
          </button>
        </div>
      )}

      {/* End of results */}
      {!hasMore && tools.length > 0 && (
        <div className="text-center py-8">
          <p className="text-text-secondary">
            You've reached the end of the results
          </p>
        </div>
      )}
    </div>
  );
};

export default ToolGrid;