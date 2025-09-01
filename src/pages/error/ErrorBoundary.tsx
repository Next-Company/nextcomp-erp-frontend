// src/ErrorPage.jsx
import { useRouteError } from "react-router-dom";

export default function ErrorController() {
  const error = useRouteError();
  console.error(error);
  return (
    <>
      <div id="error-page" className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white items-center justify-center">
        <div className="flex flex-col pl-2 pr-2 pt-2 justify-center items-center">
          <img src="/public/images/error.png" width={200} />
          <h1>¡Oops!</h1>
          <p>Lo sentimos, ha ocurrido un error inesperado.</p>
          <p className="font-bold">
            <i className="font-bold">{error?.statusText || error?.message}</i>
          </p>
        </div>
      </div>
    </>
  );
}