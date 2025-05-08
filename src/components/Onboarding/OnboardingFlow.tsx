import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
interface OnboardingStep {
  id: number;
  question: string;
  options: string[];
  type: 'single' | 'multiple';
}

const OnboardingFlow: React.FC = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 1,
      question: t('whatTypeOfEventsAreYouInterestedIn'),
      options: ["Music Concerts", "Sports", "Art & Culture", "Food & Drink", "Business", "Gaming","Others"],
      type: "multiple"
    },
    {
      id: 2,
      question: t('howOftenDoYouPlanToCreateEvents'),
      options: ["Occasionally", "Monthly", "Weekly", "Multiple times per week"],
      type: "single"
    },
    {
      id: 3,
      question: t('whatIsYourPrimaryGoalForCreatingEvents'),
      options: ["Community Building", "Business Growth", "Personal Branding", "Social Impact"],
      type: "single"
    },
    {
      id: 4,
      question: t('setUpYourOrganizerProfile'),
      options: [],
      type: "single"
    }
  ];

  const handleOptionSelect = (option: string) => {
    const currentAnswers = answers[currentStep] || [];
    const step = onboardingSteps[currentStep];

    if (step.type === 'single') {
      setAnswers({ ...answers, [currentStep]: [option] });
    } else {
      if (currentAnswers.includes(option)) {
        setAnswers({
          ...answers,
          [currentStep]: currentAnswers.filter((a) => a !== option),
        });
      } else {
        setAnswers({
          ...answers,
          [currentStep]: [...currentAnswers, option],
        });
      }
    }
  };

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save onboarding data and redirect
      handleComplete();
    }
  };

  const handleComplete = async () => {
    try {
      setIsLoading(true);
      // Simulate a loading delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/organizer-setup');
    } catch (error) {
      console.error('Error saving onboarding data:', error);
      setIsLoading(false);
    }
  };

  const currentStepData = onboardingSteps[currentStep];
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7FFF7] to-[#F4F4F9]">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 rounded-full">
            <motion.div
              className="h-full bg-red-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 mt-12">
              {currentStepData.question}
            </h2>

            {currentStepData.options.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentStepData.options.map((option) => (
                  <motion.button
                    key={option}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOptionSelect(option)}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      (answers[currentStep] || []).includes(option)
                        ? 'border-red-600 bg-red-50 text-red-600'
                        : 'border-gray-200 hover:border-red-200'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="px-8 py-4 bg-red-600 text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all relative overflow-hidden"
                >
                  {isLoading ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center space-x-2"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>{t('gettingStarted')}</span>
                    </motion.div>
                  ) : (
                    t('getStarted')
                  )}
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {currentStepData.options.length > 0 && (
          <div className="mt-12 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              disabled={!answers[currentStep]?.length}
              className={`px-8 py-3 rounded-lg font-medium ${
                answers[currentStep]?.length
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep === onboardingSteps.length - 2 ? 'Continue' : 'Next'}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlow; 