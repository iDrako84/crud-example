/** @type {import('tailwindcss').Config} */
import { slate as _slate } from 'tailwindcss/colors';

export const content = [
  "./src/**/*.{html,ts}",
];
export const theme = {
  extend: {
    colors: {
      "color-input-field": _slate[600],
    }
  },
};
export const plugins = [];
