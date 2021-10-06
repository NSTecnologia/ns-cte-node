const nsAPI = require('../commons/nsAPI')
const util = require('../commons/util')

const url = "https://cte.ns.eti.br/cte/get/event/300"

class body {
    constructor(chCTe, tpAmb, tpDown, tpEvento, nSeqEvento) {
        this.chCTe = chCTe;
        this.tpAmb = tpAmb;
        this.tpDown = tpDown;
        this.tpEvento = tpEvento;
        this.nSeqEvento = nSeqEvento;
    }
}

class response {
    constructor({ status, motivo, retEvento, erro, xml, pdf, json }) {
        this.status = status;
        this.motivo = motivo;
        this.retEvento = retEvento;
        this.erro = erro;
        this.xml = xml;
        this.pdf = pdf;
        this.json = JSON.stringify(json)
    }
}

async function sendPostRequest(conteudo, caminhoSalvar) {

    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))

    var idEvento = ""

    switch (conteudo.tpEvento) {

        case "CANC":
            idEvento = "110111"
            break

        case "CCE":
            idEvento = "110110"
            break

        case "COMPENTREGA":
            idEvento = "110180"
            break
            
        case "CANCCOMPENTREGA": 
            idEvento = "110181"
            break

    }

    if (responseAPI.json != null) {
        util.salvarArquivo(caminhoSalvar, idEvento + responseAPI.retEvento.chCTe + conteudo.nSeqEvento, "-procEven.json", responseAPI.json)
    }

    if (responseAPI.pdf != null) {
        let data = responseAPI.pdf;
        let buff = Buffer.from(data, 'base64');
        util.salvarArquivo(caminhoSalvar, idEvento + responseAPI.retEvento.chCTe + conteudo.nSeqEvento, "-procEven.pdf", buff)
    }

    if (responseAPI.xml != null) {
        util.salvarArquivo(caminhoSalvar, idEvento + responseAPI.retEvento.chCTe + conteudo.nSeqEvento, "-procEven.xml", responseAPI.xml)
    }

    return responseAPI
}

module.exports = { body, sendPostRequest }
