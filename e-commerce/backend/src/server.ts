require('dotenv').config(); // Carrega as variáveis de ambiente
import app from './app'; // Importa a instância do App
const PORT = process.env.PORT || 3333; // Define a porta

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});