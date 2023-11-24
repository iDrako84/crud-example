/** @type {import('tailwindcss').Config} */
import { blue as _blue } from 'tailwindcss/colors';
import { slate as _slate } from 'tailwindcss/colors';

export const content = [
  "./src/**/*.{html,ts}",
];
export const theme = {
  extend: {
    colors: {
      "color-custom": _slate[600],
    }
  },
};
export const plugins = [];

export const darkMode = "class";
