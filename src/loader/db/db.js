/* eslint-disable */
import { database } from 'firebase/app';
import moment from 'moment';

export const fetchAllMessage = async () => {
  const databaseRef = database().ref('telegram').limitToLast(200);
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

export const postMessage = async (options) => {
  const databaseRef = database().ref('telegram');
  const result = await databaseRef.push({
    message: options.message,
    date: moment().format(),
  }).then((snap) => snap.key);
  return result;
};
