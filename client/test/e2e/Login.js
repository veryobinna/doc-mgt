import url from './config';

module.exports = {
  'Login Users': (browser) => {
    browser
      .resizeWindow(1200, 900)
      .url(url.login)
      .waitForElementVisible('body')
      .assert.containsText('div', 'Welcome to Doc-mgt.')
      .pause(1000)
      .assert.elementPresent('input[id=loginID]')
      .setValue('input[id=loginID]', 'obinna')
      .setValue('input[id=password]', 'obinna')
      .click('button')
      .pause(1000)
      .assert.urlContains('dashboard')
      .waitForElementVisible('.toast-success')
      .assert.containsText('.toast-success', 'successful')
      .end();
  },
  'Invalid user': (browser) => {
    browser
      .resizeWindow(1200, 900)
      .url(url.login)
      .waitForElementVisible('body')
      .setValue('input[id=loginID]', 'notValid')
      .setValue('input[id=password]', 'password')
      .click('button')
      .pause(1000)
      .assert.urlEquals(url.login)
      .assert.elementPresent('.toast-error')
      .assert.containsText('.toast-error', 'User not found')
      .pause(1000)
      .end();
  }
};
