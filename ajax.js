const apiHost = 'http://10.24.24.115:8085';

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
      console.log(responseJson)
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
