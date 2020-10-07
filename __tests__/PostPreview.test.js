/* eslint-disable no-undef */
import { posts } from './shares/mockData';
import { mountWithProps } from './shares/utils';
import { PostPreview } from '@/components/MapView/components';

const propsData = {
  posts: posts,
  onMouseOverPost: jest.fn(),
  onMouseOutPost: jest.fn(),
  onClickPost: jest.fn(),
};
describe('<PostPreview />', () => {
  it(`should render ${posts.length} posts`, () => {
    const wrapper = mountWithProps(PostPreview, propsData);

    expect(wrapper.find('.post-count').text()).toBe(`${posts.length} posts`);
    expect(wrapper.findAll('.post-list__container').length).toBe(posts.length);
  });

  it(`should call onMouseOverPost when mouse over`, () => {
    const wrapper = mountWithProps(PostPreview, propsData);

    wrapper.find('.mini-post').trigger('mouseover');
    expect(propsData.onMouseOverPost).toHaveBeenCalled();
  });

  it(`should call onMouseOutPost when mouse out`, () => {
    const wrapper = mountWithProps(PostPreview, propsData);

    wrapper.find('.mini-post').trigger('mouseout');
    expect(propsData.onMouseOutPost).toHaveBeenCalled();
  });

  it(`should call onClickPost when mouse out`, () => {
    const wrapper = mountWithProps(PostPreview, propsData);

    wrapper.find('.mini-post').trigger('click');
    expect(propsData.onClickPost).toHaveBeenCalled();
  });
});
