import React from 'react';

const AdditionalQuestionsForm = ({ additionalQuestions, onAdditionalSubmit, onAdditionalChange }) => {
  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Additional Questions</h2>
      <form onSubmit={onAdditionalSubmit}>
        {additionalQuestions.map((question, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 mb-2">
              {question.question}
            </label>
            <input
              type="text"
              value={question.answer}
              onChange={(e) => onAdditionalChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        ))}
        <button type="submit" className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg">
          Submit Answers
        </button>
      </form>
    </div>
  );
};

export default AdditionalQuestionsForm;
