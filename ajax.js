const apiHost = 'http://100.71.8.76:8085';

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

  async getAllOSAndroid() {
    try {
      const response = await fetch(apiHost + '/get/os/android');
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async getAllOSiOS() {
    try {
      const response = await fetch(apiHost + '/get/os/ios');
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
};
