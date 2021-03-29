/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

console.log(process.env.NEXT_PUBLIC_SSL_KEY);
const httpsOptions = {
  key: fs.readFileSync(process.env.NEXT_PUBLIC_SSL_KEY),
  cert: fs.readFileSync(process.env.NEXT_PUBLIC_SSL_CERT)
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