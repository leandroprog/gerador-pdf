
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import fs from 'fs';

import excelService from '../services/excel';
import htmlService from '../services/html';
import pdfService from '../services/pdf';
import zipService from '../services/zip';
import entidadesConfig from '../../config/entidades';

class PdfController {
  // eslint-disable-next-line class-methods-use-this
  async init(req, res) {
    try {
      const fileLocation = req.file.path;
      const entidadeId = req.body.entidade;
      const entidades = ['1', '2', '3', '4'];

      if (entidades.indexOf(entidadeId) === -1 || !req.file) {
        return res.status(500).json({ error: 'Parâmetros inválidos' });
      }

      const entidade = entidadesConfig.entidades.find((item) => item.id == entidadeId);
      const pathPdf = `./temp/pdfs/${entidade.sigla}-${new Date().getTime()}/`;

      const fileXlsx = excelService.processExcel(fileLocation).filter((item) => !(!item.NOME || !item.CPF || !item['DATA ASSINATURA'] || !item.SEXO));

      fs.unlinkSync(fileLocation);
      console.log('passou 1');

      // eslint-disable-next-line prefer-const
      let html = htmlService.getHtml(entidade);
      const options = { format: 'Letter' };


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
        await pdfService.create(newHtml, item.NOME, item.CPF, pathPdf, options);
      }

      console.log('terminoou');

      const zip = zipService.create(pathPdf);


      res.contentType('application/zip');
      res.setHeader('content-disposition', 'attachment; filename=teste.zip');
      res.contentType('zip');
      return res.status(200).send(zip);

      // return res.json({ ok: true });
    } catch (error) {
      return res.status(500).json({ error: 'Não foi possível gerar os pdfs' });
    }
  }
}

export default new PdfController();
