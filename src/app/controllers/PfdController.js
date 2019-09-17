
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import excelService from '../services/excel';
import htmlService from '../services/html';
import pdfService from '../services/pdf';
import zipService from '../services/zip';

class PdfController {
  // eslint-disable-next-line class-methods-use-this
  async init(req, res) {
    const fileLocation = req.file.path;
    const entidadeId = req.body.entidade;
    const entidades = ['1', '2', '3', '4'];
    console.log(entidades.indexOf(entidadeId));
    if (entidades.indexOf(entidadeId) === -1 || !req.file) {
      return res.status(500).json({ error: 'Parâmetros inválidos' });
    }


    const fileXlsx = excelService.processExcel(fileLocation);

    console.log(req.body);

    // eslint-disable-next-line prefer-const
    let html = htmlService.getHtml(entidadeId);
    const options = { format: 'Letter' };

    console.log(html);

    // fileXlsx.forEach((item) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of fileXlsx) {
      let newHtml = html;

      newHtml = newHtml.replace('@artigo@', (item.SEXO === 'Feminino') ? 'a' : 'o')
        .replace(/@nomeAssociado@/g, item.NOME)
        .replace(/@cpfAssociado@/g, item.CPF)
        .replace(/@dataInclusao@/g, format(
          item['DATA ASSINATURA'],
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          },
        ));


      // eslint-disable-next-line no-await-in-loop
      await pdfService.create(newHtml, item.NOME, options);
      // return res.json({ ok: true });
    }

    console.log('terminoou');

    const zip = zipService.create();


    res.contentType('application/zip');
    res.setHeader('content-disposition', 'attachment; filename=teste.zip');
    // res.att;
    res.contentType('zip');
    return res.send(zip);

    // return res.json({ ok: true });
  }
}

export default new PdfController();
