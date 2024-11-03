"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = require("../database/connection");
var bcrypt_1 = require("bcrypt");
var jwt_1 = require("../utils/jwt");
var login_1 = require("../utils/login");
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, account, password, jwtVersion, restAccount, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        if (!id)
                            return [2 /*return*/, res.jsonBadRequest()];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, connection_1.default)('users').select('*').where('id', '=', id)];
                    case 2:
                        account = (_a.sent())[0];
                        if (!account)
                            throw 'account';
                        password = account.password, jwtVersion = account.jwtVersion, restAccount = __rest(account, ["password", "jwtVersion"]);
                        return [2 /*return*/, res.jsonOk({ account: restAccount })];
                    case 3:
                        err_1 = _a.sent();
                        if (err_1 === 'account')
                            return [2 /*return*/, res.jsonBadRequest()];
                        return [2 /*return*/, res.jsonServerError()];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, tel, cep, name, email, password, avatar, address, emailAlreadyExists, hash, newAccountId, account, name_1, avatar_1, id, jwtVersion, token, refreshToken, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, tel = _a.tel, cep = _a.cep, name = _a.name, email = _a.email, password = _a.password, avatar = _a.avatar, address = _a.address;
                        return [4 /*yield*/, (0, connection_1.default)('users')
                                .select('users.email')
                                .where('users.email', '=', email)];
                    case 1:
                        emailAlreadyExists = _b.sent();
                        if (emailAlreadyExists.length > 0) {
                            return [2 /*return*/, res.jsonBadRequest({
                                    message: 'Endereço de email já cadastrado!',
                                })];
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        hash = bcrypt_1.default.hashSync(password, 10);
                        return [4 /*yield*/, (0, connection_1.default)('users').insert({
                                tel: tel,
                                cep: cep,
                                name: name,
                                email: email,
                                password: hash,
                                avatar: avatar,
                                address: address,
                            })];
                    case 3:
                        newAccountId = (_b.sent())[0];
                        return [4 /*yield*/, (0, connection_1.default)('users')
                                .select('*')
                                .where('id', '=', newAccountId)];
                    case 4:
                        account = (_b.sent())[0];
                        {
                            name_1 = account.name, avatar_1 = account.avatar, id = account.id, jwtVersion = account.jwtVersion;
                            token = jwt_1.default.generateJwt({ id: id });
                            refreshToken = jwt_1.default.generateRefreshJwt({
                                id: id,
                                version: jwtVersion,
                            });
                            return [2 /*return*/, res.jsonOk({
                                    avatar: avatar_1,
                                    id: id,
                                    name: name_1,
                                    token: token,
                                    refreshToken: refreshToken,
                                })];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _b.sent();
                        return [2 /*return*/, res.jsonServerError({
                                message: 'Ocorreu um erro ao cadastrar sua conta, por favor tente mais tarde',
                            })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, account, jwtVersion, token, refreshToken, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, login_1.default)(req.body)];
                    case 1:
                        _a = _b.sent(), account = _a.account, jwtVersion = _a.jwtVersion;
                        token = jwt_1.default.generateJwt({ id: account.id });
                        refreshToken = jwt_1.default.generateRefreshJwt({
                            id: account.id,
                            version: jwtVersion,
                        });
                        return [2 /*return*/, res.jsonOk(__assign({ token: token, refreshToken: refreshToken }, account))];
                    case 2:
                        err_3 = _b.sent();
                        return [2 /*return*/, res.jsonBadRequest({ message: err_3 })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, tel, avatar, address, account, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, tel = _a.tel, avatar = _a.avatar, address = _a.address;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, (0, login_1.default)(req.body)];
                    case 2:
                        account = (_b.sent()).account;
                        return [4 /*yield*/, (0, connection_1.default)('users')
                                .update({
                                name: name,
                                tel: tel,
                                avatar: avatar,
                                address: address,
                            })
                                .where('id', '=', account.id)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, res.jsonOk(account)];
                    case 4:
                        err_4 = _b.sent();
                        return [2 /*return*/, res.jsonBadRequest()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    User.prototype.refresh = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, decoded, account, meta, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = jwt_1.default.getTokenFromHeaders(req.headers);
                        if (token == null)
                            return [2 /*return*/, res.jsonUnauthorized({ message: 'Token inválido' })];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        decoded = jwt_1.default.verifyRefreshJwt(token);
                        return [4 /*yield*/, (0, connection_1.default)('users')
                                .select('jwtVersion')
                                .where('id', '=', decoded.id)];
                    case 2:
                        account = (_a.sent())[0];
                        if (!account)
                            return [2 /*return*/, res.jsonUnauthorized()];
                        if (decoded.version !== account.jwtVersion)
                            return [2 /*return*/, res.jsonUnauthorized()];
                        meta = {
                            token: jwt_1.default.generateJwt({ id: account.id }),
                        };
                        return [2 /*return*/, res.jsonOk(meta)];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, res.jsonUnauthorized()];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return User;
}());
exports.default = new User();
