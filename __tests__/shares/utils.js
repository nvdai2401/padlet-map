import { mount, shallowMount } from '@vue/test-utils';
import flushPromises from 'flush-promises';

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

const mockAxiosGet = async (mockAxios, url, response) => {
  mockAxios.onGet(url).reply(200, response);
  await flushPromises();
};

export {
  mountWithProps,
  shallowMountWithProps,
  dispatchKeyDownEvent,
  mockAxiosGet,
};
