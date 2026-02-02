

//module.exports = function (api) {
 // api.cache(true);
 // return {
 //   presets: [
   //   ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    //  "nativewind/babel",
   // ],
   // plugins: [
   //   "react-native-worklets/plugin", // Add this back ONLY after doing Step 1
   //   "react-native-reanimated/plugin", 
  //  ],
 // };
//};


module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      "babel-plugin-react-compiler", // Add this line
      "react-native-worklets/plugin", 
      "react-native-reanimated/plugin",
       
    ],
  };
};