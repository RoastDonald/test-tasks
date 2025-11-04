module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: undefined }],
      "@babel/preset-typescript",
    ],
  };
};

