import { REQUEST_API } from '../actions';

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
  default:
    return state;
  }
};

export default user;
