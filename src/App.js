import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import './App.css';
import Header from './components/Header';
import AuthRoute from './components/AuthRoute';
import AuthProtectedRoute from './components/AuthProtectedRoute';
import CreateStationPage from './pages/CreateStationPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import UserStationsPage from './pages/UserStationsPage';

const queryClient = new QueryClient()

function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={5000} preventDuplicate>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<AuthProtectedRoute><LoginPage /></AuthProtectedRoute>} />
              <Route path="/register" element={<AuthProtectedRoute><RegisterPage /></AuthProtectedRoute>} />
              <Route path="/profile" element={<AuthRoute><ProfilePage /></AuthRoute>} />
              <Route path="/create-station" element={<AuthRoute><CreateStationPage /></AuthRoute>} />
              <Route path="/user-stations" element={<AuthRoute><UserStationsPage /></AuthRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Header>
        </BrowserRouter>
      </QueryClientProvider>
    </SnackbarProvider>
  );
}

export default App;
