import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static getStatus(req, res) {
    const status = {
      redis: redisClient.isAlive(),
      db: dbClient.isAlive()
    };
    res.status(200).json(status);
  }

  static async getStats(req, res) {
    try {
      const stats = {
        users: await dbClient.nbUsers(),
        files: await dbClient.nbFiles()
      };
      res.status(200).json(stats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default AppController;
