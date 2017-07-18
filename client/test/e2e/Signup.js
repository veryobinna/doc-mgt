import faker from 'faker';
import url from './config';

module.exports = {
  'Signup Users': (browser) => {
    browser
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
      .assert.urlContains('dashboard')
      .end();
  },
  'invalid User signup': (browser) => {
    browser
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
      .assert.urlEquals(url.signup)
      .end();
  }
};
