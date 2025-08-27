import { useRouteError } from "react-router-dom";

export default function ErrorController() {
  const error = useRouteError(); // Obtiene el error lanzado
  console.error(error); // Puedes registrar el error para depuración

  return (
    <div>
      <h1>Oops!</h1>
      <p>Ha ocurrido un error inesperado.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}