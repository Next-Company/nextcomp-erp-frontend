import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if(localStorage.getItem('user_data')){
      const f1 = Date.parse(JSON.parse(localStorage.user_data).current)
      const f2 = Date.now()
      const minutes = ((f2-f1)/1000)/60
      return minutes < 60 ? true : false
    }else{
      return false
    }
    // return (localStorage.getItem('user_data') && minutes < 60) ? true : false
  })
  const [credentials, setCredentials] = useState(() => {
    return localStorage.getItem('user_data') ? localStorage.getItem('user_data') : ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  console.log("Esta es la info del localstorage:",localStorage)
  console.log("Ruta consulta credenciales :", apiUrl + 'login')
  const login = (data) => {
    console.log("Inciando login")
    const inicia = async () => {
      // return await fetch('http://localhost:4000/login', {
      return await fetch(apiUrl + 'login', {
        method: 'POST',
        credentials: 'include',
        body: data
      }).then(resp => resp.json())
    }
    setLoading(true)
    setError(null)
    inicia().then(resp => {
      if (resp.ok) {
        console.log("Credenciales de base de datos:",resp)
        localStorage.setItem('user_data', JSON.stringify(resp.datos))
        setIsAuthenticated(true)
        setCredentials(JSON.stringify(resp.datos))
      } else {
        setError(resp)
      }
      setLoading(false)
    })
  }
  const logout = () => {
    localStorage.removeItem('user_data')
    setIsAuthenticated(false)
  }
  useEffect(() => {
    // console.log("La info del localstorage es:",JSON.parse(localStorage.user_data))
    // (async ()=>{
    //   fetch("192.168.18.20:4000/testlogin",{
    //     method:'GET',
    //     credentials: 'include',
    //   })
    // })()

    // console.log("comprobando")
    // if (localStorage.getItem('user_data')) {
    //   setIsAuthenticated(true)
    // } else {
    //   setIsAuthenticated(false)
    // }
    // console.log(localStorage.getItem('user_datas'))
    // console.log("cargando datos de session storage")
  }, [])
  useEffect(() => {
    console.log("Esta logeado:" + isAuthenticated)
    console.log("Cerrando la modal")
    if (!isAuthenticated){
      console.log("saliendo del sistema")
    } 
  }, [isAuthenticated])
  return { isAuthenticated, login, logout, loading, error, credentials }
}