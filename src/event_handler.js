import witClient from './wit_client';

export default async function handleEvent(event) {
  if (event.message) {
    await handleMessageEvent(event);
  } else {
    console.error("Webhook received unknown event: ", event);
  }
}

async function handleMessageEvent(event) {
  const senderId = event.sender.id;
  const messageText = event.message.text;

  if (messageText) {
    const sessionId = `${Date.now()}`;
    const context0 = {
      senderId
    };

    try {
      console.log(`Received message: ${messageText}`);
      const context1 = await witClient.runActions(sessionId, messageText, context0);
      console.log('The session state is now: ' + JSON.stringify(context1));
    } catch (e) {
      console.error('Oops! Got an error: ' + JSON.stringify(e));
    }
  }
}
