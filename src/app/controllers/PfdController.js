
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import excelService from '../services/excel';
import htmlService from '../services/html';
import pdfService from '../services/pdf';
import zipService from '../services/zip';

class PdfController {
  // eslint-disable-next-line class-methods-use-this
  init(req, res) {
    const fileLocation = req.file.path;
    const fileXlsx = excelService.processExcel(fileLocation);

    console.log(fileXlsx);

    // eslint-disable-next-line prefer-const
    let html = htmlService.getHtml(3);
    const options = { format: 'Letter' };

    console.log(html);

    // fileXlsx.forEach((item) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of fileXlsx) {
      console.log(item);
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


      console.log('continua');

      pdfService.create(newHtml, item.NOME, options);
      // return res.json({ ok: true });
    }

    console.log('terminoou');

    // zipService.create();

    return res.json({ ok: true });
  }
}

export default new PdfController();
