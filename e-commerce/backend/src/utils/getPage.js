"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPage = exports.getPagination = void 0;
var isValidQuery = function (value) {
    return typeof value === 'string' && isFinite(parseInt(value));
};
var getPagination = function (page, offset) {
    var itemsForPage = Number(offset);
    var selectedPage = Number(page);
    var from = Number(selectedPage) * itemsForPage - itemsForPage;
    var to = Number(selectedPage) * itemsForPage;
    return {
        itemsForPage: itemsForPage,
        from: from,
        to: to,
    };
};
exports.getPagination = getPagination;
var getPage = function (page, offset, products) {
    var _a = (0, exports.getPagination)(page, offset), itemsForPage = _a.itemsForPage, from = _a.from, to = _a.to;
    if (isValidQuery(page) && isValidQuery(offset)) {
        var TOTAL_PAGES = Math.ceil(products.length / itemsForPage);
        return {
            products: products.slice(from, to),
            pages: TOTAL_PAGES,
        };
    }
    return {
        products: products,
    };
};
exports.getPage = getPage;
