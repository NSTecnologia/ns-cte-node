const nsAPI = require('../commons/nsAPI')
const url = "https://cte.ns.eti.br/cte/issue"

class Response {
    constructor({ status, motivo, chCTe, nsNRec, erros}) {
        this.status = status;
        this.motivo = motivo;
        this.chCTe = chCTe;
        this.nsNRec = nsNRec;
        this.erros = erros;
    }
}

async function sendPostRequest(conteudo) {

    try {
        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo))
        return responseAPI
    }

    catch (error) {
        gravarLinhaLog("[ERRO_EMISSAO]: " + error)
        return error
    }
}

module.exports = { sendPostRequest }