import { useCallback, useState, useEffect } from "react";
import { Table } from "./Table";
import { ListaSoportes } from "./ListaSoportes";
import { createPortal } from "react-dom";

async function CargarInfo() {
  return await fetch('http://192.168.18.20:4000/soporte', {
    credentials: 'include'
  })
    .then(resp => resp.json())
  // .then(resp=>{
  //   Promise.resolve(resp)
  // })
}
async function GuardarInfo(form) {
  const data = new FormData(form)
  console.log(Array.from(data))
  return await fetch(`http://192.168.18.20:4000/soporte/`, {
    method: 'POST',
    credentials: 'include',
    // headers: {
    //   'Content-Type': 'application/json'
    // },
    // body:JSON.stringify({mensaje:'hola mundo'})
    body: data
  })
    .then(resp => resp.json())
  // .then(resp=>{
  //   Promise.resolve(resp)
  // })
}

// const UserContext = createContext(false)
export function Soporte() {
  const [isedit, setIsedit] = useState(true)
  const [info, setInfo] = useState([])
  const [modal,setModal] = useState(false)
  // const saveSoporte = useCallback(async ()=>{
  //   await GuardarInfo()
  //   setIsedit(true)
  // },[])
  const saveSoporte = async (form) => {
    await GuardarInfo(form)
      .then(resp => {
        setIsedit(true)
      })
  }
  const showcredentials = () => {
    const credentials = JSON.parse(window.localStorage.user_data)
    console.log(credentials)
  }

  useEffect(() => {
    CargarInfo()
      .then(resp => {
        console.log(resp)
        setInfo(resp)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])
  useEffect(() => {
    if (isedit) {
      CargarInfo()
        .then(resp => {
          console.log(resp)
          setInfo(resp)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [isedit])
  return (
    <>
      {/* <div className="flex p-3 flex-col flex-1 w-64 bg-white border-l overflow-y-auto"> */}
      <div className="directory flex flex-col p-4 m-3 rounded-md bg-white w-full relative">
        <div className="p-2 text-left">
          <div className="flex flex-col gap-2">
            <span className=""><a href="">Soporte/</a></span>
            <hr />
            <h2 className="font-medium text-[18px]">Ingreso soportee</h2>
            {/* <p className="uppercase">A list of all the users in your account including their name, title, email and role.</p> */}
          </div>
          {isedit
            ? <Table setedit={setIsedit} info={info} setmodal={setModal}/>
            : <ListaSoportes save={saveSoporte}>
              <div className="lg:w-[50%] md:w-full columns-2 gap-5">
                <div className="flex flex-col">
                  <label htmlFor=""><strong>Asunto:</strong></label>
                  <input name='asunto' className="" type="text" />
                </div>
                <div className="break-before-column">
                  <div className="flex flex-col h-[50px]">
                    <label className="block" htmlFor=""><strong>Prioridad:</strong></label>
                    <select className="border-b flex-1" name="prioridad" id="">
                      <option value="BAJA">Baja</option>
                      <option value="MEDIA">Media</option>
                      <option value="ALTA">Alta</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-1">
                <div className="flex flex-col">
                  <label htmlFor=""><strong>Detalle soporte:</strong></label>
                  <textarea name="descripcion" className="border rounded-sm p-2" rows={10} id=""></textarea>
                </div>
              </div>
              <div className="flex justify-end">
                {/* <a href="" className="button">asfas</a> */}
                <button type="button" onClick={() => setIsedit(true)}>Cancelar</button>
                <button className="bg-yellow-600" type="button" onClick={showcredentials}>Mostrar Credenciales</button>
                <button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">Guardar</button>
              </div>
            </ListaSoportes>
          }
        </div>
      </div>
      {modal && createPortal(
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-red-500/20 flex justify-center items-center">
            <div className="w-[800px] h-[550px] bg-white rounded-lg shadow-lg p-4">
              
              <form className="pt-4 [&_input]:border-b [&_input]:p-1 [&_input]:text-[14px] [&_input]:outline-0 [&_input:focus-visible]:border-blue-700 [&_label]:text-[12px] [&_label]:font-medium flex flex-col gap-4">
                <div className="lg:w-[50%] md:w-full columns-2 gap-5">
                  <div className="flex flex-col">
                    <label htmlFor=""><strong>Asunto:</strong></label>
                    <input name='asunto' className="" type="text" />
                  </div>
                  <div className="break-before-column">
                    <div className="flex flex-col h-[50px]">
                      <label className="block" htmlFor=""><strong>Prioridad:</strong></label>
                      <select className="border-b flex-1" name="prioridad" id="">
                        <option value="BAJA">Baja</option>
                        <option value="MEDIA">Media</option>
                        <option value="ALTA">Alta</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-1">
                  <div className="flex flex-col">
                    <label htmlFor=""><strong>Detalle soporte:</strong></label>
                    <textarea name="descripcion" className="border rounded-sm p-2" rows={10} id=""></textarea>
                  </div>
                </div>
                <div className="col-1">
                  <button onClick={()=>setModal(false)} className="bg-blue-600 text-white hover:bg-blue-700">Cerrar</button>
                </div>
              </form>


            </div>
          </div>
        </>
        ,document.querySelector("#root")
        )}
    </>
  )
}