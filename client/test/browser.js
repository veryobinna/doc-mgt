import { JSDOM } from 'jsdom';
import { spy } from 'sinon';

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

const copyProps = (src, target) => {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
};

const localStorage = {
  store: {},
  getItem(key) {
    return this.store[key];
  },
  setItem(key, val) {
    this.store[key] = val;
  }
};
global.localStorage = localStorage;

global.window = window;
global.$ = spy(() => ({
  validate: (context) => {
    Object.keys(context.rules).forEach(key => new Promise((resolve) => {
      if (context.rules[key].required) {
      }
    }));
  },
  data: () => true,
  validator: {
    addMethod: () => {}
  },
  on: spy(),
}));

global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);
