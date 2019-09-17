// /import { ZipOperator } from "rxjs/internal/observable/zip";

import zipper from 'zip-local';

class Zip {
  // eslint-disable-next-line class-methods-use-this
  create() {
    return zipper.sync.zip('./temp/pdfs/teste/').memory();
  }
}
export default new Zip();
