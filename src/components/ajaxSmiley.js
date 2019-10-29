const apiHost1 = 'http://10.24.24.115:8085/get/linecount/1';
const apiHost2 = 'http://10.24.24.115:8085/get/linecount/1';
const apiHost3 = 'http://10.24.24.115:8085/get/linecount/1';
const apiHost4 = 'http://10.24.24.115:8085/get/linecount/1';
const apiHost5 = 'http://10.24.24.115:8085/get/linecount/1';
const apiHost6 = 'http://10.24.24.115:8085/get/linecount/1';
const apiHost7 = 'http://10.24.24.115:8085/get/linecount/1';
const apiHost8 = 'http://10.24.24.115:8085/get/linecount/1';
const apiHost9 = 'http://10.24.24.115:8085/get/linecount/1';
const apiHost10 = 'http://10.24.24.115:8085/get/linecount/1';


export default {
  async getAll1Smileys() {
    try {
      const response = await fetch(apiHost1);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async getAll2Smileys() {
    try {
      const response = await fetch(apiHost2);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async getAll3Smileys() {
    try {
      const response = await fetch(apiHost3);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async getAll4Smileys() {
    try {
      const response = await fetch(apiHost4);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async getAll5Smileys() {
    try {
      const response = await fetch(apiHost5);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async getAll6Smileys() {
    try {
      const response = await fetch(apiHost6);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async getAll7Smileys() {
    try {
      const response = await fetch(apiHost7);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async getAll8Smileys() {
    try {
      const response = await fetch(apiHost8);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async getAll9Smileys() {
    try {
      const response = await fetch(apiHost9);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async getAll10Smileys() {
    try {
      const response = await fetch(apiHost10);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
};
