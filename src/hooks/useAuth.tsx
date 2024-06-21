import { useEffect, useState } from "react";

export function useAuth(){
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  const login = (data)=>{    
    // const inicia = async ()=>{
    //   return await fetch('http://localhost:4000/login',{
    //     method:'POST',
    //     credentials: 'include',
    //     body:data
    //   }).then(resp=>resp.json())
    // }
    // inicia().then(resp=>{
    //   console.log(resp)
    // })
    setIsAuthenticated(true)
  }
  const logout = ()=>{
    // console.log("jsofasoifd")
    setIsAuthenticated(false)
  }
  useEffect(()=>{

  })
  return {isAuthenticated,login,logout}
}