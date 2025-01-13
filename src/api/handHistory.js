import httpClient from './httpClient';

export const getHandHistory = async () => {
  const res = await httpClient.get('/api/handHistory');
  return res.data;
};
