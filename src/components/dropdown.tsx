import React, { useState } from 'react';

type DropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: string[];
};

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className='relative inline-block text-left'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='inline-flex justify-between w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100'
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-haspopup='true'
      >
        {value}
        <svg
          className='-mr-1 ml-2 h-5 w-5'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 20 20'
          stroke='currentColor'
          aria-hidden='true'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M5 7l7 7 7-7'
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            {options.map((option) => (
              <a
                key={option}
                href='#'
                onClick={() => handleSelect(option)}
                className='text-gray-700 block px-4 py-2 text-sm'
              >
                {option}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
