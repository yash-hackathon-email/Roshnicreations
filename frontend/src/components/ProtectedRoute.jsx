import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import LoadingSpinner from './LoadingSpinner';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner size="lg" message="Authenticating..." />;
  
  if (!user) return <Navigate to="/login" replace />;

  if (requireAdmin && user.email !== 'admin@roshnicreations.com') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
