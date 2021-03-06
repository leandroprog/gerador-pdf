import pdf from 'html-pdf';

class Pdf {
  // eslint-disable-next-line class-methods-use-this
  create(html, nome, cpf, pathPdf, options) {
    return new Promise((resolve) => {
      pdf.create(html, options).toFile(`${pathPdf}${nome + new Date().getTime()}.pdf`, (err, res) => {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
        resolve();
      });
    });
  }
}

export default new Pdf();
