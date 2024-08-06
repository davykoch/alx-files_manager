import express from 'express';
import routes from './routes/index';
import dbClient from './utils/db';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/', routes);

const startServer = async () => {
  // Wait for DB connection
  await dbClient.connect();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

startServer();
