import { REQUEST_API, SAVE_EMAIL } from '../actions';

const INITIAL_STATE = {
  login: '',
  email: '',
  token: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      token: action.token,
    };
  case SAVE_EMAIL:
    return {
      ...state,
      email: action.payload.email,
      login: action.payload.name,
    };
  default:
    return state;
  }
};

export default user;
