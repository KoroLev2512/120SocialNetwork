const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

app.post('/api/post/add', async (req, res) => {
  try {
    const postProps = req.body;
    const response = await axios.post('http://95.163.231.244:3000/api/post/add', postProps, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.json({ data: response.data, error: null });
  } catch (error) {
    res.json({ data: null, error: "Failed to add post." });
  }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });