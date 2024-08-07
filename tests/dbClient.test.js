import { expect } from 'chai';
import dbClient from '../utils/db';

describe('DB Client', () => {
  it('should connect to MongoDB', async () => {
    const isConnected = await dbClient.isAlive();
    expect(isConnected).to.be.true;
  });

  it('should return the number of users', async () => {
    const nbUsers = await dbClient.nbUsers();
    expect(nbUsers).to.be.a('number');
  });

  it('should return the number of files', async () => {
    const nbFiles = await dbClient.nbFiles();
    expect(nbFiles).to.be.a('number');
  });
});
