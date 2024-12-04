require('dotenv').config();

exports.config = {
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://solucionfactible.com',
      show: true,
      onPageConsoleMessage: (msg) => {
        console.log('Console log from browser:', msg.text());
      }
    }
  },
  include: {
    I: './steps_file.js'
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/confirm_payroll_receipts_steps.js']
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    retryFailedStep: {
      enabled: true
    },
    retryTo: {
      enabled: true
    },
    eachElement: {
      enabled: true
    },
    pauseOnFail: {},
    allure: {
      enabled: true,
      require: 'allure-codeceptjs',
      resultsDir: "output/allure-results"
    }
  },
  stepTimeout: 0,
  stepTimeoutOverride: [{
      pattern: 'wait.*',
      timeout: 0
    },
    {
      pattern: 'amOnPage',
      timeout: 0
    }
  ],
  tests: './tests/*_test.js',
  name: 'Confirmar_recibo_nomina'
}