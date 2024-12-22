import React, { useState } from "react";

type RadioButtonGroupProps = {
  options: string[];
  onChange?: (selectedOption: string) => void;
  containerClassName?: string;
};

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  onChange,
  containerClassName,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    if (onChange) onChange(selectedValue);
  };

  return (
    <div className={containerClassName}>
      {options.map((option) => (
        <label key={option} className="flex gap-x-2 font-semibold text-sm">
          <input
            type="radio"
            name="radioGroup"
            value={option}
            checked={selectedOption === option}
            onChange={handleOptionChange}
          />
          <span className="text-nowrap">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
