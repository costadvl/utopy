exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  capabilities: {
    browserName: 'chrome'
  },
  specs:['e2e/*.js'],
  jasmineNodeOpts: {
    showColors: true 
  }
}
