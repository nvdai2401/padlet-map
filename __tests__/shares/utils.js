import { mount, shallowMount } from '@vue/test-utils';

const mountWithProps = (component, propsData) => {
  return mount(component, { propsData });
};
const shallowMountWithProps = (component, propsData) => {
  return shallowMount(component, { propsData });
};

const dispatchKeyDownEvent = (event, keyCode) => {
  const e = document.createEvent('HTMLEvents');
  e.keyCode = keyCode;
  e.initEvent(event, true, true);
  window.dispatchEvent(e);
};

export { mountWithProps, shallowMountWithProps, dispatchKeyDownEvent };
