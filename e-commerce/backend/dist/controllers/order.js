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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Order = /*#__PURE__*/function () {
  function Order() {
    (0, _classCallCheck2.default)(this, Order);
  }
  (0, _createClass2.default)(Order, [{
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
        var _req$body, id, products, _yield$db$select$wher, _yield$db$select$wher2, account, password, jwtVersion, restAccount;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, id = _req$body.id, products = _req$body.products;
                _context.next = 3;
                return (0, _connection.default)('users').select('*').where('users.id', '=', id);
              case 3:
                _yield$db$select$wher = _context.sent;
                _yield$db$select$wher2 = (0, _slicedToArray2.default)(_yield$db$select$wher, 1);
                account = _yield$db$select$wher2[0];
                if (account) {
                  _context.next = 8;
                  break;
                }
                return _context.abrupt("return", res.jsonBadRequest({
                  message: 'Ocorreu um erro ao criar seu pedido, recarregue a página ou entre mais tarde.'
                }));
              case 8:
                password = account.password, jwtVersion = account.jwtVersion, restAccount = (0, _objectWithoutProperties2.default)(account, ["password", "jwtVersion"]);
                return _context.abrupt("return", res.jsonOk(_objectSpread(_objectSpread({}, req.body), {}, {
                  account: restAccount,
                  order_id: 'asd72dSA32sa4SA7aAS'
                })));
              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }]);
  return Order;
}();
var _default = new Order();
exports.default = _default;