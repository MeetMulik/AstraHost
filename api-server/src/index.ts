import express from 'express';

const app = express();
const port = 9000;

app.get('/', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
