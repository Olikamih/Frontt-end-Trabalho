"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var select_1 = require("./select");
var products_json_1 = require("../../products.json");
var getPage_1 = require("../../utils/getPage");
var connection_1 = require("../../database/connection");
var ITEMS_FOR_PAGE = 5;
var COMMENTS_SELECT = [
    'rating.comment',
    'rating.rate',
    'rating.id',
    'users.name',
    'users.avatar',
];
var Product = /** @class */ (function () {
    function Product() {
    }
    Product.prototype.index = function (req, res) {
        var _a = req.query, page = _a.page, offset = _a.offset;
        return res.jsonOk((0, getPage_1.getPage)(page, offset, products_json_1.default.products));
    };
    Product.prototype.item = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var query, params, select, _a, _b, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        query = req.query, params = req.params;
                        select = params.select;
                        if (!(select in select_1.default))
                            return [2 /*return*/, res.jsonBadRequest({ message: 'Filtro inválido' })];
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        _b = (_a = res).jsonOk;
                        return [4 /*yield*/, select_1.default[select](query.value)];
                    case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                    case 3:
                        err_1 = _c.sent();
                        return [2 /*return*/, res.jsonServerError()];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.rating = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, rate, comment, product_id, user_id, ratingId, createdComment, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, rate = _a.rate, comment = _a.comment, product_id = _a.product_id, user_id = _a.user_id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, (0, connection_1.default)('rating').insert({
                                rate: rate,
                                comment: comment,
                                user_id: user_id,
                                product_id: product_id,
                            })];
                    case 2:
                        ratingId = (_b.sent())[0];
                        if (!ratingId)
                            return [2 /*return*/, res.jsonBadRequest({
                                    message: 'Não foi possível criar um comentário',
                                })];
                        return [4 /*yield*/, (0, connection_1.default)('rating')
                                .join('users', 'users.id', '=', user_id)
                                .where('rating.id', '=', ratingId)
                                .select(COMMENTS_SELECT)];
                    case 3:
                        createdComment = (_b.sent())[0];
                        return [2 /*return*/, res.jsonOk({ comment: createdComment })];
                    case 4:
                        error_1 = _b.sent();
                        return [2 /*return*/, res.jsonServerError({ error: error_1 })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Product.prototype.comments = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var product_id, _a, page, comments, count, quantity, pages, _b;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        product_id = req.params.product_id;
                        _a = req.query.page, page = _a === void 0 ? 1 : _a;
                        if (!product_id)
                            return [2 /*return*/, res.jsonBadRequest({
                                    message: 'Product id deve ser um valor válido!',
                                })];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, (0, connection_1.default)('rating')
                                .where('rating.product_id', '=', product_id)
                                .join('users', 'users.id', '=', 'rating.user_id')
                                .select(COMMENTS_SELECT)
                                .limit(ITEMS_FOR_PAGE)
                                .offset((Number(page) - 1) * ITEMS_FOR_PAGE)];
                    case 2:
                        comments = _d.sent();
                        if (!(Number(page) == 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, connection_1.default)('rating')
                                .where('rating.product_id', '=', product_id)
                                .count()];
                    case 3:
                        count = (_d.sent())[0];
                        quantity = (_c = Number(count['count(*)'])) !== null && _c !== void 0 ? _c : ITEMS_FOR_PAGE;
                        pages = Math.ceil(quantity / ITEMS_FOR_PAGE);
                        return [2 /*return*/, res.jsonOk({ comments: comments, pages: pages })];
                    case 4: return [2 /*return*/, res.jsonOk({ comments: comments })];
                    case 5:
                        _b = _d.sent();
                        return [2 /*return*/, res.jsonServerError()];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Product;
}());
exports.default = new Product();
