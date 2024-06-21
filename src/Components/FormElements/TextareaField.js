import React from 'react';

const TextareaField = ({ label, name, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-lg"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default TextareaField;
