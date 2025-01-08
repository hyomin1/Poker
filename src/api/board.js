import httpClient from './httpClient';

const boardURL = '/api/board';

export const getBlindBoard = async (blind) => {
  const res = await httpClient.get(`${boardURL}/search/${blind}`);
  return res.data;
};

export const getBoard = async (boardId) => {
  const res = await httpClient.get(`${boardURL}/${boardId}`);
  return res.data;
};

export const quickJoin = async (blind, bb) => {
  const res = await httpClient.post(
    `${boardURL}/joinGame?bb=${bb}&blind=${blind}`
  );
  return res.data;
};

export const enterGame = async (boardId, bb) => {
  const res = await httpClient.post(
    `${boardURL}/joinGame/${boardId}?boardId=${boardId}&bb=${bb}`
  );
  return res.data;
};
