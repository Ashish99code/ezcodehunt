import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import ToolSection from './components/ToolSection';
import NewsletterSection from './components/NewsletterSection';
import AdPlacement from './components/AdPlacement';
import Icon from '../../components/AppIcon';

const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Mock data for different tool sections
  const mockTools = {
    featured: [
      {
        id: 1,
        name: "GitHub Copilot",
        tagline: "AI pair programmer that helps you write code faster",
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
        category: "AI Assistant",
        price: 10,
        rating: 4.8,
        reviewCount: 2847,
        features: ["Code Completion", "Multi-language", "IDE Integration", "Context Aware"],
        views: 125000,
        downloads: 89000,
        isFeatured: true,
        isNew: false,
        hasDiscount: false,
        isFavorited: false
      },
      {
        id: 2,
        name: "VS Code",
        tagline: "Lightweight but powerful source code editor",
        thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
        category: "Editor",
        price: "Free",
        rating: 4.9,
        reviewCount: 5632,
        features: ["Extensions", "Debugging", "Git Integration", "IntelliSense"],
        views: 250000,
        downloads: 180000,
        isFeatured: true,
        isNew: false,
        hasDiscount: false,
        isFavorited: true
      },
      {
        id: 3,
        name: "Docker Desktop",
        tagline: "Containerization platform for developers",
        thumbnail: "https://images.unsplash.com/photo-1605745341112-85968b19335a?w=400&h=300&fit=crop",
        category: "DevOps",
        price: "Free",
        rating: 4.6,
        reviewCount: 1923,
        features: ["Containerization", "Orchestration", "Multi-platform", "GUI Management"],
        views: 98000,
        downloads: 67000,
        isFeatured: true,
        isNew: false,
        hasDiscount: false,
        isFavorited: false
      },
      {
        id: 4,
        name: "Postman",
        tagline: "API development and testing platform",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
        category: "API Testing",
        price: 12,
        rating: 4.7,
        reviewCount: 3456,
        features: ["API Testing", "Documentation", "Collaboration", "Automation"],
        views: 87000,
        downloads: 54000,
        isFeatured: true,
        isNew: false,
        hasDiscount: false,
        isFavorited: false
      }
    ],
    trending: [
      {
        id: 5,
        name: "Cursor AI",
        tagline: "AI-first code editor built for productivity",
        thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
        category: "AI Editor",
        price: 20,
        rating: 4.5,
        reviewCount: 892,
        features: ["AI Completion", "Chat Interface", "Code Generation", "Refactoring"],
        views: 45000,
        downloads: 23000,
        isFeatured: false,
        isNew: true,
        hasDiscount: false,
        isFavorited: false
      },
      {
        id: 6,
        name: "Tabnine",
        tagline: "AI assistant for software developers",
        thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop",
        category: "AI Assistant",
        price: 15,
        rating: 4.4,
        reviewCount: 1567,
        features: ["Code Completion", "Team Learning", "Privacy First", "Multi-IDE"],
        views: 67000,
        downloads: 34000,
        isFeatured: false,
        isNew: false,
        hasDiscount: false,
        isFavorited: true
      },
      {
        id: 7,
        name: "Figma",
        tagline: "Collaborative interface design tool",
        thumbnail: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=400&h=300&fit=crop",
        category: "Design",
        price: 12,
        rating: 4.8,
        reviewCount: 4321,
        features: ["Real-time Collaboration", "Prototyping", "Design Systems", "Developer Handoff"],
        views: 156000,
        downloads: 98000,
        isFeatured: false,
        isNew: false,
        hasDiscount: false,
        isFavorited: false
      },
      {
        id: 8,
        name: "Linear",
        tagline: "Issue tracking for modern software teams",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        category: "Project Management",
        price: 8,
        rating: 4.6,
        reviewCount: 2134,
        features: ["Issue Tracking", "Roadmaps", "Integrations", "Analytics"],
        views: 43000,
        downloads: 28000,
        isFeatured: false,
        isNew: false,
        hasDiscount: false,
        isFavorited: false
      }
    ],
    justLaunched: [
      {
        id: 9,
        name: "Replit AI",
        tagline: "AI-powered collaborative coding platform",
        thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
        category: "Browser IDE",
        price: 7,
        rating: 4.3,
        reviewCount: 234,
        features: ["Browser IDE", "AI Assistance", "Real-time Collaboration", "Deployment"],
        views: 12000,
        downloads: 5600,
        isFeatured: false,
        isNew: true,
        hasDiscount: false,
        isFavorited: false
      },
      {
        id: 10,
        name: "Codeium",
        tagline: "Free AI-powered code acceleration toolkit",
        thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop",
        category: "AI Assistant",
        price: "Free",
        rating: 4.2,
        reviewCount: 567,
        features: ["Code Completion", "Chat", "Search", "Multi-language"],
        views: 23000,
        downloads: 12000,
        isFeatured: false,
        isNew: true,
        hasDiscount: false,
        isFavorited: false
      },
      {
        id: 11,
        name: "Windmill",
        tagline: "Open-source developer platform for APIs",
        thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
        category: "Platform",
        price: "Free",
        rating: 4.1,
        reviewCount: 123,
        features: ["Workflow Engine", "Script Management", "API Integration", "Self-hosted"],
        views: 8900,
        downloads: 3400,
        isFeatured: false,
        isNew: true,
        hasDiscount: false,
        isFavorited: false
      },
      {
        id: 12,
        name: "Zed Editor",
        tagline: "High-performance, multiplayer code editor",
        thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=300&fit=crop",
        category: "Editor",
        price: "Free",
        rating: 4.4,
        reviewCount: 456,
        features: ["Multiplayer", "High Performance", "Vim Mode", "Language Server"],
        views: 18000,
        downloads: 8900,
        isFeatured: false,
        isNew: true,
        hasDiscount: false,
        isFavorited: false
      }
    ],
    deals: [
      {
        id: 13,
        name: "JetBrains IDEs",
        tagline: "Professional development tools suite",
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
        category: "IDE Suite",
        price: 49,
        originalPrice: 99,
        rating: 4.7,
        reviewCount: 3892,
        features: ["IntelliJ IDEA", "WebStorm", "PyCharm", "All Languages"],
        views: 78000,
        downloads: 45000,
        isFeatured: false,
        isNew: false,
        hasDiscount: true,
        isFavorited: false
      },
      {
        id: 14,
        name: "Sublime Text",
        tagline: "Sophisticated text editor for code, markup and prose",
        thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
        category: "Editor",
        price: 59,
        originalPrice: 99,
        rating: 4.5,
        reviewCount: 2156,
        features: ["Fast Performance", "Multiple Selections", "Plugin Ecosystem", "Cross Platform"],
        views: 56000,
        downloads: 32000,
        isFeatured: false,
        isNew: false,
        hasDiscount: true,
        isFavorited: false
      },
      {
        id: 15,
        name: "GitKraken",
        tagline: "Legendary Git GUI client for developers",
        thumbnail: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop",
        category: "Git Client",
        price: 29,
        originalPrice: 49,
        rating: 4.6,
        reviewCount: 1789,
        features: ["Visual Git Interface", "Merge Conflict Editor", "Team Collaboration", "Integrations"],
        views: 34000,
        downloads: 19000,
        isFeatured: false,
        isNew: false,
        hasDiscount: true,
        isFavorited: false
      },
      {
        id: 16,
        name: "Tower Git",
        tagline: "The most powerful Git client for Mac and Windows",
        thumbnail: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=300&fit=crop",
        category: "Git Client",
        price: 39,
        originalPrice: 69,
        rating: 4.4,
        reviewCount: 987,
        features: ["Advanced Git Features", "Undo Changes", "File History", "Conflict Resolution"],
        views: 28000,
        downloads: 15000,
        isFeatured: false,
        isNew: false,
        hasDiscount: true,
        isFavorited: false
      }
    ]
  };

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading EZCode...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>EZCode - Discover the Best AI Coding Tools for Developers</title>
        <meta name="description" content="Find, compare, and choose from 500+ AI-powered development tools. Boost your productivity with curated solutions trusted by 50,000+ developers worldwide." />
        <meta name="keywords" content="AI coding tools, developer tools, programming, code editor, AI assistant, development productivity" />
        
        {/* Open Graph */}
        <meta property="og:title" content="EZCode - Discover the Best AI Coding Tools" />
        <meta property="og:description" content="Find, compare, and choose from 500+ AI-powered development tools trusted by developers worldwide." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ezcode.com" />
        <meta property="og:image" content="https://ezcode.com/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="EZCode - Discover the Best AI Coding Tools" />
        <meta name="twitter:description" content="Find, compare, and choose from 500+ AI-powered development tools trusted by developers worldwide." />
        <meta name="twitter:image" content="https://ezcode.com/twitter-image.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "EZCode",
            "description": "Discover the Best AI Coding Tools for Developers",
            "url": "https://ezcode.com",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://ezcode.com/tools-directory?search={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Featured Tools Section */}
          <ToolSection
            title="Featured Tools"
            subtitle="Handpicked tools recommended by our expert team"
            tools={mockTools.featured}
            sectionType="featured"
          />

          {/* Ad Placement */}
          <AdPlacement type="banner" position="between-sections" />

          {/* Trending Tools Section */}
          <ToolSection
            title="Trending Now"
            subtitle="Most popular tools among developers this week"
            tools={mockTools.trending}
            sectionType="trending"
          />

          {/* Just Launched Section */}
          <ToolSection
            title="Just Launched"
            subtitle="Newest tools added to our platform"
            tools={mockTools.justLaunched}
            sectionType="just-launched"
          />

          {/* Ad Placement */}
          <AdPlacement type="banner" position="between-sections" />

          {/* Current Deals Section */}
          <ToolSection
            title="Current Deals"
            subtitle="Limited-time offers and discounts on premium tools"
            tools={mockTools.deals}
            sectionType="deals"
          />

          {/* Newsletter Section */}
          <NewsletterSection />
        </main>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-elevation-2 hover:bg-primary-600 transition-fast z-40 flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <Icon name="ArrowUp" size={20} />
          </button>
        )}
      </div>
    </>
  );
};

export default Homepage;