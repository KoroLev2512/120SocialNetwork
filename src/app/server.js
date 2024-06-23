const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

app.post('/api/post/add', async (req, res) => {
  try {
    const postProps = req.body;
    const response = await axios.post(`${process.env.API_PATH}/post/add`, postProps, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.json({ data: response.data, error: null });
  } catch (error) {
    res.json({ data: null, error: "Failed to add post." });
  }
});

app.post('/api/user/add_not_exist', async (req, res) => {
  try {
    const userProps = req.body;
    const response = await axios.post(`${process.env.API_PATH}/user/add_not_exist`, userProps, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.json({ data: response.data, error: null });
  } catch (error) {
    res.json({ data: null, error: "Failed to add new user." });
  }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });