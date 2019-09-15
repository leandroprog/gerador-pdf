import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import PdfController from './app/controllers/PfdController';


const routes = new Router();
const upload = multer(multerConfig);

routes.post('/', upload.single('file'), PdfController.init);

export default routes;
