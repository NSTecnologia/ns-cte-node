const nsAPI = require('../commons/nsAPI')
const downloadEvento = require('./downloadEvento')

const url = "https://cte.ns.eti.br/cte/cce/300"

class body {
    constructor(chCTe, tpAmb, dhEvento, nSeqEvento, infCorrecao) {
        this.chCTe = chCTe;
        this.tpAmb = tpAmb;
        this.dhEvento = dhEvento;
        this.nSeqEvento = nSeqEvento;
        this.infCorrecao = infCorrecao;
    }
}

class response {
    constructor({ status, motivo, retEvento, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.retEvento = retEvento;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo, tpDown, caminhoSalvar) {

    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))

    let downloadEventoBody = new downloadEvento.body(
        responseAPI.retEvento.chCTe,
        conteudo.tpAmb,
        tpDown,
        "CCE",
        conteudo.nSeqEvento
    )

    let downloadEventoResponse = await downloadEvento.sendPostRequest(downloadEventoBody, caminhoSalvar)

    return downloadEventoResponse
}

module.exports = { body, sendPostRequest }
