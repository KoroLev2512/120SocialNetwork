require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/post/add', async (req, res) => {
    const postProps = req.body;
    try {
        const response = await axios.post(`${process.env.API_PATH}/post/add`, postProps);
        res.json({ data: response.data, error: null });
        console.log(postProps)
    } catch (error) {
        console.log(postProps)
        res.json({ data: null, error: error.message });
        console.log(error)
    }
});

app.post('/api/user/add_not_exist', async (req, res) => {
    const userProps = req.body;
    try {
        const response = await axios.post(`${process.env.API_PATH}/user/add_not_exist`, userProps);
        res.json({ data: response.data, error: null });
    } catch (error) {
        res.json({ data: null, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
