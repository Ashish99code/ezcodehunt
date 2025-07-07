import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import FilterSidebar from './components/FilterSidebar';
import QuickFilterBar from './components/QuickFilterBar';
import ToolGrid from './components/ToolGrid';
import PromotedSidebar from './components/PromotedSidebar';
import Icon from '../../components/AppIcon';

const ToolsDirectory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [comparisonItems, setComparisonItems] = useState([]);

  // Filter state
  const [filters, setFilters] = useState({
    categories: [],
    languages: [],
    pricing: [],
    features: [],
    rating: 0,
    priceRange: [0, 1000]
  });

  // Mock tools data
  const mockTools = [
    {
      id: 1,
      title: "GitHub Copilot",
      tagline: "Your AI pair programmer",
      description: "GitHub Copilot uses the OpenAI Codex to suggest code and entire functions in real-time, right from your editor. Trained on billions of lines of code, it turns natural language prompts into coding suggestions across dozens of languages.",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 1247,
      pricing: "$10/month",
      category: "AI Assistant",
      languages: ["JavaScript", "Python", "TypeScript", "Java"],
      features: ["Code Completion", "Multi-language", "Real-time Preview", "Code Analysis"],
      views: 15420,
      isNew: false,
      isFeatured: true
    },
    {
      id: 2,
      title: "Cursor IDE",
      tagline: "AI-first code editor",
      description: "Cursor is the IDE of the future, built for pair-programming with AI. It's early days, but it's already changing how we code. Built to make you extraordinarily productive, Cursor is the best way to code with AI.",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 892,
      pricing: "Free",
      category: "Code Editor",
      languages: ["JavaScript", "Python", "TypeScript", "Go"],
      features: ["Code Completion", "Syntax Highlighting", "AI Assistant", "Version Control"],
      views: 12350,
      isNew: true,
      isFeatured: false
    },
    {
      id: 3,
      title: "Tabnine",
      tagline: "AI code completion tool",
      description: "Tabnine is an AI assistant that speeds up delivery and keeps your code safe. It provides intelligent code completions based on context and syntax. Works with all major IDEs and supports all programming languages.",
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 2156,
      pricing: "Freemium",
      category: "AI Assistant",
      languages: ["JavaScript", "Python", "Java", "C++"],
      features: ["Code Completion", "Multi-language", "Plugin Support", "Code Analysis"],
      views: 18750,
      isNew: false,
      isFeatured: true
    },
    {
      id: 4,
      title: "Replit",
      tagline: "Browser-based IDE",
      description: "Replit is a simple yet powerful online IDE, Editor, Compiler, Interpreter, and REPL. Code, compile, run, and host in 50+ programming languages. Build and deploy apps right from your browser.",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 3421,
      pricing: "Freemium",
      category: "Browser IDE",
      languages: ["JavaScript", "Python", "Java", "C++", "Go"],
      features: ["Cloud Sync", "Collaboration", "Real-time Preview", "Multi-language"],
      views: 25680,
      isNew: false,
      isFeatured: false
    },
    {
      id: 5,
      title: "CodeT5",
      tagline: "AI code generation model",
      description: "CodeT5 is a pre-trained encoder-decoder Transformer model for code understanding and generation. It can perform various code-related tasks including code summarization, generation, translation, and refinement.",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
      rating: 4.4,
      reviewCount: 567,
      pricing: "Free",
      category: "Code Generators",
      languages: ["Python", "Java", "JavaScript", "C#"],
      features: ["Code Generation", "Code Analysis", "Multi-language", "Refactoring"],
      views: 8920,
      isNew: true,
      isFeatured: false
    },
    {
      id: 6,
      title: "Sourcegraph",
      tagline: "Universal code search",
      description: "Sourcegraph is a web-based code search and navigation tool for dev teams. Search, navigate, and review code. Find answers in your code with universal code search across all repositories, branches, and code hosts.",
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
      rating: 4.3,
      reviewCount: 1089,
      pricing: "Freemium",
      category: "Code Search",
      languages: ["JavaScript", "Python", "Go", "Java", "TypeScript"],
      features: ["Code Search", "Version Control", "Code Analysis", "Multi-language"],
      views: 11240,
      isNew: false,
      isFeatured: true
    },
    {
      id: 7,
      title: "Kite",
      tagline: "AI-powered coding assistant",
      description: "Kite is an AI-powered coding assistant that helps you write code faster. It provides intelligent code completions, documentation, and examples right in your editor. Works with Python, JavaScript, and more.",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
      rating: 4.2,
      reviewCount: 1876,
      pricing: "Free",
      category: "AI Assistant",
      languages: ["Python", "JavaScript", "Go"],
      features: ["Code Completion", "Documentation", "Code Analysis", "Multi-language"],
      views: 14560,
      isNew: false,
      isFeatured: false
    },
    {
      id: 8,
      title: "DeepCode",
      tagline: "AI-powered code review",
      description: "DeepCode uses AI to find bugs, security vulnerabilities, and performance issues in your code. It learns from millions of commits in open source projects to provide intelligent suggestions for improvement.",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      rating: 4.1,
      reviewCount: 743,
      pricing: "Freemium",
      category: "Code Analysis",
      languages: ["JavaScript", "Python", "Java", "TypeScript"],
      features: ["Code Analysis", "Security", "Performance", "Multi-language"],
      views: 9870,
      isNew: false,
      isFeatured: false
    }
  ];

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get search query from URL params
      const searchQuery = searchParams.get('search') || '';
      
      let filteredData = mockTools;
      
      // Apply search filter
      if (searchQuery) {
        filteredData = filteredData.filter(tool =>
          tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.features.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }
      
      setTools(filteredData);
      setFilteredTools(filteredData.slice(0, 10));
      setTotalResults(filteredData.length);
      setCurrentPage(1);
      setHasMore(filteredData.length > 10);
      setIsLoading(false);
    };

    initializeData();
  }, [searchParams]);

  // Load comparison items from localStorage
  useEffect(() => {
    const savedComparison = localStorage.getItem('comparisonItems');
    if (savedComparison) {
      try {
        setComparisonItems(JSON.parse(savedComparison));
      } catch (error) {
        console.error('Error loading comparison items:', error);
      }
    }
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...tools];

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(tool => filters.categories.includes(tool.category));
    }

    // Apply language filter
    if (filters.languages.length > 0) {
      filtered = filtered.filter(tool =>
        tool.languages.some(lang => filters.languages.includes(lang))
      );
    }

    // Apply pricing filter
    if (filters.pricing.length > 0) {
      filtered = filtered.filter(tool => {
        const pricing = tool.pricing.toLowerCase();
        return filters.pricing.some(filter => {
          const filterLower = filter.toLowerCase();
          if (filterLower === 'free') return pricing === 'free';
          if (filterLower === 'freemium') return pricing.includes('freemium');
          if (filterLower === 'paid') return pricing.includes('$') && !pricing.includes('freemium');
          if (filterLower === 'enterprise') return pricing.includes('enterprise');
          return false;
        });
      });
    }

    // Apply features filter
    if (filters.features.length > 0) {
      filtered = filtered.filter(tool =>
        filters.features.some(feature => tool.features.includes(feature))
      );
    }

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(tool => tool.rating >= filters.rating);
    }

    // Apply sorting
    switch (sortBy) {
      case 'popularity':
        filtered.sort((a, b) => b.views - a.views);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = a.pricing === 'Free' ? 0 : parseFloat(a.pricing.replace(/[^0-9.]/g, '')) || 999;
          const priceB = b.pricing === 'Free' ? 0 : parseFloat(b.pricing.replace(/[^0-9.]/g, '')) || 999;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = a.pricing === 'Free' ? 0 : parseFloat(a.pricing.replace(/[^0-9.]/g, '')) || 999;
          const priceB = b.pricing === 'Free' ? 0 : parseFloat(b.pricing.replace(/[^0-9.]/g, '')) || 999;
          return priceB - priceA;
        });
        break;
      default: // relevance
        filtered.sort((a, b) => b.isFeatured - a.isFeatured);
        break;
    }

    setFilteredTools(filtered.slice(0, currentPage * 10));
    setTotalResults(filtered.length);
    setHasMore(filtered.length > currentPage * 10);
  }, [tools, filters, sortBy, currentPage]);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      categories: [],
      languages: [],
      pricing: [],
      features: [],
      rating: 0,
      priceRange: [0, 1000]
    });
    setCurrentPage(1);
  }, []);

  const handleRemoveFilter = useCallback((filterType, value) => {
    const newFilters = { ...filters };
    
    if (value === null) {
      // Remove entire filter
      if (filterType === 'rating') {
        newFilters.rating = 0;
      } else if (Array.isArray(newFilters[filterType])) {
        newFilters[filterType] = [];
      }
    } else {
      // Remove specific value
      if (Array.isArray(newFilters[filterType])) {
        newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
      }
    }
    
    setFilters(newFilters);
    setCurrentPage(1);
  }, [filters]);

  const handleSortChange = useCallback((newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  }, []);

  const handleViewModeChange = useCallback((newViewMode) => {
    setViewMode(newViewMode);
  }, []);

  const handleLoadMore = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  const handleAddToComparison = useCallback((tool) => {
    setComparisonItems(prev => {
      const isAlreadyAdded = prev.some(item => item.id === tool.id);
      let newItems;
      
      if (isAlreadyAdded) {
        newItems = prev.filter(item => item.id !== tool.id);
      } else {
        if (prev.length >= 3) {
          // Replace oldest item if limit reached
          newItems = [tool, ...prev.slice(0, 2)];
        } else {
          newItems = [tool, ...prev];
        }
      }
      
      localStorage.setItem('comparisonItems', JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  const handleOpenFilters = useCallback(() => {
    setIsFilterSidebarOpen(true);
  }, []);

  const handleCloseFilters = useCallback(() => {
    setIsFilterSidebarOpen(false);
  }, []);

  return (
    <>
      <Helmet>
        <title>AI Coding Tools Directory - Discover the Best Development Tools | EZCode</title>
        <meta name="description" content="Explore our comprehensive directory of AI-powered coding tools. Find, compare, and discover the best development tools for your programming needs." />
        <meta name="keywords" content="AI coding tools, development tools, programming tools, code editor, IDE, developer tools" />
        <meta property="og:title" content="AI Coding Tools Directory | EZCode" />
        <meta property="og:description" content="Discover the best AI-powered coding tools for developers. Compare features, pricing, and reviews." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://ezcode.com/tools-directory" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-6">
          <BreadcrumbNavigation />
          
          <div className="mt-6">
            <div className="mb-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-text-primary mb-2">
                AI Coding Tools Directory
              </h1>
              <p className="text-lg text-text-secondary">
                Discover and compare the best AI-powered development tools for your coding needs
              </p>
            </div>

            <QuickFilterBar
              activeFilters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearFilters}
              onOpenFilters={handleOpenFilters}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
              totalResults={totalResults}
            />

            <div className="flex gap-6 mt-6">
              {/* Desktop Filter Sidebar */}
              <div className="hidden lg:block flex-shrink-0">
                <FilterSidebar
                  isOpen={true}
                  onClose={() => {}}
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                  isMobile={false}
                />
              </div>

              {/* Main Content */}
              <div className="flex-1 min-w-0">
                <ToolGrid
                  tools={filteredTools}
                  viewMode={viewMode}
                  onAddToComparison={handleAddToComparison}
                  comparisonItems={comparisonItems}
                  isLoading={isLoading}
                  hasMore={hasMore}
                  onLoadMore={handleLoadMore}
                />
              </div>

              {/* Desktop Promoted Sidebar */}
              <div className="hidden xl:block flex-shrink-0">
                <PromotedSidebar />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Sidebar */}
        <FilterSidebar
          isOpen={isFilterSidebarOpen}
          onClose={handleCloseFilters}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
          isMobile={true}
        />

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-elevation-2 hover:bg-primary-600 transition-fast z-40 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <Icon name="ArrowUp" size={20} />
        </button>
      </div>
    </>
  );
};

export default ToolsDirectory;