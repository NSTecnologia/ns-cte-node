const nsAPI = require('../commons/nsAPI')
const util = require('../commons/util')

const url = "https://cte.ns.eti.br/cte/download/inut"

class body {
    constructor(chave, tpAmb) {
        this.chave = chave;
        this.tpAmb = tpAmb;
    }
}

class response {
    constructor({ status, motivo, retInut, erro }) {
        this.status = status;
        this.motivo = motivo;
        this.retInut = retInut;
        this.erro = erro
    }
}

async function sendPostRequest(conteudo, caminhoSalvar) {

    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))
    
    setTimeout(() => {}, 200);

    if (responseAPI.retInut.xml != null) {
        util.salvarArquivo(caminhoSalvar, responseAPI.retInut.chave, "-procInut.xml", responseAPI.retInut.xml)
    }

    return responseAPI
}

module.exports = { body, sendPostRequest }
