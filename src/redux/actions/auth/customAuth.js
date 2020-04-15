import { CUSTOM_AUTH } from '../../reducers/auth/customAuth';

export const setUser = obj => async dispatch => {
  dispatch({ type: CUSTOM_AUTH.SAVE_USER, payload: obj })
}
