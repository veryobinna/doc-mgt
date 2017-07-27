import faker from 'faker';
import url from './Config';

module.exports = {
  'Update User Profile': (browser) => {
    browser
      .resizeWindow(1200, 900)
      .url(url.login)
      .waitForElementVisible('body')
      .assert.containsText('div', 'Welcome to Doc-mgt.')
      .pause(2000)
      .assert.elementPresent('input[id=loginID]')
      .setValue('input[id=loginID]', 'obinna@obinna.com')
      .setValue('input[id=password]', 'obinna')
      .click('button')
      .pause(2000)
      .assert.urlContains('dashboard')
      .assert.elementPresent('.side-bar')
      .click('#users')
      .pause(2000)
      .click('#mode-edit')
      .clearValue('input[id=firstName]')
      .setValue('input[id="firstName"]', faker.name.firstName())
      .click('select option[value="3"]')
      .pause(1000)
      .click('button')
      .pause(1000)
      .waitForElementVisible('.toast-success')
      .assert.containsText('.toast-success', 'successful')
      .pause(2000)
      .end();
  }
};
