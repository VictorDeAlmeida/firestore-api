import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import routes from './routes/routes.module';

admin.initializeApp();

const app = express();
const main = express();

// routes
routes.forEach((route) => {
  app.use(route[0], route[1]);
});

main.use(cors());
main.use(bodyParser.urlencoded({ extended: true }));
main.use(
  bodyParser.json({
    reviver: (key, value) => {
      if (typeof value === 'string') {
        const valueDate = new Date(value).getTime();

        if (!isNaN(valueDate)) {
          return new Date(value);
        }
      }

      return value;
    },
  }),
);
main.use('/v1', app);

export const api = functions.https.onRequest(main);
