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
var STATUS_CODE_OK = 200;
var STATUS_CODE_BAD_REQUEST = 400;
var STATUS_CODE_UNAUTHORIZED = 401;
var STATUS_CODE_NOT_FOUND = 404;
var STATUS_CODE_SERVER_ERROR = 500;
var HandleResponse = /** @class */ (function () {
    function HandleResponse() {
        this.response = this.response.bind(this);
    }
    HandleResponse.prototype.jsonOk = function (data) {
        if (data === void 0) { data = {}; }
        var status = STATUS_CODE_OK;
        this.status(status);
        return this.json(__assign(__assign({}, data), { status: status }));
    };
    ;
    HandleResponse.prototype.jsonBadRequest = function (data) {
        if (data === void 0) { data = {}; }
        var status = STATUS_CODE_BAD_REQUEST;
        this.status(status);
        return this.json(__assign(__assign({}, data), { status: status }));
    };
    ;
    HandleResponse.prototype.jsonUnauthorized = function (data) {
        if (data === void 0) { data = {}; }
        var status = STATUS_CODE_UNAUTHORIZED;
        this.status(status);
        return this.json(__assign(__assign({}, data), { status: status }));
    };
    ;
    HandleResponse.prototype.jsonNotFound = function (data) {
        if (data === void 0) { data = {}; }
        var status = STATUS_CODE_NOT_FOUND;
        this.status(status);
        return this.json(__assign(__assign({ message: 'request not found' }, data), { status: status }));
    };
    ;
    HandleResponse.prototype.jsonServerError = function (data) {
        if (data === void 0) { data = {}; }
        var status = STATUS_CODE_SERVER_ERROR;
        this.status(status);
        return this.json(__assign(__assign({}, data), { status: status }));
    };
    ;
    HandleResponse.prototype.response = function (_, res, next) {
        res.jsonOk = this.jsonOk;
        res.jsonBadRequest = this.jsonBadRequest;
        res.jsonUnauthorized = this.jsonUnauthorized;
        res.jsonNotFound = this.jsonNotFound;
        res.jsonServerError = this.jsonServerError;
        next();
    };
    ;
    return HandleResponse;
}());
exports.default = new HandleResponse().response;
