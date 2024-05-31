// backend/websocket/socket.js
const Document = require('../models/documentModel');

const setupWebSocket = (wss) => {
  wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
      const { documentId, content } = JSON.parse(message);
      const document = await Document.findById(documentId);
      if (document) {
        document.content = content;
        document.version += 1;
        await document.save();

        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ documentId, content }));
          }
        });
      }
    });
  });
};

module.exports = { setupWebSocket };
