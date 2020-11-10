/* eslint-disable no-undef */
import { posts } from './shares/mockData';
import {
  mountWithProps,
  findWithTestId,
  findAllWithTestId,
} from './shares/utils';
import { PostPreview } from '@/components/MapView/components';

const propsData = {
  posts: posts,
  onMouseOverPost: jest.fn(),
  onMouseOutPost: jest.fn(),
  onClickPost: jest.fn(),
};
describe('<PostPreview />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithProps(PostPreview, propsData);
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

  it(`should render ${posts.length} posts`, () => {
    expect(findWithTestId(wrapper, 'post-count').text()).toBe(
      `${posts.length} posts`,
    );
    expect(findAllWithTestId(wrapper, 'mini-post-list').length).toBe(
      posts.length,
    );
  });

  it(`should call onMouseOverPost when mouse over`, () => {
    findWithTestId(wrapper, 'mini-post').trigger('mouseover');
    expect(propsData.onMouseOverPost).toHaveBeenCalled();
  });

  it(`should call onMouseOutPost when mouse out`, () => {
    findWithTestId(wrapper, 'mini-post').trigger('mouseout');
    expect(propsData.onMouseOutPost).toHaveBeenCalled();
  });

  it(`should call onClickPost when click`, () => {
    findWithTestId(wrapper, 'mini-post').trigger('click');
    expect(propsData.onClickPost).toHaveBeenCalled();
  });
});
