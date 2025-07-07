import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="w-full mb-8">
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-primary text-primary-foreground neumorphic' 
                      : isCurrent 
                        ? 'bg-secondary text-secondary-foreground neumorphic scale-110' 
                        : 'bg-surface text-text-secondary border border-border'
                  }`}
                >
                  {isCompleted ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    stepNumber
                  )}
                </div>
                <span 
                  className={`text-xs mt-2 text-center max-w-16 leading-tight ${
                    isCurrent ? 'text-text-primary font-medium' : 'text-text-secondary'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Current Step Info */}
      <div className="text-center">
        <h2 className="text-xl lg:text-2xl font-heading font-bold text-text-primary mb-2">
          {steps[currentStep - 1]?.title}
        </h2>
        <p className="text-text-secondary text-sm lg:text-base">
          Step {currentStep} of {totalSteps} - {steps[currentStep - 1]?.description}
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;