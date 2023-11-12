"use strict";

import express, { Request, Response } from "express";
import compression from "compression";  // compresses requests
import expressValidator from "express-validator";
import bodyParser from "body-parser";
import login from './api/login';

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.get('/public/hc', (req: Request, res: Response) => {
  res.send('OK');
});

app.use('/user', login);

app.listen(8080, () => {
    console.log("Press CTRL-C to stop\n");
});
