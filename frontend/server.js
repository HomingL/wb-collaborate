/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('frontend_server.key'),
  cert: fs.readFileSync('frontend_server.cert')
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
    
  }).listen(3000, err => {
    if (err) throw err;
    console.log('> Ready on https://localhost:3000');
  });
});