import url from './config';

module.exports = {
  'Signup Users': (browser) => {
    browser
      .url(url.signup)
      .waitForElementVisible('body')
      .pause(5000)
      .assert.elementPresent('input[id=firstName]')
      .setValue('input[type=email]', 'info@okdocs.com')
      .setValue('input[type=password]', 'asdfghjk')
      .click('input[type=submit]')
      .pause(2000)
      .end();
  }
};
