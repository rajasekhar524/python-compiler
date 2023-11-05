/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
      borderWidth: {
        '5': '5px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.shadow-inset': {
          'box-shadow': 'inset 0 0 0 2px #4d4d4c',
        },
        '.shadow-outline': {
          'box-shadow': '0 0 0 2px #ffffff',
        },
        // Define other custom classes here if needed
      };
      addUtilities(newUtilities, ['active','focus']);
    },
  ],
}
