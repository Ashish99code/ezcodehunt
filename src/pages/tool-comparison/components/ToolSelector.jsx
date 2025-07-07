import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ToolSelector = ({ onAddTool, selectedToolIds = [], maxTools = 3 }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Mock available tools for selection
  const availableTools = [
    { id: 1, name: 'GitHub Copilot', category: 'AI Assistant', rating: 4.8, price: '$10/month', logo: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=64&h=64&fit=crop&crop=center' },
    { id: 2, name: 'VS Code', category: 'Editor', rating: 4.9, price: 'Free', logo: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=64&h=64&fit=crop&crop=center' },
    { id: 3, name: 'Docker Desktop', category: 'DevOps', rating: 4.6, price: 'Free', logo: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=64&h=64&fit=crop&crop=center' },
    { id: 4, name: 'Postman', category: 'API Testing', rating: 4.7, price: 'Free', logo: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=64&h=64&fit=crop&crop=center' },
    { id: 5, name: 'Figma', category: 'Design', rating: 4.8, price: 'Free', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=center' },
    { id: 6, name: 'Notion', category: 'Productivity', rating: 4.5, price: '$8/month', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=center' },
    { id: 7, name: 'Slack', category: 'Communication', rating: 4.4, price: 'Free', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=center' },
    { id: 8, name: 'Jira', category: 'Project Management', rating: 4.2, price: '$7/month', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=64&h=64&fit=crop&crop=center' }
  ];

  const filteredTools = availableTools.filter(tool => 
    !selectedToolIds.includes(tool.id) &&
    (tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     tool.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleToolSelect = (tool) => {
    if (selectedToolIds.length < maxTools) {
      onAddTool(tool);
      setSearchQuery('');
      setIsDropdownOpen(false);
    }
  };

  const canAddMore = selectedToolIds.length < maxTools;

  return (
    <div className="bg-surface border border-border rounded-lg p-6 neumorphic">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Add Tools to Compare</h2>
        <span className="text-sm text-text-secondary">
          {selectedToolIds.length}/{maxTools} selected
        </span>
      </div>

      {canAddMore ? (
        <div className="relative">
          <div className="relative">
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <Input
              type="search"
              placeholder="Search for tools to add..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              className="pl-10"
            />
          </div>

          {isDropdownOpen && filteredTools.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 glassmorphic border border-border rounded-lg shadow-elevation-3 z-50 max-h-64 overflow-y-auto">
              {filteredTools.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => handleToolSelect(tool)}
                  className="w-full flex items-center space-x-3 p-3 hover:bg-surface transition-fast text-left"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <Icon name="Code" size={16} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-text-primary">{tool.name}</div>
                    <div className="text-sm text-text-secondary">{tool.category} • {tool.price}</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
                    <span className="text-sm text-text-secondary">{tool.rating}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-4">
          <Icon name="CheckCircle" size={32} className="mx-auto text-success mb-2" />
          <p className="text-text-secondary">Maximum tools selected for comparison</p>
        </div>
      )}

      {/* Quick Add Popular Tools */}
      {canAddMore && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-text-secondary mb-3">Popular Tools</h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
            {availableTools
              .filter(tool => !selectedToolIds.includes(tool.id))
              .slice(0, 6)
              .map((tool) => (
                <Button
                  key={tool.id}
                  variant="ghost"
                  onClick={() => handleToolSelect(tool)}
                  className="justify-start text-left p-2 h-auto"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center">
                      <Icon name="Code" size={12} className="text-white" />
                    </div>
                    <span className="text-sm truncate">{tool.name}</span>
                  </div>
                </Button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolSelector;