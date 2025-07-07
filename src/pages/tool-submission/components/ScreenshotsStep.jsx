import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ScreenshotsStep = ({ formData, updateFormData, errors }) => {
  const [dragActive, setDragActive] = useState(false);
  const screenshots = formData.screenshots || [];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isImage && isValidSize;
    });

    if (validFiles.length > 0) {
      const newScreenshots = validFiles.map(file => ({
        id: Date.now() + Math.random(),
        file,
        url: URL.createObjectURL(file),
        caption: ''
      }));
      
      updateFormData('screenshots', [...screenshots, ...newScreenshots]);
    }
  };

  const removeScreenshot = (screenshotId) => {
    const updatedScreenshots = screenshots.filter(screenshot => screenshot.id !== screenshotId);
    updateFormData('screenshots', updatedScreenshots);
  };

  const updateScreenshotCaption = (screenshotId, caption) => {
    const updatedScreenshots = screenshots.map(screenshot =>
      screenshot.id === screenshotId ? { ...screenshot, caption } : screenshot
    );
    updateFormData('screenshots', updatedScreenshots);
  };

  const reorderScreenshots = (fromIndex, toIndex) => {
    const updatedScreenshots = [...screenshots];
    const [movedItem] = updatedScreenshots.splice(fromIndex, 1);
    updatedScreenshots.splice(toIndex, 0, movedItem);
    updateFormData('screenshots', updatedScreenshots);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-fast ${
          dragActive
            ? 'border-primary bg-primary bg-opacity-10' :'border-border hover:border-primary'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Icon name="Upload" size={48} className="mx-auto text-text-secondary mb-4" />
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Upload Screenshots
        </h3>
        <p className="text-text-secondary mb-4">
          Drag and drop your screenshots here, or click to browse
        </p>
        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
          id="screenshots-upload"
        />
        <label htmlFor="screenshots-upload">
          <Button
            variant="outline"
            iconName="Image"
            iconPosition="left"
            className="cursor-pointer"
          >
            Choose Files
          </Button>
        </label>
        <p className="text-text-secondary text-sm mt-3">
          PNG, JPG, or WebP. Max 5MB per file. Recommended: 1920x1080px
        </p>
      </div>

      {/* Screenshots Grid */}
      {screenshots.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Screenshots ({screenshots.length})
            </h3>
            <p className="text-text-secondary text-sm">
              Drag to reorder • First image will be the main screenshot
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screenshots.map((screenshot, index) => (
              <div
                key={screenshot.id}
                className="bg-surface border border-border rounded-lg p-3 group"
              >
                {/* Image Preview */}
                <div className="relative mb-3">
                  <div className="aspect-video bg-background rounded-lg overflow-hidden">
                    <Image
                      src={screenshot.url}
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Main Badge */}
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                      Main
                    </div>
                  )}

                  {/* Actions */}
                  <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-fast">
                    {index > 0 && (
                      <button
                        onClick={() => reorderScreenshots(index, index - 1)}
                        className="w-8 h-8 bg-background bg-opacity-80 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary transition-fast"
                        title="Move left"
                      >
                        <Icon name="ChevronLeft" size={16} />
                      </button>
                    )}
                    {index < screenshots.length - 1 && (
                      <button
                        onClick={() => reorderScreenshots(index, index + 1)}
                        className="w-8 h-8 bg-background bg-opacity-80 rounded-full flex items-center justify-center text-text-secondary hover:text-text-primary transition-fast"
                        title="Move right"
                      >
                        <Icon name="ChevronRight" size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => removeScreenshot(screenshot.id)}
                      className="w-8 h-8 bg-background bg-opacity-80 rounded-full flex items-center justify-center text-text-secondary hover:text-error transition-fast"
                      title="Remove"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                </div>

                {/* Caption */}
                <div>
                  <Input
                    type="text"
                    placeholder="Add a caption (optional)"
                    value={screenshot.caption}
                    onChange={(e) => updateScreenshotCaption(screenshot.id, e.target.value)}
                    className="text-sm"
                  />
                </div>

                {/* File Info */}
                <div className="mt-2 text-xs text-text-secondary">
                  {screenshot.file.name} • {(screenshot.file.size / 1024 / 1024).toFixed(1)}MB
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guidelines */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <h4 className="font-semibold text-text-primary mb-3 flex items-center">
          <Icon name="Info" size={16} className="mr-2 text-primary" />
          Screenshot Guidelines
        </h4>
        <ul className="space-y-2 text-sm text-text-secondary">
          <li className="flex items-start">
            <Icon name="Check" size={14} className="mr-2 mt-0.5 text-accent flex-shrink-0" />
            Include your tool's main interface and key features
          </li>
          <li className="flex items-start">
            <Icon name="Check" size={14} className="mr-2 mt-0.5 text-accent flex-shrink-0" />
            Use high-quality images (1920x1080px recommended)
          </li>
          <li className="flex items-start">
            <Icon name="Check" size={14} className="mr-2 mt-0.5 text-accent flex-shrink-0" />
            Show real usage examples and workflows
          </li>
          <li className="flex items-start">
            <Icon name="Check" size={14} className="mr-2 mt-0.5 text-accent flex-shrink-0" />
            First screenshot will be used as the main preview
          </li>
          <li className="flex items-start">
            <Icon name="X" size={14} className="mr-2 mt-0.5 text-error flex-shrink-0" />
            Avoid blurry or low-resolution images
          </li>
          <li className="flex items-start">
            <Icon name="X" size={14} className="mr-2 mt-0.5 text-error flex-shrink-0" />
            Don't include personal or sensitive information
          </li>
        </ul>
      </div>

      {errors.screenshots && (
        <p className="text-error text-sm flex items-center">
          <Icon name="AlertCircle" size={14} className="mr-1" />
          {errors.screenshots}
        </p>
      )}
    </div>
  );
};

export default ScreenshotsStep;