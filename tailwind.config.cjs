/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {},

      fontFamily: {
        sansRegular: "gilroy-regular",
        sansMedium: "gilroy-medium",
        sansBold: "gilroy-bold",
        sansThin: "gilroy-light",
      },
      textColor: {
        primary: "rgba(var(--primary), <alpha-value>)",
        secondary: "rgba(var(--secondary), <alpha-value>)",
        line: "rgba(var(--line), <alpha-value>)",
        tableHead: "rgba(var(--table-head), <alpha-value>)",
        tableBody: "rgba(var(--table-body), <alpha-value>)",
        header: "rgba(var(--header), <alpha-value>)",
        body: "rgba(var(--body), <alpha-value>)",
        accent: "rgba(var(--accent), <alpha-value>)",
        alert: "rgba(var(--alert), <alpha-value>)",
        input: "rgba(var(--input), <alpha-value>)",
      },
      backgroundColor: {
        primary: "rgba(var(--primary), <alpha-value>)",
        secondary: "rgba(var(--secondary), <alpha-value>)",
        line: "rgba(var(--line), <alpha-value>)",
        tableHead: "rgba(var(--table-head), <alpha-value>)",
        tableBody: "rgba(var(--table-body), <alpha-value>)",
        tableHover: "rgba(var(--table-hover), <alpha-value>)",
        header: "rgba(var(--header), <alpha-value>)",
        body: "rgba(var(--body), <alpha-value>)",
        accent: "rgba(var(--accent), <alpha-value>)",
        alert: "rgba(var(--alert), <alpha-value>)",
        input: "rgba(var(--input), <alpha-value>)",
      },
      borderColor: {
        primary: "rgba(var(--primary), <alpha-value>)",
        secondary: "rgba(var(--secondary), <alpha-value>)",
        line: "rgba(var(--line), <alpha-value>)",
        tableHead: "rgba(var(--table-head), <alpha-value>)",
        tableBody: "rgba(var(--table-body), <alpha-value>)",
        header: "rgba(var(--header), <alpha-value>)",
        body: "rgba(var(--body), <alpha-value>)",
        accent: "rgba(var(--accent), <alpha-value>)",
        alert: "rgba(var(--alert), <alpha-value>)",
        input: "rgba(var(--input), <alpha-value>)",
      },
      stroke: {
        primary: "rgba(var(--primary), <alpha-value>)",
        secondary: "rgba(var(--secondary), <alpha-value>)",
        line: "rgba(var(--line), <alpha-value>)",
        tableHead: "rgba(var(--table-head), <alpha-value>)",
        tableBody: "rgba(var(--table-body), <alpha-value>)",
        header: "rgba(var(--header), <alpha-value>)",
        body: "rgba(var(--body), <alpha-value>)",
        accent: "rgba(var(--accent), <alpha-value>)",
        alert: "rgba(var(--alert), <alpha-value>)",
        input: "rgba(var(--input), <alpha-value>)",
      },

      ring: {
        primary: "rgba(var(--primary), <alpha-value>)",
        secondary: "rgba(var(--secondary), <alpha-value>)",
        line: "rgba(var(--line), <alpha-value>)",
        tableHead: "rgba(var(--table-head), <alpha-value>)",
        tableBody: "rgba(var(--table-body), <alpha-value>)",
        header: "rgba(var(--header), <alpha-value>)",
        body: "rgba(var(--body), <alpha-value>)",
        accent: "rgba(var(--accent), <alpha-value>)",
        alert: "rgba(var(--alert), <alpha-value>)",
        input: "rgba(var(--input), <alpha-value>)",
      },
    },
    keyframes: {
      rotate: {
        '100%': { transform: 'rotate(360deg)' }
      },
      loading: {
        '0%': { transform: 'translateX(-100%)' },
        '100%': { transform: 'translateX(100%)' }
      },
      'move-down': {
        '0%': { transform: 'translateY(0)', opacity: '0.5' },
        '100%': { transform: 'translateY(40px)', opacity: '0' }
      }
    },
    animation: {
      rotate: 'rotate 2s linear infinite',
      loading: 'loading 1.5s ease-in infinite',
      'move-down': 'move-down 2s infinite'
    }
  },
  plugins: [],
};
