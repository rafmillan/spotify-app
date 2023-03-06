/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            'bg-gray': '#191414',
            'bone': '#F1E4CD', 
            'b-pink': '#A56894',
            'b-lpink': '#da9cb8',
            'b-dpink': '#955283'
        },
    },
    borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        DEFAULT: '4px',
        'md': '0.375rem',
        'lg': '0.5rem',
        'full': '9999px',
        'large': '12px',
    },
  },
  plugins: [require('tailwindcss-safe-area')],
}
