export const API_URL = 'https://1f104eb6.ngrok.io/api' || process.env.REACT_APP_API_URL;

export const endpoints = {
  auth: API_URL + '/auth',
  telegram: API_URL + '/telegram',
  messenger: API_URL + '/messenger',
}

export const s3Config = {
  bucketName: 'hackh-broadcast-files',
  dirName: 'poll-images',
  region: 'ap-southeast-1',
  accessKeyId: 'AKIA3CQ6Y7ZSEXKS5GXU',
  secretAccessKey: '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',
};
