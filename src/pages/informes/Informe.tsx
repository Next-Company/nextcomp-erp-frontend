import { useContext, useEffect, useState } from "react";
import { Search } from "../../components/Atoms/Search/Search";
import { Consulta } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Atoms/Button/Button";
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext";
import { toast } from "react-toastify";
import { Input } from "../../components/Atoms/Input/Input";
import { InputSelect } from "../../components/Atoms/Input/InputSelect";
import Proveedores from "../../components/Common/Proveedores";


const colorfase = {
  'SERVICIOS':'bg-orange-500',
  'PEDIDOS':'bg-violet-500'
}
// const CuerpoInforme = ({cuerpo})=>{
//   return(
//     <>
//       <iframe src="http://192.168.18.20:4000/produccion/informe/12" className="w-[60vw] h-[60vh]"></iframe>
//     </>
//   )
// }
export default function Informe(){
  const [info,setInfo] = useState([])
  const navigate = useNavigate()
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)

  useEffect(()=>{
    const data = new FormData()
    // setOpenloader(true)
    // Consulta({
    //   url: 'produccion/getListaDespachos', params: {
    //     method: 'GET'
    //   }
    // })
    // .then(resp => {
    //   console.log(resp)
    //   setOpenloader(false)
    //   setInfo(resp)  
    // })
    // .catch((error) => {
    //   console.log(error)
    // })
    // .finally(()=>{
    //   console.log("Horror en la consulta de base de datos")
    // })
  },[])


  const nuevodespacho = ()=>{
    navigate('/main/despachos/nuevo')
  }
  const showinforme = (e)=>{
    // const params_modal = {
    //   open:true,
    //   content: <CuerpoInforme cuerpo={""} />,
    //   controls: true,
    //   header: false,
    //   action:async ()=>{
    //   }
    // }
    // openModal(params_modal)
  }
  const nuevoproveedor = ()=>{
      let params_modal = null
      params_modal = {
        open:true,
        content: <Proveedores actions={(item)=>{  
          console.log("El item seleccionado es: ",item)
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

  return(
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white">
      
        <div className="flex flex-col flex-1 pl-2 pr-2 pt-2 h-full">

          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-[16px]">Informe</h2>
              <div className="w-[500px]">
                <Search config={{ width: '200px' }} action={()=>{}} />
              </div>
            </div>
            {/* <hr /> */}
          </div>
          <div className="text-left scrollbar-special flex flex-col flex-1 overflow-scroll mt-2">
            <hr />
            <div className="flex-1 scrollbar-special overflow-y-scroll">

              <form >
                <div className={` flex-col gap-3 flex p-2`}>
                  <div className="flex gap-3 items-center">
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
                    <Input name={'id_proveedor_CAB'} defaults={Object.keys(info).length > 0 ? info.id_proveedor_CAB : null} type="hidden" />
                    <Input name={'proveedor'} title="Proveedor" defaults={Object.keys(info).length > 0 ? info.proveedor : null} type="text" action={nuevoproveedor} mode={'static'} />
                    <Input name={'fec_emision'} title="FecEmision" defaults={Object.keys(info).length > 0 ? info.fec_emision : null} type="date" />
                    <Input name={'fec_retorno'} title="FecRetorno" defaults={Object.keys(info).length > 0 ? info.fec_retorno : null} type="date" />
                    <Button action={()=>{}} tipo={'accept'}>
                      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-database-export"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3" /><path d="M4 6v6c0 1.657 3.582 3 8 3c1.118 0 2.183 -.086 3.15 -.241" /><path d="M20 12v-6" /><path d="M4 12v6c0 1.657 3.582 3 8 3c.157 0 .312 -.002 .466 -.005" /><path d="M16 19h6" /><path d="M19 16l3 3l-3 3" /></svg>
                    </Button>
                  </div>
                </div>
              </form>
              <iframe src="http://192.168.18.20:4000/produccion/showinformeservicio2/16" className="w-full h-[100vh]"></iframe>
            </div>
            {/* <div>
            </div> */}
            {/* <div className="flex flex-row justify-end">
              <div className="flex gap-2">
                <Button action={()=>{}} tipo={'default'}>Actualizar</Button>
                <Button action={()=>{}} tipo={'accept'}>Nuevo</Button>
              </div>
            </div > */}

          </div>
        </div>
      </div>
    </>
  )
}