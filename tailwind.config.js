module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#1144AA',
        secondary: '#29467F',
        accent: '#4575D4',
        positive: '#21ba45',
        negative: '#c10015',
        info: '#31ccec',
        activeTab: '#4575D4',
        closeBtn: '#999aa1',
        deleteBtn: '#f44336',
        warning: '#f2c037',
        light: {
          100: '#a7b9cd',
          200: '#879ecf',
          300: '#6B8FD4',
        },
        dark: {
          100: '#0a5ad5',
          200: '#073d9e',
          300: '#05296E',
        },
      }
    },
  },
  plugins: [],
}

