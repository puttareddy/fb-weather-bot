import express from 'express';
import bodyParser from 'body-parser';

import handleEvent from './event_handler';

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'supersecret';

const app = express();
app.use(bodyParser.json());

app.get('/webhook', async (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === VERIFY_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }
});

app.post('/webhook', async (req, res) => {
  console.log(`POST /webhook Body: ${JSON.stringify(req.body)}, Headers: ${JSON.stringify(req.headers)}`);

  const data = req.body;
  if (data.object === 'page') {
    const promises = [];

    data.entry.forEach((entry) => {
      entry.messaging.forEach(event => {
        promises.push(handleEvent(event));
      });
    });

    try {
      await Promise.all(promises);
    } catch (e) {
      console.error(e);
    }
    
    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});

app.listen(PORT, () => {
  console.log(`Server starts at ${PORT}`);
});
