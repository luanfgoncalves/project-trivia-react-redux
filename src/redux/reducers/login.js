import { REQUEST_API, REQUEST_LOADING, SAVE_EMAIL, SCORE_POINTS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  token: '',
  isLoading: false,
};

const player = (state = INITIAL_STATE, action) => {
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
      gravatarEmail: action.payload.email,
      name: action.payload.name,
    };
  case SCORE_POINTS:
    return {
      ...state,

      assertions: action.payload.assentionsA,
      score: action.payload.scoreA,

    };
  default:
    return state;
  }
};

export default player;
