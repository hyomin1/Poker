import httpClient from './httpClient';

const defaultImg = '/images/defaultProfile.png';

export const getUser = async () => {
  const res = await httpClient.get('/api/user/profile');
  return res.data;
};

export const getUserImage = async (userId) => {
  const res = await httpClient.get(`/api/user/image/${userId}`, {
    responseType: 'blob',
  });
  const { data } = res;
  if (data && data.size > 0) {
    return URL.createObjectURL(data);
  }
  return defaultImg;
};

export const updateUserImage = async (formData) => {
  await httpClient.post('/api/user/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
