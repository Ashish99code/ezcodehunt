import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingTab = ({ tool }) => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      features: [
        'Basic code completion',
        'Up to 3 projects',
        'Community support',
        'Basic integrations',
        '1GB storage'
      ],
      limitations: [
        'Limited AI suggestions per day',
        'No advanced debugging',
        'No team collaboration'
      ],
      popular: false,
      cta: 'Get Started Free'
    },
    {
      id: 'pro',
      name: 'Professional',
      price: { monthly: 19, yearly: 190 },
      description: 'For professional developers',
      features: [
        'Advanced AI code completion',
        'Unlimited projects',
        'Priority support',
        'All integrations',
        '50GB storage',
        'Advanced debugging tools',
        'Code review features',
        'Performance analytics'
      ],
      limitations: [],
      popular: true,
      cta: 'Start Free Trial'
    },
    {
      id: 'team',
      name: 'Team',
      price: { monthly: 49, yearly: 490 },
      description: 'For development teams',
      features: [
        'Everything in Professional',
        'Team collaboration',
        'Shared workspaces',
        'Admin dashboard',
        '200GB storage',
        'Advanced security',
        'Custom integrations',
        'Dedicated support'
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: { monthly: 'Custom', yearly: 'Custom' },
      description: 'For large organizations',
      features: [
        'Everything in Team',
        'Unlimited storage',
        'On-premise deployment',
        'Custom branding',
        'SLA guarantee',
        '24/7 phone support',
        'Custom training',
        'Dedicated account manager'
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales'
    }
  ];

  const formatPrice = (price) => {
    if (price === 0) return 'Free';
    if (typeof price === 'string') return price;
    return `$${price}`;
  };

  const getSavings = (plan) => {
    if (typeof plan.price.yearly === 'string' || plan.price.yearly === 0) return null;
    const monthlyCost = plan.price.monthly * 12;
    const savings = monthlyCost - plan.price.yearly;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return { amount: savings, percentage };
  };

  return (
    <div className="space-y-6">
      {/* Billing Toggle */}
      <div className="flex justify-center">
        <div className="bg-surface rounded-lg p-1 neumorphic">
          <div className="flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-fast ${
                billingCycle === 'monthly' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-fast ${
                billingCycle === 'yearly' ?'bg-primary text-primary-foreground' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              Yearly
              <span className="ml-1 text-xs bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingPlans.map((plan) => {
          const savings = getSavings(plan);
          
          return (
            <div
              key={plan.id}
              className={`relative bg-surface rounded-lg p-6 transition-fast ${
                plan.popular 
                  ? 'neumorphic border-2 border-primary' :'neumorphic hover:shadow-elevation-2'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-text-primary mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-text-primary">
                    {formatPrice(plan.price[billingCycle])}
                  </span>
                  {typeof plan.price[billingCycle] === 'number' && plan.price[billingCycle] > 0 && (
                    <span className="text-text-secondary">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  )}
                </div>
                
                {billingCycle === 'yearly' && savings && (
                  <div className="text-sm text-accent">
                    Save ${savings.amount} ({savings.percentage}%)
                  </div>
                )}
                
                <p className="text-sm text-text-secondary">{plan.description}</p>
              </div>

              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-text-primary">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations.map((limitation, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Icon name="X" size={16} className="text-text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-text-secondary">{limitation}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                fullWidth
                iconName={plan.id === 'free' ? 'Download' : 'CreditCard'}
                iconPosition="left"
              >
                {plan.cta}
              </Button>
            </div>
          );
        })}
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface rounded-lg p-6 neumorphic">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Icon name="Shield" size={20} className="text-accent" />
            Money-Back Guarantee
          </h3>
          <p className="text-text-secondary mb-4">
            Try any paid plan risk-free for 30 days. If you're not satisfied, get a full refund.
          </p>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li>• No questions asked</li>
            <li>• Full refund within 30 days</li>
            <li>• Keep your data</li>
          </ul>
        </div>

        <div className="bg-surface rounded-lg p-6 neumorphic">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Icon name="HelpCircle" size={20} className="text-primary" />
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-text-primary text-sm">Can I change plans anytime?</h4>
              <p className="text-xs text-text-secondary">Yes, upgrade or downgrade at any time.</p>
            </div>
            <div>
              <h4 className="font-medium text-text-primary text-sm">Is there a free trial?</h4>
              <p className="text-xs text-text-secondary">Yes, 14-day free trial for all paid plans.</p>
            </div>
            <div>
              <h4 className="font-medium text-text-primary text-sm">What payment methods do you accept?</h4>
              <p className="text-xs text-text-secondary">Credit cards, PayPal, and bank transfers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingTab;