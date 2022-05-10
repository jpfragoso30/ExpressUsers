const express = require('express');
const cors = require('cors');

const database = require('./database');
const router = require('./routes/userRouter');

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

database.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api', router);

app.listen(port, () => console.log(`Server running on port ${port}`));
