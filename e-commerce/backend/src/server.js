"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config(); // Carrega as variáveis de ambiente
var app_1 = require("./app"); // Importa a instância do App
var PORT = process.env.PORT || 3333; // Define a porta
// Iniciar o servidor
app_1.default.listen(PORT, function () {
    console.log("Servidor rodando na porta ".concat(PORT));
});
