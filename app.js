import cron from 'node-cron';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import httpContext from 'express-http-context';
import marked from 'marked';
import dotenv from 'dotenv'; 
import { router } from './main/router/index.js';
import cookieParser from 'cookie-parser';
import { exeptionMiddleware } from './lib/exeption/index.js';

import { swaggerRouter, swaggerDocs } from './main/swagger/index.js';
import swaggerUi from 'swagger-ui-express';

// const cron = require('node-cron');
// const cors = require('cors');
// const express = require('express');
// const fs = require('fs');
// const httpContext = require('express-http-context');
// const marked = require('marked');

// const config = require('./config');S
// import config from './config.json';
// const logger = require('./services/logger')(module);

// const authRouter = require('./routes/auth.routes');
// const companiesRouter = require('./routes/companies.routes');
// const contactsRouter = require('./routes/contacts.routes');

dotenv.config();
const app = express()
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  .use(httpContext.middleware)
  .use((req, res, next) => {
    httpContext.ns.bindEmitter(req);
    httpContext.ns.bindEmitter(res);
    httpContext.set('method', req?.method);
    httpContext.set('url', req?.url);
    next();
  })
  .use(cors())
  .use(express.json())
  .use(cookieParser())
  .use(router)
  // ...

  .use(exeptionMiddleware); // последняя!
  
app.use(express.static(`./public`));

// app.use('/auth', authRouter);
// app.use('/companies', companiesRouter);
// app.use('/contacts', contactsRouter);

// app.get('/', (req, res) => {
//   const path = `${__dirname}/README.md`;
//   const file = fs.readFileSync(path, 'utf8');
//   const pageContent = marked(file.toString());

//   res.send(
//     `
//     <html>
//       <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1">
//         <link rel="stylesheet" href="github-markdown.css">
//       </head>
//       <body>
//         <article class="markdown-body">${pageContent}</article>
//       </body>
//     </html>
//     `,
//   );
// });

// cron.schedule('0 * * * *', () => {
//   fs.rm('./public/images/', { recursive: true, force: true }, (err) => {
//     if (err) logger(err);
//   });
// });

async function start() {
  try {
    app.listen(process.env.PORT, () => {
      // logger.info(`App has been started on port ${config.port}...`);
    });
  } catch (error) {
    // logger.error(error.message);
    process.exit(1);
  }
}

start();

// module.exports = app;
