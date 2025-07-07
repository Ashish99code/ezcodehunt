import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SuccessModal = ({ isOpen, onClose, submissionData }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoHome = () => {
    navigate('/homepage');
    onClose();
  };

  const handleViewSubmissions = () => {
    navigate('/my-submissions');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="glassmorphic rounded-xl max-w-md w-full p-6 animate-slide-in-up">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Check" size={32} className="text-accent-foreground" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-text-primary mb-2">
            Submission Successful!
          </h2>
          <p className="text-text-secondary">
            Your tool has been submitted for review
          </p>
        </div>

        {/* Submission Details */}
        <div className="bg-surface border border-border rounded-lg p-4 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary text-sm">Submission ID</span>
              <span className="text-text-primary font-mono text-sm">
                #{submissionData?.id || 'SUB-' + Date.now().toString().slice(-6)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary text-sm">Tool Name</span>
              <span className="text-text-primary text-sm font-medium">
                {submissionData?.name || 'Your Tool'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary text-sm">Payment</span>
              <span className="text-accent text-sm font-medium">
                $2.30 Paid
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary text-sm">Status</span>
              <span className="inline-flex items-center px-2 py-1 bg-warning bg-opacity-20 text-warning rounded-md text-xs font-medium">
                <Icon name="Clock" size={12} className="mr-1" />
                Under Review
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-6">
          <h3 className="font-semibold text-text-primary mb-3">What happens next?</h3>
          <div className="space-y-2">
            <div className="flex items-start">
              <Icon name="Clock" size={16} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="text-text-primary text-sm font-medium">Review Process</p>
                <p className="text-text-secondary text-xs">2-3 business days</p>
              </div>
            </div>
            <div className="flex items-start">
              <Icon name="Mail" size={16} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="text-text-primary text-sm font-medium">Email Notification</p>
                <p className="text-text-secondary text-xs">You'll receive updates via email</p>
              </div>
            </div>
            <div className="flex items-start">
              <Icon name="Globe" size={16} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="text-text-primary text-sm font-medium">Go Live</p>
                <p className="text-text-secondary text-xs">Your tool will appear on EZCode</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            onClick={handleGoHome}
            iconName="Home"
            iconPosition="left"
            className="flex-1"
          >
            Go to Homepage
          </Button>
          <Button
            variant="outline"
            onClick={handleViewSubmissions}
            iconName="FileText"
            iconPosition="left"
            className="flex-1"
          >
            View Submissions
          </Button>
        </div>

        {/* Support Note */}
        <div className="mt-6 p-3 bg-primary bg-opacity-10 rounded-lg">
          <p className="text-primary text-sm text-center">
            <Icon name="MessageCircle" size={14} className="inline mr-1" />
            Questions? Contact us at support@ezcode.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;