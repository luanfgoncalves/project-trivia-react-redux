import { REQUEST_API, REQUEST_LOADING, SAVE_EMAIL } from '../actions';

const INITIAL_STATE = {
  login: '',
  email: '',
  token: '',
  jokes: [],
  code: 0,
  isLoading: false,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      token: action.token,
    };

  // case REQUEST_JOKES:
  //   return {
  //     ...state,
  //     jokes: action.jokes,
  //     code: action.code,
  //     isLoading: action.isLoading,
  //   };
  case REQUEST_LOADING:
    return {
      ...state,
      isLoading: true,
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
