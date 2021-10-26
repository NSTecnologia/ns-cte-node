const nsAPI = require('../commons/nsAPI')
const downloadInut = require("./downloadInutilizacao")

const url = "https://cte.ns.eti.br/cte/inut"

class Body {
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

class Response {
    constructor({ status, motivo, retornoInutCTe, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.retornoInutCTe = retornoInutCTe;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo, tpDown, caminhoSalvar) {

    try {

        let responseAPI = new Response(await nsAPI.PostRequest(url, conteudo))

        let downloadInutBody = new downloadInut.Body(responseAPI.retornoInutCTe.chave, "2", tpDown)

        let downloadInutResponse = await downloadInut.sendPostRequest(downloadInutBody, caminhoSalvar)

        return downloadInutResponse

    }

    catch (error) {

        return error
    }


}

module.exports = { Body, sendPostRequest }
