import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonActions = ({ comparisonTools, onExportPDF, onShareComparison }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const navigate = useNavigate();

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      // Simulate PDF export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, this would generate and download PDF
      const pdfData = {
        title: 'Tool Comparison Report',
        tools: comparisonTools.map(tool => tool.name),
        generatedAt: new Date().toISOString(),
        sections: ['Overview', 'Features', 'Pricing', 'Ratings']
      };
      
      console.log('PDF Export Data:', pdfData);
      
      // Simulate file download
      const blob = new Blob([JSON.stringify(pdfData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tool-comparison-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      if (onExportPDF) {
        onExportPDF(pdfData);
      }
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShareComparison = async () => {
    setIsSharing(true);
    try {
      // Generate shareable URL
      const toolIds = comparisonTools.map(tool => tool.id).join(',');
      const shareableUrl = `${window.location.origin}/tool-comparison?tools=${toolIds}`;
      setShareUrl(shareableUrl);
      
      // Copy to clipboard
      await navigator.clipboard.writeText(shareableUrl);
      
      if (onShareComparison) {
        onShareComparison(shareableUrl);
      }
      
      // Show success message (in real app, use toast notification)
      alert('Comparison link copied to clipboard!');
    } catch (error) {
      console.error('Share failed:', error);
      // Fallback for browsers that don't support clipboard API
      setShareUrl(`${window.location.origin}/tool-comparison?tools=${comparisonTools.map(tool => tool.id).join(',')}`);
    } finally {
      setIsSharing(false);
    }
  };

  const handleSaveComparison = () => {
    // Save comparison to localStorage
    const savedComparisons = JSON.parse(localStorage.getItem('savedComparisons') || '[]');
    const newComparison = {
      id: Date.now(),
      name: `Comparison of ${comparisonTools.map(tool => tool.name).join(', ')}`,
      tools: comparisonTools,
      createdAt: new Date().toISOString()
    };
    
    savedComparisons.push(newComparison);
    localStorage.setItem('savedComparisons', JSON.stringify(savedComparisons));
    
    alert('Comparison saved successfully!');
  };

  const handleStartNewComparison = () => {
    // Clear current comparison and redirect to tools directory
    localStorage.removeItem('comparisonItems');
    navigate('/tools-directory');
  };

  if (comparisonTools.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6 neumorphic">
      <h2 className="text-lg font-semibold text-text-primary mb-4">Comparison Actions</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Export PDF */}
        <Button
          variant="primary"
          iconName="Download"
          onClick={handleExportPDF}
          loading={isExporting}
          disabled={isExporting}
          className="w-full"
        >
          {isExporting ? 'Exporting...' : 'Export PDF'}
        </Button>

        {/* Share Comparison */}
        <Button
          variant="secondary"
          iconName="Share"
          onClick={handleShareComparison}
          loading={isSharing}
          disabled={isSharing}
          className="w-full"
        >
          {isSharing ? 'Generating...' : 'Share'}
        </Button>

        {/* Save Comparison */}
        <Button
          variant="outline"
          iconName="Bookmark"
          onClick={handleSaveComparison}
          className="w-full"
        >
          Save
        </Button>

        {/* Start New Comparison */}
        <Button
          variant="ghost"
          iconName="Plus"
          onClick={handleStartNewComparison}
          className="w-full"
        >
          New Comparison
        </Button>
      </div>

      {/* Share URL Display */}
      {shareUrl && (
        <div className="mt-4 p-3 bg-background border border-border rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-secondary mb-1">Shareable Link:</p>
              <p className="text-sm text-text-primary font-mono truncate">{shareUrl}</p>
            </div>
            <Button
              variant="ghost"
              iconName="Copy"
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              className="ml-2"
            >
            </Button>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{comparisonTools.length}</div>
            <div className="text-sm text-text-secondary">Tools Compared</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">
              {comparisonTools.filter(tool => tool.price === 'Free').length}
            </div>
            <div className="text-sm text-text-secondary">Free Tools</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">
              {(comparisonTools.reduce((sum, tool) => sum + tool.rating, 0) / comparisonTools.length).toFixed(1)}
            </div>
            <div className="text-sm text-text-secondary">Avg Rating</div>
          </div>
        </div>
      </div>

      {/* Comparison Tips */}
      <div className="mt-6 p-4 bg-primary bg-opacity-10 border border-primary border-opacity-20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-text-primary mb-1">Comparison Tips</h3>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Focus on features that matter most to your workflow</li>
              <li>• Consider long-term costs and scalability</li>
              <li>• Check user reviews and community support</li>
              <li>• Try free trials before making decisions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonActions;