const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const { setupWebSocket } = require('./websocket/socket');
const documentRoutes = require('./routes/documentRoutes');
const { connectDB } = require('./config/db');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

setupWebSocket(wss);

app.use(cors());
app.use(bodyParser.json());
app.use('/api/documents', documentRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
