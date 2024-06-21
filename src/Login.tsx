import { useContext, useEffect, useState } from "react"
import { AuthPermitions } from "./contexts/contexts"
import { useNavigate } from "react-router-dom"
export function Login(){
  // const [login,setLogin] = useState(false)
  const {isAuthenticated,login} = useContext(AuthPermitions)
  const navigate = useNavigate()
  const onsubmit = (e)=>{
    e.preventDefault()
    const data = new FormData(e.target)
    login(data)
  }
  useEffect(()=>{
    if(isAuthenticated) navigate("/main")
  },[isAuthenticated])
  return(
    <>
      {/* {login ? '' : ''} */}
      <div className="w-[100vw] h-[100vh] relative">
        <div className="backback absolute w-[100vw] h-[100vh] z-1 [&_img]:absolute [&_img]:w-[100%] [&_img]:h-[100%]">
          <img className="bg-contain bg-red-400" src="./src/images/store.jpg" alt="" />
          <img className="bg-contain bg-green-400" src="./src/images/brown.jpg" alt="" />
          <img className="bg-contain bg-orange-400" src="./src/images/jeans.jpg" alt="" />
          <img className="bg-contain bg-violet-400" src="./src/images/background.jpg" alt="" />
        </div>
        <div className="absolute z-0 w-[500px] h-[100vh] bg-white opacity-[.9]"></div>
        <div className="flex w-[500px] min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative">
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
            <form className="space-y-6" action="#" method="POST" onSubmit={onsubmit}>
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
                  // required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3 pr-3"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña
                  </label>
                  <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Olvidaste tu contraseña?
                  </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  // required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3 pr-3"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {/* <Link to="/main">Sign in</Link> */}
                  Iniciar Sesión
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500"></p>
          </div>
        </div>
      </div>
    </>
  )
}