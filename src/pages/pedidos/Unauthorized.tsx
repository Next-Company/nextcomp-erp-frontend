export default function Unauthorized() {
  return(
    <>
          <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
            <div className="flex flex-col flex-1 pl-2 pr-2 pt-2 h-full">
              <div className="flex flex-col items-center justify-center h-screen ">
                <img src="/images/unauthorized.jpg" alt="Unauthorized" className="w-1/5 mb-4" />
                <h1 className="text-3xl font-bold text-red-600">- Acceso bloqueado -</h1>
                <p className="mt-4 text-lg text-gray-700">No tiene permiso para acceder a esta página.</p>
                {/* <a href="/" className="mt-6 text-blue-500 hover:underline">Go back to home</a> */}
              </div>
            </div>
          </div>
        </>
  )
}