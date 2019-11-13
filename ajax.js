<<<<<<< Updated upstream
const apiHost = 'http://7bcc159e.ngrok.io';
=======
// const apiHost = 'http://10.24.24.241:8085';
const apiHost = 'http://e5080d96.ngrok.io';
>>>>>>> Stashed changes

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
