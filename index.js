const server = require('./server.js');
const port = process.env.port || 8000;

server.listen(port, () => console.log(`${port} bottles of beer on the wall, ${port} bottles of beeeeer...`))