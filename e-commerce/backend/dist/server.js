"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _app = _interopRequireDefault(require("./app"));
require('dotenv').config(); // Carrega as variáveis de ambiente

// Importa a instância do App
var PORT = process.env.PORT || 3333; // Define a porta

// Iniciar o servidor
_app.default.listen(PORT, function () {
  console.log(`Servidor rodando na porta ${PORT}`);
});