import faker from 'faker';
import url from './config';

module.exports = {
  'Signup Users': (browser) => {
    browser
      .resizeWindow(1200, 900)
      .url(url.signup)
      .waitForElementVisible('body')
      .pause(1000)
      .assert.elementPresent('input[id=firstName]')
      .setValue('input[id=firstName]', faker.name.firstName())
      .setValue('input[id=lastName]', faker.name.lastName())
      .setValue('input[id=username]', faker.name.lastName())
      .setValue('input[id=email]', faker.internet.email())
      .setValue('input[id=password]', 'passkey')
      .setValue('input[id=confirmPassword]', 'passkey')
      .click('button')
      .pause(1000)
      .assert.containsText('.toast-success', 'successful')
      .assert.urlContains('dashboard')
      .pause(1000)
      .end();
  },
  'invalid User signup': (browser) => {
    browser
      .resizeWindow(1200, 900)
      .url(url.signup)
      .waitForElementVisible('body')
      .pause(1000)
      .assert.elementPresent('input[id=firstName]')
      .setValue('input[id=firstName]', faker.name.firstName())
      .setValue('input[id=lastName]', faker.name.lastName())
      .setValue('input[id=username]', faker.name.lastName())
      .setValue('input[id=email]', 'fake-email')
      .setValue('input[id=password]', 'passkey')
      .setValue('input[id=confirmPassword]', 'passkey')
      .click('button')
      .pause(1000)
      .assert.elementPresent('.toast-error')
      .assert.containsText('.toast-error', 'Invalid Email')
      .assert.urlEquals(url.signup)
      .pause(1000)
      .end();
  }
};
