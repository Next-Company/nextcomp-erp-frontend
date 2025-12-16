import { useEffect, useState } from "react"

export default function Configuracion(){
  const [info,setInfo] = useState({})
  useEffect(()=>{
    fetch('/api/mantenimiento/configuracion')
    .then(res=>res.json())
    .then(data=>{
      setInfo(data)
    })
  },[])

  return(
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
        <div className="flex flex-col flex-1 pl-2 pr-2 pt-2 h-full">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-red-400">d</div>
            <div className="bg-green-400">v</div>
            <div className="bg-blue-400">b</div>
          </div>

        </div>
      </div>
    </>
  )
}