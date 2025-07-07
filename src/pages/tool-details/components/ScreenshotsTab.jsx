import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ScreenshotsTab = ({ tool }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('all');

  const screenshots = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300',
      title: 'Main Dashboard',
      category: 'interface',
      description: 'The main dashboard showing project overview and recent activity'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=300',
      title: 'Code Editor',
      category: 'editor',
      description: 'AI-powered code completion in action with syntax highlighting'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300',
      title: 'Debugging Interface',
      category: 'debugging',
      description: 'Interactive debugger with breakpoints and variable inspection'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300',
      title: 'Team Collaboration',
      category: 'collaboration',
      description: 'Real-time collaboration features with live cursors and comments'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300',
      title: 'Settings Panel',
      category: 'interface',
      description: 'Comprehensive settings and configuration options'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=300',
      title: 'Code Analysis',
      category: 'analysis',
      description: 'Advanced code analysis and performance metrics'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300',
      title: 'Mobile View',
      category: 'mobile',
      description: 'Mobile-responsive interface for coding on the go'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300',
      title: 'Analytics Dashboard',
      category: 'analytics',
      description: 'Detailed analytics and usage statistics'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Screenshots', count: screenshots.length },
    { id: 'interface', label: 'Interface', count: screenshots.filter(s => s.category === 'interface').length },
    { id: 'editor', label: 'Code Editor', count: screenshots.filter(s => s.category === 'editor').length },
    { id: 'debugging', label: 'Debugging', count: screenshots.filter(s => s.category === 'debugging').length },
    { id: 'collaboration', label: 'Collaboration', count: screenshots.filter(s => s.category === 'collaboration').length },
    { id: 'analysis', label: 'Analysis', count: screenshots.filter(s => s.category === 'analysis').length },
    { id: 'mobile', label: 'Mobile', count: screenshots.filter(s => s.category === 'mobile').length },
    { id: 'analytics', label: 'Analytics', count: screenshots.filter(s => s.category === 'analytics').length }
  ];

  const filteredScreenshots = currentCategory === 'all' 
    ? screenshots 
    : screenshots.filter(screenshot => screenshot.category === currentCategory);

  const openLightbox = (screenshot) => {
    setSelectedImage(screenshot);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;
    
    const currentIndex = filteredScreenshots.findIndex(s => s.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredScreenshots.length;
    } else {
      newIndex = currentIndex === 0 ? filteredScreenshots.length - 1 : currentIndex - 1;
    }
    
    setSelectedImage(filteredScreenshots[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (!selectedImage) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft': navigateImage('prev');
        break;
      case 'ArrowRight': navigateImage('next');
        break;
    }
  };

  React.useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="bg-surface rounded-lg p-4 neumorphic">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setCurrentCategory(category.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-fast ${
                currentCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-background'
              }`}
            >
              <span>{category.label}</span>
              <span className="text-xs bg-text-secondary bg-opacity-20 px-1.5 py-0.5 rounded-full">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Screenshots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredScreenshots.map((screenshot) => (
          <div
            key={screenshot.id}
            className="group bg-surface rounded-lg overflow-hidden neumorphic cursor-pointer transition-fast hover:shadow-elevation-2"
            onClick={() => openLightbox(screenshot)}
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={screenshot.thumbnail}
                alt={screenshot.title}
                className="w-full h-full object-cover transition-fast group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-fast flex items-center justify-center">
                <Icon 
                  name="ZoomIn" 
                  size={24} 
                  className="text-white opacity-0 group-hover:opacity-100 transition-fast" 
                />
              </div>
            </div>
            <div className="p-3">
              <h4 className="font-medium text-text-primary mb-1 truncate">{screenshot.title}</h4>
              <p className="text-sm text-text-secondary line-clamp-2">{screenshot.description}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredScreenshots.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Image" size={48} className="mx-auto text-text-secondary mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No screenshots found</h3>
          <p className="text-text-secondary">
            No screenshots available for the selected category.
          </p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl max-h-full w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 text-white">
              <div>
                <h3 className="text-lg font-semibold">{selectedImage.title}</h3>
                <p className="text-sm text-gray-300">{selectedImage.description}</p>
              </div>
              <button
                onClick={closeLightbox}
                className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-fast"
              >
                <Icon name="X" size={24} className="text-white" />
              </button>
            </div>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center relative">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Navigation Buttons */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition-fast"
              >
                <Icon name="ChevronLeft" size={24} className="text-white" />
              </button>
              
              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition-fast"
              >
                <Icon name="ChevronRight" size={24} className="text-white" />
              </button>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 text-white">
              <div className="text-sm text-gray-300">
                {filteredScreenshots.findIndex(s => s.id === selectedImage.id) + 1} of {filteredScreenshots.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.open(selectedImage.url, '_blank')}
                  className="flex items-center gap-2 px-3 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-fast"
                >
                  <Icon name="ExternalLink" size={16} />
                  <span className="text-sm">Open Original</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScreenshotsTab;