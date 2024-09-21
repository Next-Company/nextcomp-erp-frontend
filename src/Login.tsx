import { useContext, useEffect, useState } from "react"
import { AuthPermitions } from "./contexts/contexts"
import { useNavigate } from "react-router-dom"

export function Login() {
  // const [login,setLogin] = useState(false)  
  const { isAuthenticated, login, loading, error } = useContext(AuthPermitions)
  const navigate = useNavigate()
  const onsubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    login(data)
  }
  useEffect(() => {
    if (sessionStorage.getItem('login')) {
      console.log('HOla mundo:' + sessionStorage.getItem('login'))
    }
  })
  useEffect(() => {
    if (isAuthenticated) navigate("/main")
  }, [isAuthenticated])
  return (
    <>
      {/* <div className="w-[100v] h-full bg-red-200 text-left">
        hola mundo
      </div> */}
      <div className="w-[100vw] overflow-hidden h-[100vh] relative">
        <div className="backback absolute w-[100vw] h-[100vh] z-1 [&_img]:absolute [&_img]:w-[100%] [&_img]:h-[100%] sm:hidden">
          <img className="bg-contain bg-white" src="./src/images/store.jpg" alt="" />
          <img className="bg-contain bg-green-400" src="./src/images/jeans.jpg" alt="" />
          <img className="bg-contain bg-orange-400" src="./src/images/gorro_new.jpg" alt="" />
          <img className="bg-contain bg-violet-400" src="./src/images/jeans.jpg" alt="" />
        </div>
        <div className="absolute z-0 w-[500px] h-[100vh] sm:h-[100vh] bg-white opacity-[.9]"></div>
        <div className="flex w-[500px] sm:w-[100vw] sm:h-[100vh] min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative sm:bg-gray-100">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="./src/assets/elenex.svg"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Iniciar sesión a tu cuenta
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className={`space-y-6`} action="#" method="POST" onSubmit={onsubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Nombre de usuario
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3 pr-3"
                    disabled={loading}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Contraseña
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    // required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3 pr-3"
                    disabled={loading}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  disabled={loading}
                >
                  {
                    loading
                      ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 loading"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 3a9 9 0 1 0 9 9" /></svg>
                      : 'Iniciar Sesión'
                  }
                </button>
              </div>
              {error &&
                <div className="text-[14px] text-red-500 flex justify-center items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-alert-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 8v4" /><path d="M12 16h.01" /></svg>
                  <span>Credenciales incorrectas</span>
                </div>
              }
            </form>
            <p className="mt-10 text-center text-sm text-gray-500"></p>
          </div>
        </div>
      </div>
    </>
  )
}