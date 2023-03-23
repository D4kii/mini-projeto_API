/*********************************************************************************
 * Objetivo: Criar uma API para disponibilizar os contatos e suas respectivas mensagens
 * Autor: Daniela Lino
 * Data: 22/03/2023
 * Versão: 1.0
 *********************************************************************************/
//Import das Dependencias do projeto
const contacts = require('./modulo/modulo.js');

//Dependencia para criar as requisições da API
const express = require('express');

//Dependencia para gerenciar as permissões da API
const cors = require('cors');

//Dependencia para gerenciar o corpo das requisições da API
const bodyParser = require('body-parser');
const { request } = require('http');
const { response } = require('express');

//Objeto com as características do express
const app = express();

app.use((request, response, next) => {
    //API pública - fica disponível para utilização de qualquer aplicação
    //API privada - somente o IP informado poderá consumir dados da API

    //Define se a API será publica ou privada
    response.header('Access-Control-Allow-Origin', '*');

    //Permite definir quais métodos poderão ser utilizados nas requisições da API
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    //Envia para o cors() as regras de permissões
    app.use(cors());

    next();
})
//EndPoint: Lista os contatos e suas respectivas 
//mensagens usando o número do usuário como filtro
app.get('/v1/whatsapp/contatos/mensagens/celularUsuario/:numero', cors(), async function (request, response, next) {
    let statusCode;
    let contatosMensagens = {};

    //Recebe o número do celular do usuário que será enviada pela URL da requisição
    let numeroCelular = request.params.numero;
    console.log(numeroCelular);

    //Tratamento para validação de entrada de dados incorreta
    if (numeroCelular == '' || numeroCelular == undefined || isNaN(numeroCelular)) {
        response.status(400);
        contatosMensagens.message = 'Não foi possível processar pois os dados de entrada (número de celular) que foi enviado não corresponde ao exigido, confira o valor.';
    } else{
        let contatos = contacts.getContatos(numeroCelular);
        console.log('passei nela');
        if (contatos) {
            statusCode = 200;
            contatosMensagens = contatos;
        }else{
            statusCode = 404;
        }
    }
    //Retorna o código e o JSON
    response.status(statusCode);
    response.json(contatosMensagens);
});

//Roda o serviço da API para ficar guardando requisições
app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080')
})

