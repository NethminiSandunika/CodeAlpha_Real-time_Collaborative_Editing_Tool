const fetchDocument = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/documents/${documentId}`);
      setContent(response.data.content);
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };
  