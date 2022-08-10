import { REQUEST_API, REQUEST_LOADING, SAVE_EMAIL, SCORE_POINTS } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
  token: '',
  jokes: [],
  code: 0,
  isLoading: false,
};

const user = (state = INITIAL_STATE, action) => {
  console.log(action, state)
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      token: action.token,
    };
  case REQUEST_LOADING:
    return {
      ...state,
      isLoading: true,
    };
  case SAVE_EMAIL:
    return {
      ...state,
      player: {
        ...state,
        gravatarEmail: action.payload.email,
        name: action.payload.name,
      },
    };
  case SCORE_POINTS:
    return {
      ...state,
      player: {
        ...state,
        assertions: action.payload.assertions,
        score: action.payload.score,
      },
    };
  default:
    return state;
  }
};

export default user;
