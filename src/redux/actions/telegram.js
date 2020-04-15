import { POST } from 'fetchier';
import { endpoints } from '../config';
import Cookie from 'js-cookie';

export const sendMessage = props => async dispatch => {
  const token = Cookie.get('token');
  if(!token) return console.log('No token specified in header.');

  return POST({
    url: endpoints.telegram,
    body: { text: props },
    headers: {
      Authorization: `Bearer ${token}`
    },
  })
}
