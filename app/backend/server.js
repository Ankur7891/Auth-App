require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { signupUser, loginUser } = require('./worker');

const PORT = 8081;
const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', signupUser);
app.post('/login', loginUser);

app.listen(PORT, () =>
  console.log(`Server Running at http://localhost:${PORT}`)
);

