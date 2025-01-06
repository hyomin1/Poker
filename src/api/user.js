import httpClient from './httpClient';

export const getUser = async () => {
  const res = await httpClient.get('/api/user/profile');
  return res.data;
};

export const getUserImage = async (userId) => {
  const res = await httpClient.get(`/api/user/image/${userId}`, {
    responseType: 'blob',
  });
  return res.data;
};

export const updateUserImage = async (formData) => {
  await httpClient.post('/api/user/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
