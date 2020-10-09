/* eslint-disable no-undef */
import { posts } from './shares/mockData';
import { mountWithProps, dispatchKeyDownEvent } from './shares/utils';
import { PostExpanded } from '@/components/MapView/components';

const propsData = {
  postId: posts[0].id,
  posts: posts.map((post) => post.id),
  onClose: jest.fn(),
};

describe('<PostExpanded />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mountWithProps(PostExpanded, propsData);
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

  it(`should display loading when fetching data`, async () => {
    wrapper.setData({ postInfo: posts[0], loading: true });
    expect(wrapper.find('.spinner').exists()).toBeTruthy();
  });

  it(`should contain 4 navigation buttons and 1 close button`, async () => {
    wrapper.setData({ postInfo: posts[0], loading: false });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('button').length).toBe(5);
      expect(wrapper.findAll('svg').length).toBe(5);
    });
  });

  it(`should contain post information`, async () => {
    wrapper.setData({ postInfo: posts[0], loading: false });

    wrapper.vm.$nextTick(() => {
      expect(wrapper.find('.post-header').text()).toBe(posts[0].headline);
      expect(wrapper.find('.post-body').exists()).toBeTruthy();
      expect(wrapper.find('img').exists()).toBeTruthy();
    });
  });

  it(`should set currentIndex 0 when click Step backward button`, () => {
    wrapper.setData({ postInfo: posts[0], loading: false, currentIndex: 1 });
    wrapper
      .findAll('button')
      .at(0)
      .trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.currentIndex).toBe(0);
    });
  });

  it(`should set currentIndex ${posts.length -
    1} when click Step backward button`, () => {
    wrapper.setData({ postInfo: posts[0], loading: false, currentIndex: 1 });
    wrapper
      .findAll('button')
      .at(3)
      .trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.currentIndex).toBe(posts.length - 1);
    });
  });

  it(`should decrease currentIndex 1 when click Prev button`, () => {
    wrapper.setData({ postInfo: posts[0], loading: false, currentIndex: 1 });
    wrapper
      .findAll('button')
      .at(1)
      .trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.currentIndex).toBe(0);
    });
  });

  it(`should decrease currentIndex 1 when press Arrow left key`, () => {
    const ARROW_LEFT_KEYCODE = 37;
    wrapper.setData({ postInfo: posts[0], loading: false, currentIndex: 1 });
    dispatchKeyDownEvent('keydown', ARROW_LEFT_KEYCODE);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.currentIndex).toBe(0);
    });
  });

  it(`should increase currentIndex 1 when click Next button`, () => {
    wrapper.setData({ postInfo: posts[0], loading: false, currentIndex: 1 });
    wrapper
      .findAll('button')
      .at(2)
      .trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.currentIndex).toBe(2);
    });
  });

  it(`should increase currentIndex 1 when press Arrow right key`, () => {
    const ARROW_RIGHT_KEYCODE = 39;
    wrapper.setData({ postInfo: posts[0], loading: false, currentIndex: 1 });
    dispatchKeyDownEvent('keydown', ARROW_RIGHT_KEYCODE);
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.currentIndex).toBe(2);
    });
  });

  it(`should call onClose when click Close button`, () => {
    wrapper
      .findAll('button')
      .at(4)
      .trigger('click');
    wrapper.vm.$nextTick(() => {
      expect(propsData.onClose).toHaveBeenCalled();
    });
  });
});
