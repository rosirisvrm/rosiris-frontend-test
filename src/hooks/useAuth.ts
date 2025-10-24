import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logout } from '@/store/slices/authSlice';
import type { RootState, AppDispatch } from '@/store';
import type { User } from '@/types/auth.types';

interface UseAuthReturn {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token, loading, error } = useSelector((state: RootState) => state.auth);

  const login = async (email: string, password: string) => {
    const result = await dispatch(loginUser({ email, password }));
    return result;
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    token,
    loading,
    error,
    login,
    logout: handleLogout,
    isAuthenticated: !!token && !!user,
  };
};
