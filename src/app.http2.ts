import http from 'http';
import http2 from 'http2';
import fs from 'fs';

const server = http2.createSecureServer({
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt')
},(req, res) => {
  console.log(req.url);

  //Server Side Rendering
  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.write(`<h1>${req.url} accessed</h1>`);
  // res.end();

  // const data = { name: 'Emir', age: 22, city: 'Colima' };
  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.end(JSON.stringify(data));

  const htmlFile = fs.readFileSync('./public/index.html');

  if (req.url == '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlFile);
    return;
  } 

  if (req.url?.endsWith('.js')) {
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
  } else if (req.url?.endsWith('.css')) {
    res.writeHead(200, { 'Content-Type': 'text/css' });
  }

  try {
    const resContent = fs.readFileSync(`./public${req.url}`, 'utf-8');
    res.end(resContent);
  } catch (error) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end();
  }

});

server.listen(8081);

