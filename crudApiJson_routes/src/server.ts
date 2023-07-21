import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

import app from './app';

//Iniciar o servidor
app.listen(PORT, () => console.log('Rodando na porta ' + PORT));