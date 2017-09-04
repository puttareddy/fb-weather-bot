'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _event_handler = require('./event_handler');

var _event_handler2 = _interopRequireDefault(_event_handler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'supersecret';

const app = (0, _express2.default)();
app.use(_bodyParser2.default.json());

app.get('/webhook', (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === VERIFY_TOKEN) {
      console.log("Validating webhook");
      res.status(200).send(req.query['hub.challenge']);
    } else {
      console.error("Failed validation. Make sure the validation tokens match.");
      res.sendStatus(403);
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

app.post('/webhook', (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    console.log(`POST /webhook Body: ${JSON.stringify(req.body)}, Headers: ${JSON.stringify(req.headers)}`);

    const data = req.body;
    if (data.object === 'page') {
      const promises = [];

      data.entry.forEach(function (entry) {
        entry.messaging.forEach(function (event) {
          promises.push((0, _event_handler2.default)(event));
        });
      });

      try {
        yield Promise.all(promises);
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

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})());

app.listen(PORT, () => {
  console.log(`Server starts at ${PORT}`);
});