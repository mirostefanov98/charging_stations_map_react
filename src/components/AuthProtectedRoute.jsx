import { useAuth } from '../services/useAuth';
import { Navigate } from 'react-router-dom';

export default function AuthProtectedRoute({ children }) {
    const auth = useAuth();

    if (auth) {
        return <Navigate to="/" />;
    }

    return children;
}