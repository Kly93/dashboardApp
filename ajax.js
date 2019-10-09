const apiHost = 'http://10.24.24.37:8085';

export default {
  async getAllFeedbacks() {
    try {
      const response = await fetch(apiHost + '/get');
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
};
