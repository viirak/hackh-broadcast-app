import { combineReducers } from "redux"
import { login } from "./loginReducer"
import { user } from './customAuth';

const authReducers = combineReducers({
  login,
  user
})

export default authReducers
