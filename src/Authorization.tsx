import { useEffect } from "react"
import { useAuth } from "./hooks/useAuth"
import { AuthPermitions } from "./contexts/contexts"

function Authorization({ children }) {
  const { isAuthenticated, login, logout, loading, error } = useAuth()
  useEffect(() => {
  }, [])
  return (
    <>
      <AuthPermitions.Provider value={{ isAuthenticated, login, logout, loading, error }}>
        {children}
      </AuthPermitions.Provider>
    </>
  )
}
export default Authorization