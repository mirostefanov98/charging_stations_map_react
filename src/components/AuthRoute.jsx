import { useAuth } from '../services/useAuth';
import { Navigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function AuthRoute({ children }) {
    const auth = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    if (!auth) {
        enqueueSnackbar('Първо трябва да влезеш в профила си.', { variant: 'error' });

        return <Navigate to="/" />;
    }

    return children;
}