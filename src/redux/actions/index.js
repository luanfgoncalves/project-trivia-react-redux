export const REQUEST_API = 'REQUEST_API';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const DISABLE_SWITCH = 'DISABLE_SWITCH';

export const requestAPI = () => async (dispatch) => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => dispatch({ type: REQUEST_API,
      token: data.token,
    }))
    .catch((erro) => console.log(erro));
};

export const REQUEST_LOADING = 'REQUEST_LOADING';

export const requestAwaiting = () => (dispatch) => {
  dispatch({ type: REQUEST_LOADING,
    isLoading: true });
};

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});

export const disableSwitch = () => (dispatch) => {
  dispatch({ type: DISABLE_SWITCH,
    disabled: true });
};
