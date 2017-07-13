import url from './config';

module.exports = {
  'Login Users': (browser) => {
    browser
      .url(url.login)
      .waitForElementVisible('body')
      .pause(5000)
      .assert.elementPresent('input[id=loginID]')
      .setValue('input[id=loginID]', 'obinna1111')
      .setValue('input[id=password]', 'obinna')
      .click('button')
      .pause(2000)
      .end();
  }
};
