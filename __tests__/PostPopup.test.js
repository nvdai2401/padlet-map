/* eslint-disable no-undef */
import { posts } from './shares/mockData';
import { mountWithProps, findWithTestId } from './shares/utils';
import { PostPopup } from '@/components/MapView/components';
import { generateGmapSearchUrl } from '@/shares/utils';

const propsData = {
  post: posts[0],
  onExpandPost: jest.fn(),
};

describe('<PostPopup />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mountWithProps(PostPopup, propsData);
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

  it(`should call onExpandPost when click Expand post`, () => {
    findWithTestId(wrapper, 'more-actions-button').trigger('click');
    wrapper.vm.$nextTick(() => {
      const MoreActionsList = wrapper.find('.more-actions-list');

      MoreActionsList.findAll('li')
        .at(0)
        .trigger('click');

      expect(propsData.onExpandPost).toHaveBeenCalled();
    });
  });

  it(`should open new window when click Open in Google Map`, () => {
    findWithTestId(wrapper, 'more-actions-button').trigger('click');
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
});
