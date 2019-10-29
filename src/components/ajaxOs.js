const apiHostAndroid = 'http://10.24.24.115:8085/get/os/android';
const apiHostIos = 'http://10.24.24.115:8085/get/os/ios';


export default {
  async getAllOsAndroid() {
    try {
      const response = await fetch(apiHostAndroid);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async getAllOsIos() {
    try {
      const response = await fetch(apiHostIos);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
};
