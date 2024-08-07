import { expect } from 'chai';
import redisClient from '../utils/redis';

describe('Redis Client', () => {
  it('should connect to Redis', async () => {
    const isConnected = await redisClient.isAlive();
    expect(isConnected).to.be.true;
  });

  it('should set and get a value', async () => {
    await redisClient.set('testKey', 'testValue', 10);
    const value = await redisClient.get('testKey');
    expect(value).to.equal('testValue');
  });

  it('should delete a value', async () => {
    await redisClient.set('testKey', 'testValue', 10);
    await redisClient.del('testKey');
    const value = await redisClient.get('testKey');
    expect(value).to.be.null;
  });
});
