import { useQuery } from '@tanstack/react-query';
import { getBoard } from '../api/board';

export default function useBoardById(boardId) {
  const boardQuery = useQuery({
    queryKey: ['board', boardId],
    queryFn: () => getBoard(boardId),
    staleTime: 60 * 1000 * 1,
  });
  return { boardQuery };
}
