//const { getDefaultConfig } = require("expo/metro-config");
//const { withNativeWind } = require("nativewind/metro");

//const config = getDefaultConfig(__dirname);

//module.exports = withNativeWind(config, { input: "./global.css" });


const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

// Using __dirname here is standard, but we ensure it's exported as CommonJS
const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });