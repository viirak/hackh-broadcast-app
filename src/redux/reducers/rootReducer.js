import { combineReducers } from "redux"
import customizer from "./customizer/"
import auth from "./auth/"
import navbar from "./navbar/Index"
import sent from "./sent/index"

const rootReducer = combineReducers({
  customizer: customizer,
  auth: auth,
  navbar: navbar,
  sent: sent
})

export default rootReducer
