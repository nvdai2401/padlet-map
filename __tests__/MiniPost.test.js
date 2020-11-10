/* eslint-disable no-undef */
import { posts } from './shares/mockData';
import { shallowMountWithProps, findWithTestId } from './shares/utils';
import { MiniPost } from '@/components/MapView/components/PostPreview/components';

const propsData = {
  post: posts[0],
};

describe('<MiniPost />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMountWithProps(MiniPost, propsData);
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

  it(`should contain post title`, () => {
    expect(findWithTestId(wrapper, 'mini-post-title').text()).toBe(
      propsData.post.headline,
    );
  });

  it(`should contain post subtitle`, () => {
    expect(findWithTestId(wrapper, 'mini-post-subtitle').exists()).toBeTruthy();
  });

  it(`should contain post image`, () => {
    expect(findWithTestId(wrapper, 'mini-post-image').exists()).toBeTruthy();
  });
});
