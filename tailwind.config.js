/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        cormorantGaramondBold: ["CormorantGaramond-Bold", "sans-serif"],
        cormorantGaramondBoldItalic: ["CormorantGaramond-BoldItalic", "sans-serif"],
        cormorantGaramondItalic: ["CormorantGaramond-Italic", "sans-serif"],
        cormorantGaramondItalic: ["CormorantGaramond-Italic", "sans-serif"],
        cormorantGaramondLight: ["CormorantGaramond-Light", "sans-serif"],
        cormorantGaramondLightItalic: ["CormorantGaramond-LightItalic", "sans-serif"],
        cormorantGaramondMedium: ["CormorantGaramond-Medium", "sans-serif"],
        cormorantGaramondMediumtItalic: ["CormorantGaramond-MediumtItalic", "sans-serif"],
        cormorantGaramondRegular: ["CormorantGaramond-Regular", "sans-serif"],
        cormorantGaramondSemiBold: ["CormorantGaramond-SemiBold", "sans-serif"],
        cormorantGaramondSemiBoldItalic: ["CormorantGaramond-SemiBoldItalic", "sans-serif"],
        outfitBold: ["Outfit-Bold", "sans-serif"],
        outfitMedium: ["Outfit-Medium", "sans-serif"],
        outfitRegular: ["Outfit-Regular", "sans-serif"],
      }
    },
  },
  plugins: [],
}