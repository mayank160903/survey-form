import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from './FormElements/InputField';
import DropdownField from './FormElements/DropdownField';
import TextareaField from './FormElements/TextareaField';
import FormDetails from './FormElements/FormDetails';
import useFormValidation from './FormElements/useFormValidation';
import AdditionalQuestionsForm from './FormElements/AdditionalQuestionsForm';
import Content from './Content';

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteProgrammingLanguage: '',
    yearsOfExperience: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: '',
  });

  const [additionalQuestions, setAdditionalQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [additionalSubmitted, setAdditionalSubmitted] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const { formErrors, validateForm } = useFormValidation(formData);

  useEffect(() => {
    if (formData.surveyTopic) {
      fetchAdditionalQuestions(formData.surveyTopic);
    }
  }, [formData.surveyTopic]);


  const fetchAdditionalQuestions = async (topic) => {
    try {
        let response = [];
        const apiKey = 'YJRQ1jScXPqfzb0klJJNtY38C9XR8EPvNvQmhBFo';
        const difficulty = 'Easy';
        const limit = 5;
        let categories = [];

        if (topic === "Technology") {
            categories = ['DevOps'];
        } else if (topic === "Health") {
            categories = ['Linux'];
        } else if (topic === "Education") {
            categories = ['Docker'];
        }

        const requests = categories.map(category => 
            axios.get(`https://quizapi.io/api/v1/questions`, {
                params: {
                    apiKey: apiKey,
                    difficulty: difficulty,
                    limit: limit,
                    category: category
                }
            })
        );

        const responses = await Promise.all(requests);
        response = responses.flatMap(res => res.data);

        setAdditionalQuestions(response.map(q => ({ question: q.question, answer: '' })));
      
    } catch (error) {
      console.error('Error fetching additional questions', error);
    }
}
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormTouched(true);
  };

  const handleAdditionalChange = (index, value) => {
    const updatedQuestions = additionalQuestions.map((q, i) => (
      i === index ? { ...q, answer: value } : q
    ));
    setAdditionalQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    if (Object.keys(formErrors).length === 0) {
      setSubmitted(true);
    }
    else{
        alert("Form is Incomplete. Kindly complete it and then submit.");
    }
  };

  const handleAdditionalSubmit = (e) => {
    e.preventDefault();
    setAdditionalSubmitted(true);
  };


  const handleGoBack = () => {
    setSubmitted(false);
    setAdditionalSubmitted(false);
    setFormData({
      fullName: '',
      email: '',
      surveyTopic: '',
      favoriteProgrammingLanguage: '',
      yearsOfExperience: '',
      exerciseFrequency: '',
      dietPreference: '',
      highestQualification: '',
      fieldOfStudy: '',
      feedback: '',
    });
    setAdditionalQuestions([]);
    setFormTouched(false);
  };



  return (
    <>
    <Content />
    <div className="max-w-lg mx-auto mt-10 p-4 mb-10 border rounded-lg">
      {!submitted ? (
        <>
        
        <form onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            error={formTouched && formErrors.fullName}
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={formTouched && formErrors.email}
          />
          <DropdownField
            label="Survey Topic"
            name="surveyTopic"
            options={['Technology', 'Health', 'Education']}
            value={formData.surveyTopic}
            onChange={handleInputChange}
            error={formTouched && formErrors.surveyTopic}
          />

          {formData.surveyTopic === 'Technology' && (
            <>
              <DropdownField
                label="Favorite Programming Language"
                name="favoriteProgrammingLanguage"
                options={['JavaScript', 'Python', 'Java', 'C#']}
                value={formData.favoriteProgrammingLanguage}
                onChange={handleInputChange}
                error={formTouched && formErrors.favoriteProgrammingLanguage}
              />
              <InputField
                label="Years of Experience"
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleInputChange}
                error={formTouched && formErrors.yearsOfExperience}
              />
            </>
          )}

          {formData.surveyTopic === 'Health' && (
            <>
              <DropdownField
                label="Exercise Frequency"
                name="exerciseFrequency"
                options={['Daily', 'Weekly', 'Monthly', 'Rarely']}
                value={formData.exerciseFrequency}
                onChange={handleInputChange}
                error={formTouched && formErrors.exerciseFrequency}
              />
              <DropdownField
                label="Diet Preference"
                name="dietPreference"
                options={['Vegetarian', 'Vegan', 'Non-Vegetarian']}
                value={formData.dietPreference}
                onChange={handleInputChange}
                error={formTouched && formErrors.dietPreference}
              />
            </>
          )}

          {formData.surveyTopic === 'Education' && (
            <>
              <DropdownField
                label="Highest Qualification"
                name="highestQualification"
                options={['High School', "Bachelor's", "Master's", 'PhD']}
                value={formData.highestQualification}
                onChange={handleInputChange}
                error={formTouched && formErrors.highestQualification}
              />
              <InputField
                label="Field of Study"
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleInputChange}
                error={formTouched && formErrors.fieldOfStudy}
              />
            </>
          )}

          <TextareaField
            label="Feedback"
            name="feedback"
            value={formData.feedback}
            onChange={handleInputChange}
            error={formTouched && formErrors.feedback}
          />

          <button type="submit" className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg">
            Submit
          </button>
        </form>
        </>
      ) : !additionalSubmitted ? (<>
      
        <FormDetails
          formData={formData}
          additionalQuestions={""}
          onGoBack={handleGoBack}
        />

        <AdditionalQuestionsForm
          additionalQuestions={additionalQuestions}
          onAdditionalSubmit={handleAdditionalSubmit}
          onAdditionalChange={handleAdditionalChange}
        />
        </>
      ) : (
        <FormDetails
          formData={formData}
          additionalQuestions={additionalQuestions}
          onGoBack={handleGoBack}
        />
      )}
    </div>
    </>
  );
};

export default Form;
