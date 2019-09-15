import express from 'express';
import routes from './routes';

require('dotenv/config');


class App {
  constructor() {
    this.server = express();
    this.router();
  }

  router() {
    this.server.use(routes);
  }
}


export default new App().server;
