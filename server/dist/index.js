"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = __importDefault(require("socket.io"));
const httpServer = http_1.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Brandon sucks dicks. multiple dicks!');
}).listen(3000, '0.0.0.0');
const ioServer = socket_io_1.default.listen(httpServer);
console.log("Server started");
ioServer.on('connection', () => {
    console.log('user connected');
});
process.stdin.setEncoding('utf8');
let stdin = process.openStdin();
stdin.addListener('data', (input) => {
    ioServer.emit('message', input.trim());
});
