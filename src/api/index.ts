import http, { HttpResponse } from '@/config/http';

const getPosts = async (): Promise<any> => {
  try {
    const { data } = await http.get({ url: '/posts' });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getPostInfo = async (id: any): Promise<any> => {
  try {
    const { data } = await http.get({ url: `/posts/${id}` });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getPosts, getPostInfo };
