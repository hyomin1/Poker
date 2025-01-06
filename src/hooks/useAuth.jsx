import { useMutation } from '@tanstack/react-query';
import { login, register } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStroe';
const useAuth = () => {
  const navigate = useNavigate();
  const { setSubId, setUserId } = useAuthStore();
  const onLogin = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: ({ status, subId, userId }) => {
      if (status !== 200) {
        return;
      }
      setSubId(subId);
      setUserId(userId);
      navigate('/dashboard');
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  const onRegister = useMutation({
    mutationFn: (data) => register(data),
    onSuccess: (status) => {
      if (status === 201) {
        navigate('/');
      }
    },
    onError: (error) => {
      alert(error.response.data.message);
    },
  });

  return { onLogin, onRegister };
};

export default useAuth;
