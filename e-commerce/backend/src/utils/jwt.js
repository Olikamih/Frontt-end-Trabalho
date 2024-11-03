"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var jsonwebtoken_1 = require("jsonwebtoken");
var tokenPrivateKey = String(process.env.JWT_TOKEN_PRIVATE_KEY);
var refreshTokenPrivateKey = String(process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY);
var UtilJwt = /** @class */ (function () {
    function UtilJwt() {
        this.options = { expiresIn: '30 minutes' };
        this.refreshOptions = { expiresIn: '120 minutes' };
    }
    UtilJwt.prototype.generateJwt = function (payload) {
        return jsonwebtoken_1.default.sign(payload, tokenPrivateKey, this.options);
    };
    UtilJwt.prototype.generateRefreshJwt = function (payload) {
        return jsonwebtoken_1.default.sign(payload, refreshTokenPrivateKey, this.refreshOptions);
    };
    UtilJwt.prototype.verifyJwt = function (token) {
        return jsonwebtoken_1.default.verify(token, tokenPrivateKey);
    };
    UtilJwt.prototype.verifyRefreshJwt = function (token) {
        return jsonwebtoken_1.default.verify(token, refreshTokenPrivateKey);
    };
    UtilJwt.prototype.getTokenFromHeaders = function (headers) {
        var token = headers['authorization'];
        return token ? token.slice(7, token.length) : null;
    };
    return UtilJwt;
}());
exports.default = new UtilJwt();
