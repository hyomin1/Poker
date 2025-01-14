import httpClient from './httpClient';

export const getHud = async (userId) => {
  const res = await httpClient.get(`/api/hud/${userId}`);
  return res.data;
};
