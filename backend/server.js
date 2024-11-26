const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/auth');
const connectDB = require('./db');
const bodyParser = require('body-parser');


connectDB();
const app = express();
const port = process.env.PORT || 5000;


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/auth', authRoute);
app.use('/portfolio', require('./routes/portfolio'));

app.listen(port, () => { console.log(`Server is running at ${port}!`) });