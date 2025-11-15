const { getSentryExpoConfig } = require("@sentry/react-native/metro");

const config = getSentryExpoConfig(__dirname, {
  annotateReactNativeSourcemaps: true,
  enableSourceContextInDevelopment: true,
});

module.exports = config;
