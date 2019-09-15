import app from './app';
//const PORT = process.env.APP_PORT;

app.listen(8180);

return true;

require('dotenv/config');
import express from "express";
import xlsx from 'xlsx';
import fs from 'fs';
import pdf from 'html-pdf';
import zipper from 'zip-local';
//import archiver from 'archiver'

// Ler xlsx
const workbook = xlsx.readFile('./test/teste.xlsx');
const sheet_name_list = workbook.SheetNames;


const fileXlsx = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

// Cria pdf

const html = fs.readFileSync('./test/teste.html', 'utf8');
const options = { format: 'Letter' };
const pasta = new Date().getTime();



// Zipa uma pasta
//zipper.sync.zip("./temp/pdfs/teste/").compress().save("./temp/zips/pack.zip");

return true;

fileXlsx.forEach( item => {
  console.log(item);
  const newhtml = html.replace("@NOME", item.Nome);
  pdf.create(newhtml, options).toFile(`./temp/pdfs/teste/${item.Nome}-${pasta}.pdf`, function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
})











return true;
const PORT = process.env.APP_PORT;

const app = express();


app.use(express.json());

app.get("/", (req, res) => {
  console.log('tet')
  res.json({pk:true});
});


