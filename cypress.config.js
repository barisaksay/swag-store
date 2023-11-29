const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://www.saucedemo.com/v1/",
    watchForFileChanges: false,
    excludeSpecPattern: ['cypress/e2e/1-getting-started','cypress/e2e/2-advanced-examples']
  },
});
