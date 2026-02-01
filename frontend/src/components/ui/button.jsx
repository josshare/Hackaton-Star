import React from 'react';

const Button = ({ className, children, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
