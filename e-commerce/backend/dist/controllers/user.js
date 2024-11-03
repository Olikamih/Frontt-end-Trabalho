"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _connection = _interopRequireDefault(require("../database/connection"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jwt = _interopRequireDefault(require("../utils/jwt"));
var _login2 = _interopRequireDefault(require("../utils/login"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var User = /*#__PURE__*/function () {
  function User() {
    (0, _classCallCheck2.default)(this, User);
  }
  (0, _createClass2.default)(User, [{
    key: "index",
    value: function () {
      var _index = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var id, _yield$db$select$wher, _yield$db$select$wher2, account, password, jwtVersion, restAccount;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = req.params.id;
                if (id) {
                  _context.next = 3;
                  break;
                }
                return _context.abrupt("return", res.jsonBadRequest());
              case 3:
                _context.prev = 3;
                _context.next = 6;
                return (0, _connection.default)('users').select('*').where('id', '=', id);
              case 6:
                _yield$db$select$wher = _context.sent;
                _yield$db$select$wher2 = (0, _slicedToArray2.default)(_yield$db$select$wher, 1);
                account = _yield$db$select$wher2[0];
                if (account) {
                  _context.next = 11;
                  break;
                }
                throw 'account';
              case 11:
                password = account.password, jwtVersion = account.jwtVersion, restAccount = (0, _objectWithoutProperties2.default)(account, ["password", "jwtVersion"]);
                return _context.abrupt("return", res.jsonOk({
                  account: restAccount
                }));
              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](3);
                if (!(_context.t0 === 'account')) {
                  _context.next = 19;
                  break;
                }
                return _context.abrupt("return", res.jsonBadRequest());
              case 19:
                return _context.abrupt("return", res.jsonServerError());
              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 15]]);
      }));
      function index(_x, _x2) {
        return _index.apply(this, arguments);
      }
      return index;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
        var _req$body, tel, cep, name, email, password, avatar, address, emailAlreadyExists, hash, _yield$db$insert, _yield$db$insert2, newAccountId, _yield$db$select$wher3, _yield$db$select$wher4, account, _name, _avatar, id, jwtVersion, token, refreshToken;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body = req.body, tel = _req$body.tel, cep = _req$body.cep, name = _req$body.name, email = _req$body.email, password = _req$body.password, avatar = _req$body.avatar, address = _req$body.address;
                _context2.next = 3;
                return (0, _connection.default)('users').select('users.email').where('users.email', '=', email);
              case 3:
                emailAlreadyExists = _context2.sent;
                if (!(emailAlreadyExists.length > 0)) {
                  _context2.next = 6;
                  break;
                }
                return _context2.abrupt("return", res.jsonBadRequest({
                  message: 'Endereço de email já cadastrado!'
                }));
              case 6:
                _context2.prev = 6;
                hash = _bcrypt.default.hashSync(password, 10);
                _context2.next = 10;
                return (0, _connection.default)('users').insert({
                  tel,
                  cep,
                  name,
                  email,
                  password: hash,
                  avatar,
                  address
                });
              case 10:
                _yield$db$insert = _context2.sent;
                _yield$db$insert2 = (0, _slicedToArray2.default)(_yield$db$insert, 1);
                newAccountId = _yield$db$insert2[0];
                _context2.next = 15;
                return (0, _connection.default)('users').select('*').where('id', '=', newAccountId);
              case 15:
                _yield$db$select$wher3 = _context2.sent;
                _yield$db$select$wher4 = (0, _slicedToArray2.default)(_yield$db$select$wher3, 1);
                account = _yield$db$select$wher4[0];
                _name = account.name, _avatar = account.avatar, id = account.id, jwtVersion = account.jwtVersion;
                token = _jwt.default.generateJwt({
                  id
                });
                refreshToken = _jwt.default.generateRefreshJwt({
                  id,
                  version: jwtVersion
                });
                return _context2.abrupt("return", res.jsonOk({
                  avatar: _avatar,
                  id,
                  name: _name,
                  token,
                  refreshToken
                }));
              case 24:
                _context2.prev = 24;
                _context2.t0 = _context2["catch"](6);
                return _context2.abrupt("return", res.jsonServerError({
                  message: 'Ocorreu um erro ao cadastrar sua conta, por favor tente mais tarde'
                }));
              case 27:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[6, 24]]);
      }));
      function create(_x3, _x4) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
        var _yield$checkLogin, account, jwtVersion, token, refreshToken;
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return (0, _login2.default)(req.body);
              case 3:
                _yield$checkLogin = _context3.sent;
                account = _yield$checkLogin.account;
                jwtVersion = _yield$checkLogin.jwtVersion;
                token = _jwt.default.generateJwt({
                  id: account.id
                });
                refreshToken = _jwt.default.generateRefreshJwt({
                  id: account.id,
                  version: jwtVersion
                });
                return _context3.abrupt("return", res.jsonOk(_objectSpread({
                  token,
                  refreshToken
                }, account)));
              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.jsonBadRequest({
                  message: _context3.t0
                }));
              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 11]]);
      }));
      function login(_x5, _x6) {
        return _login.apply(this, arguments);
      }
      return login;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee4(req, res) {
        var _req$body2, name, tel, avatar, address, _yield$checkLogin2, account;
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _req$body2 = req.body, name = _req$body2.name, tel = _req$body2.tel, avatar = _req$body2.avatar, address = _req$body2.address;
                _context4.prev = 1;
                _context4.next = 4;
                return (0, _login2.default)(req.body);
              case 4:
                _yield$checkLogin2 = _context4.sent;
                account = _yield$checkLogin2.account;
                _context4.next = 8;
                return (0, _connection.default)('users').update({
                  name,
                  tel,
                  avatar,
                  address
                }).where('id', '=', account.id);
              case 8:
                return _context4.abrupt("return", res.jsonOk(account));
              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](1);
                return _context4.abrupt("return", res.jsonBadRequest());
              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 11]]);
      }));
      function update(_x7, _x8) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }, {
    key: "refresh",
    value: function () {
      var _refresh = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee5(req, res) {
        var token, decoded, _yield$db$select$wher5, _yield$db$select$wher6, account, meta;
        return _regenerator.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                token = _jwt.default.getTokenFromHeaders(req.headers);
                if (!(token == null)) {
                  _context5.next = 3;
                  break;
                }
                return _context5.abrupt("return", res.jsonUnauthorized({
                  message: 'Token inválido'
                }));
              case 3:
                _context5.prev = 3;
                decoded = _jwt.default.verifyRefreshJwt(token);
                _context5.next = 7;
                return (0, _connection.default)('users').select('jwtVersion').where('id', '=', decoded.id);
              case 7:
                _yield$db$select$wher5 = _context5.sent;
                _yield$db$select$wher6 = (0, _slicedToArray2.default)(_yield$db$select$wher5, 1);
                account = _yield$db$select$wher6[0];
                if (account) {
                  _context5.next = 12;
                  break;
                }
                return _context5.abrupt("return", res.jsonUnauthorized());
              case 12:
                if (!(decoded.version !== account.jwtVersion)) {
                  _context5.next = 14;
                  break;
                }
                return _context5.abrupt("return", res.jsonUnauthorized());
              case 14:
                meta = {
                  token: _jwt.default.generateJwt({
                    id: account.id
                  })
                };
                return _context5.abrupt("return", res.jsonOk(meta));
              case 18:
                _context5.prev = 18;
                _context5.t0 = _context5["catch"](3);
                return _context5.abrupt("return", res.jsonUnauthorized());
              case 21:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[3, 18]]);
      }));
      function refresh(_x9, _x10) {
        return _refresh.apply(this, arguments);
      }
      return refresh;
    }()
  }]);
  return User;
}();
var _default = new User();
exports.default = _default;