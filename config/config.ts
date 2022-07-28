export default {
  // devtool: 'eval',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  devServer: {
    port: 9999,
  },
  dynamicImport: {},
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
  ],
  theme: {
    '@primary-color': '#025EFF',
    '@link-color': '#025EFF',
    '@c-primary': '#025EFF',
  },
  lessLoader: {
    lessOptions: {
      modifyVars: {
        '@primary-color': '#025EFF',
        '@link-color': '#025EFF',
        '@c-primary': '#025EFF',
      },
      javascriptEnabled: true,
    },
  },
  fastRefresh: {},
  // webpack5: {},
};
