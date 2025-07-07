import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BreadcrumbNavigation from '../../components/ui/BreadcrumbNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ProgressIndicator from './components/ProgressIndicator';
import BasicInfoStep from './components/BasicInfoStep';
import FeaturesStep from './components/FeaturesStep';
import PricingStep from './components/PricingStep';
import ScreenshotsStep from './components/ScreenshotsStep';
import ContactStep from './components/ContactStep';
import PaymentStep from './components/PaymentStep';
import SuccessModal from './components/SuccessModal';

const ToolSubmission = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);

  const steps = [
    { id: 1, title: 'Basic Info', description: 'Tool name, description, and category' },
    { id: 2, title: 'Features', description: 'Select your tool\'s capabilities' },
    { id: 3, title: 'Pricing', description: 'Configure pricing tiers and models' },
    { id: 4, title: 'Screenshots', description: 'Upload images and screenshots' },
    { id: 5, title: 'Contact', description: 'Contact information and links' },
    { id: 6, title: 'Payment', description: 'Complete submission payment' }
  ];

  const totalSteps = steps.length;

  // Auto-save functionality
  useEffect(() => {
    const savedData = localStorage.getItem('toolSubmissionDraft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem('toolSubmissionDraft', JSON.stringify(formData));
    }
  }, [formData]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1: // Basic Info
        if (!formData.name?.trim()) newErrors.name = 'Tool name is required';
        if (!formData.tagline?.trim()) newErrors.tagline = 'Tagline is required';
        if (!formData.website?.trim()) newErrors.website = 'Website URL is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.description?.trim()) newErrors.description = 'Description is required';
        if (formData.description && formData.description.length < 100) {
          newErrors.description = 'Description must be at least 100 characters';
        }
        if (!formData.logo) newErrors.logo = 'Logo is required';
        break;

      case 2: // Features
        if (!formData.features || formData.features.length === 0) {
          newErrors.features = 'Please select at least one feature';
        }
        break;

      case 3: // Pricing
        if (!formData.pricingModel) newErrors.pricingModel = 'Please select a pricing model';
        if (formData.pricingModel !== 'free' && (!formData.pricingTiers || formData.pricingTiers.length === 0)) {
          newErrors.pricingTiers = 'Please configure at least one pricing tier';
        }
        break;

      case 4: // Screenshots
        if (!formData.screenshots || formData.screenshots.length === 0) {
          newErrors.screenshots = 'Please upload at least one screenshot';
        }
        break;

      case 5: // Contact
        if (!formData.contactName?.trim()) newErrors.contactName = 'Contact name is required';
        if (!formData.contactEmail?.trim()) newErrors.contactEmail = 'Contact email is required';
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';
        break;

      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleStepClick = (stepNumber) => {
    if (stepNumber < currentStep || validateStep(currentStep)) {
      setCurrentStep(stepNumber);
    }
  };

  const handleSubmit = async (paymentData) => {
    setIsSubmitting(true);
    
    try {
      // Mock submission process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const submission = {
        id: 'SUB-' + Date.now().toString().slice(-6),
        ...formData,
        payment: paymentData,
        status: 'under-review',
        submittedAt: new Date().toISOString()
      };

      setSubmissionData(submission);
      
      // Clear saved draft
      localStorage.removeItem('toolSubmissionDraft');
      
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Submission error:', error);
      // Handle error - show toast notification
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <FeaturesStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <PricingStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <ScreenshotsStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 5:
        return (
          <ContactStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 6:
        return (
          <PaymentStep
            formData={formData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Submit Your AI Coding Tool - EZCode</title>
        <meta name="description" content="Submit your AI coding tool to EZCode. Reach thousands of developers looking for the perfect coding solutions. Quick review process and global exposure." />
        <meta name="keywords" content="submit tool, AI coding tools, developer tools, code submission, EZCode" />
        <meta property="og:title" content="Submit Your AI Coding Tool - EZCode" />
        <meta property="og:description" content="Submit your AI coding tool to EZCode and reach thousands of developers worldwide." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Submit Your AI Coding Tool - EZCode" />
        <meta name="twitter:description" content="Submit your AI coding tool to EZCode and reach thousands of developers worldwide." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <BreadcrumbNavigation className="mb-6" />

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-text-primary mb-4">
              Submit Your AI Coding Tool
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Share your innovative coding tool with thousands of developers worldwide. 
              Our review process ensures quality and helps you reach the right audience.
            </p>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            steps={steps}
          />

          {/* Form Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-surface border border-border rounded-xl p-6 lg:p-8 neumorphic">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            {currentStep < totalSteps && (
              <div className="flex justify-between items-center mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>

                <div className="flex items-center space-x-4">
                  <span className="text-text-secondary text-sm">
                    Step {currentStep} of {totalSteps}
                  </span>
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    iconName="ChevronRight"
                    iconPosition="right"
                  >
                    {currentStep === totalSteps - 1 ? 'Review & Pay' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Help Section */}
          <div className="max-w-4xl mx-auto mt-12">
            <div className="bg-surface border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="HelpCircle" size={20} className="mr-2 text-primary" />
                Need Help?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Icon name="FileText" size={24} className="mx-auto text-primary mb-2" />
                  <h4 className="font-medium text-text-primary mb-1">Submission Guidelines</h4>
                  <p className="text-text-secondary text-sm">
                    Learn about our requirements and best practices
                  </p>
                </div>
                <div className="text-center">
                  <Icon name="MessageCircle" size={24} className="mx-auto text-primary mb-2" />
                  <h4 className="font-medium text-text-primary mb-1">Contact Support</h4>
                  <p className="text-text-secondary text-sm">
                    Get help from our team at support@ezcode.com
                  </p>
                </div>
                <div className="text-center">
                  <Icon name="Clock" size={24} className="mx-auto text-primary mb-2" />
                  <h4 className="font-medium text-text-primary mb-1">Review Process</h4>
                  <p className="text-text-secondary text-sm">
                    Typically takes 2-3 business days for approval
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Success Modal */}
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
          submissionData={submissionData}
        />
      </div>
    </>
  );
};

export default ToolSubmission;