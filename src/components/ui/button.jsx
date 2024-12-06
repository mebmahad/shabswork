import React from 'react'

const variantStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
  ghost: 'text-gray-700 hover:bg-gray-100',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
}

export function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

