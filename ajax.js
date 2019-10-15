const apiHost = 'https://10.24.24.215:8085';
// const apiHost = 'http://9e9aada3.ngrok.io';

export default {
  async getAllFeedbacks() {
    try {
      const response = await fetch(apiHost + '/get');
      const responseJson = await response.json();
      console.log('result ' + responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
  async getFeedbackDetail(feedbackId) {
    try {
      const response = await fetch(apiHost + '/get/id/' + feedbackId);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
};
