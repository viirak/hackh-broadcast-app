import { POST } from 'fetchier';
import { endpoints } from '../config';
import Cookie from 'js-cookie';

export const sendMessage = props => async dispatch => {
  const token = Cookie.get('token');
  if(!token) return console.log('No token specified in header.');

  const body = !props.method
    ? { text: props }
    : { ...props };
    
  return POST({url: endpoints.telegram, body, headers: { Authorization: `Bearer ${token}`}});
}
