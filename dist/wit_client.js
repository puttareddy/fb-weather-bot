'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeWit = require('node-wit');

var _actions = require('./actions');

var _actions2 = _interopRequireDefault(_actions);

var _messenger_client = require('./messenger_client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const WIT_TOKEN = process.env.WIT_TOKEN;

const client = new _nodeWit.Wit({
  accessToken: WIT_TOKEN,
  actions: Object.assign({
    send: (request, response) => {
      //console.log('-------response test--------', response.text)
      return (0, _messenger_client.sendTextMessage)(request.context.senderId, response.text);
    }
  }, _actions2.default)
});

exports.default = client;