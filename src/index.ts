import { createServer } from 'http';
import 'dotenv/config';
import { program } from 'commander';

program.option('-p, --port <value>');

program.parse();
const options = program.opts();

const PORT = options.port || process.env.PORT || 3030;

const server = createServer((req, res) => {
  if (req.method !== 'GET') {
    res.statusCode = 405;
    res.statusMessage = 'Method not allowed today';
    res.write('Unsupported method');
    res.end();
  }

  const url = new URL(req.url as string, `http://${req.headers.host}`);

  const paramA = url.searchParams.get('a');
  const paramB = url.searchParams.get('b');

  if (paramA && paramB) {
    res.setHeader('Content-type', 'text/html');
    res.write(`<h1>Calculator</h1>`);
    res.write(
      `<p>${Number(paramA)} + ${Number(paramB)} = ${
        Number(paramA) + Number(paramB)
      }</p>`
    );
    res.write(
      `<p>${Number(paramA)} + ${Number(paramB)} = ${
        Number(paramA) - Number(paramB)
      }</p>`
    );
    res.write(
      `<p>${Number(paramA)} + ${Number(paramB)} = ${
        Number(paramA) * Number(paramB)
      }</p>`
    );
    res.write(
      `<p>${Number(paramA)} + ${Number(paramB)} = ${
        Number(paramA) / Number(paramB)
      }</p>`
    );
    res.end();
  } else {
    res.statusCode = 400;
    res.statusMessage = 'Bad Request';
    res.write('Please provide both parameters a and b');
    res.end();
  }
});

server.listen(PORT);

server.on('error', (error) => {
  console.log(error.message);
});
