require('dotenv/config');
import express from "express";
import xlsx from 'xlsx';
const workbook = xlsx.readFile('teste.xlsx');
const sheet_name_list = workbook.SheetNames;
console.log(sheet_name_list);
console.log(xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]));



return
const PORT = process.env.APP_PORT;

const app = express();


app.use(express.json());

app.get("/", (req, res) => {
  console.log('tet')
  res.json({pk:true});
});

app.listen(PORT);
