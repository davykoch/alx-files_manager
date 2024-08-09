import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.db = null;
    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db();
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB:', err);
    }
  }

  isAlive() {
    return !!this.client && !!this.db;
  }

  async nbUsers() {
    if (!this.db) await this.connect();
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    if (!this.db) await this.connect();
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();

export default dbClient;
