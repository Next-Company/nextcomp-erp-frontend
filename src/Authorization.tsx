import { createContext, useEffect, useState } from "react"
import { useAuth } from "./hooks/useAuth"
import { AuthPermitions } from "./contexts/contexts"

function Authorization({children}){
  const { isAuthenticated,login,logout } = useAuth()
  useEffect(()=>{

  },[])
  return(
    <>
      <AuthPermitions.Provider value={{isAuthenticated,login,logout}}>
        {children}
      </AuthPermitions.Provider>
    </>
  )
}
export default Authorization