export const REQUEST_API = 'REQUEST_API';

export const requestAPI = () => async (dispatch) => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => dispatch({ type: REQUEST_API, token: data.token }))
    .catch((erro) => console.log(erro));
};
