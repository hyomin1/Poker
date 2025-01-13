import { useQuery } from '@tanstack/react-query';
import { getHandHistory } from '../api/handHistory';

export default function useHandHistory() {
  const handHistoryQuery = useQuery({
    queryKey: ['handHistory'],
    queryFn: getHandHistory,
    staleTime: 60 * 1000 * 1,
  });
  return { handHistoryQuery };
}
