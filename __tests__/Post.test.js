/* eslint-disable no-undef */
import { posts } from './shares/mockData';
import { mountWithProps } from './shares/utils';
import { Post } from '@/components/MapView/components';
import {
  POST_WIDTH,
  calculatePlaceholderHeight,
  generateGmapSearchUrl,
} from '@/shares/utils';

const propsData = {
  post: posts[0],
  onExpandPost: jest.fn(),
};

describe('<Post />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithProps(Post, propsData);
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
    expect(wrapper.find('.post-header').text()).toBe(propsData.post.headline);
  });

  it(`should contain post content`, () => {
    expect(wrapper.find('.post-content').exists()).toBeTruthy();
  });

  it(`should contain post image`, () => {
    expect(wrapper.find('img').exists()).toBeTruthy();
  });

  it(`should call onExpandPost when click Expand post`, () => {
    wrapper.find('.more-actions-button').trigger('click');
    wrapper.vm.$nextTick(() => {
      const MoreActionsList = wrapper.find('.more-actions-list');

      MoreActionsList.findAll('li')
        .at(0)
        .trigger('click');

      expect(propsData.onExpandPost).toHaveBeenCalled();
    });
  });

  it(`should open new window when click Open in Google Map`, () => {
    wrapper.find('.more-actions-button').trigger('click');
    wrapper.vm.$nextTick(() => {
      const MoreActionsList = wrapper.find('.more-actions-list');
      const url = generateGmapSearchUrl(propsData.post.location_name);
      window.open = jest.fn();
      window.open(url, '_blank');
      MoreActionsList.findAll('li')
        .at(1)
        .trigger('click');

      expect(window.open).toHaveBeenCalledWith(url, '_blank');
    });
  });

  it(`should render image with right style and height`, () => {
    const placeholder = propsData.post.preview_image;
    const expectedHeight = calculatePlaceholderHeight(
      placeholder.width,
      placeholder.height,
      POST_WIDTH,
    );

    expect(wrapper.find('img').attributes().height).toBe(
      String(expectedHeight),
    );
    expect(wrapper.find('img').attributes().style).toBe(
      `background-color: rgb(${placeholder.dominant_color.join(', ')});`,
    );
  });
});
