export const REQUEST_API = 'REQUEST_API';
export const SAVE_EMAIL = 'SAVE_EMAIL';

export const requestAPI = () => async (dispatch) => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => dispatch({ type: REQUEST_API,
      token: data.token,
    }))
    .catch((erro) => console.log(erro));
};

export const REQUEST_JOKES = 'REQUEST_JOKES';

// export const requestToken = (token) => async (dispatch) => {
//   const jokes = `https://opentdb.com/api.php?amount=5&token=${token}`;
//   try {
//     const response = await fetch(jokes);
//     const data = await response.json();
//     dispatch({ type: REQUEST_JOKES,
//       jokes:
//       data.results,
//       code: data.code,
//       isLoading: false,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const REQUEST_LOADING = 'REQUEST_LOADING';

export const requestAwaiting = () => (dispatch) => {
  dispatch({ type: REQUEST_LOADING,
    isLoading: true });
};

export const saveEmail = (payload) => ({
  type: SAVE_EMAIL,
  payload,
});
