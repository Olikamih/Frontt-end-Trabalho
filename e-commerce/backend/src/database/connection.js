"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var knex_1 = require("knex");
var path = require("path");
var db = (0, knex_1.default)({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
});
exports.default = db;
