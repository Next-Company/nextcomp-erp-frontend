import { useState, useEffect, useContext } from "react";
import { Table } from "./Table";
import { ListaSoportes } from "./ListaSoportes";
import { createPortal } from "react-dom";
import { Consulta } from "./utils/utils";
import { ModalWindowContext } from "./components/ModalWindow/ModalWindowContext";
import { toast } from 'react-toastify';
import { AuthPermitions } from "./contexts/contexts";
import { Button } from "./components/Atoms/Button/Button";
import { InputG } from "./components/Atoms/Input/InputG";
import { InputSelect } from "./components/Atoms/Input/InputSelect";
import { TextArea } from "./components/Atoms/Input/TextArea";
// import { LoadingWindow } from "./components/LoadingWindow/LoadingWindow";

export function Soporte() {
  const { openModal, config } = useContext(ModalWindowContext)
  const { logout } = useContext(AuthPermitions)
  const [ isedit, setIsedit ] = useState(true)
  const [ refresh, setRefresh ] = useState(false)
  const [ info, setInfo ] = useState([])
  const [ select, setSelect ] = useState({})
  const [ modal, setModal ] = useState(false)
  const [ loading, setLoading ] = useState(false)

  const saveSoporte = async (form) => {
    const data = new FormData(form)
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro del soporte ingresado?</div>,
      action: async () => {
        await Consulta({
          url: 'soporte/', params: {
            method: 'POST', body: data
          }
        })
          .then(resp => {
            toast.success('Soporte guardado con éxito!!',{theme: "colored"})
            setIsedit(true)
          })
      }
    })
  }

  useEffect(() => {
    Consulta({
      url: 'soporte', params: {
        method: 'GET'
      }
    })
      .then(resp => {
        console.log('Hola jupiters:',resp)
        setInfo(resp)
      })
      .catch(error => {
        // window.localStorage.removeItem('user_data')
        logout()
      })
  }, [])
  useEffect(() => {
    if (isedit || refresh) {
      setLoading(true)
      Consulta({
        url: 'soporte', params: {
          method: 'GET'
        }
      })
        .then(resp => {
          console.log('otrororooo',resp)
          setRefresh(false)
          setInfo(resp)
        })
        .catch(error => {
          console.log('asdfasdfasdf',error)
        })
        .finally(()=>{
          setLoading(false)
        })
    }
  }, [isedit,refresh])
  return (
    <>
      {/* <div className="flex p-3 flex-col flex-1 w-64 bg-white border-l overflow-y-auto"> */}
      <div className="directory flex flex-col p-4 m-3 rounded-md bg-white w-full relative">
        <div className="p-2 text-left flex flex-col h-full overflow-hidden">
          {isedit
            ? <Table setedit={setIsedit} info={info} setselect={setSelect} setrefresh={setRefresh} loading={loading} />
            : <ListaSoportes save={saveSoporte}>
              <div className="lg:w-[50%] md:w-full columns-2 gap-5">
                <div className="flex flex-col">
                  {/* <label htmlFor=""><strong>Asunto:</strong></label>
                  <input name='asunto' type="text" defaultValue={select.asunto ?? ''} />
                  <input name='idx' type="hidden" defaultValue={select.idx ?? ''} required={true} /> */}
                  {/* <InputG name={'asunto'} defaults={select.asunto ?? ''}>Nombre</InputG> */}

                  <div className="w-[100px] h-[100px] bg-orange-400 relative">
                    <div className="w-[100px] h-[100px] bg-green-400 absolute z-50 top-3 left-[40px]">
                      asdfal
                    </div>
                  </div>


                  <div className="rounded-md bg-gray-100 flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[8px] hover:bg-gray-200 relative box-content group selected">
                    <label className="text-[12px] text-blue-600 transition-all mover pointer-events-none">sdflksdjf</label>
                    <input type="text" className="inp bg-[inherit] w-full border-none focus:border-none focus-within:border-none focus-visible:border-none focus:outline-none" />
                    <span className="after:absolute after:bottom-0 after:left-0 after:transition-all after:opacity-1 after:w-full after:border-b-[2px] 
                    after:border-b-transparent group-[.selected]:after:border-b-blue-600"></span>
                    {/* <div className="w-[1550px] h-[300px] bg-red-400 absolute z-50 top-[60px] left-[120px]">
                      asdfal
                    </div> */}
                    <div>asdfasklñ</div>
                    {/* <div className="left-0 top-[100%] h-[300px] z-50 bg-green-400 w-[300px] absolute">
                      
                    </div> */}
                    {/* <ul className="hidden left-0 top-[100%] z-10 border-[1px] border-gray-100 bg-white shadow-xl rounded-sm w-full pt-3 pb-3 [&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center [&_li]:cursor-pointer [&_li]:pl-[10px] [&_li]:pt-[8px] [&_li]:pb-[8px] transition-all origin-center opacity-0 scale-90 group-[.selected]:opacity-100 group-[.selected]:scale-100 group-[.selected]:absolute group-[.selected]:flex group-[.selected]:flex-col">
                      <li>Opcion1</li>
                      <li>Opcion2</li>
                      <li>Opcion3</li>
                    </ul> */}
                  </div>





                </div>
                <div className="break-before-column">
                  <div className="flex flex-col">
                    {/* <label className="block" htmlFor=""><strong>Prioridad:</strong></label>
                    <select className="border-b flex-1" name="prioridad" id="">
                      <option value="BAJA">Baja</option>
                      <option value="MEDIA">Media</option>
                      <option value="ALTA">Alta</option>
                    </select> */}
                    <InputSelect title={'Prioridad'} nombre={"prioridad"}>
                      <option value=""></option>
                      <option value="Baja">Baja</option>
                      <option value="Media">Media</option>
                      <option value="Alta">Alta</option>
                    </InputSelect>
                  </div>
                </div>
              </div>
              <div className="col-1">
                <div className="flex flex-col">
                  {/* <label htmlFor=""><strong>Detalle soporte:</strong></label>
                  <textarea name="descripcion" className="border rounded-sm p-2" rows={10} id="" defaultValue={select.descripcion ?? ''}></textarea> */}
                  {/* <TextArea>Descripcion</TextArea> */}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                {/* <Button action={() => setIsedit(true)} tipo={'default'}>Cancelar</Button> */}
                {/* <button type="button" onClick={() => setIsedit(true)}>Cancelar</button> */}
                <Button action={() => setIsedit(true)} tipo={'default'}>Cancelar</Button>
                <Button type={'submit'} tipo={'accept'}>Guardar</Button>
                {/* <button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">Guardar</button> */}
              </div>
            </ListaSoportes>
          }
        </div>
      </div>
      {/* {modal && createPortal(
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
                  <button onClick={() => setModal(false)} className="bg-blue-600 text-white hover:bg-blue-700">Cerrar</button>
                </div>
              </form>
            </div>
          </div>
        </>
        , document.querySelector("#root")
      )} */}
    </>
  )
}