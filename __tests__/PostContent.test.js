/* eslint-disable no-undef */
import { posts } from './shares/mockData';
import { mountWithProps, findWithTestId } from './shares/utils';
import { PostContent } from '@/components/MapView/components';

const propsData = {
  src: posts[0].attachment + '?tr=w-518',
  alt: posts[0].headline,
  styles: { backgroundColor: posts[0].color },
  width: 254,
  height: 254,
  header: posts[0].headline,
  body: posts[0].body,
};

describe('<PostContent />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithProps(PostContent, propsData);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(wrapper.element).toMatchSnapshot();
  });

  it(`should contain post header`, () => {
    expect(findWithTestId(wrapper, 'post-content-header').text()).toBe(
      propsData.header,
    );
  });

  it(`should contain post body`, () => {
    expect(findWithTestId(wrapper, 'post-content-body').exists()).toBeTruthy();
  });

  it(`should contain post image`, () => {
    expect(findWithTestId(wrapper, 'post-content-image').exists()).toBeTruthy();
  });
});
