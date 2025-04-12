const apiUrl = import.meta.env.VITE_API_URL
import { useContext, useMemo, useRef, useState } from "react"
import { useFetch } from "../hooks/useFetch"
import { createPortal } from "react-dom"
import { LoadingWindow } from "../components/LoadingWindow/LoadingWindow"
import { Input } from "../components/Atoms/Input/Input"
import Proveedores from "../components/Common/Proveedores"
import { ModalWindowContext } from "../components/ModalWindow/ModalWindowContext"
import { InputSelect } from "../components/Atoms/Input/InputSelect"

const API_KEY = 'a0765f5398ae4694bf2d5b0093660c73'
export function Home() {
  const [info,setInfo] = useState({id_proveedor_CAB:null,proveedor:''})
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  const [estado, setEstado] = useState(false)

  console.log("Cambiando estado")

  const options = useMemo(() => ({
    url: 'https://newsapi.org/v2/everything?q=fashion&sortBy=publishedAt&apiKey=' + API_KEY + '&pageSize=20&language=es'
  }), [])
  const { data, loading} = useFetch(options)

  
  const myform = useRef()
  const mostrar = ()=>{
    const data = new FormData(myform.current)
    console.log(Array.from(data))
  }
  const printpdf = ()=>{
    // alert("Imprimiendo informacion adicional del pdf")
    window.location.href = apiUrl + 'produccion/print/'
    // (async ()=>{
    //   fetch("http://192.168.18.20:4000/produccion/print",{
    //     method:'GET',
    //     credentials:'include'
    //   })
    //   .then(resp=>{
    //     console.log("Envio del servidor:",resp)
    //   })
    // })()

  }
  const nuevoproveedor = ()=>{
      let params_modal = null
      params_modal = {
        open:true,
        content: <Proveedores actions={(item)=>{  
          // console.log("El item seleccionado es: ",item)
          setInfo(info=>({...info,id_proveedor_CAB:item.idx,proveedor:item.nom}))
          setOpen(false)
        }}/>,
        controls: true,
        header: false,
        action:()=>{
        }
      }
      openModal(params_modal)
    }
  return (
    <>
      <div className="directory flex flex-col p-4 m-3 rounded-md bg-white w-full relative">
        <h2 className="text-[20px]">Home</h2>
        {/* <div className="grid_article scrollbar-special">
          {data && data.articles.map((res, index) => <Articulo key={index} info={res} />)}
        </div> */}
        <div className="w-[350px]">
          <InputSelect title={'Servicio'} name={"servicio"} data={
            [
              { indice: 'CONFECCION', option: 'CONFECCION', selected: true }, 
              { indice: 'OJAL', option: 'OJAL' }, 
              { indice: 'ESTAMPADO', option: 'ESTAMPADO' },
              { indice: 'LAVANDERIA', option: 'LAVANDERIA' },
              { indice: 'BORDADO', option: 'BORDADO' },
              { indice: 'ACABADOS', option: 'ACABADOS' },
            ]} 
            df={Object.keys(info).length > 0 ? info.servicio : null} 
          />
        </div>
        
        <div className="mt-4 w-[250px]">
          <Input name={'proveedor'} title="Proveedor" defaults={Object.keys(info).length > 0 ? info.proveedor : null} type="text" action={nuevoproveedor} mode={'static'} />
        </div>
      </div>
      {
        loading && createPortal(
          <LoadingWindow />, document.querySelector("#root")
        )
      }
    </>
  )
}