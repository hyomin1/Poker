import { useMutation } from '@tanstack/react-query';
import { login, register } from '../api/auth';
import { useNavigate } from 'react-router-dom';
const useAuth = () => {
  const navigate = useNavigate();
  const onLogin = useMutation({
    mutationFn: (data) => login(data),
    onSuccess: (status) => {
      if (status === 200) {
        // 성공시 메인화면으로
        navigate('/');
      }
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
