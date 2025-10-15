// components/PrivateRoute.jsx
import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthPermitions } from '../../contexts/contexts';
// import { useAuth } from '../contexts/AuthContext';


const PrivateRoute = ({children}) => {
  const { credentials } = useContext(AuthPermitions)
  const location = useLocation();
  console.log("PrivateRoute credentials:", location.pathname.split('/')[2], JSON.parse(credentials));
  // const { isAuthenticated, userType } = useAuth();

  // if (credentials.niv == 1) {
  //   return <Navigate to={redirectPath} replace />;
  // }

  // if (!credentials || !credentials.niv) {
  if (JSON.parse(credentials).niv == 2 && !JSON.parse(credentials).modules.includes(location.pathname.split('/')[2])) {
    // console.log("No tienes permisos para acceder a esta ruta");
    return <Navigate to="/main/unauthorized" replace />;
  }

  // if (allowedRoles && !allowedRoles.includes(userType)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return children; // Renderiza los componentes hijos de la ruta
};

export default PrivateRoute;