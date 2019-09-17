import xlsx from 'xlsx';

class Excel {
  processExcel(fileLocation) {
    this.workbook = xlsx.readFile(fileLocation, {
      type: 'binary', cellDates: true,
    });
    const sheetNameList = this.workbook.SheetNames;

    const fileXlsx = xlsx.utils.sheet_to_json(this.workbook.Sheets[sheetNameList[0]]);


    return fileXlsx;
  }
}

export default new Excel();
