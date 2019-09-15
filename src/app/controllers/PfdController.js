import xlsx from 'xlsx';
import fs from 'fs';
import pdf from 'html-pdf';
import zipper from 'zip-local';

class PdfController {
  init(req, res) {
    const fileLocation = req.file.path;
    const workbook = xlsx.readFile(fileLocation);
    const sheet_name_list = workbook.SheetNames;


    const fileXlsx = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    console.log(fileXlsx);

    const html = fs.readFileSync('./test/teste.html', 'utf8');
    const options = { format: 'Letter' };
    const pasta = new Date().getTime();

    console.log(html);

    fileXlsx.forEach((item) => {
      console.log(item);
      const newhtml = html.replace('@NOME', item.Nome);
      pdf.create(newhtml, options).toFile(`./temp/pdfs/teste/${item.Nome}-${pasta}.pdf`, (err, res) => {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
      });
    });

    zipper.sync.zip('./temp/pdfs/teste/').compress().save('./temp/zips/pack.zip');


    return res.json({ ok: true });
  }
}

export default new PdfController();
