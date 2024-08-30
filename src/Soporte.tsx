import { useState, useEffect, useContext } from "react";
import { Table } from "./Table";
import { ListaSoportes } from "./ListaSoportes";
import { Consulta } from "./utils/utils";
import { ModalWindowContext } from "./components/ModalWindow/ModalWindowContext";
import { toast } from 'react-toastify';
import { AuthPermitions } from "./contexts/contexts";
import { Button } from "./components/Atoms/Button/Button";
import { InputG } from "./components/Atoms/Input/InputG";
import { InputSelect } from "./components/Atoms/Input/InputSelect";
import { TextArea } from "./components/Atoms/Input/TextArea";
import { Input } from "./components/Atoms/Input/Input";
import { InputSelectT } from "./components/Atoms/Input/InputSelectT";
// import { LoadingWindow } from "./components/LoadingWindow/LoadingWindow";

export function Soporte() {
  const { openModal, config } = useContext(ModalWindowContext)
  const { logout } = useContext(AuthPermitions)
  const [isedit, setIsedit] = useState(true)
  const [refresh, setRefresh] = useState(false)
  const [info, setInfo] = useState([])
  const [select, setSelect] = useState({})
  const [loading, setLoading] = useState(false)

  const saveSoporte = async (form) => {
    const data = new FormData(form)
    openModal({
      open: true,
      header: false,
      controls: true,
      content: <div>Desea continuar con el registro del soporte ingresado?</div>,
      action: async () => {
        await Consulta({
          url: 'soporte/', 
          params: {
            method: 'POST', body: data
          }
        })
          .then(resp => {
            toast.success('Soporte guardado con éxito!!', { theme: "colored" })
            setIsedit(true)
          })
      }
    })
  }
  const cancelarEdicion = () => {
    setIsedit(true)
  }
  useEffect(() => {
    Consulta({
      url: 'soporte', params: {
        method: 'GET'
      }
    })
      .then(resp => {
        console.log('Hola jupiters:', resp)
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
          console.log('otrororooo', resp)
          setRefresh(false)
          setInfo(resp)
        })
        .catch(error => {
          console.log('asdfasdfasdf', error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [isedit, refresh])
  return (
    <>
      {/* <div className="flex p-3 flex-col flex-1 w-64 bg-white border-l overflow-y-auto"> */}
      <div className="directory flex flex-col p-4 m-3 rounded-md bg-white w-full relative">
        <div className="p-2 text-left flex flex-col h-full overflow-hidden">
          {isedit
            ? <Table setedit={setIsedit} info={info} setselect={setSelect} setrefresh={setRefresh} loading={loading} />
            : <ListaSoportes save={saveSoporte}>
              <div className="flex w-[50%] gap-2">
                <Input name={'idx'} defaults={select.idx} title="" type="hidden" />
                <Input name={'asunto'} defaults={select.asunto} title="Asunto" type="text" />
                <InputSelectT title={'Prioridad'} indices={['BAJA','MEDIA','ALTA']} options={['Baja', 'Media', 'Alta']} name={"prioridad"} />
                <InputSelectT title={'Prioridad'} indices={['BAJA','MEDIA','ALTA']} options={['Baja', 'Media', 'Alta']} name={"prioridad"} />
              </div>
              <div>
                <TextArea name={'descripcion'} title={'Detalle'} valor={select.descripcion} />
              </div>
              <div className="flex justify-end gap-2">
                <Button action={cancelarEdicion} type={'button'} tipo={'default'}>Cancelar</Button>
                <Button type={'submit'} tipo={'accept'}>Guardar</Button>
              </div>
            </ListaSoportes>
          }
        </div>
      </div>
    </>
  )
}