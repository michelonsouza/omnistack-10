require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const { setupWebsocket } = require('./websocket');
const routes = require('./routes');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(express.json());
app.use(cors());

app.use(routes);

server.listen(3333, () => console.log(`Server is running at ${process.env.BASE_URL}`));
