import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ComparisonHeader from './components/ComparisonHeader';
import ToolSelector from './components/ToolSelector';
import ComparisonTable from './components/ComparisonTable';
import ComparisonActions from './components/ComparisonActions';
import EmptyComparison from './components/EmptyComparison';
import ScrollToTop from '../../components/ScrollToTop';

const ToolComparison = () => {
  const [comparisonTools, setComparisonTools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Mock tools data for demonstration
  const mockTools = [
    { 
      id: 1, 
      name: 'GitHub Copilot', 
      category: 'AI Assistant', 
      rating: 4.8, 
      price: '$10/month',
      logo: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=64&h=64&fit=crop&crop=center'
    },
    { 
      id: 2, 
      name: 'VS Code', 
      category: 'Editor', 
      rating: 4.9, 
      price: 'Free',
      logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=64&h=64&fit=crop&crop=center'
    },
    { 
      id: 3, 
      name: 'Docker Desktop', 
      category: 'DevOps', 
      rating: 4.6, 
      price: 'Free',
      logo: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=64&h=64&fit=crop&crop=center'
    }
  ];

  useEffect(() => {
    const loadComparisonData = async () => {
      setIsLoading(true);
      
      try {
        // Check URL parameters for shared comparison
        const urlParams = new URLSearchParams(location.search);
        const toolsParam = urlParams.get('tools');
        
        if (toolsParam) {
          // Load tools from URL parameter (shared comparison)
          const toolIds = toolsParam.split(',').map(id => parseInt(id));
          const selectedTools = mockTools.filter(tool => toolIds.includes(tool.id));
          setComparisonTools(selectedTools);
        } else if (location.state?.comparisonItems) {
          // Load tools from navigation state
          setComparisonTools(location.state.comparisonItems);
        } else {
          // Load tools from localStorage
          const savedItems = localStorage.getItem('comparisonItems');
          if (savedItems) {
            try {
              const items = JSON.parse(savedItems);
              setComparisonTools(items);
            } catch (error) {
              console.error('Error parsing saved comparison items:', error);
              setComparisonTools([]);
            }
          } else {
            // For demo purposes, load default comparison
            setComparisonTools(mockTools);
          }
        }
      } catch (error) {
        console.error('Error loading comparison data:', error);
        setComparisonTools([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadComparisonData();
  }, [location]);

  useEffect(() => {
    // Save comparison tools to localStorage whenever they change
    if (comparisonTools.length > 0) {
      localStorage.setItem('comparisonItems', JSON.stringify(comparisonTools));
    } else {
      localStorage.removeItem('comparisonItems');
    }
  }, [comparisonTools]);

  const handleAddTool = (tool) => {
    if (comparisonTools.length < 3 && !comparisonTools.find(t => t.id === tool.id)) {
      setComparisonTools(prev => [...prev, tool]);
    }
  };

  const handleRemoveTool = (toolId) => {
    setComparisonTools(prev => prev.filter(tool => tool.id !== toolId));
  };

  const handleClearAll = () => {
    setComparisonTools([]);
    localStorage.removeItem('comparisonItems');
  };

  const handleExportPDF = (pdfData) => {
    // Handle PDF export completion
    console.log('PDF exported:', pdfData);
    // In real app, show success toast notification
  };

  const handleShareComparison = (shareUrl) => {
    // Handle share completion
    console.log('Comparison shared:', shareUrl);
    // In real app, show success toast notification
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-surface rounded w-1/3"></div>
            <div className="h-64 bg-surface rounded"></div>
            <div className="h-96 bg-surface rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Show empty state if no tools are selected
  if (comparisonTools.length === 0) {
    return (
      <>
        <Helmet>
          <title>Compare AI Coding Tools - EZCode</title>
          <meta name="description" content="Compare AI-powered coding tools side by side. Analyze features, pricing, and user reviews to find the perfect development tools for your needs." />
          <meta name="keywords" content="AI coding tools comparison, developer tools, code editor comparison, programming tools" />
          <meta property="og:title" content="Compare AI Coding Tools - EZCode" />
          <meta property="og:description" content="Compare AI-powered coding tools side by side. Analyze features, pricing, and user reviews to find the perfect development tools for your needs." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`${window.location.origin}/tool-comparison`} />
        </Helmet>
        
        <Header />
        <EmptyComparison />
        <ScrollToTop />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Compare ${comparisonTools.map(tool => tool.name).join(' vs ')} - EZCode`}</title>
        <meta name="description" content={`Side-by-side comparison of ${comparisonTools.map(tool => tool.name).join(', ')}. Compare features, pricing, ratings, and specifications to make informed decisions.`} />
        <meta name="keywords" content={`${comparisonTools.map(tool => tool.name).join(', ')}, tool comparison, AI coding tools`} />
        <meta property="og:title" content={`Compare ${comparisonTools.map(tool => tool.name).join(' vs ')} - EZCode`} />
        <meta property="og:description" content={`Side-by-side comparison of ${comparisonTools.map(tool => tool.name).join(', ')}. Compare features, pricing, ratings, and specifications.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/tool-comparison`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <ComparisonHeader 
          comparisonTools={comparisonTools}
          onRemoveTool={handleRemoveTool}
          onClearAll={handleClearAll}
        />

        <main className="container mx-auto px-4 py-8">
          <BreadcrumbNavigation className="mb-6" />
          
          <div className="space-y-8">
            {/* Tool Selector */}
            {comparisonTools.length < 3 && (
              <ToolSelector 
                onAddTool={handleAddTool}
                selectedToolIds={comparisonTools.map(tool => tool.id)}
                maxTools={3}
              />
            )}

            {/* Comparison Table */}
            <ComparisonTable 
              comparisonTools={comparisonTools}
              onRemoveTool={handleRemoveTool}
            />

            {/* Comparison Actions */}
            <ComparisonActions 
              comparisonTools={comparisonTools}
              onExportPDF={handleExportPDF}
              onShareComparison={handleShareComparison}
            />
          </div>
        </main>

        <ScrollToTop />
      </div>
    </>
  );
};

export default ToolComparison;