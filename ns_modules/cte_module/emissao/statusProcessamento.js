const nsAPI = require('../commons/nsAPI')
const url = "https://cte.ns.eti.br/cte/issueStatus/300"

class body {
    constructor(CNPJ, nsNRec, tpAmb) {
        this.CNPJ = CNPJ;
        this.nsNRec = nsNRec;
        this.tpAmb = tpAmb
    }
}

class response {
    constructor({ status, motivo, chCTe, cStat, xMotivo, xml, nProt, dhRecbto, erro }) {
        this.status = status;
        this.motivo = motivo;
        this.chCTe = chCTe;
        this.cStat = cStat;
        this.xMotivo = xMotivo;
        this.nProt = nProt;
        this.xml = xml;
        this.dhRecbto = dhRecbto;
        this.erro = erro
    }
}

async function sendPostRequest(body) {
    let responseAPI = new response(await nsAPI.PostRequest(url, body))
    return responseAPI
}

module.exports = { body, sendPostRequest }