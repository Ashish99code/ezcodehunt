import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PaymentStep = ({ formData, onSubmit, isSubmitting }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: ''
  });
  const [billingAddress, setBillingAddress] = useState({
    country: 'US',
    zip: ''
  });

  const submissionFee = 2.00;
  const processingFee = 0.30;
  const totalAmount = submissionFee + processingFee;

  const handleCardInputChange = (field, value) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleBillingChange = (field, value) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmitPayment = async () => {
    // Mock payment processing
    const paymentData = {
      method: paymentMethod,
      amount: totalAmount,
      card: cardDetails,
      billing: billingAddress
    };

    await onSubmit(paymentData);
  };

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="Receipt" size={20} className="mr-2 text-primary" />
          Order Summary
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Tool Submission Fee</span>
            <span className="text-text-primary font-medium">${submissionFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Processing Fee</span>
            <span className="text-text-primary font-medium">${processingFee.toFixed(2)}</span>
          </div>
          <div className="border-t border-border pt-3">
            <div className="flex justify-between items-center">
              <span className="text-text-primary font-semibold">Total</span>
              <span className="text-text-primary font-bold text-lg">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-primary bg-opacity-10 rounded-lg">
          <p className="text-primary text-sm flex items-start">
            <Icon name="Info" size={16} className="mr-2 mt-0.5 flex-shrink-0" />
            This fee helps us maintain the platform and review submissions thoroughly. 
            Your tool will be reviewed within 2-3 business days.
          </p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="CreditCard" size={20} className="mr-2 text-primary" />
          Payment Method
        </h3>

        <div className="space-y-4">
          {/* Payment Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className={`flex items-center p-4 rounded-lg border cursor-pointer transition-fast ${
              paymentMethod === 'card' ?'border-primary bg-primary bg-opacity-10' :'border-border hover:border-primary'
            }`}>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-fast ${
                paymentMethod === 'card' ?'border-primary bg-primary' :'border-border'
              }`}>
                {paymentMethod === 'card' && (
                  <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                )}
              </div>
              <div className="flex items-center">
                <Icon name="CreditCard" size={20} className="mr-2 text-primary" />
                <span className="font-medium text-text-primary">Credit/Debit Card</span>
              </div>
            </label>

            <label className={`flex items-center p-4 rounded-lg border cursor-pointer transition-fast ${
              paymentMethod === 'paypal' ?'border-primary bg-primary bg-opacity-10' :'border-border hover:border-primary'
            }`}>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 transition-fast ${
                paymentMethod === 'paypal' ?'border-primary bg-primary' :'border-border'
              }`}>
                {paymentMethod === 'paypal' && (
                  <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                )}
              </div>
              <div className="flex items-center">
                <Icon name="Wallet" size={20} className="mr-2 text-primary" />
                <span className="font-medium text-text-primary">PayPal</span>
              </div>
            </label>
          </div>

          {/* Card Details */}
          {paymentMethod === 'card' && (
            <div className="space-y-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={(e) => handleCardInputChange('number', formatCardNumber(e.target.value))}
                    maxLength="19"
                    className="w-full px-3 py-2 pl-10 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary transition-fast"
                  />
                  <Icon name="CreditCard" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => handleCardInputChange('expiry', formatExpiry(e.target.value))}
                    maxLength="5"
                    className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary transition-fast"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cardDetails.cvc}
                    onChange={(e) => handleCardInputChange('cvc', e.target.value.replace(/\D/g, '').substring(0, 4))}
                    maxLength="4"
                    className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary transition-fast"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={cardDetails.name}
                  onChange={(e) => handleCardInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary transition-fast"
                />
              </div>

              {/* Billing Address */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Country
                  </label>
                  <select
                    value={billingAddress.country}
                    onChange={(e) => handleBillingChange('country', e.target.value)}
                    className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary focus:border-primary focus:ring-1 focus:ring-primary transition-fast"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="IN">India</option>
                    <option value="JP">Japan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    ZIP/Postal Code
                  </label>
                  <input
                    type="text"
                    placeholder="12345"
                    value={billingAddress.zip}
                    onChange={(e) => handleBillingChange('zip', e.target.value)}
                    className="w-full px-3 py-2 bg-surface border border-border rounded-lg text-text-primary placeholder-text-secondary focus:border-primary focus:ring-1 focus:ring-primary transition-fast"
                  />
                </div>
              </div>
            </div>
          )}

          {/* PayPal */}
          {paymentMethod === 'paypal' && (
            <div className="mt-6 p-4 bg-warning bg-opacity-10 rounded-lg">
              <p className="text-warning text-sm flex items-center">
                <Icon name="Info" size={16} className="mr-2" />
                You will be redirected to PayPal to complete your payment securely.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <div className="flex items-start">
          <Icon name="Shield" size={20} className="mr-3 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-text-primary mb-1">Secure Payment</h4>
            <p className="text-text-secondary text-sm">
              Your payment information is encrypted and secure. We use Stripe for payment processing 
              and never store your card details on our servers.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          variant="primary"
          onClick={handleSubmitPayment}
          disabled={isSubmitting}
          loading={isSubmitting}
          iconName="CreditCard"
          iconPosition="left"
          className="px-8 py-3 text-lg"
        >
          {isSubmitting ? 'Processing...' : `Pay $${totalAmount.toFixed(2)} & Submit`}
        </Button>
      </div>
    </div>
  );
};

export default PaymentStep;