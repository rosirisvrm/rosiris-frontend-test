import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from '@/hooks/useAuth';
import { LoginScreen } from '@/components/Login/LoginScreen';
import { AppLayout } from '@/components/Layout/AppLayout';
import { WelcomeScreen } from '@/components/Welcome/WelcomeScreen';
import { DevicesList } from '@/components/Devices/DevicesList';
import { CharacterList } from '@/components/Characters/CharacterList';

// interface PrivateRouteProps {
//   children: React.ReactNode;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
// };

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route - Login */}
        <Route
          path="/"
          element={<LoginScreen />}
        />

        {/* Protected routes - Welcome, Devices, Superheroes */}
        <Route
          path="/welcome"
          element={
            // <PrivateRoute>
              <AppLayout />
            // </PrivateRoute>
          }
        >
          <Route index element={<WelcomeScreen />} />
        </Route>

        <Route
          path="/devices"
          element={
            // <PrivateRoute>
              <AppLayout />
            // </PrivateRoute>
          }
        >
          <Route index element={<DevicesList />} />
        </Route>

        <Route
          path="/characters"
          element={
            // <PrivateRoute>
              <AppLayout />
            // </PrivateRoute>
          }
        >
          <Route index element={<CharacterList />} />
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
