"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
require('dotenv').config();
var tokenPrivateKey = String(process.env.JWT_TOKEN_PRIVATE_KEY);
var refreshTokenPrivateKey = String(process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY);
var UtilJwt = /*#__PURE__*/function () {
  function UtilJwt() {
    (0, _classCallCheck2.default)(this, UtilJwt);
    (0, _defineProperty2.default)(this, "options", {
      expiresIn: '30 minutes'
    });
    (0, _defineProperty2.default)(this, "refreshOptions", {
      expiresIn: '120 minutes'
    });
  }
  (0, _createClass2.default)(UtilJwt, [{
    key: "generateJwt",
    value: function generateJwt(payload) {
      return _jsonwebtoken.default.sign(payload, tokenPrivateKey, this.options);
    }
  }, {
    key: "generateRefreshJwt",
    value: function generateRefreshJwt(payload) {
      return _jsonwebtoken.default.sign(payload, refreshTokenPrivateKey, this.refreshOptions);
    }
  }, {
    key: "verifyJwt",
    value: function verifyJwt(token) {
      return _jsonwebtoken.default.verify(token, tokenPrivateKey);
    }
  }, {
    key: "verifyRefreshJwt",
    value: function verifyRefreshJwt(token) {
      return _jsonwebtoken.default.verify(token, refreshTokenPrivateKey);
    }
  }, {
    key: "getTokenFromHeaders",
    value: function getTokenFromHeaders(headers) {
      var token = headers['authorization'];
      return token ? token.slice(7, token.length) : null;
    }
  }]);
  return UtilJwt;
}();
var _default = new UtilJwt();
exports.default = _default;