import { createServer } from 'http';
import SocketIO from 'socket.io';


const httpServer = createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Brandon sucks dicks. multiple dicks!');
}).listen(3000, '0.0.0.0');
const ioServer =  SocketIO.listen(httpServer);

console.log("Server started");



ioServer.on('connection', () => {
    console.log('user connected');
});

process.stdin.setEncoding('utf8');
let stdin = process.openStdin();
stdin.addListener('data', (input: string) => {
    ioServer.emit('message', input.trim());
});