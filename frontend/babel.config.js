module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin", // always to end
      ["@babel/plugin-proposal-decorators", { version: "legacy" }]
    ]
  };
};
