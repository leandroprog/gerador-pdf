// /import { ZipOperator } from "rxjs/internal/observable/zip";

import zipper from 'zip-local';

class Zip {
  // eslint-disable-next-line class-methods-use-this
  create() {
    zipper.sync.zip('./temp/pdfs/teste/').compress().save('./temp/zips/pack.zip');
  }
}
export default new Zip();
