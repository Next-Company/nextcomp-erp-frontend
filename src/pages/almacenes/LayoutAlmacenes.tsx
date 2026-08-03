import { Outlet } from "react-router-dom";

/**
 * [feat 2026-06-26] Layout contenedor de la sección "Almacenes".
 * Sigue el mismo patrón que el resto de secciones (un wrapper con <Outlet />
 * para que las rutas hijas definidas en App.tsx se rendericen aquí dentro).
 */
export default function LayoutAlmacenes() {
  return <Outlet />
}
