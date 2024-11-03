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
Object.defineProperty(exports, "__esModule", { value: true });
var jwt_1 = require("../utils/jwt");
var EXCLUDED_PATHS = [
    '/product',
    '/products/:filter',
    '/refresh',
    '/user/sign-in',
    '/user/sign-up',
];
var checkJwt = function (req, res, next) {
    var path = req.url;
    var isExcluded = !!EXCLUDED_PATHS.find(function (p) { return path.includes(p); });
    if (isExcluded)
        return next();
    var token = jwt_1.default.getTokenFromHeaders(req.headers);
    if (!token)
        return res.jsonUnauthorized();
    try {
        var decoded = jwt_1.default.verifyJwt(token);
        res.locals = __assign(__assign({}, res.locals), { session: decoded.id });
        next();
    }
    catch (err) {
        res.jsonUnauthorized();
    }
};
exports.default = checkJwt;
