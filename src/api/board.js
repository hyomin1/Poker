import httpClient from './httpClient';

export const getBoard = async (blind) => {
  const res = await httpClient.get(`/api/board/search/${blind}`);
  return res.data;
};

export const quickJoin = async (blind, bb) => {
  const res = await httpClient.post(
    `/api/board/joinGame?bb=${bb}&blind=${blind}`
  );
  return res.data;
};

export const enterGame = async (boardId, bb) => {
  const res = await httpClient.post(
    `/api/board/joinGame/${boardId}?boardId=${boardId}&bb=${bb}`
  );
  return res.data;
};
