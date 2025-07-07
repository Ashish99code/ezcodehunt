import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import SearchBar from './SearchBar';
import UserAuthMenu from './UserAuthMenu';
import ComparisonCart from './ComparisonCart';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/homepage', icon: 'Home' },
    { label: 'Discover', path: '/tools-directory', icon: 'Search' },
    { label: 'Compare', path: '/tool-comparison', icon: 'GitCompare' },
    { label: 'Submit Tool', path: '/tool-submission', icon: 'Plus' },
    { label: 'Admin', path: '/admin-dashboard', icon: 'Settings', requiresAuth: true }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'glassmorphic border-b border-border' :'bg-background border-b border-border-secondary'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link 
              to="/homepage" 
              className="flex items-center space-x-2 group transition-fast"
              onClick={closeMobileMenu}
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center neumorphic group-hover:scale-105 transition-fast">
                <Icon name="Code" size={20} color="#FFFFFF" className="lg:w-6 lg:h-6" />
              </div>
              <span className="text-xl lg:text-2xl font-heading font-bold text-text-primary">
                EZCode
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-fast hover:bg-surface ${
                    isActivePath(item.path)
                      ? 'text-primary bg-surface neumorphic' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <Icon name={item.icon} size={16} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
              <SearchBar />
            </div>

            {/* Desktop Right Section */}
            <div className="hidden lg:flex items-center space-x-4">
              <ComparisonCart />
              <UserAuthMenu />
            </div>

            {/* Mobile Right Section */}
            <div className="flex lg:hidden items-center space-x-2">
              <ComparisonCart />
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-fast"
                aria-label="Toggle mobile menu"
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden pb-4">
            <SearchBar />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden glassmorphic border-t border-border animate-slide-in-down">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMobileMenu}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-fast ${
                      isActivePath(item.path)
                        ? 'text-primary bg-surface neumorphic' :'text-text-secondary hover:text-text-primary hover:bg-surface'
                    }`}
                  >
                    <Icon name={item.icon} size={20} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
              
              <div className="mt-4 pt-4 border-t border-border">
                <UserAuthMenu isMobile={true} />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

export default Header;