import { useEffect, useState } from "react"
import { Input } from "../../../components/Atoms/Input/Input"
import { ButtonLoader } from "../../../components/Atoms/Button/ButtonLoader"
import { InputSelect } from "../../../components/Atoms/Input/InputSelect"

export default function SeccionDatosPrincipales({info,form,setorden}){
  // const { setOpenloader } = useContext(ModalWindowContext)
  // const [dataimg,setDataimg] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    // const handleSalamandra = (event) => {
    //   setTipopedido(event.detail.valor == 'ORDEN' ? 1 : 0)
    // };
    // form.current.addEventListener("salamandra", handleSalamandra);
  },[])

  const consultaruc = ()=>{
    // setOpenloader(true)
    setLoading(true)
    fetch('https://jsjfact.com/_consulta/consulta_masiva.php?RUX='+'20522094120')
    .then(resp=>resp.json())
    .then(data=>{
      console.log("La data es:",data)
      setLoading(false)
    })
    .catch(()=>{
      console.log("Se produjo un error en la consulta")
    })
  }
  // const nuevamarca = ()=>{
  //   let params_modal = null
  //   params_modal = {
  //     open:true,
  //     content: <Marca actions={(item)=>{
  //       setorden(orden=>([{...orden[0],marca:item.nom}]))
  //       setopen(false)
  //     }}/>,
  //     controls: true,
  //     header: false,
  //     action:()=>{
  //     }
  //   }
  //   openmodal(params_modal)
  // }
  return <>
    <div className={`flex flex-col gap-3 pt-3`}>
      <div className="flex flex-col gap-3">
        <Input name={'idx'} defaults={info.length > 0 ? info[0].idx : null} type="hidden" />
        <div className="flex items-center gap-2">
          <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
          <span className="inline-block align-middle text-[12px]">Datos principales del proveedor</span>
        </div>
        <hr/>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-3 align-top justify-start items-start">
            <div className="w-[15%]">
              <Input name={'ruc'} title="NroRUC" defaults={info.length > 0 ? info[0].ruc : null} type="text" verify="true" placeholder={'Nombre completo del producto a crear.'}/>
            </div>
            <ButtonLoader task={()=>{}} type="button" loading={loading} tipo={'success'}>
              <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-world-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 12a9 9 0 1 0 -9 9" /><path d="M3.6 9h16.8" /><path d="M3.6 15h7.9" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a16.984 16.984 0 0 1 2.574 8.62" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M20.2 20.2l1.8 1.8" /></svg>
            </ButtonLoader>
          </div>
        </div>
        <div className="w-[45%]">
          <Input name={'nom'} title="RazonSocial" defaults={info.length > 0 ? info[0].nom : null} type="text" verify="true" placeholder={'Nombre completo del producto a crear.'}/>
        </div>
        <div className="w-[70%] flex flex-row gap-3">
          <Input name={'direccion'} title="Direccion" defaults={info.length > 0 ? info[0].direccion : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
          <Input name={'representante'} title="Representante" defaults={info.length > 0 ? info[0].representante : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
        </div>
        {/* <div className="w-[30%]">
          <Input name={'representante'} title="Representante" defaults={info.length > 0 ? info[0].representante : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
        </div> */}
        <div className="flex items-center gap-2">
          <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
          <span className="inline-block align-middle text-[12px]">Datos adicionales del proveedor</span>
        </div>
        <hr/>
        {/* <hr className="m-0"/> */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <div className="w-[20%]">
              <Input name={'giro'} title="Giro" defaults={info.length > 0 ? info[0].giro : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
            </div>
            <div className="w-[20%]">
              <Input name={'telefono'} title="Telefono" defaults={info.length > 0 ? info[0].telefono : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
            </div>
            <div className="w-[35%]">
              <Input name={'correo'} title="Correo" defaults={info.length > 0 ? info[0].correo : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
            </div>
          </div>
        </div>
        <div className="">
          <div className="w-[40%]">
            <Input name={'web'} title="Web" defaults={info.length > 0 ? info[0].web : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
          </div>
        </div>
        <div className="w-[30%]">
          <Input name={'cuenta_corriente'} title="CuentaCorriente" defaults={info.length > 0 ? info[0].cuenta_corriente : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
        </div>
        <div className="w-[60%]">
          <Input name={'det'} title="Detalle" defaults={info.length > 0 ? info[0].det : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
        </div>
        <div className="w-[25%] flex flex-row gap-3">
          {/* <InputSelect title={'Categoria'} name={"cat"} data={
            [
              { indice: '0', option: 'NINGUNO', selected: true  },
              { indice: '1', option: 'TRANSPORTISTA' },
            ]} 
            df={Object.keys(info).length > 0 ? info[0].cat : null} placeholder={'Seleccione el tipo de producto a registrar.'} 
          /> */}
          <InputSelect title={'Clase'} name={"clase"} data={
            [
              { indice: 'OTROS', option: 'OTROS', selected: true },
              { indice: 'SERVICIOS', option: 'SERVICIOS' },
              { indice: 'TELAS', option: 'TELAS' },
              { indice: 'AVIOS', option: 'AVIOS' }
            ]} 
            df={Object.keys(info).length > 0 ? info[0].clase : null} placeholder={'Seleccione el tipo de producto a registrar.'} 
          />
        </div>
        <hr className="m-0"/>
      </div>
    </div>
  </>
}