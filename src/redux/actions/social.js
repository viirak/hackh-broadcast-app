import { POST } from 'fetchier';
import { endpoints } from '../config';
import { postMessage, uploadImage, fetchMessages } from '../../loader/db/db';

export const sendMessage = (props, provider = 'telegram') => async (dispatch, getState) => {
  const { token } = getState().auth.user || {};
  if(!token) return console.log('No token specified in header.');

  let req = !props.method
    ? { text: props, provider, type: 'text'}
    : { ...props, provider, type: 'poll' };

  if(req.image && Object.keys(req.image).length) {
    req.imageUrl = await uploadImage(req.image);
    delete req.image;
  }

  const messageId = await postMessage(req);
  let url;
  switch (provider) {
    case 'messenger': url = endpoints.messenger; break;
    default: url = endpoints.telegram; break;
  }

  return POST({ url, body: { messageId }, headers: { Authorization: `Bearer ${token}`}});
}
