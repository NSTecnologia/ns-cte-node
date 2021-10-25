const nsAPI = require('../commons/nsAPI')

const url = "https://cte.ns.eti.br/cte/stats/300"

class Body {
    constructor(licencaCnpj, chNFe, tpAmb, versao) {
        this.licencaCnpj = licencaCnpj;
        this.chNFe = chNFe;
        this.tpAmb = tpAmb;
        this.versao = versao;
    }
}

class Response {
    constructor({ status, motivo, retConsSitCTe, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.retConsSitCTe = retConsSitCTe;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo) {

    try {

        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo))
        return responseAPI

    }

    catch (error) {
        gravarLinhaLog("[ERRO_CONSULTA_SITUACAO]: " + error)
    }

}

module.exports = { Body, sendPostRequest }