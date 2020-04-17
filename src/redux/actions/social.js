import { POST } from 'fetchier';
import { endpoints } from '../config';
import Cookie from 'js-cookie';
import { postMessage } from '../../loader/db/db';

export const sendMessage = (props, provider = 'telegram') => async (dispatch, getState) => {
  const { token } = getState().auth.user || {};
  if(!token) return console.log('No token specified in header.');

  let req = !props.method
    ? { text: props }
    : { ...props };

  // if(req.image && Object.keys(req.image).length) {
    // upload image
  // }

  const messageId = await postMessage(req, provider);

  let url;
  switch (provider) {
    case 'messenger': url = endpoints.messenger; break;
    default: url = endpoints.telegram; break;
  }

  return POST({ url, body: { messageId }, headers: { Authorization: `Bearer ${token}`}});
}
