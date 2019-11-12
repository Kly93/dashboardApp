// const apiHost = 'http://10.24.24.241:8085';
const apiHost = 'http://7a7333dc.ngrok.io';

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
      const response = await fetch(apiHost + '/get/id/' + feedbackId);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
};
