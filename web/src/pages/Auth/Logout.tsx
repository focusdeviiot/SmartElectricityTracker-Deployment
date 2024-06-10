import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../api/auth';
import { AuthContext } from '../../contexts/AuthContext';

const Logout = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      await logout();
      auth?.setIsAuthenticated(false);
      navigate('/login');
    };

    performLogout();
  }, [auth, navigate]);

  return null;
};

export default Logout;
