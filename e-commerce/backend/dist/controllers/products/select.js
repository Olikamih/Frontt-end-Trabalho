"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _products = _interopRequireDefault(require("../../products.json"));
var _connection = _interopRequireDefault(require("../../database/connection"));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var Select = /*#__PURE__*/function () {
  function Select() {
    (0, _classCallCheck2.default)(this, Select);
  }
  (0, _createClass2.default)(Select, [{
    key: "rate",
    value: function () {
      var _rate = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee(productId) {
        var _avg$avgRate;
        var _yield$knex$where$avg, _yield$knex$where$avg2, avg;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _connection.default)('rating').where('rating.product_id', '=', productId).avg('rate');
              case 2:
                _yield$knex$where$avg = _context.sent;
                _yield$knex$where$avg2 = (0, _slicedToArray2.default)(_yield$knex$where$avg, 1);
                avg = _yield$knex$where$avg2[0];
                return _context.abrupt("return", {
                  rating: (_avg$avgRate = avg['avg(`rate`)']) !== null && _avg$avgRate !== void 0 ? _avg$avgRate : 0
                });
              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));
      function rate(_x) {
        return _rate.apply(this, arguments);
      }
      return rate;
    }()
  }, {
    key: "id",
    value: function () {
      var _id = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(productId) {
        var id, _yield$this$rate, rating;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = Number(productId) - 1;
                _context2.next = 3;
                return this.rate(productId);
              case 3:
                _yield$this$rate = _context2.sent;
                rating = _yield$this$rate.rating;
                return _context2.abrupt("return", {
                  product: _objectSpread(_objectSpread({}, _products.default.products[id]), {}, {
                    rating
                  })
                });
              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function id(_x2) {
        return _id.apply(this, arguments);
      }
      return id;
    }()
  }, {
    key: "name",
    value: function name(productName) {
      var byName = function byName(_ref) {
        var title = _ref.title;
        return ~title.toLowerCase().indexOf(productName.toLowerCase());
      };
      return {
        products: _products.default.products.filter(byName)
      };
    }
  }, {
    key: "category",
    value: function category(productCategory) {
      var id = _products.default.categories.indexOf(productCategory);
      var categoryId = id >= 0 ? id : Number(productCategory);
      return {
        products: _products.default.products.filter(function (prod) {
          return prod.categoryId === categoryId;
        }),
        name: _products.default.categories[categoryId],
        description: _products.default.categoriesDescriptions[categoryId]
      };
    }
  }, {
    key: "categories",
    value: function categories() {
      return {
        categories: _products.default.categories
      };
    }
  }]);
  return Select;
}();
var _default = new Select();
exports.default = _default;