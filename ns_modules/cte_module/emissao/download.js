const nsAPI = require('../commons/nsAPI')
var fs = require('fs');
const util = require("../commons/util")
'use strict';

const url = "https://cte.ns.eti.br/cte/get/300"

class body {
    constructor(chCTe, tpDown, tpAmb, CNPJ) {
        this.chCTe = chCTe;
        this.tpDown = tpDown;
        this.tpAmb = tpAmb;
        this.CNPJ = CNPJ;
    }
}

class response {
    constructor({ status, motivo, chCTe, xml, pdf, cteProc, erro }) {
        this.status = status;
        this.motivo = motivo;
        this.chCTe = chCTe;
        this.xml = xml;
        this.pdf = pdf;
        this.json = JSON.stringify(cteProc);
        this.erro = erro
    }
}

async function sendPostRequest(body, caminho) {

    let responseAPI = new response(await nsAPI.PostRequest(url, body))

    if (responseAPI.json != null) {
        util.salvarArquivo(caminho, responseAPI.chCTe, "-cteProc.json", responseAPI.json)
    }

    if (responseAPI.pdf != null) {
        let data = responseAPI.pdf;
        let buff = Buffer.from(data, 'base64');
        util.salvarArquivo(caminho, responseAPI.chCTe, "-cteProc.pdf", buff)
    }

    if (responseAPI.xml != null) {
        util.salvarArquivo(caminho, responseAPI.chCTe, "-cteProc.xml", responseAPI.xml)
    }

    return responseAPI
}

module.exports = { body, sendPostRequest }

