/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "0rem",
      screens: {
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1536px",
        "3xl": "2000px",
      },
    },
    extend: {
      screens: {
        "3xl": "2000px",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "spin-step": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-alternate": {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(35deg)" },
          "50%": { transform: "rotate(0deg)" },
          "75%": { transform: "rotate(-35deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "spin-chaotic": {
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(23deg)" },
          "20%": { transform: "rotate(-17deg)" },
          "30%": { transform: "rotate(40deg)" },
          "40%": { transform: "rotate(-30deg)" },
          "50%": { transform: "rotate(10deg)" },
          "60%": { transform: "rotate(-50deg)" },
          "70%": { transform: "rotate(35deg)" },
          "80%": { transform: "rotate(-20deg)" },
          "90%": { transform: "rotate(25deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "draw-check": {
          "0%": {
            strokeDasharray: "0, 100",
          },
          "100%": {
            strokeDasharray: "100, 0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin 10s linear infinite",
        "spin-step": "spin-step 5s infinite steps(10)",
        "spin-alternate": "spin-alternate 6s infinite",
        "spin-step-chaotic": "spin-chaotic 5s infinite",
        "draw-check": "draw-check 1s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
