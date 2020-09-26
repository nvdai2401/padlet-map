import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;

const getMarkers = async () => {
  try {
    const { data } = await axios.get('/posts');
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { getMarkers };
