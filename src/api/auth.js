import httpClient from './httpClient';

export const login = async ({ userId, password }) => {
  const res = await httpClient.post(
    `/login?username=${userId}&password=${password}`
  );
  return res.status;
};

export const register = async (data) => {
  const res = await httpClient.post('/join', data);
  return res.status;
};
