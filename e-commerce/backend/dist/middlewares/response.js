"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var STATUS_CODE_OK = 200;
var STATUS_CODE_BAD_REQUEST = 400;
var STATUS_CODE_UNAUTHORIZED = 401;
var STATUS_CODE_NOT_FOUND = 404;
var STATUS_CODE_SERVER_ERROR = 500;
var HandleResponse = /*#__PURE__*/function () {
  function HandleResponse() {
    (0, _classCallCheck2.default)(this, HandleResponse);
    this.response = this.response.bind(this);
  }
  (0, _createClass2.default)(HandleResponse, [{
    key: "jsonOk",
    value: function jsonOk() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var status = STATUS_CODE_OK;
      this.status(status);
      return this.json(_objectSpread(_objectSpread({}, data), {}, {
        status
      }));
    }
  }, {
    key: "jsonBadRequest",
    value: function jsonBadRequest() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var status = STATUS_CODE_BAD_REQUEST;
      this.status(status);
      return this.json(_objectSpread(_objectSpread({}, data), {}, {
        status
      }));
    }
  }, {
    key: "jsonUnauthorized",
    value: function jsonUnauthorized() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var status = STATUS_CODE_UNAUTHORIZED;
      this.status(status);
      return this.json(_objectSpread(_objectSpread({}, data), {}, {
        status
      }));
    }
  }, {
    key: "jsonNotFound",
    value: function jsonNotFound() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var status = STATUS_CODE_NOT_FOUND;
      this.status(status);
      return this.json(_objectSpread(_objectSpread({
        message: 'request not found'
      }, data), {}, {
        status
      }));
    }
  }, {
    key: "jsonServerError",
    value: function jsonServerError() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var status = STATUS_CODE_SERVER_ERROR;
      this.status(status);
      return this.json(_objectSpread(_objectSpread({}, data), {}, {
        status
      }));
    }
  }, {
    key: "response",
    value: function response(_, res, next) {
      res.jsonOk = this.jsonOk;
      res.jsonBadRequest = this.jsonBadRequest;
      res.jsonUnauthorized = this.jsonUnauthorized;
      res.jsonNotFound = this.jsonNotFound;
      res.jsonServerError = this.jsonServerError;
      next();
    }
  }]);
  return HandleResponse;
}();
var _default = new HandleResponse().response;
exports.default = _default;