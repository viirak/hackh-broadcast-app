import { CUSTOM_AUTH } from '../../reducers/auth/customAuth';
import Cookie from 'js-cookie';
import { auth } from 'firebase/app';

export const setUser = obj => async dispatch => {
  dispatch({ type: CUSTOM_AUTH.SAVE_USER, payload: obj })
}

export const logout = () => async dispatch => {
  return Promise.all([
    Cookie.remove('loginToken'),
    dispatch({ type: CUSTOM_AUTH.SAVE_USER, payload: null })
  ]);
}

export const login = token => async dispatch => {
  return new Promise(async (resolve, reject) => {
    try {
      Cookie.set('loginToken', token);
      await auth().signInWithCustomToken(token);
      const userRes = await auth().currentUser.getIdTokenResult();
      dispatch(setUser(userRes));
      
      resolve('Logged in');
    } catch (err) { reject(err) };
  });
}
