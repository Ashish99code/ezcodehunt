import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ComparisonCart = () => {
  const [comparisonItems, setComparisonItems] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Mock comparison items - in real app, this would come from context/state management
  const mockComparisonItems = [
    { id: 1, name: 'GitHub Copilot', category: 'AI Assistant', rating: 4.8, price: '$10/month' },
    { id: 2, name: 'VS Code', category: 'Editor', rating: 4.9, price: 'Free' },
    { id: 3, name: 'Docker Desktop', category: 'DevOps', rating: 4.6, price: 'Free' }
  ];

  useEffect(() => {
    // Load comparison items from localStorage
    const savedItems = localStorage.getItem('comparisonItems');
    if (savedItems) {
      try {
        const items = JSON.parse(savedItems);
        setComparisonItems(items);
        setIsVisible(items.length > 0);
      } catch (error) {
        console.error('Error loading comparison items:', error);
        setComparisonItems([]);
      }
    } else {
      // For demo purposes, load mock data
      setComparisonItems(mockComparisonItems);
      setIsVisible(mockComparisonItems.length > 0);
    }
  }, []);

  useEffect(() => {
    // Save comparison items to localStorage whenever they change
    localStorage.setItem('comparisonItems', JSON.stringify(comparisonItems));
    setIsVisible(comparisonItems.length > 0);
  }, [comparisonItems]);

  const removeItem = (itemId) => {
    setComparisonItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearAll = () => {
    setComparisonItems([]);
    setIsExpanded(false);
  };

  const goToComparison = () => {
    if (comparisonItems.length > 0) {
      navigate('/tool-comparison', { 
        state: { comparisonItems } 
      });
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden lg:block relative">
        <button
          onClick={toggleExpanded}
          className="relative flex items-center space-x-2 px-3 py-2 bg-surface border border-border rounded-lg text-text-secondary hover:text-text-primary hover:border-primary transition-fast neumorphic"
        >
          <Icon name="GitCompare" size={18} />
          <span className="text-sm font-medium">Compare</span>
          {comparisonItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {comparisonItems.length}
            </span>
          )}
        </button>

        {/* Desktop Expanded View */}
        {isExpanded && (
          <div className="absolute top-full right-0 mt-2 w-80 glassmorphic border border-border rounded-lg shadow-elevation-3 z-50 animate-slide-in-down">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-text-primary">Compare Tools</h3>
                <button
                  onClick={toggleExpanded}
                  className="text-text-secondary hover:text-text-primary transition-fast"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>

              {comparisonItems.length === 0 ? (
                <div className="text-center py-6">
                  <Icon name="GitCompare" size={32} className="mx-auto text-text-secondary mb-2" />
                  <p className="text-sm text-text-secondary">No tools selected for comparison</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                    {comparisonItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-2 bg-background rounded-lg">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-text-primary truncate">
                            {item.name}
                          </div>
                          <div className="text-xs text-text-secondary">
                            {item.category} • {item.price}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-2 text-text-secondary hover:text-error transition-fast"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="primary"
                      onClick={goToComparison}
                      className="flex-1"
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Compare ({comparisonItems.length})
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={clearAll}
                      iconName="Trash2"
                    >
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Version - Floating Action Button */}
      <div className="lg:hidden">
        <button
          onClick={goToComparison}
          className="relative p-3 bg-primary text-primary-foreground rounded-full shadow-elevation-2 hover:bg-primary-600 transition-fast"
        >
          <Icon name="GitCompare" size={20} />
          {comparisonItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {comparisonItems.length}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Expanded Overlay */}
      {isExpanded && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={toggleExpanded}>
          <div className="absolute bottom-0 left-0 right-0 glassmorphic rounded-t-xl p-4 animate-slide-in-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Compare Tools</h3>
              <button
                onClick={toggleExpanded}
                className="text-text-secondary hover:text-text-primary transition-fast"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {comparisonItems.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="GitCompare" size={40} className="mx-auto text-text-secondary mb-3" />
                <p className="text-text-secondary">No tools selected for comparison</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                  {comparisonItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-text-primary truncate">
                          {item.name}
                        </div>
                        <div className="text-sm text-text-secondary">
                          {item.category} • {item.price}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-3 text-text-secondary hover:text-error transition-fast"
                      >
                        <Icon name="X" size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="primary"
                    onClick={goToComparison}
                    className="flex-1"
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    Compare ({comparisonItems.length})
                  </Button>
                  <Button
                    variant="outline"
                    onClick={clearAll}
                    iconName="Trash2"
                  >
                    Clear
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ComparisonCart;