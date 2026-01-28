// tailwind.config.js
import PrimeUI from 'tailwindcss-primeui';

export default {
  content: [
    "./src/**/*.{html,ts}", // CRITICAL: Must be here to scan your HTML
    "./projects/**/*.{html,ts}",
  ],
  theme: {
    // DO NOT put colors here or you overwrite defaults
    extend: {
      colors: {
        // Use actual hex codes for your custom shades
        'test': {
          '0': '#eef2ff',   // Indigo 50
          '50': '#eef2ff',  // Indigo 50
          '100': '#e0e7ff', // Indigo 100
          '200': '#c7d2fe', // Indigo 200
          '300': '#a5b4fc', // Indigo 300
          '400': '#818cf8', // Indigo 400
          '500': '#6366f1', // Indigo 500 (Use this for 'text-test')
          '600': '#4f46e5', // Indigo 600
          '700': '#4338ca', // Indigo 700
          '800': '#3730a3', // Indigo 800
          '900': '#312e81', // Indigo 900
        },
      },
    },
  },
  plugins: [
    PrimeUI
  ],
  // This part belongs in a separate .postcssrc.json file, not here in the JS config
  // "plugins": {
  //   "@tailwindcss/postcss": {}
  // }
};