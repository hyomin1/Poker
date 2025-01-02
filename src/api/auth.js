import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const login = async ({ userId, password }) => {
  const res = await httpClient.post(
    `/login?username=${userId}&password=${password}`
  );
  return res.status;
};

export const register = async (data) => {
  const res = await httpClient.post('/join', data);
  console.log(res.status);
  return res.status;
};
