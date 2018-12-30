import { createServer } from 'http';
import SocketIO, { Socket } from 'socket.io';
import { MongoClient, MongoError } from 'mongodb';


const httpServer = createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Brandon sucks dicks. multiple dicks!');
}).listen(3000, '0.0.0.0');

const ioServer =  SocketIO.listen(httpServer);
const dbUrl = 'mongodb://localhost:27017/';

console.log("Server started");

MongoClient.connect(dbUrl, (err: MongoError, client: MongoClient) => {
    if (err) {
        throw err;
    } else {
        client.db('chatapp');
    }
});


ioServer.on('connection', (socket: Socket) => {
    console.log('user connected');
});

process.stdin.setEncoding('utf8');
let stdin = process.openStdin();
stdin.addListener('data', (input: string) => {
    ioServer.emit('message', input.trim());
});