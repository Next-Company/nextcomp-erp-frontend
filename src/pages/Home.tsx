import { useContext, useEffect } from "react"
import { AuthPermitions } from "../contexts/contexts"
import { useFetch } from "../hooks/useFetch"

export function Home() {
  const { logout } = useContext(AuthPermitions)
  // const { info, error } = useFetch({
  useFetch({
    method: 'POST',
    body: JSON.stringify({ data: 0 }),
    url: 'http://localhost:4000/home',
    callbackSucces: (resp) => {
      console.log(resp)
    },
    callbackError: () => {
      logout()
      // console.log("Deslogeandose")
    }
  })
  return (
    <>
      <div className="directory flex flex-col p-4 m-3 rounded-md bg-white w-full relative">
        <h2>Bienvenidos!!!</h2>
      </div>
    </>
  )
}