const nsAPI = require('../commons/nsAPI')
const downloadEvento = require('./downloadEvento')
const util = require('../commons/util')

const url = "https://cte.ns.eti.br/cte/compentrega"

class body {
    constructor(chCTe, tpAmb, dhEvento, nProt, dhEntrega, nSeqEvento, dhEentrega, nDoc, xNome, latitude, longitude, hashEntrega, dhHashEntrega, chavesEntregues) {
        this.chCTe = chCTe;
        this.tpAmb = tpAmb;
        this.dhEvento = dhEvento;
        this.nProt = nProt;
        this.dhEntrega = dhEntrega;
        this.nSeqEvento = nSeqEvento;
        this.dhEentrega = dhEentrega;
        this.nDoc = nDoc;
        this.xNome = xNome;
        this.latitude = latitude;
        this.longitude = longitude;
        this.hashEntrega = hashEntrega;
        this.dhHashEntrega = dhHashEntrega;
        this.chavesEntregues = chavesEntregues;
    }
}

class response {
    constructor({ status, motivo, retEvento, xml, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.retEvento = retEvento;
        this.xml = xml;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo, tpDown, caminhoSalvar) {

    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))

    if (responseAPI.status == 200) {

        if (responseAPI.retEvento.cStat == 135) {

            let downloadEventoBody = new downloadEvento.body(
                responseAPI.retEvento.chCTe,
                conteudo.tpAmb,
                tpDown,
                "COMPENTREGA",
                "1"
            )

            let downloadEventoResponse = await downloadEvento.sendPostRequest(downloadEventoBody, caminhoSalvar)

            return downloadEventoResponse
        }
    }

    return responseAPI
}

module.exports = { body, sendPostRequest }