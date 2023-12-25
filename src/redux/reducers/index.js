
import { combineReducers } from "redux";
import handleCard from "./setCard";
import setId from './setLink'
import addRef from './setRef'
const rootReducers = combineReducers({  // by ussing the combineReducer  , we are combine the all recducers in this file
    card: handleCard,
    id: setId,
    cardRef: addRef
})

export default rootReducers;