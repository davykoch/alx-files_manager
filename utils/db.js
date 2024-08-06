import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.db = null;
  }

  async connect() {
    if (!this.db) {
      await this.client.connect();
      this.db = this.client.db();
      console.log('Connected to MongoDB');
    }
  }

  isAlive() {
    return !!this.client && !!this.db && this.client.isConnected();
  }

  async nbUsers() {
    if (!this.db) return 0;
    try {
      const usersCollection = this.db.collection('users');
      return await usersCollection.countDocuments();
    } catch (err) {
      console.error('Error counting users:', err);
      return 0;
    }
  }

  async nbFiles() {
    if (!this.db) return 0;
    try {
      const filesCollection = this.db.collection('files');
      return await filesCollection.countDocuments();
    } catch (err) {
      console.error('Error counting files:', err);
      return 0;
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
