import { mount } from '@vue/test-utils';

const mountWithProps = (component, propsData) => {
  return mount(component, { propsData });
};

export { mountWithProps };
