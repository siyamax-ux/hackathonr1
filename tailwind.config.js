/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#4F46E5",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        background: "#F9FAFB",
        surface: "#FFFFFF",
        surfaceLight: "#F3F4F6",
        foreground: "#111827",
        muted: "#6B7280",
        border: "#E5E7EB"
      }
    },
  },
  plugins: [],
}
