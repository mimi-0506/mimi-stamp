const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("png", "jpg", "jpeg", "svg");

module.exports = defaultConfig;
