export default {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-rem-to-pixel": {
      rootValue: 16,
      propList: ["*"],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    },
  },
};
