import { DISABLE_SWITCH } from '../actions';

const INITIAL_STATE = {
  disabled: false,
};

const timerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case DISABLE_SWITCH:
    return {
      ...state,
      disabled: true,
    };
  default:
    return state;
  }
};

export default timerReducer;
