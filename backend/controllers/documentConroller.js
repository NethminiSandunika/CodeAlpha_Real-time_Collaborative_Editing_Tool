// backend/controllers/documentController.js
const Document = require('../models/documentModel');

const getDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Document.findById(id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDocument = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const document = await Document.findById(id);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    document.content = content;
    document.version += 1;
    await document.save();
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDocument, updateDocument };
