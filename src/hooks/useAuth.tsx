import { useEffect, useState } from "react";
const apiUrl = import.meta.env.VITE_API_URL;

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('user_data') ? true : false
  })
  const [credentials, setCredentials] = useState(() => {
    return localStorage.getItem('user_data') ? localStorage.getItem('user_data') : []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // const navigate = useNavigate()
  console.log(localStorage)
  const login = (data) => {
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
    if (!isAuthenticated) console.log("saliendo del sistema")
  }, [isAuthenticated])
  return { isAuthenticated, login, logout, loading, error, credentials }
}