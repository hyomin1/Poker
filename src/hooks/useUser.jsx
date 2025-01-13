import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUser, getUserImage, updateUserImage } from '../api/user';
import useAuthStore from '../stores/useAuthStore';

export default function useUser() {
  const queryClient = useQueryClient();
  const { subId } = useAuthStore();
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    staleTime: 1000 * 60 * 5,
  });

  const imageQuery = useQuery({
    queryKey: ['userImg', subId],
    queryFn: () => getUserImage(subId),
    enabled: !!subId,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 2,
  });

  const updateImage = useMutation({
    mutationFn: (formData) => updateUserImage(formData),
    onSuccess: () => queryClient.invalidateQueries(['userImg', subId]),
  });

  return { userQuery, imageQuery, updateImage };
}
