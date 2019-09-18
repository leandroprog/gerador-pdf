// /import { ZipOperator } from "rxjs/internal/observable/zip";

import zipper from 'zip-local';

class Zip {
  // eslint-disable-next-line class-methods-use-this
  create(pathPdf) {
    return zipper.sync.zip(`./temp/pdfs/${pathPdf}/`).memory();
  }
}
export default new Zip();
