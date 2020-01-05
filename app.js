const express = require('express')
const app = express();

require('./database')
app.use(express.json())

require('./routes/books.routes')(app)
require('./config/server')(app)