import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import { useAuth } from '../../hooks/useAuth.jsx';
import { useToast } from './Toast';

const AuthModal = ({ isOpen, onClose, defaultMode = 'signin' }) => {
  const [mode, setMode] = useState(defaultMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { signIn, signUp, resetPassword } = useAuth();
  const { success, error: showError } = useToast();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (mode !== 'forgot') {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    }

    if (mode === 'signup') {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (mode === 'signin') {
        const { error } = await signIn(formData.email, formData.password);
        if (error) throw error;
        success('Successfully signed in!');
        onClose();
      } else if (mode === 'signup') {
        const { error } = await signUp(formData.email, formData.password, {
          full_name: formData.fullName
        });
        if (error) throw error;
        success('Account created! Please check your email to verify your account.');
        onClose();
      } else if (mode === 'forgot') {
        const { error } = await resetPassword(formData.email);
        if (error) throw error;
        success('Password reset email sent! Check your inbox.');
        setMode('signin');
      }
    } catch (err) {
      showError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = (provider) => {
    showError(`${provider} authentication will be implemented soon!`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="glassmorphic rounded-xl max-w-md w-full p-6 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-bold text-text-primary">
            {mode === 'signin' && 'Sign In'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-primary transition-fast"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Full Name
              </label>
              <Input
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={errors.fullName ? 'border-error' : ''}
              />
              {errors.fullName && (
                <p className="text-error text-sm mt-1">{errors.fullName}</p>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={errors.email ? 'border-error' : ''}
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {mode !== 'forgot' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={errors.password ? 'border-error' : ''}
              />
              {errors.password && (
                <p className="text-error text-sm mt-1">{errors.password}</p>
              )}
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={errors.confirmPassword ? 'border-error' : ''}
              />
              {errors.confirmPassword && (
                <p className="text-error text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={loading}
          >
            {mode === 'signin' && 'Sign In'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'forgot' && 'Send Reset Email'}
          </Button>
        </form>

        {mode !== 'forgot' && (
          <>
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-border"></div>
              <span className="px-4 text-text-secondary text-sm">or</span>
              <div className="flex-1 border-t border-border"></div>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => handleSocialAuth('Google')}
                iconName="Chrome"
                iconPosition="left"
              >
                Continue with Google
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => handleSocialAuth('GitHub')}
                iconName="Github"
                iconPosition="left"
              >
                Continue with GitHub
              </Button>
            </div>
          </>
        )}

        <div className="mt-6 text-center text-sm">
          {mode === 'signin' && (
            <>
              <button
                onClick={() => setMode('forgot')}
                className="text-primary hover:text-primary-600 transition-fast"
              >
                Forgot your password?
              </button>
              <div className="mt-2">
                Don't have an account?{' '}
                <button
                  onClick={() => setMode('signup')}
                  className="text-primary hover:text-primary-600 transition-fast font-medium"
                >
                  Sign up
                </button>
              </div>
            </>
          )}
          {mode === 'signup' && (
            <div>
              Already have an account?{' '}
              <button
                onClick={() => setMode('signin')}
                className="text-primary hover:text-primary-600 transition-fast font-medium"
              >
                Sign in
              </button>
            </div>
          )}
          {mode === 'forgot' && (
            <div>
              Remember your password?{' '}
              <button
                onClick={() => setMode('signin')}
                className="text-primary hover:text-primary-600 transition-fast font-medium"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;