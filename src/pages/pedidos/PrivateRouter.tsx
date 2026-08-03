// components/PrivateRoute.jsx
import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthPermitions } from '../../contexts/contexts';
// import { useAuth } from '../contexts/AuthContext';


// [feat 2026-06-26] Módulos PÚBLICOS: visibles/accesibles para TODOS los usuarios,
//   sin importar sus permisos (credentials.modules).
//   Contexto: el control normal hace que un usuario de nivel 2 (niv==2) solo pueda entrar
//   a los módulos listados en credentials.modules. Los módulos de esta lista quedan exentos
//   de ese chequeo, por pedido de que el módulo de almacén sea visible para todos.
//   El identificador es el segmento de ruta: /main/<modulo>/... → location.pathname.split('/')[2].
const PUBLIC_MODULES = ['almacen', 'almacenes']

const PrivateRoute = ({children}) => {
  const { credentials } = useContext(AuthPermitions)
  const location = useLocation();
  // Segmento de módulo de la URL actual (ej: 'almacen', 'almacenes', 'pedidos'...).
  const modulo = location.pathname.split('/')[2]
  console.log("PrivateRoute credentials:", modulo, JSON.parse(credentials));
  // const { isAuthenticated, userType } = useAuth();

  // if (credentials.niv == 1) {
  //   return <Navigate to={redirectPath} replace />;
  // }

  // Usuario de nivel 2: se le niega el acceso solo si el módulo NO es público
  // y además NO está en su lista de permisos.
  // if (!credentials || !credentials.niv) {
  if (
    JSON.parse(credentials).niv == 2 &&
    !PUBLIC_MODULES.includes(modulo) &&
    !JSON.parse(credentials).modules.includes(modulo)
  ) {
    // console.log("No tienes permisos para acceder a esta ruta");
    return <Navigate to="/main/unauthorized" replace />;
  }

  // if (allowedRoles && !allowedRoles.includes(userType)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return children; // Renderiza los componentes hijos de la ruta
};

export default PrivateRoute;