import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from '../../hooks/useAuth.jsx';
import { useToast } from './Toast';

const UserAuthMenu = ({ isMobile = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, profile, loading, signOut } = useAuth();
  const { success } = useToast();


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

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      success('Successfully signed out');
      navigate('/homepage');
    }
    setIsDropdownOpen(false);
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

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-surface rounded-full animate-pulse"></div>
        {!isMobile && <div className="w-16 h-4 bg-surface rounded animate-pulse"></div>}
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`flex items-center ${isMobile ? 'flex-col space-y-2' : 'space-x-2'}`}>
        <p className="text-text-secondary text-sm">Please sign in to continue</p>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-surface rounded-lg">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-white">
              {(profile?.full_name || user.email).split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-text-primary truncate">{profile?.full_name || 'User'}</div>
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

          {profile?.role === 'admin' && (
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

            {profile?.role === 'admin' && (
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