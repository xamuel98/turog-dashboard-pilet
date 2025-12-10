const webpack = require("webpack");
require("dotenv").config();

module.exports = function (config) {
  const cssRule = config.module.rules[0].oneOf.find(
    (rule) => rule.test && rule.test.toString().includes(".css")
  );

  if (cssRule) {
    const sassRule = {
      test: /\.s[ac]ss$/i,
      use: [...cssRule.use, "sass-loader"],
    };

    config.module.rules[0].oneOf.unshift(sassRule);
  }

  // Inject environment variables
  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    })
  );

  return config;
};
