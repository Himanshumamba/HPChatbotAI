import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ProgressBar from './ProgressBar';
import { generateText } from '../api/openai';

function FormRegister() {
  const [activeStep, setActiveStep] = useState(0);
  const [suggestion, setSuggestion] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const { control, handleSubmit, setValue, formState } = useForm({ mode: 'onChange' });

  const steps = [
    { label: 'Personal Information', fields: ['name', 'nationalId', 'dateOfBirth', 'gender', 'address', 'city', 'state', 'country', 'phone', 'email'] },
    { label: 'Family & Financial Info', fields: ['maritalStatus', 'dependents', 'employmentStatus', 'monthlyIncome', 'housingStatus'] },
    { label: 'Situation Descriptions', fields: ['currentFinancialSituation', 'employmentCircumstances', 'reasonForApplying'], aiAssistance: true },
  ];

  const isLastStep = activeStep === steps.length - 1;

  const handleNext = () => { if (!isLastStep) setActiveStep(activeStep + 1); };
  const handlePrev = () => { if (activeStep > 0) setActiveStep(activeStep - 1); };

const handleGenerate = async () => {
    try {
      const text = await generateText("I am unemployed with no income. Help me describe my financial hardship.");
      setSuggestion(text);
      setOpenModal(true);
    } catch (err) {
      console.error(err);
      setSuggestion("Failed to generate. Check console.");
      setOpenModal(true);
    }
  };

  const handleAccept = () => {
    setValue('currentFinancialSituation', suggestion);
    setOpenModal(false);
  };

  const handleDiscard = () => setOpenModal(false);

  useEffect(() => {
    localStorage.setItem(`form-step-${activeStep}`, JSON.stringify(formState.dirtyFields));
  }, [activeStep, formState.dirtyFields]);

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
    alert('Form submitted! Check console.');
  };

  return (
    <div className="max-w-lg mx-auto p-5" aria-label="Application Form Wizard">
      
      {/* Progress bar */}
       <ProgressBar currentStep={activeStep} totalSteps={steps.length} />

      <h2 className="text-xl font-bold mb-4">{steps[activeStep].label}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {steps[activeStep].fields.map((field) => (
          <div key={field} className="mb-4">
            <label htmlFor={field} className="block font-semibold mb-1">{field}</label>
            <Controller
              name={field}
              control={control}
              rules={{ required: true }}
              render={({ field: f }) => (
                <textarea
                  id={field}
                  {...f}
                  className={`w-full p-2 border rounded ${formState.errors[field] ? 'border-red-500' : 'border-gray-300'}`}
                  rows={field.includes('Situation') || field.includes('Reason') ? 4 : 1}
                  aria-label={field}
                  aria-required={formState.errors[field] ? true : false}
                />
              )}
            />
            {formState.errors[field] && <span className="text-red-500 text-sm">This field is required</span>}
          </div>
        ))}

        {steps[activeStep].aiAssistance && (
          <button
            type="button"
            onClick={handleGenerate}
            className="mb-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
            aria-label="Generate AI suggestion for this step"
          >
            Help Me Write
          </button>
        )}

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={activeStep === 0}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
            aria-label="Go to previous step"
          >
            Back
          </button>
          {isLastStep ? (
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" aria-label="Submit form">
              Submit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
              aria-label="Go to next step"
            >
              Next
            </button>
          )}
        </div>
      </form>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="AI suggestion modal">
          <div className="bg-white p-5 rounded w-11/12 max-w-md">
            <h3 className="text-lg font-bold mb-3">AI Suggestion</h3>
            <textarea
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              className="w-full border p-2 rounded mb-3"
              rows={5}
              aria-label="AI generated suggestion"
            />
            <div className="flex justify-between">
              <button onClick={handleAccept} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" aria-label="Accept AI suggestion">
                Accept
              </button>
              <button onClick={handleDiscard} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" aria-label="Discard AI suggestion">
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormRegister;
