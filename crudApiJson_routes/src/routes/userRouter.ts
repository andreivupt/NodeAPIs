const express = require("express");
//Importar o pacote File System para manipular arquivos
const fs = require('fs');
//Importar banco de dados de extensão .json
const data: string = './database.json';

const router = express.Router();

//Listar usuarios
router.get('/users', (req: any, res: any) => {
    const jsonData = fs.readFileSync(data);
    //analisa string JSON e transforma em um objeto JavaScript
    res.send(JSON.parse(jsonData));
});

//Cadastrar usuarios
router.post('/users', (req: any, res: any) => {
    const jsonDataBase = fs.readFileSync(data);
    let content = JSON.parse(jsonDataBase);

    //verifica a quantidade de objetos na base de dados
    let index: number = Object.keys(content).length;
    
    content[index++] = req.body;

    const values = JSON.stringify(content);

    fs.writeFileSync(data, values);

    res.status(201).send("User registered succesfully");
});

//Atualizar usuario
router.put('/user/:id', (req: any, res: any) => {
    //atribui a base de dados em nova variavel
    const jsonDataBase = fs.readFileSync(data);

    const userId = req.params.id;

    let content = JSON.parse(jsonDataBase);

    content[userId] = req.body;

    const values = JSON.stringify(content);
    
    //lê o arquivo da base de dados e adiciona o novo objeto
    fs.writeFileSync(data, values);

    res.send(`User with id ${userId} has been updated`)
});

//Deletar usuario
router.delete('/user/:id', (req: any, res: any) => {
    //atribui a base de dados em nova variavel
    const jsonDataBase = fs.readFileSync(data);

    //recupera o id enviado por parametro
    const userId = req.params.id;

    //analisa string JSON e transforma em um objeto JavaScript
    let content = JSON.parse(jsonDataBase);

    //delete
    delete content[userId];

    //analisa um objeto em JavaScript e transforma em uma string JSON
    const values = JSON.stringify(content);

    //lê o arquivo da base de dados e adiciona o novo objeto
    fs.writeFileSync(data, values);

    //retorno amigável para o usuário que o endpoint
    res.send(`User with id ${userId} has been deleted`);
});

export default router;