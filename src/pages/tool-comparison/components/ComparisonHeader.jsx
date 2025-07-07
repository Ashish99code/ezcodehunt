import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonHeader = ({ comparisonTools, onRemoveTool, onClearAll }) => {
  const navigate = useNavigate();

  const handleBackToDirectory = () => {
    navigate('/tools-directory');
  };

  return (
    <div className="bg-surface border-b border-border p-4 lg:p-6">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Header Title and Back Button */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              iconName="ArrowLeft"
              onClick={handleBackToDirectory}
              className="lg:hidden"
            >
              Back
            </Button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary">
                Compare Tools
              </h1>
              <p className="text-text-secondary mt-1">
                Side-by-side comparison of {comparisonTools.length} tool{comparisonTools.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button
              variant="ghost"
              iconName="ArrowLeft"
              onClick={handleBackToDirectory}
            >
              Back to Directory
            </Button>
            {comparisonTools.length > 0 && (
              <Button
                variant="outline"
                iconName="Trash2"
                onClick={onClearAll}
              >
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Selected Tools Preview */}
        {comparisonTools.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {comparisonTools.map((tool, index) => (
              <div
                key={tool.id}
                className="flex items-center space-x-2 bg-background border border-border rounded-lg px-3 py-2 neumorphic"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{index + 1}</span>
                </div>
                <span className="text-sm font-medium text-text-primary">{tool.name}</span>
                <button
                  onClick={() => onRemoveTool(tool.id)}
                  className="text-text-secondary hover:text-error transition-fast"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Mobile Clear All Button */}
        {comparisonTools.length > 0 && (
          <div className="lg:hidden mt-4">
            <Button
              variant="outline"
              iconName="Trash2"
              onClick={onClearAll}
              className="w-full"
            >
              Clear All Comparisons
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonHeader;