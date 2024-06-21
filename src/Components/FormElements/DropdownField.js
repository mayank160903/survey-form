import React from 'react';

const DropdownField = ({ label, name, options, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border rounded-lg"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default DropdownField;
