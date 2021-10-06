const nsAPI = require('../commons/nsAPI')
const downloadInut = require("./downloadInutilizacao")

const url = "https://cte.ns.eti.br/cte/inut"

class body {
    constructor(cUF, tpAmb, ano, CNPJ, mod, serie, nCTIni, nCTFin, xJust) {
        this.cUF = cUF;
        this.tpAmb = tpAmb;
        this.ano = ano;
        this.CNPJ = CNPJ;
        this.mod = mod;
        this.serie = serie;
        this.nCTIni = nCTIni;
        this.nCTFin = nCTFin;
        this.xJust = xJust;
    }
}

class response {
    constructor({ status, motivo, retornoInutCTe, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.retornoInutCTe = retornoInutCTe;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo, caminhoSalvar) {

    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))

    let downloadInutBody = new downloadInut.body(responseAPI.retornoInutCTe.chave, "2")

    let downloadInutResponse = await downloadInut.sendPostRequest(downloadInutBody, caminhoSalvar)

    return downloadInutResponse
}

module.exports = { body, sendPostRequest }
