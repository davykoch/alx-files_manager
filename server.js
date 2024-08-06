import express from 'express';
import routes from './routes/index';
import dbClient from './utils/db';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/', routes);

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

// Wait for DB connection before starting the server
const waitForDbConnection = () => {
  if (dbClient.isAlive()) {
    startServer();
  } else {
    console.log('Waiting for DB connection...');
    setTimeout(waitForDbConnection, 1000);
  }
};

waitForDbConnection();
