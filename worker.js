import Queue from 'bull';
import { ObjectId } from 'mongodb';
import imageThumbnail from 'image-thumbnail';
import fs from 'fs';
import dbClient from './utils/db';

const fileQueue = new Queue('fileQueue');
const userQueue = new Queue('userQueue');

const generateThumbnail = async (path, options) => {
  try {
    const thumbnail = await imageThumbnail(path, options);
    const thumbnailPath = `${path}_${options.width}`;
    await fs.promises.writeFile(thumbnailPath, thumbnail);
  } catch (error) {
    console.error(`Error generating thumbnail: ${error}`);
  }
};

fileQueue.process(async (job) => {
  const { fileId, userId } = job.data;

  if (!fileId) {
    throw new Error('Missing fileId');
  }

  if (!userId) {
    throw new Error('Missing userId');
  }

  const file = await dbClient.db.collection('files').findOne({
    _id: ObjectId(fileId),
    userId: ObjectId(userId),
  });

  if (!file) {
    throw new Error('File not found');
  }

  const sizes = [500, 250, 100];
  const thumbnailPromises = sizes.map((size) =>
    generateThumbnail(file.localPath, { width: size })
  );

  await Promise.all(thumbnailPromises);
});

userQueue.process(async (job) => {
  const { userId } = job.data;

  if (!userId) {
    throw new Error('Missing userId');
  }

  const user = await dbClient.db.collection('users').findOne({ _id: ObjectId(userId) });

  if (!user) {
    throw new Error('User not found');
  }

  console.log(`Welcome ${user.email}!`);
});

export default fileQueue;
