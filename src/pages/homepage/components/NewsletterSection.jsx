import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, this would be an actual API call
      console.log('Newsletter subscription:', email);
      
      setIsSubscribed(true);
      setEmail('');
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  if (isSubscribed) {
    return (
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center glassmorphic p-8 lg:p-12 rounded-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6 neumorphic">
              <Icon name="CheckCircle" size={32} color="#FFFFFF" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-4">
              Welcome to EZCode!
            </h2>
            <p className="text-text-secondary mb-6">
              Thank you for subscribing! You'll receive weekly updates about the latest AI coding tools, 
              exclusive deals, and developer insights straight to your inbox.
            </p>
            <Button
              variant="outline"
              onClick={() => setIsSubscribed(false)}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Subscribe Another Email
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center glassmorphic p-8 lg:p-12 rounded-2xl">
          {/* Header */}
          <div className="mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 neumorphic">
              <Icon name="Mail" size={32} color="#FFFFFF" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-4">
              Stay Updated with EZCode
            </h2>
            <p className="text-text-secondary">
              Get weekly updates about the latest AI coding tools, exclusive deals, 
              and developer insights delivered straight to your inbox.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-3">
                <Icon name="Zap" size={20} className="text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">Weekly Updates</h3>
              <p className="text-xs text-text-secondary">Latest tools & trends</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center mb-3">
                <Icon name="Tag" size={20} className="text-secondary" />
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">Exclusive Deals</h3>
              <p className="text-xs text-text-secondary">Special discounts</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mb-3">
                <Icon name="BookOpen" size={20} className="text-accent" />
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">Expert Insights</h3>
              <p className="text-xs text-text-secondary">Developer tips</p>
            </div>
          </div>

          {/* Subscription Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isLoading}
                  className={`w-full ${error ? 'border-error' : ''}`}
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={isLoading || !email.trim()}
                loading={isLoading}
                iconName="ArrowRight"
                iconPosition="right"
                className="sm:w-auto w-full"
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-error text-sm">
                <Icon name="AlertCircle" size={16} />
                <span>{error}</span>
              </div>
            )}
          </form>

          {/* Privacy Note */}
          <p className="text-xs text-text-secondary mt-4">
            We respect your privacy. Unsubscribe at any time. 
            <br className="hidden sm:block" />
            No spam, just valuable content for developers.
          </p>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-lg font-bold text-text-primary">15K+</div>
              <div className="text-xs text-text-secondary">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-text-primary">4.9/5</div>
              <div className="text-xs text-text-secondary">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-text-primary">Weekly</div>
              <div className="text-xs text-text-secondary">Updates</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;