import { useQuery } from '@tanstack/react-query';
import { getHud } from '../api/hud';

export default function useHud(userId) {
  const hudQuery = useQuery({
    queryKey: ['hud', userId],
    queryFn: () => getHud(userId),
    enabled: userId !== null,
    staleTime: 60 * 1000 * 1,
  });
  return { hudQuery };
}
