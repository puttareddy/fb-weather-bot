import request from 'request';

const PAGE_ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

function callSendAPI(messageData) {
  return new Promise((resolve, reject) => {
    console.log('Send message');
    request({
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
          errorResult = {
            error,
            ...errorResult
          };
        } else {
          errorResult = {
            statusCode: response.statusCode,
            body,
            ...errorResult
          };
        }
        reject(errorResult);
      }
    });
  });
}

export function sendTextMessage(recipientId, messageText) {
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
