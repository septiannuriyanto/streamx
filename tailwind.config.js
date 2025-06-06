module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
       primary: {
  50: "#e0e0f5",  // Lightest tint
  100: "#b3b3db",
  200: "#8585c2",
  300: "#5757a8",
  400: "#2e2e8f",
  500: "#030014",  // True primary color
  600: "#020011",
  700: "#02000e",
  800: "#01000a",
  900: "#000007",  // Deepest shade
},

secondary: {
  50: "#fde6e6",  // Lightest tint
  100: "#fab8b8",
  200: "#f68a8a",
  300: "#f25c5c",
  400: "#ee2e2e",
  500: "#dc2626",  // True secondary color
  600: "#af1d1d",
  700: "#831515",
  800: "#570d0d",
  900: "#2c0606",  // Deepest shade
}
      },
    },
  },
};