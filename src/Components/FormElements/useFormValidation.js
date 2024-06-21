import { useState, useEffect, useCallback } from 'react';

const validateForm = (formData) => {
    let errors = {};
    const { fullName, email, surveyTopic, favoriteProgrammingLanguage, yearsOfExperience, exerciseFrequency, dietPreference, highestQualification, fieldOfStudy, feedback } = formData;

    if (!fullName) errors.fullName = 'Full Name is required';
    if (!email) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';
    if (!surveyTopic) errors.surveyTopic = 'Survey Topic is required';

    if (surveyTopic === 'Technology') {
      if (!favoriteProgrammingLanguage) errors.favoriteProgrammingLanguage = 'Favorite Programming Language is required';
      if (!yearsOfExperience) errors.yearsOfExperience = 'Years of Experience is required';
    }

    if (surveyTopic === 'Health') {
      if (!exerciseFrequency) errors.exerciseFrequency = 'Exercise Frequency is required';
      if (!dietPreference) errors.dietPreference = 'Diet Preference is required';
    }

    if (surveyTopic === 'Education') {
      if (!highestQualification) errors.highestQualification = 'Highest Qualification is required';
      if (!fieldOfStudy) errors.fieldOfStudy = 'Field of Study is required';
    }

    if (!feedback || feedback.length < 50) errors.feedback = 'Feedback is required and must be at least 50 characters';

    return errors;
  };

const useFormValidation = (formData) => {
  const [formErrors, setFormErrors] = useState({});

  const validate = useCallback(() => {
    const errors = validateForm(formData);
    setFormErrors(errors);
  }, [formData])


  useEffect(() => {
    validate();
  }, [formData , validate]);

  return { formErrors, validateForm: validate };
};

export default useFormValidation;
