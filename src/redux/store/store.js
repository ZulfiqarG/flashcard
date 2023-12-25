import {  applyMiddleware,createStore } from "redux";
import rootReducers from "../reducers"
import thunk from 'redux-thunk'

const store = createStore(rootReducers, {}, applyMiddleware(thunk))  //A store is a state container which holds the application's state.
export default store;