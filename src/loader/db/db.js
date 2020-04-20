/* eslint-disable */
import { database, storage } from 'firebase/app';
import moment from 'moment';

import S3 from 'react-aws-s3';
import { s3Config } from '../../redux/config';

export const fetchPollStatistics = async (id) => {
  const path = `statistics/${id}`;
  const databaseRef = database().ref(path).limitToLast(200);
  return new Promise((resolve, reject) => {
    try {
      databaseRef.on('value', (snapshot) => {
        const data = snapshot.val() || {};
        const messages = [];
        snapshot.forEach((child) => {
          messages.push(child.val());
        });
        return resolve(messages.reverse());
      })
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchTelegramMessages = async (provider = 'telegram') => {
  const databaseRef = database().ref(provider).limitToLast(200);
  return new Promise((resolve, reject) => {
    try {
      databaseRef.on('value', (snapshot) => {
        const data = snapshot.val() || {};
        const messages = [];
        snapshot.forEach((child) => {
          messages.push(child.val());
        });
        // it should trigger every time there are some changes happening
        return resolve(messages.reverse());
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchMessengerMessages = async (provider = 'messenger') => {
  const databaseRef = database().ref(provider).limitToLast(200);
  return new Promise((resolve, reject) => {
    try {
      databaseRef.on('value', (snapshot) => {
        const data = snapshot.val() || {};
        const messages = [];
        snapshot.forEach((child) => {
          messages.push(child.val());
        });
        // it should trigger every time there are some changes happening
        return resolve(messages.reverse());
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const postMessage = async ({ text, method, question, options, imageUrl }, provider) => {
  const databaseRef = database().ref(provider);
  let obj = { date: moment().format() };
  if(method) {
    obj.question = question;
    obj.options = options;
    obj.method = method;

    if(imageUrl) obj.imageUrl = imageUrl;
  }

  else obj.message = text;

  const result = await databaseRef.push(obj).then((snap) => snap.key);
  return result;
};

export const uploadImage = async reference => {
  const ReactS3Client = new S3(s3Config);
  return await ReactS3Client
      .uploadFile(reference, new Date().getTime())
      .then(data => data.location)
      .catch(err => console.log('error upload', err));
 };
