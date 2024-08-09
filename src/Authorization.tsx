import { useEffect } from "react"
import { useAuth } from "./hooks/useAuth"
import { AuthPermitions } from "./contexts/contexts"

function Authorization({ children }) {
  const { isAuthenticated, login, logout, loading, error, credentials } = useAuth()
  useEffect(() => {
  }, [])
  return (
    <>
      <AuthPermitions.Provider value={{ isAuthenticated, login, logout, loading, error, credentials }}>
        {children}
      </AuthPermitions.Provider>
    </>
  )
}
export default Authorization