/* eslint-disable */
import { database } from 'firebase/app';
import moment from 'moment';

// "statistics/id"
export const fetchPollStatistics = async (provider='statistics') => {
  const databaseRef = database().ref(provider).limitToLast(200);
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

export const fetchAllMessage = async (provider = 'telegram') => {
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

export const postMessage = async ({ text, method, question, options }, provider) => {
  const databaseRef = database().ref(provider);
  let obj = { date: moment().format() };
  if(method) {
    obj.question = question;
    obj.options = options;
    obj.method = method;
  }
  else obj.message = text;

  const result = await databaseRef.push(obj).then((snap) => snap.key);
  return result;
};
