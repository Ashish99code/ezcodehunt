import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const FeaturesStep = ({ formData, updateFormData, errors }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const featureCategories = [
    {
      id: 'ide-integration',
      name: 'IDE Integration',
      features: [
        { id: 'vscode', name: 'VS Code Extension', description: 'Available as VS Code extension' },
        { id: 'intellij', name: 'IntelliJ Plugin', description: 'Compatible with IntelliJ IDEA' },
        { id: 'sublime', name: 'Sublime Text', description: 'Works with Sublime Text' },
        { id: 'atom', name: 'Atom Editor', description: 'Atom editor support' },
        { id: 'vim', name: 'Vim/Neovim', description: 'Vim and Neovim integration' },
        { id: 'emacs', name: 'Emacs', description: 'GNU Emacs support' }
      ]
    },
    {
      id: 'languages',
      name: 'Programming Languages',
      features: [
        { id: 'javascript', name: 'JavaScript', description: 'JavaScript language support' },
        { id: 'python', name: 'Python', description: 'Python programming language' },
        { id: 'java', name: 'Java', description: 'Java language support' },
        { id: 'csharp', name: 'C#', description: 'C# programming language' },
        { id: 'cpp', name: 'C++', description: 'C++ language support' },
        { id: 'go', name: 'Go', description: 'Go programming language' },
        { id: 'rust', name: 'Rust', description: 'Rust language support' },
        { id: 'typescript', name: 'TypeScript', description: 'TypeScript support' }
      ]
    },
    {
      id: 'ai-capabilities',
      name: 'AI Capabilities',
      features: [
        { id: 'code-completion', name: 'Code Completion', description: 'AI-powered code suggestions' },
        { id: 'code-generation', name: 'Code Generation', description: 'Generate code from descriptions' },
        { id: 'bug-detection', name: 'Bug Detection', description: 'Automatic bug identification' },
        { id: 'code-review', name: 'Code Review', description: 'AI-assisted code review' },
        { id: 'refactoring', name: 'Refactoring', description: 'Intelligent code refactoring' },
        { id: 'documentation', name: 'Documentation', description: 'Auto-generate documentation' }
      ]
    },
    {
      id: 'platforms',
      name: 'Platform Support',
      features: [
        { id: 'web-based', name: 'Web-based', description: 'Runs in web browser' },
        { id: 'desktop-app', name: 'Desktop App', description: 'Native desktop application' },
        { id: 'mobile-app', name: 'Mobile App', description: 'Mobile application available' },
        { id: 'cloud-hosted', name: 'Cloud Hosted', description: 'Cloud-based service' },
        { id: 'on-premise', name: 'On-Premise', description: 'Can be hosted locally' },
        { id: 'api-access', name: 'API Access', description: 'Provides API for integration' }
      ]
    }
  ];

  const allFeatures = featureCategories.flatMap(category => 
    category.features.map(feature => ({ ...feature, category: category.name }))
  );

  const filteredFeatures = allFeatures.filter(feature => {
    const matchesSearch = feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feature.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || 
                           featureCategories.find(cat => cat.id === activeCategory)?.features.some(f => f.id === feature.id);
    return matchesSearch && matchesCategory;
  });

  const selectedFeatures = formData.features || [];

  const toggleFeature = (featureId) => {
    const updatedFeatures = selectedFeatures.includes(featureId)
      ? selectedFeatures.filter(id => id !== featureId)
      : [...selectedFeatures, featureId];
    updateFormData('features', updatedFeatures);
  };

  const selectAllInCategory = (categoryId) => {
    const categoryFeatures = featureCategories.find(cat => cat.id === categoryId)?.features || [];
    const categoryFeatureIds = categoryFeatures.map(f => f.id);
    const allSelected = categoryFeatureIds.every(id => selectedFeatures.includes(id));
    
    if (allSelected) {
      // Deselect all in category
      const updatedFeatures = selectedFeatures.filter(id => !categoryFeatureIds.includes(id));
      updateFormData('features', updatedFeatures);
    } else {
      // Select all in category
      const updatedFeatures = [...new Set([...selectedFeatures, ...categoryFeatureIds])];
      updateFormData('features', updatedFeatures);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search features..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-fast ${
              activeCategory === 'all' ?'bg-primary text-primary-foreground' :'bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
            }`}
          >
            All
          </button>
          {featureCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-fast ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface text-text-secondary hover:text-text-primary hover:bg-surface-secondary'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Features Summary */}
      {selectedFeatures.length > 0 && (
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-text-primary">
              Selected Features ({selectedFeatures.length})
            </h3>
            <button
              onClick={() => updateFormData('features', [])}
              className="text-text-secondary hover:text-error transition-fast text-sm"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedFeatures.map(featureId => {
              const feature = allFeatures.find(f => f.id === featureId);
              return feature ? (
                <span
                  key={featureId}
                  className="inline-flex items-center px-2 py-1 bg-primary bg-opacity-20 text-primary rounded-md text-xs"
                >
                  {feature.name}
                  <button
                    onClick={() => toggleFeature(featureId)}
                    className="ml-1 hover:text-primary-600 transition-fast"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}

      {/* Feature Categories */}
      <div className="space-y-6">
        {featureCategories.map(category => {
          const categoryFeatures = category.features.filter(feature =>
            activeCategory === 'all' || activeCategory === category.id
          ).filter(feature =>
            feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            feature.description.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (categoryFeatures.length === 0) return null;

          const allCategorySelected = categoryFeatures.every(f => selectedFeatures.includes(f.id));
          const someCategorySelected = categoryFeatures.some(f => selectedFeatures.includes(f.id));

          return (
            <div key={category.id} className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary flex items-center">
                  <Icon name="Folder" size={20} className="mr-2 text-primary" />
                  {category.name}
                </h3>
                <button
                  onClick={() => selectAllInCategory(category.id)}
                  className={`text-sm font-medium transition-fast ${
                    allCategorySelected
                      ? 'text-primary hover:text-primary-600' :'text-text-secondary hover:text-primary'
                  }`}
                >
                  {allCategorySelected ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categoryFeatures.map(feature => {
                  const isSelected = selectedFeatures.includes(feature.id);
                  return (
                    <label
                      key={feature.id}
                      className={`flex items-start p-3 rounded-lg border cursor-pointer transition-fast ${
                        isSelected
                          ? 'border-primary bg-primary bg-opacity-10' :'border-border hover:border-primary hover:bg-surface-secondary'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleFeature(feature.id)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 mt-0.5 transition-fast ${
                        isSelected
                          ? 'border-primary bg-primary' :'border-border'
                      }`}>
                        {isSelected && (
                          <Icon name="Check" size={14} className="text-primary-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-text-primary text-sm">
                          {feature.name}
                        </div>
                        <div className="text-text-secondary text-xs mt-1">
                          {feature.description}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {filteredFeatures.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <Icon name="Search" size={32} className="mx-auto text-text-secondary mb-2" />
          <p className="text-text-secondary">No features found matching "{searchTerm}"</p>
        </div>
      )}

      {errors.features && (
        <p className="text-error text-sm flex items-center">
          <Icon name="AlertCircle" size={14} className="mr-1" />
          {errors.features}
        </p>
      )}
    </div>
  );
};

export default FeaturesStep;