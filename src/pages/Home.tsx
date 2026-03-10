const apiUrl = import.meta.env.VITE_API_URL
import { useContext, useEffect, useMemo, useRef, useState } from "react"
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

  // const options = useMemo(() => ({
  //   url: 'https://newsapi.org/v2/everything?q=fashion&sortBy=publishedAt&apiKey=' + API_KEY + '&pageSize=20&language=es'
  // }), [])
  // const { data, loading} = useFetch(options)

  
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
    useEffect(()=>{

    },[])
    const [initpos,setInitPos] = useState([])
    const ondragstart = (e)=>{
      const rect = e.currentTarget.getBoundingClientRect();

      console.log("Posicion actual es:",rect)
  
      // Posición relativa al contenedor
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setInitPos([x,y])

      console.log(`Posición inicial del padre-> X: ${x}, Y: ${y}`);
    }
    const ondragover = (e)=>{
      // console.log("El target del drag es:",e.clientX)

      const rect = e.currentTarget.getBoundingClientRect();

      console.log("Posicion actual es:",rect)
  
      // Posición relativa al contenedor
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // console.log(`Posición dentro del padre -> X: ${e.clientX}, Y: ${e.clientY}`);
      console.log(`Posición dentro del padre -> X: ${x}, Y: ${y}`);

      const diferencia = initpos[0] - x
      console.log("La diferencia es:",diferencia)
      ref.current.style.transform = `translateX(${-diferencia}px)`
      // 'translateX(-25px)'
    }
    const ref = useRef(null)
    const trasladar = ()=>{
      // ref.current.classList.add('trasladar')
      ref.current.style.transform = 'translateX(-25px)'
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
      {/* {
        loading && createPortal(
          <LoadingWindow />, document.querySelector("#root")
        )
      } */}
      <div className="border z-20 relative border-red-500 w-[350px] h-[400px] [&>div:first-child]:w-[500px] [&>div:first-child]:h-[60px] [&>div:first-child]:bg-green-500 [&>div:first-child]:border [&>div:first-child]:border-black">
        <div ref={ref} className="relative z-10 cursor-pointer" draggable="true" onDragOver={ondragover} onDragStart={ondragstart}>asdfasd</div>
        {/* <div className="absolute z-20 h-[60px] top-0 w-[350px] border border-red-500"></div> */}
      </div>
      <button className="border border-red-500" onClick={trasladar}>CLickMetr</button>
    </>
  )
}