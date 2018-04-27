/*
Basic configuration to run your cucumber
feature files and step definitions with protractor.
**/
exports.config = {
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  capabilities: {
    browserName: 'chrome',
  },
  framework: 'custom',  // set to "custom" instead of cucumber.
  frameworkPath: require.resolve('protractor-cucumber-framework'),  // path relative to the current config file
  specs: [
    './e2e/features/**/*.feature'  // Specs here are the cucumber feature files
  ],

  // cucumber command line options
  cucumberOpts: {
    require: ['./e2e/step_definitions/**/*.e2e-spec.ts'],  // require step definition files before executing features
    tags: [],                                              // <string[]> (expression) only execute the features or scenarios with tags matching the expression
    strict: true,                                          // <boolean> fail if there are any undefined or pending steps
    'dry-run': false,                                      // <boolean> invoke formatters without executing steps
    compiler: ['ts:ts-node/register']                      // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)

  },

  onPrepare: function () {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json',
    });

    browser.manage().window().maximize(); // maximize the browser before executing the feature files
  },
};
