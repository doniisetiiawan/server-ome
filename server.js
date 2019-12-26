const connect = require('connect');

const app = connect();

const helloWorld = (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
};

app.use(helloWorld);

app.listen(3000);
console.log('Server running at http://localhost:3000/');
