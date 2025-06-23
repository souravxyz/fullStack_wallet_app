import axios from './axios';

const apiHandler = {
  get: async (url, config = {}) => {
    const response = await axios.get(url, config);
    return response.data;
  },

  post: async (url, data, config = {}) => {
    const response = await axios.post(url, data, config);
    return response.data;
  },

  put: async (url, data, config = {}) => {
    const response = await axios.put(url, data, config);
    return response.data;
  },

  delete: async (url, config = {}) => {
    const response = await axios.delete(url, config);
    return response.data;
  }
};

export default apiHandler;
