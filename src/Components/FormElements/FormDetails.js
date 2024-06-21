import React from 'react';

const FormDetails = ({  formData, additionalQuestions, onGoBack }) => {
  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Form Details</h2>
      <p><strong>Full Name:</strong> {formData.fullName}</p>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>Survey Topic:</strong> {formData.surveyTopic}</p>

      {formData.surveyTopic === 'Technology' && (
        <>
          <p><strong>Favorite Programming Language:</strong> {formData.favoriteProgrammingLanguage}</p>
          <p><strong>Years of Experience:</strong> {formData.yearsOfExperience}</p>
        </>
      )}

      {formData.surveyTopic === 'Health' && (
        <>
          <p><strong>Exercise Frequency:</strong> {formData.exerciseFrequency}</p>
          <p><strong>Diet Preference:</strong> {formData.dietPreference}</p>
        </>
      )}

      {formData.surveyTopic === 'Education' && (
        <>
          <p><strong>Highest Qualification:</strong> {formData.highestQualification}</p>
          <p><strong>Field of Study:</strong> {formData.fieldOfStudy}</p>
        </>
      )}

      <p><strong>Feedback:</strong> {formData.feedback}</p>

      {additionalQuestions.length > 0 && (
        <>
          <h3 className="text-xl font-bold mt-4">Additional Questions:</h3>
          {additionalQuestions.map((question, index) => (
            <div key={index} className="mb-2">
              <p><strong>Question {index + 1}:</strong> {question.question}</p>
              <p>
                <strong>Your Answer:</strong> {question.answer} <br />
                
              </p>
            </div>
          ))}
        </>
      )}

      <button onClick={onGoBack} className="mt-4 px-3 py-2 bg-blue-500 text-white rounded-lg">
        Go Back to Form
      </button>
    </div>
  );
};

export default FormDetails;
