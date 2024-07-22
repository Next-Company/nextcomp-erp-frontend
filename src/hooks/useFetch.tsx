import { useCallback, useEffect, useState } from "react"

export function useFetch(options) {
  const { method = 'POST', body = null, url = '', callbackSucces = () => { }, callbackError = () => { } } = options
  // const [info, setInfo] = useState(null)
  // const [error, setError] = useState({})

  const callFetch = useCallback(async () => {
    try {
      const resp = await fetch(url, {
        method: method,
        body: body,
        credentials: 'include'
      })
      if (!resp.ok) throw new Error('Error al ejecutar la peticion')
      const dataApi = await resp.json()
      // setInfo(dataApi.result)
      callbackSucces(dataApi)
    } catch (error) {
      callbackError()
      // setError({ ok: false, message: error })
    }

  }, [method, body, url])
  // callFetch()
  useEffect(() => {
    callFetch()
  }, [options, callFetch])
  // return { info, error }
}