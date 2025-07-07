import React from 'react';

const SkeletonLoader = ({ viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <div className="bg-surface border border-border rounded-lg p-4 animate-pulse">
        <div className="flex items-start space-x-4">
          {/* Image skeleton */}
          <div className="flex-shrink-0 w-16 h-16 bg-surface-secondary rounded-lg"></div>
          
          {/* Content skeleton */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                {/* Title */}
                <div className="h-6 bg-surface-secondary rounded w-3/4 mb-2"></div>
                {/* Tagline */}
                <div className="h-4 bg-surface-secondary rounded w-1/2 mb-2"></div>
                
                {/* Rating and Price */}
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-surface-secondary rounded"></div>
                    ))}
                  </div>
                  <div className="h-4 bg-surface-secondary rounded w-16"></div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex items-center space-x-2 ml-4">
                <div className="h-9 bg-surface-secondary rounded w-20"></div>
                <div className="h-9 bg-surface-secondary rounded w-24"></div>
              </div>
            </div>
            
            {/* Description */}
            <div className="space-y-2 mb-3">
              <div className="h-4 bg-surface-secondary rounded w-full"></div>
              <div className="h-4 bg-surface-secondary rounded w-2/3"></div>
            </div>
            
            {/* Features */}
            <div className="flex items-center space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 bg-surface-secondary rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-surface-secondary"></div>
      
      {/* Content skeleton */}
      <div className="p-4">
        {/* Title */}
        <div className="h-6 bg-surface-secondary rounded w-3/4 mb-2"></div>
        
        {/* Tagline */}
        <div className="h-4 bg-surface-secondary rounded w-1/2 mb-3"></div>
        
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-surface-secondary rounded"></div>
          ))}
          <div className="h-4 bg-surface-secondary rounded w-12 ml-2"></div>
        </div>
        
        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-surface-secondary rounded w-full"></div>
          <div className="h-4 bg-surface-secondary rounded w-4/5"></div>
          <div className="h-4 bg-surface-secondary rounded w-2/3"></div>
        </div>
        
        {/* Features */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-8 h-8 bg-surface-secondary rounded-lg"></div>
            ))}
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-2">
          <div className="flex-1 h-10 bg-surface-secondary rounded"></div>
          <div className="h-10 w-10 bg-surface-secondary rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;