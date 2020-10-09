/* eslint-disable no-undef */
import { posts } from './shares/mockData';
import { shallowMountWithProps } from './shares/utils';
import { MiniPost } from '@/components/MapView/components/PostPreview/components';

const propsData = {
  post: posts[0],
};

describe('<MiniPost />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMountWithProps(MiniPost, propsData);
  });

  it(`should contain post title`, () => {
    expect(wrapper.find('.title').text()).toBe(propsData.post.headline);
  });

  it(`should contain post subtitle`, () => {
    expect(wrapper.find('.subtitle').exists()).toBeTruthy();
  });

  it(`should contain post image`, () => {
    expect(wrapper.find('img').exists()).toBeTruthy();
  });
});
