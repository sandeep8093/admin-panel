require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = process.env.PORT || 2030;

app.use(express.urlencoded({ extended: true }));
app.use(express.raw());
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log(`Mongodb connected with server: ${data.connection.host}`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use('/product', require('./routes/product'));
app.use('/auth', require('./routes/auth'));
app.listen(PORT, () => {
  console.log(`Server is working on port: ${PORT}`);
});
