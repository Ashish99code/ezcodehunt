import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const UserAuthMenu = ({ isMobile = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Mock user data - in real app, this would come from auth context
  const mockUser = {
    id: 1,
    name: 'John Developer',
    email: 'john@example.com',
    avatar: '/assets/images/avatar-placeholder.png',
    role: 'admin', // 'user' | 'admin' | 'moderator'
    preferences: {
      theme: 'dark',
      notifications: true
    }
  };

  useEffect(() => {
    // Simulate auth check
    const checkAuthStatus = async () => {
      setIsLoading(true);
      try {
        // In real app, check localStorage/sessionStorage or make API call
        const savedAuth = localStorage.getItem('isAuthenticated');
        const savedUser = localStorage.getItem('user');
        
        if (savedAuth === 'true' && savedUser) {
          setIsAuthenticated(true);
          setUser(JSON.parse(savedUser));
        } else {
          // For demo purposes, set mock user as authenticated
          setIsAuthenticated(true);
          setUser(mockUser);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('user', JSON.stringify(mockUser));
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogin = () => {
    // In real app, redirect to login page or open login modal
    navigate('/login');
  };

  const handleSignup = () => {
    // In real app, redirect to signup page or open signup modal
    navigate('/signup');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsDropdownOpen(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/homepage');
  };

  const menuItems = [
    { label: 'Profile', icon: 'User', path: '/profile' },
    { label: 'My Tools', icon: 'Heart', path: '/my-tools' },
    { label: 'Submissions', icon: 'Upload', path: '/my-submissions' },
    { label: 'Settings', icon: 'Settings', path: '/settings' },
  ];

  const adminMenuItems = [
    { label: 'Admin Dashboard', icon: 'Shield', path: '/admin-dashboard' },
    { label: 'Manage Tools', icon: 'Database', path: '/admin/tools' },
    { label: 'User Management', icon: 'Users', path: '/admin/users' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-surface rounded-full animate-pulse"></div>
        {!isMobile && <div className="w-16 h-4 bg-surface rounded animate-pulse"></div>}
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={`flex items-center ${isMobile ? 'flex-col space-y-2' : 'space-x-2'}`}>
        <Button
          variant="ghost"
          onClick={handleLogin}
          className={isMobile ? 'w-full justify-center' : ''}
        >
          Sign In
        </Button>
        <Button
          variant="primary"
          onClick={handleSignup}
          className={isMobile ? 'w-full justify-center' : ''}
        >
          Sign Up
        </Button>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-white">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-text-primary truncate">{user.name}</div>
            <div className="text-sm text-text-secondary truncate">{user.email}</div>
          </div>
        </div>

        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-fast"
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
            </Link>
          ))}

          {user.role === 'admin' && (
            <>
              <div className="border-t border-border my-2"></div>
              {adminMenuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-fast"
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </>
          )}

          <div className="border-t border-border my-2"></div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-error hover:bg-error hover:bg-opacity-10 transition-fast"
          >
            <Icon name="LogOut" size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 p-1 rounded-lg hover:bg-surface transition-fast"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-white">
            {user.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <Icon 
          name={isDropdownOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-text-secondary" 
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 glassmorphic border border-border rounded-lg shadow-elevation-3 z-50 animate-slide-in-down">
          <div className="p-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-text-primary truncate">{user.name}</div>
                <div className="text-sm text-text-secondary truncate">{user.email}</div>
              </div>
            </div>
          </div>

          <div className="p-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-fast"
              >
                <Icon name={item.icon} size={16} />
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}

            {user.role === 'admin' && (
              <>
                <div className="border-t border-border my-2"></div>
                {adminMenuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface transition-fast"
                  >
                    <Icon name={item.icon} size={16} />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                ))}
              </>
            )}

            <div className="border-t border-border my-2"></div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-error hover:bg-error hover:bg-opacity-10 transition-fast"
            >
              <Icon name="LogOut" size={16} />
              <span className="text-sm">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAuthMenu;