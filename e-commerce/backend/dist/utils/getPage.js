"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPage = exports.getPagination = void 0;
var isValidQuery = function isValidQuery(value) {
  return typeof value === 'string' && isFinite(parseInt(value));
};
var getPagination = function getPagination(page, offset) {
  var itemsForPage = Number(offset);
  var selectedPage = Number(page);
  var from = Number(selectedPage) * itemsForPage - itemsForPage;
  var to = Number(selectedPage) * itemsForPage;
  return {
    itemsForPage,
    from,
    to
  };
};
exports.getPagination = getPagination;
var getPage = function getPage(page, offset, products) {
  var _getPagination = getPagination(page, offset),
    itemsForPage = _getPagination.itemsForPage,
    from = _getPagination.from,
    to = _getPagination.to;
  if (isValidQuery(page) && isValidQuery(offset)) {
    var TOTAL_PAGES = Math.ceil(products.length / itemsForPage);
    return {
      products: products.slice(from, to),
      pages: TOTAL_PAGES
    };
  }
  return {
    products
  };
};
exports.getPage = getPage;