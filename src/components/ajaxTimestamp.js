const apiHost = 'http://10.24.24.115:8085/get';

export default {
  async getAllTimestamps() {
    try {
      const response = await fetch(apiHost);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
};
