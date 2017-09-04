'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendTextMessage = sendTextMessage;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

function callSendAPI(messageData) {
  return new Promise((resolve, reject) => {
    console.log('Send message');
    (0, _request2.default)({
      uri: 'https://graph.facebook.com/v2.10/me/messages',
      qs: { access_token: PAGE_ACCESS_TOKEN },
      method: 'POST',
      json: messageData
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve();
      } else {
        let errorResult = {
          description: 'Unable to send message'
        };
        if (error) {
          errorResult = Object.assign({
            error
          }, errorResult);
        } else {
          errorResult = Object.assign({
            statusCode: response.statusCode,
            body
          }, errorResult);
        }
        reject(errorResult);
      }
    });
  });
}

function sendTextMessage(recipientId, messageText) {
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  return callSendAPI(messageData);
}