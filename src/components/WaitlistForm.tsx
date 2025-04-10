import { useState } from 'react';
import { motion } from 'framer-motion';

const WaitlistForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: 'developer', // default value
    agreedToTerms: false
  });
  
  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.agreedToTerms) {
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: 'Please fill in all required fields and agree to the terms.'
      });
      return;
    }
    
    setFormState({
      ...formState,
      isSubmitting: true,
      isError: false,
      errorMessage: ''
    });
    
    try {
      console.log('Submitting form data:', formData);
      
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'same-origin',
        mode: 'same-origin',
      });
      
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        setFormState({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          errorMessage: 'Error processing server response'
        });
        return;
      }
      
      console.log('Response status:', response.status, 'Response data:', data);
      
      if (!response.ok) {
        if (data.errorCode === 'EMAIL_EXISTS') {
          setFormState({
            isSubmitting: false,
            isSuccess: false,
            isError: true,
            errorMessage: 'This email is already registered on our waitlist.'
          });
          return;
        }
        
        setFormState({
          isSubmitting: false,
          isSuccess: false,
          isError: true,
          errorMessage: data.message || data.errorDetails || 'Failed to submit form'
        });
        return;
      }
      
      setFormState({
        isSubmitting: false,
        isSuccess: true,
        isError: false,
        errorMessage: ''
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        userType: 'developer',
        agreedToTerms: false
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormState({
        isSubmitting: false,
        isSuccess: false,
        isError: true,
        errorMessage: error instanceof Error ? error.message : 'An error occurred. Please try again.'
      });
    }
  };

  if (formState.isSuccess) {
    return (
      <motion.div
        className="text-center py-4 md:py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="mb-4 md:mb-6 inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-green-500/20 text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl md:text-2xl font-bold mb-2">You're on the list!</h3>
        <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">
          Thank you for joining our waitlist. We'll keep you updated about our launch.
        </p>
        <button
          onClick={() => setFormState(prev => ({ ...prev, isSuccess: false }))}
          className="text-primary hover:text-primary/80 transition-colors text-sm md:text-base"
        >
          Submit another response
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="px-2 md:px-0"
    >
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Join the Waitlist</h2>
      
      {formState.isError && (
        <div className="bg-red-500/20 text-red-500 px-3 py-2 md:px-4 md:py-3 rounded-md mb-4 md:mb-6 text-sm md:text-base">
          {formState.errorMessage}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3 md:mb-4">
          <label htmlFor="name" className="block text-xs md:text-sm font-medium text-gray-300 mb-1">
            Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 md:px-4 md:py-2 bg-dark/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm md:text-base"
            required
          />
        </div>
        
        <div className="mb-3 md:mb-4">
          <label htmlFor="email" className="block text-xs md:text-sm font-medium text-gray-300 mb-1">
            Email*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 md:px-4 md:py-2 bg-dark/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm md:text-base"
            required
          />
        </div>
        
        <div className="mb-4 md:mb-6">
          <label htmlFor="userType" className="block text-xs md:text-sm font-medium text-gray-300 mb-1">
            I am a...
          </label>
          <select
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full px-3 py-2 md:px-4 md:py-2 bg-dark/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm md:text-base"
          >
            <option value="developer">Developer</option>
            <option value="business">Business</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="mb-4 md:mb-6 flex items-start">
          <input
            type="checkbox"
            id="agreedToTerms"
            name="agreedToTerms"
            checked={formData.agreedToTerms}
            onChange={handleChange}
            className="mt-1 h-4 w-4 rounded border-gray-700 text-primary focus:ring-primary/50"
            required
          />
          <label htmlFor="agreedToTerms" className="ml-2 block text-xs md:text-sm text-gray-300">
            I agree to receive updates about Dimension 12 and accept the{' '}
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              Privacy Policy
            </a>
          </label>
        </div>
        
        <button
          type="submit"
          disabled={formState.isSubmitting}
          className="w-full btn py-2 md:py-3 text-sm md:text-base"
        >
          {formState.isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : 'Join Waitlist'}
        </button>
      </form>
    </motion.div>
  );
};

export default WaitlistForm; 