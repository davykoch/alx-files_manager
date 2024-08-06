import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    // Get the users collection
    const usersCollection = dbClient.db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Already exist' });
    }

    // Hash password
    const hashedPassword = sha1(password);

    // Create new user
    const result = await usersCollection.insertOne({ email, password: hashedPassword });

    // Return new user
    return res.status(201).json({
      id: result.insertedId,
      email,
    });
  }
}

export default UsersController;
