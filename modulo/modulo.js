/**********************************************************************************************
 * Objetivo: criar um Back-End para no futuro integrar em uma API que terá como 
 * objetivo trazer Trazer contatos e conversas vindo de um número de celular.
 * Autor: Daniela Lino
 * Data: 17/03/2023
 * Versão: 1.0
 **********************************************************************************************/
var whats = require('./contatos.js')
const arrayContacts = whats.contatos['whats-users']

const getContatos = function (filtro) {
    const userNumber = filtro;
    const newContatos = []
    const newContatosJson = arrayContacts.slice()
    let status;

    newContatosJson.forEach(userPlace => {


        if (newContatosJson !== undefined) {

            if (userNumber == userPlace.number) {

                userPlace.contacts.forEach(dadosContacts => {
                    

                    const contatosObject = {}
                    const mensagens = []

                    contatosObject.name = dadosContacts.name
                    contatosObject.description = dadosContacts.description
                    contatosObject.image = dadosContacts.image
                    const mensagensObject = {}

                    dadosContacts.messages.forEach(dadosMessages => {

                        mensagensObject.sender = dadosMessages.sender
                        mensagensObject.content = dadosMessages.content
                        mensagensObject.time = dadosMessages.time

                        mensagens.push(mensagensObject)
                    });

                    contatosObject.messages = mensagens
                    newContatos.push(contatosObject)

                });


                status = true
            } else {
                return false;
            }
        } else {
            return false
        }
    });
    if (status) {
        return newContatos;
    } else {
        return false;
    }

}
module.exports = {
    getContatos
}