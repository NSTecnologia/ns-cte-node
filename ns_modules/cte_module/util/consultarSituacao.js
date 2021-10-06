const nsAPI = require('../commons/nsAPI')

const url = "https://cte.ns.eti.br/cte/stats/300"

class body {
    constructor(licencaCnpj, chNFe, tpAmb, versao) {
        this.licencaCnpj = licencaCnpj;
        this.chNFe = chNFe;
        this.tpAmb = tpAmb;
        this.versao = versao;
    }
}

class response {
    constructor({ status, motivo, retConsSitCTe, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.retConsSitCTe = retConsSitCTe;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo) {
    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))
    return responseAPI
}

module.exports = { body, sendPostRequest }