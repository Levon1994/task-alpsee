import { combineReducers } from 'redux';
import {
  DARK_MODE,
} from 'configs/types';

const darkMode = (state = false, action) => {
    switch (action.type) {
        case DARK_MODE:
            return action.payload;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
  darkMode,
});

export default rootReducer;
