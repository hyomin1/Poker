import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { enterGame, getBlindBoard, quickJoin } from '../api/board';
import { BLINDS } from '../constants/boardConstants';

export default function useBoard() {
  const queryClient = useQueryClient();

  const boardQueries = useQueries({
    queries: BLINDS.map((blind) => ({
      queryKey: ['board', blind],
      queryFn: () => getBlindBoard(blind),
      staleTime: 60 * 1000 * 1,
    })),
  });

  const quickJoinMutation = useMutation({
    mutationFn: ({ blind, bb }) => quickJoin(blind, bb),
    onSuccess: async ({ blind }) => {
      queryClient.invalidateQueries(['board', blind]);
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const enterGameMutation = useMutation({
    mutationFn: ({ boardId, bb }) => enterGame(boardId, bb),
    onSuccess: ({ blind }) => {
      queryClient.invalidateQueries(['board', blind]);
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  return { boardQueries, quickJoinMutation, enterGameMutation };
}
