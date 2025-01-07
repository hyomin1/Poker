import httpClient from './httpClient';

export const login = async ({ userId, password }) => {
  const res = await httpClient.post(
    `/login?username=${userId}&password=${password}`
  );
  const subId = res.headers['subscribe-id'];
  return { status: res.status, subId, userId, password };
};

export const register = async (data) => {
  const res = await httpClient.post('/join', data);
  return res.status;
};
