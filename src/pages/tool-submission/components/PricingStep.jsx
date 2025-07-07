import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PricingStep = ({ formData, updateFormData, errors }) => {
  const [activeTab, setActiveTab] = useState('basic');

  const pricingTiers = formData.pricingTiers || [
    { id: 'free', name: 'Free', price: 0, features: [], isPopular: false }
  ];

  const updatePricingTier = (tierId, field, value) => {
    const updatedTiers = pricingTiers.map(tier =>
      tier.id === tierId ? { ...tier, [field]: value } : tier
    );
    updateFormData('pricingTiers', updatedTiers);
  };

  const addPricingTier = () => {
    const newTier = {
      id: `tier-${Date.now()}`,
      name: '',
      price: 0,
      features: [],
      isPopular: false
    };
    updateFormData('pricingTiers', [...pricingTiers, newTier]);
  };

  const removePricingTier = (tierId) => {
    if (pricingTiers.length > 1) {
      const updatedTiers = pricingTiers.filter(tier => tier.id !== tierId);
      updateFormData('pricingTiers', updatedTiers);
    }
  };

  const addFeatureToTier = (tierId) => {
    const updatedTiers = pricingTiers.map(tier =>
      tier.id === tierId 
        ? { ...tier, features: [...tier.features, ''] }
        : tier
    );
    updateFormData('pricingTiers', updatedTiers);
  };

  const updateTierFeature = (tierId, featureIndex, value) => {
    const updatedTiers = pricingTiers.map(tier =>
      tier.id === tierId 
        ? { 
            ...tier, 
            features: tier.features.map((feature, index) =>
              index === featureIndex ? value : feature
            )
          }
        : tier
    );
    updateFormData('pricingTiers', updatedTiers);
  };

  const removeTierFeature = (tierId, featureIndex) => {
    const updatedTiers = pricingTiers.map(tier =>
      tier.id === tierId 
        ? { 
            ...tier, 
            features: tier.features.filter((_, index) => index !== featureIndex)
          }
        : tier
    );
    updateFormData('pricingTiers', updatedTiers);
  };

  return (
    <div className="space-y-6">
      {/* Pricing Model Selection */}
      <div>
        <label className="block text-sm font-medium text-text-primary mb-3">
          Pricing Model *
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { id: 'free', name: 'Free', description: 'Completely free to use', icon: 'Gift' },
            { id: 'freemium', name: 'Freemium', description: 'Free tier with paid upgrades', icon: 'Zap' },
            { id: 'paid', name: 'Paid Only', description: 'Subscription or one-time payment', icon: 'CreditCard' }
          ].map(model => (
            <label
              key={model.id}
              className={`flex items-center p-4 rounded-lg border cursor-pointer transition-fast ${
                formData.pricingModel === model.id
                  ? 'border-primary bg-primary bg-opacity-10' :'border-border hover:border-primary hover:bg-surface-secondary'
              }`}
            >
              <input
                type="radio"
                name="pricingModel"
                value={model.id}
                checked={formData.pricingModel === model.id}
                onChange={(e) => updateFormData('pricingModel', e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-fast ${
                formData.pricingModel === model.id
                  ? 'border-primary bg-primary' :'border-border'
              }`}>
                {formData.pricingModel === model.id && (
                  <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <Icon name={model.icon} size={16} className="mr-2 text-primary" />
                  <span className="font-medium text-text-primary">{model.name}</span>
                </div>
                <p className="text-text-secondary text-sm">{model.description}</p>
              </div>
            </label>
          ))}
        </div>
        {errors.pricingModel && (
          <p className="text-error text-sm mt-1 flex items-center">
            <Icon name="AlertCircle" size={14} className="mr-1" />
            {errors.pricingModel}
          </p>
        )}
      </div>

      {/* Pricing Tiers */}
      {formData.pricingModel && formData.pricingModel !== 'free' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Pricing Tiers</h3>
            <Button
              variant="outline"
              onClick={addPricingTier}
              iconName="Plus"
              iconPosition="left"
            >
              Add Tier
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pricingTiers.map((tier, index) => (
              <div key={tier.id} className="bg-surface border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-text-primary">Tier {index + 1}</h4>
                  {pricingTiers.length > 1 && (
                    <button
                      onClick={() => removePricingTier(tier.id)}
                      className="text-text-secondary hover:text-error transition-fast"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Tier Name */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Plan Name
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., Basic, Pro, Enterprise"
                      value={tier.name}
                      onChange={(e) => updatePricingTier(tier.id, 'name', e.target.value)}
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Price (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
                        $
                      </span>
                      <Input
                        type="number"
                        placeholder="0"
                        value={tier.price}
                        onChange={(e) => updatePricingTier(tier.id, 'price', parseFloat(e.target.value) || 0)}
                        className="pl-8"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  {/* Popular Badge */}
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={tier.isPopular}
                        onChange={(e) => updatePricingTier(tier.id, 'isPopular', e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-2 transition-fast ${
                        tier.isPopular
                          ? 'border-primary bg-primary' :'border-border'
                      }`}>
                        {tier.isPopular && (
                          <Icon name="Check" size={14} className="text-primary-foreground" />
                        )}
                      </div>
                      <span className="text-sm text-text-primary">Mark as popular</span>
                    </label>
                  </div>

                  {/* Features */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-text-primary">
                        Features
                      </label>
                      <button
                        onClick={() => addFeatureToTier(tier.id)}
                        className="text-primary hover:text-primary-600 transition-fast text-sm"
                      >
                        <Icon name="Plus" size={14} className="inline mr-1" />
                        Add Feature
                      </button>
                    </div>
                    <div className="space-y-2">
                      {tier.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <Input
                            type="text"
                            placeholder="Feature description"
                            value={feature}
                            onChange={(e) => updateTierFeature(tier.id, featureIndex, e.target.value)}
                            className="flex-1"
                          />
                          <button
                            onClick={() => removeTierFeature(tier.id, featureIndex)}
                            className="text-text-secondary hover:text-error transition-fast"
                          >
                            <Icon name="X" size={16} />
                          </button>
                        </div>
                      ))}
                      {tier.features.length === 0 && (
                        <p className="text-text-secondary text-sm italic">
                          No features added yet
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Free Trial */}
      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.hasFreeTrial || false}
            onChange={(e) => updateFormData('hasFreeTrial', e.target.checked)}
            className="sr-only"
          />
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3 transition-fast ${
            formData.hasFreeTrial
              ? 'border-primary bg-primary' :'border-border'
          }`}>
            {formData.hasFreeTrial && (
              <Icon name="Check" size={14} className="text-primary-foreground" />
            )}
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">Offers Free Trial</span>
            <p className="text-text-secondary text-xs">Check if your tool offers a free trial period</p>
          </div>
        </label>
      </div>

      {/* Trial Duration */}
      {formData.hasFreeTrial && (
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Free Trial Duration
          </label>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              placeholder="7"
              value={formData.trialDuration || ''}
              onChange={(e) => updateFormData('trialDuration', parseInt(e.target.value) || '')}
              className="w-20"
              min="1"
            />
            <select
              value={formData.trialPeriod || 'days'}
              onChange={(e) => updateFormData('trialPeriod', e.target.value)}
              className="px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-fast"
            >
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>
      )}

      {errors.pricingTiers && (
        <p className="text-error text-sm flex items-center">
          <Icon name="AlertCircle" size={14} className="mr-1" />
          {errors.pricingTiers}
        </p>
      )}
    </div>
  );
};

export default PricingStep;