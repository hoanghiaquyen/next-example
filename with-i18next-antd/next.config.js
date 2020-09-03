const fs = require("fs");
const path = require("path");
const lessToJs = require("less-vars-to-js");
const withLess = require("@zeit/next-less");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withPlugins = require("next-compose-plugins");
const bundleAnalyzer = require("@next/bundle-analyzer");

const { nextI18NextRewrites } = require("next-i18next/rewrites");
const localeSubpaths = {};

// Where your antd-custom.less file lives
const themeVariables = lessToJs(
  fs.readFileSync(path.resolve(__dirname, "./assets/antd-custom.less"), "utf-8")
);

const nextConfig = {
  publicRuntimeConfig: {
    localeSubpaths,
  },
  experimental: {
    async rewrites() {
      return [...nextI18NextRewrites(localeSubpaths)];
    },
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

// plugins
const plugins = [
  withCSS,
  withLess({
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables,
    },
    webpack: (config, { isServer }) => {
      if (isServer) {
        const antStyles = /antd\/.*?\/style.*?/;
        const origExternals = [...config.externals];
        config.externals = [
          (context, request, callback) => {
            if (request.match(antStyles)) return callback();
            if (typeof origExternals[0] === "function") {
              origExternals[0](context, request, callback);
            } else {
              callback();
            }
          },
          ...(typeof origExternals[0] === "function" ? [] : origExternals),
        ];
        config.module.rules.unshift({
          test: antStyles,
          use: "null-loader",
        });
      }
      return config;
    },
  }),
  withSass,
  withBundleAnalyzer,
];

module.exports = withPlugins(plugins, nextConfig);
