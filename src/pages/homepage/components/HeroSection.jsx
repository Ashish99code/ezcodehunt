import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import SearchBar from '../../../components/ui/SearchBar';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/tools-directory?search=${encodeURIComponent(query)}`);
    }
  };

  const handleExploreTools = () => {
    navigate('/tools-directory');
  };

  const handleSubmitTool = () => {
    navigate('/tool-submission');
  };

  const stats = [
    { label: 'AI Tools', value: '500+', icon: 'Code' },
    { label: 'Developers', value: '50K+', icon: 'Users' },
    { label: 'Reviews', value: '25K+', icon: 'Star' },
    { label: 'Categories', value: '15+', icon: 'Grid3X3' }
  ];

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary mb-6 leading-tight">
              Discover the Best
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI Coding Tools
              </span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Find, compare, and choose from 500+ AI-powered development tools. 
              Boost your productivity with curated solutions trusted by 50,000+ developers worldwide.
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-12">
            <div className="max-w-2xl mx-auto mb-6">
              <SearchBar 
                onSearch={handleSearch}
                className="w-full"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleExploreTools}
                iconName="Search"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Explore All Tools
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSubmitTool}
                iconName="Plus"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Submit Your Tool
              </Button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="glassmorphic p-6 rounded-xl text-center hover:scale-105 transition-fast"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-3 neumorphic">
                  <Icon name={stat.icon} size={24} color="#FFFFFF" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;