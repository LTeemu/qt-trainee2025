import React, { useState } from 'react';

type RadioButtonGroupProps = {
  options: string[];
  onChange?: (selectedIndex: number) => void; // Changed to pass index
  containerClassName?: string;
};

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  onChange,
  containerClassName,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleOptionChange = (index: number) => {
    setSelectedIndex(index);
    if (onChange) onChange(index);
  };

  return (
    <div className={containerClassName}>
      {options.map((option, index) => (
        <label key={index} className="flex gap-x-2 font-semibold text-sm">
          <input
            type="radio"
            name="radioGroup"
            value={option}
            checked={selectedIndex === index}
            onChange={() => handleOptionChange(index)}
          />
          <span className="text-nowrap">
            {option}
            {selectedIndex === index && (
              <span className="text-red-700"> *</span>
            )}
          </span>
        </label>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
