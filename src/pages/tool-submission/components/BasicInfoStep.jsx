import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const BasicInfoStep = ({ formData, updateFormData, errors }) => {
  const handleInputChange = (field, value) => {
    updateFormData(field, value);
  };

  return (
    <div className="space-y-6">
      {/* Tool Name */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Tool Name *
        </label>
        <Input
          type="text"
          placeholder="e.g., GitHub Copilot"
          value={formData.name || ''}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={errors.name ? 'border-error' : ''}
        />
        {errors.name && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.name}
          </p>
        )}
      </div>

      {/* Tagline */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Tagline *
        </label>
        <Input
          type="text"
          placeholder="Brief description in one line"
          value={formData.tagline || ''}
          onChange={(e) => handleInputChange('tagline', e.target.value)}
          className={errors.tagline ? 'border-error' : ''}
        />
        <p className="text-text-secondary text-xs mt-1">
          Keep it under 100 characters
        </p>
        {errors.tagline && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.tagline}
          </p>
        )}
      </div>

      {/* Website URL */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Website URL *
        </label>
        <Input
          type="url"
          placeholder="https://example.com"
          value={formData.website || ''}
          onChange={(e) => handleInputChange('website', e.target.value)}
          className={errors.website ? 'border-error' : ''}
        />
        {errors.website && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.website}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Category *
        </label>
        <select
          value={formData.category || ''}
          onChange={(e) => handleInputChange('category', e.target.value)}
          className={`w-full px-3 py-2 bg-surface border rounded-lg text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-fast ${
            errors.category ? 'border-error' : 'border-border'
          }`}
        >
          <option value="">Select a category</option>
          <option value="ide">IDE & Editors</option>
          <option value="extensions">Extensions</option>
          <option value="browser-ide">Browser IDE</option>
          <option value="debugging">Debugging Tools</option>
          <option value="ai-generators">AI Code Generators</option>
          <option value="platform-integrations">Platform Integrations</option>
          <option value="testing">Testing Tools</option>
          <option value="deployment">Deployment Tools</option>
        </select>
        {errors.category && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.category}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Description *
        </label>
        <textarea
          placeholder="Provide a detailed description of your tool..."
          value={formData.description || ''}
          onChange={(e) => handleInputChange('description', e.target.value)}
          rows={4}
          className={`w-full px-3 py-2 bg-surface border rounded-lg text-text-primary placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary transition-fast resize-none ${
            errors.description ? 'border-error' : 'border-border'
          }`}
        />
        <p className="text-text-secondary text-xs mt-1">
          Minimum 100 characters, maximum 1000 characters
        </p>
        {errors.description && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.description}
          </p>
        )}
      </div>

      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Logo *
        </label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-fast">
          <Icon name="Upload" size={32} className="mx-auto text-text-secondary mb-2" />
          <p className="text-text-secondary text-sm mb-2">
            Drag and drop your logo here, or click to browse
          </p>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleInputChange('logo', e.target.files[0])}
            className="hidden"
            id="logo-upload"
          />
          <label
            htmlFor="logo-upload"
            className="inline-flex items-center px-4 py-2 bg-surface border border-border rounded-lg text-text-secondary hover:text-text-primary hover:border-primary transition-fast cursor-pointer"
          >
            <Icon name="Image" size={16} className="mr-2" />
            Choose File
          </label>
          <p className="text-text-secondary text-xs mt-2">
            PNG, JPG, or SVG. Max 2MB. Recommended: 256x256px
          </p>
        </div>
        {formData.logo && (
          <div className="mt-2 p-2 bg-surface rounded-lg flex items-center">
            <Icon name="FileImage" size={16} className="text-primary mr-2" />
            <span className="text-text-primary text-sm">{formData.logo.name}</span>
          </div>
        )}
        {errors.logo && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.logo}
          </p>
        )}
      </div>
    </div>
  );
};

export default BasicInfoStep;