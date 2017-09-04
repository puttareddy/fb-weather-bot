import { Wit } from 'node-wit';
import actions from './actions';
import { sendTextMessage } from './messenger_client';

const WIT_TOKEN = process.env.WIT_TOKEN;

const client = new Wit({
  accessToken: WIT_TOKEN,
  actions: {
    send: (request, response) => {
      //console.log('-------response test--------', response.text)
      return sendTextMessage(request.context.senderId, response.text);
    },
    ...actions
  }
});

export default client;
