import { useCallback, useState, useContext, createContext, useEffect } from "react";
import { Table } from "./Table";
import { ListaSoportes } from "./ListaSoportes";

async function CargarInfo(){
  return await fetch('http://localhost:4000/')
  .then(resp=>resp.json())
  // .then(resp=>{
  //   Promise.resolve(resp)
  // })
}


const UserContext = createContext(false)
export function Soporte(){
  const [isedit,setIsedit] = useState(false)
  const [info,setInfo] = useState([])
  const saveSoporte = useCallback((e)=>{
    console.log('hola')
    setIsedit(true)
  },[])

  useEffect(()=>{
    // const consulta = CargarInfo()
    // console.log(consulta)
    CargarInfo().then(resp=>{
      setInfo(resp)
      console.log(resp)
    })
    // consulta.then(resp=>{
    //   console.log(resp)
    // })
  },[])
  return(
    <>
      <div className="flex p-3 flex-col flex-1 w-64 bg-white border-l overflow-y-auto">
        <div className="p-2 text-left">
          <div className="flex flex-col gap-2">
            <h2 className="font-medium text-[18px]">User</h2>
            <p>A list of all the users in your account including their name, title, email and role.</p>
          </div>
          {isedit 
            ? <Table setedit={setIsedit} info={info}/> 
            : <UserContext.Provider value={isedit}>
                <ListaSoportes save={saveSoporte}>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col">
                      <label htmlFor="">Nombre:</label>
                      <input className="border-b rounded-sm" type="text" />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="">Apellidos:</label>
                      <input type="text" />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="">Direccion:</label>
                      <input type="text" />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="">Edad:</label>
                      <input type="text" />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="">Descripcion:</label>
                      <textarea name="" className="border rounded-sm bg-gray-50 p-2" rows={10} id=""></textarea>
                    </div>
                  </div>
                  <div className="flex">
                    <button>Cancelar</button>
                    <button>Guardar</button>
                  </div>
                </ListaSoportes>
              </UserContext.Provider>
          }
        </div>
      </div>
    </>
  )
}