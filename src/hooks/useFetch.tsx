import { useEffect, useState } from "react"
import { DataFetch } from "../utils/utils"

export function useFetch(params) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // useEffect(() => {
  //   let ignore = false
  //   const buscar = async () => {
  //     setLoading(true)
  //     const result = await DataFetch(params)
  //     setLoading(false)
  //     if (result.ok) {
  //       setData(result.info)
  //     } else {
  //       setError(result.info)
  //     }
  //   }
  //   if (!ignore) {
  //     buscar()
  //   }
  //   return () => {
  //     ignore = true
  //   }
  // }, [params])
  return { data, loading, error }
}