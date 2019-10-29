// const apiHost = 'http://10.24.24.241:8085';
const apiHost = 'http://a39de6a7.ngrok.io';

export default {
  async getAllFeedbacks() {
    try {
      const response = await fetch(apiHost + '/get/time/desc');
      const responseJson = await response.json();
      console.log('result ' + responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async getFeedbackDetail(feedbackId) {
    try {
      const response = await fetch(apiHost + '/id/' + feedbackId);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
};
