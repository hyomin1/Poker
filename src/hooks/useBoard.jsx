import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query';
import { enterGame, getBoard, quickJoin } from '../api/board';

export default function useBoard() {
  const queryClient = useQueryClient();

  const blinds = [1000, 2000, 4000, 10000];
  const boardQueries = useQueries({
    queries: blinds.map((blind) => ({
      queryKey: ['board', blind],
      queryFn: () => getBoard(blind),
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
