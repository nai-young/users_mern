const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const app = express()
const cors = require('cors')
const http = require('http').Server(app)

//app.use(express.static(path.join(__dirname, '../client/build')))
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
// Handle React routing, return all requests to React app
  /* app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  }); */
}

// require json clients
const filePath = path.join(__dirname, 'clients_db.json');
const clients = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

require('dotenv').config()

app.use(cors())
// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Origin",
    "http://clientscrud.herokuapp.com"
  );
  next();
});

// connection to database
const mongouri = process.env.MONGODB_URL
mongoose.connect(mongouri, { 
  useNewUrlParser: true, 
  useCreateIndex: true, 
  useUnifiedTopology: true 
}).then(() => console.log('Connected to datbase'))
  
const connection = mongoose.connection
const Client = require('./models/client.model')

connection.once('open', () => {
  Client.collection.deleteMany({})
  Client.collection.insertMany(clients)
})

// connecting routes
const clientsRouter = require('./routes/clients')
app.use('/clients', clientsRouter)

// connection to server
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
