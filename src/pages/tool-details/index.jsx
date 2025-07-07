import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import ToolHero from './components/ToolHero';
import TabNavigation from './components/TabNavigation';
import OverviewTab from './components/OverviewTab';
import FeaturesTab from './components/FeaturesTab';
import PricingTab from './components/PricingTab';
import ReviewsTab from './components/ReviewsTab';
import AnalyticsTab from './components/AnalyticsTab';
import AlternativesTab from './components/AlternativesTab';
import ScreenshotsTab from './components/ScreenshotsTab';
import Sidebar from './components/Sidebar';
import Icon from '../../components/AppIcon';

const ToolDetails = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock tool data - in real app, this would come from API
  const mockTool = {
    id: 1,
    name: 'GitHub Copilot',
    tagline: 'Your AI pair programmer',
    description: `GitHub Copilot is an AI-powered code completion tool that helps developers write code faster and with fewer errors. It uses machine learning models trained on billions of lines of code to suggest whole lines or entire functions right inside your editor.\n\nWhether you're working on a new project or maintaining existing code, Copilot adapts to your coding style and provides contextually relevant suggestions. It supports dozens of programming languages and integrates seamlessly with popular IDEs like VS Code, Visual Studio, Neovim, and JetBrains IDEs.`,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400',
    rating: 4.8,
    reviewCount: 2847,
    views: 125000,
    users: 89000,
    categories: ['AI Assistant', 'Code Completion', 'Productivity'],
    pricing: {
      startingPrice: 10,
      hasFreeTier: true
    },
    websiteUrl: 'https://github.com/features/copilot',githubUrl: 'https://github.com/github/copilot',
    isVerified: true,
    isFavorited: false,
    lastUpdated: '2024-01-15T10:30:00Z',dateAdded: '2023-06-15T08:00:00Z'
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'features', label: 'Features', icon: 'Zap' },
    { id: 'pricing', label: 'Pricing', icon: 'DollarSign' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare', badge: mockTool.reviewCount },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'alternatives', label: 'Alternatives', icon: 'GitCompare' },
    { id: 'screenshots', label: 'Screenshots', icon: 'Image' }
  ];

  useEffect(() => {
    const loadTool = async () => {
      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const toolId = searchParams.get('id') || '1';
        // In real app, fetch tool by ID from API
        setTool(mockTool);
        
        // Track view (with 2-second threshold)
        const viewTimeout = setTimeout(() => {
          trackView(toolId);
        }, 2000);
        
        return () => clearTimeout(viewTimeout);
      } catch (err) {
        setError('Failed to load tool details');
        console.error('Error loading tool:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTool();
  }, [searchParams]);

  const trackView = (toolId) => {
    // Prevent duplicate views using localStorage
    const viewKey = `tool_view_${toolId}`;
    const lastView = localStorage.getItem(viewKey);
    const now = Date.now();
    
    // Only track if last view was more than 1 hour ago
    if (!lastView || now - parseInt(lastView) > 3600000) {
      localStorage.setItem(viewKey, now.toString());
      // In real app, send view tracking to API
      console.log('View tracked for tool:', toolId);
    }
  };

  const handleFavoriteToggle = (toolId, isFavorited) => {
    // In real app, update favorite status via API
    setTool(prev => ({ ...prev, isFavorited }));
    
    // Update localStorage for persistence
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorited) {
      if (!favorites.includes(toolId)) {
        favorites.push(toolId);
      }
    } else {
      const index = favorites.indexOf(toolId);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  const handleAddToComparison = (toolToAdd) => {
    const comparisonItems = JSON.parse(localStorage.getItem('comparisonItems') || '[]');
    
    // Check if tool is already in comparison
    if (comparisonItems.find(item => item.id === toolToAdd.id)) {
      alert('This tool is already in your comparison list');
      return;
    }
    
    // Limit to 3 tools for comparison
    if (comparisonItems.length >= 3) {
      alert('You can only compare up to 3 tools at once');
      return;
    }
    
    comparisonItems.push(toolToAdd);
    localStorage.setItem('comparisonItems', JSON.stringify(comparisonItems));
    
    // Show success message
    alert(`${toolToAdd.name} added to comparison`);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab tool={tool} />;
      case 'features':
        return <FeaturesTab tool={tool} />;
      case 'pricing':
        return <PricingTab tool={tool} />;
      case 'reviews':
        return <ReviewsTab tool={tool} />;
      case 'analytics':
        return <AnalyticsTab tool={tool} />;
      case 'alternatives':
        return <AlternativesTab tool={tool} onAddToComparison={handleAddToComparison} />;
      case 'screenshots':
        return <ScreenshotsTab tool={tool} />;
      default:
        return <OverviewTab tool={tool} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-surface rounded w-1/3"></div>
            <div className="h-64 bg-surface rounded"></div>
            <div className="h-12 bg-surface rounded"></div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3 space-y-4">
                <div className="h-96 bg-surface rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-48 bg-surface rounded"></div>
                <div className="h-32 bg-surface rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Icon name="AlertCircle" size={48} className="mx-auto text-error mb-4" />
            <h2 className="text-2xl font-bold text-text-primary mb-2">Error Loading Tool</h2>
            <p className="text-text-secondary mb-6">{error}</p>
            <button
              onClick={() => navigate('/tools-directory')}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-600 transition-fast"
            >
              Back to Directory
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Icon name="Search" size={48} className="mx-auto text-text-secondary mb-4" />
            <h2 className="text-2xl font-bold text-text-primary mb-2">Tool Not Found</h2>
            <p className="text-text-secondary mb-6">The tool you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/tools-directory')}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-600 transition-fast"
            >
              Browse All Tools
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{tool.name} - {tool.tagline} | EZCode</title>
        <meta name="description" content={tool.description.substring(0, 160)} />
        <meta name="keywords" content={`${tool.name}, ${tool.categories.join(', ')}, coding tools, AI assistant`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${tool.name} - ${tool.tagline}`} />
        <meta property="og:description" content={tool.description.substring(0, 160)} />
        <meta property="og:image" content={tool.image} />
        <meta property="og:url" content={`${window.location.origin}/tool-details?id=${tool.id}`} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${tool.name} - ${tool.tagline}`} />
        <meta name="twitter:description" content={tool.description.substring(0, 160)} />
        <meta name="twitter:image" content={tool.image} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": tool.name,
            "description": tool.description,
            "image": tool.image,
            "url": tool.websiteUrl,
            "applicationCategory": "DeveloperApplication",
            "operatingSystem": "Web",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": tool.rating,
              "reviewCount": tool.reviewCount
            },
            "offers": {
              "@type": "Offer",
              "price": tool.pricing.startingPrice,
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>

      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <BreadcrumbNavigation className="mb-6" />
        
        {/* Tool Hero Section */}
        <div className="mb-8">
          <ToolHero 
            tool={tool} 
            onFavoriteToggle={handleFavoriteToggle}
            onAddToComparison={handleAddToComparison}
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Tab Navigation */}
            <TabNavigation 
              activeTab={activeTab}
              onTabChange={setActiveTab}
              tabs={tabs}
            />
            
            {/* Tab Content */}
            <div className="min-h-96">
              {renderTabContent()}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Sidebar tool={tool} />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-3 bg-primary text-primary-foreground rounded-full shadow-elevation-2 hover:bg-primary-600 transition-fast z-40"
        aria-label="Scroll to top"
      >
        <Icon name="ArrowUp" size={20} />
      </button>
    </div>
  );
};

export default ToolDetails;