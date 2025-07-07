import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ContactStep = ({ formData, updateFormData, errors }) => {
  const handleInputChange = (field, value) => {
    updateFormData(field, value);
  };

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="User" size={20} className="mr-2 text-primary" />
          Contact Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Full Name *
            </label>
            <Input
              type="text"
              placeholder="John Doe"
              value={formData.contactName || ''}
              onChange={(e) => handleInputChange('contactName', e.target.value)}
              className={errors.contactName ? 'border-error' : ''}
            />
            {errors.contactName && (
              <p className="text-error text-sm mt-1 flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {errors.contactName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email Address *
            </label>
            <Input
              type="email"
              placeholder="john@example.com"
              value={formData.contactEmail || ''}
              onChange={(e) => handleInputChange('contactEmail', e.target.value)}
              className={errors.contactEmail ? 'border-error' : ''}
            />
            {errors.contactEmail && (
              <p className="text-error text-sm mt-1 flex items-center">
                <Icon name="AlertCircle" size={14} className="mr-1" />
                {errors.contactEmail}
              </p>
            )}
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Company/Organization
            </label>
            <Input
              type="text"
              placeholder="Acme Corp"
              value={formData.company || ''}
              onChange={(e) => handleInputChange('company', e.target.value)}
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Your Role
            </label>
            <select
              value={formData.role || ''}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-fast"
            >
              <option value="">Select your role</option>
              <option value="founder">Founder/CEO</option>
              <option value="developer">Developer</option>
              <option value="product-manager">Product Manager</option>
              <option value="marketing">Marketing</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Social Media & Links */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Link" size={20} className="mr-2 text-primary" />
          Social Media & Links
        </h3>
        
        <div className="space-y-4">
          {/* GitHub */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              GitHub Repository
            </label>
            <div className="relative">
              <Icon name="Github" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <Input
                type="url"
                placeholder="https://github.com/username/repo"
                value={formData.githubUrl || ''}
                onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Twitter */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Twitter/X Profile
            </label>
            <div className="relative">
              <Icon name="Twitter" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <Input
                type="url"
                placeholder="https://twitter.com/username"
                value={formData.twitterUrl || ''}
                onChange={(e) => handleInputChange('twitterUrl', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              LinkedIn Profile
            </label>
            <div className="relative">
              <Icon name="Linkedin" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <Input
                type="url"
                placeholder="https://linkedin.com/in/username"
                value={formData.linkedinUrl || ''}
                onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Documentation */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Documentation URL
            </label>
            <div className="relative">
              <Icon name="FileText" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
              <Input
                type="url"
                placeholder="https://docs.example.com"
                value={formData.docsUrl || ''}
                onChange={(e) => handleInputChange('docsUrl', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="MessageSquare" size={20} className="mr-2 text-primary" />
          Additional Information
        </h3>
        
        <div className="space-y-4">
          {/* Launch Date */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Launch Date
            </label>
            <Input
              type="date"
              value={formData.launchDate || ''}
              onChange={(e) => handleInputChange('launchDate', e.target.value)}
            />
            <p className="text-text-secondary text-xs mt-1">
              When was your tool first released?
            </p>
          </div>

          {/* Team Size */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Team Size
            </label>
            <select
              value={formData.teamSize || ''}
              onChange={(e) => handleInputChange('teamSize', e.target.value)}
              className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-fast"
            >
              <option value="">Select team size</option>
              <option value="1">Solo developer</option>
              <option value="2-5">2-5 people</option>
              <option value="6-10">6-10 people</option>
              <option value="11-50">11-50 people</option>
              <option value="50+">50+ people</option>
            </select>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Additional Notes
            </label>
            <textarea
              placeholder="Any additional information you'd like to share about your tool..."
              value={formData.additionalNotes || ''}
              onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary transition-fast resize-none"
            />
            <p className="text-text-secondary text-xs mt-1">
              Optional: Share any unique features, use cases, or success stories
            </p>
          </div>
        </div>
      </div>

      {/* Agreements */}
      <div className="space-y-4">
        {/* Terms Agreement */}
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={formData.agreeToTerms || false}
            onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
            className="sr-only"
          />
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 mt-0.5 transition-fast ${
            formData.agreeToTerms
              ? 'border-primary bg-primary' :'border-border'
          }`}>
            {formData.agreeToTerms && (
              <Icon name="Check" size={14} className="text-primary-foreground" />
            )}
          </div>
          <div className="flex-1">
            <span className="text-sm text-text-primary">
              I agree to the Terms of Service and Privacy Policy *
            </span>
            <p className="text-text-secondary text-xs mt-1">
              By submitting, you agree to our terms and conditions
            </p>
          </div>
        </label>
        {errors.agreeToTerms && (
          <p className="text-error text-sm flex items-center ml-8">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.agreeToTerms}
          </p>
        )}

        {/* Marketing Agreement */}
        <label className="flex items-start">
          <input
            type="checkbox"
            checked={formData.allowMarketing || false}
            onChange={(e) => handleInputChange('allowMarketing', e.target.checked)}
            className="sr-only"
          />
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 mt-0.5 transition-fast ${
            formData.allowMarketing
              ? 'border-primary bg-primary' :'border-border'
          }`}>
            {formData.allowMarketing && (
              <Icon name="Check" size={14} className="text-primary-foreground" />
            )}
          </div>
          <div className="flex-1">
            <span className="text-sm text-text-primary">
              I agree to receive marketing communications
            </span>
            <p className="text-text-secondary text-xs mt-1">
              Optional: Receive updates about EZCode and featured tool opportunities
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default ContactStep;