module.exports = {
  moduleNameMapper: {
    // we can use "@/components/item.vue" to access components in a simpler way
    '^@/(.*)$': '<rootDir>/src/$1',
    // the 'create-api' alias is defined in webpack, so we need to define it for jest too
    // '^create-api$': '<rootDir>/src/api/create-api-client.js',
  },
  // the file types we want jest to accept
  moduleFileExtensions: [
    'js',
    'json',
    // tell Jest to handle `*.vue` files
    'vue',
  ],
  // transformations we want jest to apply
  transform: {
    // process `*.vue` files with `vue-jest`
    '.*\\.(vue)$': 'vue-jest',
    // process js files with jest
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    // process assets with transform stub
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  // we will use this to create snapshot tests
  // snapshotSerializers: [
  //     'jest-serializer-vue',
  // ],
  // used for jsdom to mimic a real browser with a real url
  testURL: 'http://localhost/',
  setupFiles: ['./jest.setup.js'],
  testMatch: ['**/*.test.js'],
};
