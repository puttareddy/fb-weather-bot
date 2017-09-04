'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let handleMessageEvent = (() => {
  var _ref2 = _asyncToGenerator(function* (event) {
    const senderId = event.sender.id;
    const messageText = event.message.text;

    if (messageText) {
      const sessionId = `${Date.now()}`;
      const context0 = {
        senderId
      };

      try {
        console.log(`Received message: ${messageText}`);
        const context1 = yield _wit_client2.default.runActions(sessionId, messageText, context0);
        console.log('The session state is now: ' + JSON.stringify(context1));
      } catch (e) {
        console.error('Oops! Got an error: ' + JSON.stringify(e));
      }
    }
  });

  return function handleMessageEvent(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

var _wit_client = require('./wit_client');

var _wit_client2 = _interopRequireDefault(_wit_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (event) {
    if (event.message) {
      yield handleMessageEvent(event);
    } else {
      console.error("Webhook received unknown event: ", event);
    }
  });

  function handleEvent(_x) {
    return _ref.apply(this, arguments);
  }

  return handleEvent;
})();