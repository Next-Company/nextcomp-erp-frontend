import { useEffect, useRef, useState } from "react";
import { Input } from "../Atoms/Input/Input";
import { Consulta } from "../../utils/utils";
import { toast } from "react-toastify";
import { InputSelect } from "../Atoms/Input/InputSelect";
import { Button } from "../Atoms/Button/Button";
import { ButtonLoader } from "../Atoms/Button/ButtonLoader";
import { Form } from "react-router-dom";

export default function Etiquetas(params){
  const { idprod } = params;
  const [info,setInfo] =  useState({oc:'0000000',producto:'PANTALON MEGA',estilo:'CLASICO',tela:'DENIM',base:'BAGGY',color:'NEGRO',talla:'S/T',precio_oferta:'149.90',precio_original:'149.90'});
  const [moneda,setMoneda] = useState('PEN')
  const [colores,setColores] = useState([])
  const [tallas,setTallas] = useState([])
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const form = useRef()
  useEffect(()=>{
    Consulta({url:'almacen/getinfoetiqueta/' + idprod})
    .then((resp)=>{
      console.log("La info para la etiqueta es:",resp)
      setInfo(resp[0])
      setData(resp)
      setTallas(resp.reduce((c,v)=>{
        !c.map(r=>r.nom).includes(v.talla) && c.push({id:v.idx_talla,nom:v.talla,selected:0})
        return c
      },[]))
      setColores(resp.reduce((c,v)=>{
        !c.map(r=>r.nom).includes(v.color) && c.push({id:v.idcolor,nom:v.color,selected:0})
        return c
      },[]))
      // if(resp.ok){
      // }else{
      //   toast.error('Debe ingresar la información correspondiente al campo seleccionado. Por favor verifique.', { theme: "colored" })
      // }
    })
    .catch((err)=>{
      toast.error('Se produjo un error al momento de recuperar los datos.', { theme: "colored" })
    })

    const handleInputChange = (event) => {
      console.log("Hola Ivon",event.detail.valor,event.detail)
      // if(event.detail.name == 'servicio'){
      //   setServicio(event.detail.valor)
      // }
      // if(event.detail.name == 'distribucion'){
      //   // setDistribucion(event.detail.valor == 'PAQUETES' ? 'PQT' : 'TLL')
      //   setDistribucion({GLOBALES:'GLB',TALLAS:'TLL',PAQUETES:'PQT'}[event.detail.valor])
      // }
    };
    form?.current?.addEventListener("salamandra", handleInputChange);
    return () => {
      // if (form.current) form.current.removeEventListener("salamandra", handleInputChange);
    };
  },[])
  const seleccionarTalla = (talla) => {
    console.log("Seleccionando talla:",talla)
    // setTallas(prev=>prev.map(t=>({...t,selected:t.id == talla.id ? (talla.selected ? 0 : 1) : talla.selected})))
    setTallas(prev=>prev.map(t=>({...t,selected:t.id == talla.id ? (t.selected ? 0 : 1) : t.selected})))
    return 0
  }
  const seleccionarColor = (color) => {
    console.log("Seleccionando talla:",color)
    setColores(prev=>prev.map(c=>({...c,selected:c.id == color.id ? (c.selected ? 0 : 1) : c.selected})))
    return 0
  }
  const imprimirEtiquetas = (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      if(!tallas.filter(t=>t.selected).length){
        toast.error("Debe seleccionar por lo menos 1 de las tallas del listado. Verifique.",{ theme: "colored"})
        return 0
      }
      if(!colores.filter(t=>t.selected).length){
        toast.error("Debe seleccionar por lo menos 1 de los colores del listado. Verifique.",{ theme: "colored"})
        return 0
      }
      Consulta({url:'almacen/imprimiretiquetas/22324', params: {
          method:'POST', 
          body:JSON.stringify({info,moneda,tallas:tallas.filter(t=>t.selected),colores:colores.filter(c=>c.selected)}),
          headers: {
            'Content-Type': 'application/json'
          },
        }
      })
      .then((resp)=>{
        setLoading(false)
        console.log("La respuestad el servidor es:",resp)
        const info = resp.data      
        const traduccion = window.atob(info)
        const nuevo_contenedor = new Uint8Array(traduccion.length);
        for (let i = 0; i < traduccion.length; i++) {
          nuevo_contenedor[i] = traduccion.charCodeAt(i);
        }
        const blob = new Blob([nuevo_contenedor], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        
      })
      .catch((err)=>{
        setLoading(false)
        toast.error('Se produjo un error al momento de imprimir las etiquetas.', { theme: "colored" })
      })
      
    } catch (error) {
      toast.error('Se produjo un error al momento de imprimir las etiquetas.', { theme: "colored" })
      
    } finally {
      setLoading(false)
    }
    console.log("Imprimiendo etiquetas con la siguiente info:")
  }
  return(
    <>
      <div className="flex flex-col mb-2">
        <div className="w-[1200px] scrollbar-special overflow-y-scroll flex flex-col" style={{height:'75vh'}}>
          <div className="flex items-center gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
            <span className="inline-block align-middle text-[12px]">Datos adicionales</span>
          </div>
          <hr/>
          <div className="flex gap-2 mt-2">
            <form ref={form.current} className="flex flex-row gap-4 w-full">
              <div className="w-[300px] text-left">
                <Input name={'orden_ref'} title="OP/OC" defaults={''} type="text" action={()=>{}} mode={'static'} verify="true" placeholder={'Info referencial'}/>
              </div>
              <Input name={'orden_ref'} title="Almacen" defaults={''} type="text" action={()=>{}} mode={'static'} verify="true" placeholder={'Info referencial'}/>
              <div className="w-[300px] text-left">
                <InputSelect title={'TipoDistribucion'} name={"distribucion"} data={
                  [
                    { indice: 'PEN', option: 'SOLES', selected: true }, 
                    { indice: 'USD', option: 'DOLARES' }, 
                  ]} 
                  df={moneda} 
                  placeholder={'Info referencial'}
                  formref={form.current}
                />
              </div>
            </form>
          </div>
          <div className="flex-1 flex flex-row gap-4 mb-2">
            <div className="flex-1 flex-row justify-between ">
              <div className="[&_div]:h-[30px] h-[500px] [&_div]:border [&_div]:cursor-pointer scrollbar-special [&_div:hover]:bg-gray-500 selected:[&_div]:bg-gray-500 [&_div:hover]:text-white [&_div]:border-b-1 overflow-y-scroll">
                {
                  tallas && tallas.map((talla,index)=>(
                    <div key={index} onClick={()=>seleccionarTalla(talla)} className={`${talla.selected ? 'bg-gray-500 text-white' : ''}`}>{talla.nom}</div>
                  ))
                }
              </div>
            </div>
            <div>
              <div>d</div>
              <div className="relative border border-gray-300 rounded-lg overflow-hidden w-[450px] shadow-xl shadow-black/40">
                <div className="text-left px-[2rem] pt-[2rem] pb-[1.5rem] text-[12px]">
                  <div className="text-[1.2rem] font-bold">OP:{info.oc ?? ''}</div>
                  <div className="font-bold text-[2.5rem]"><input type="text" value={info.producto ?? ''}/></div>
                  <div className="text-[1.8rem]"><input type="text" value={info.estilo !== '' ? info.estilo : '--'}/></div>
                  <div className="text-[1.8rem]"><input type="text" value={info.base !== '' ? info.base : '--'}/></div>
                  <div className="text-[1.8rem]"><input type="text" value={info.color ?? ''}/></div>
                  <div className="text-[1.8rem]"><input type="text" value={info.tela !== '' ? info.tela : '--'}/></div>
                  <div className="flex justify-between text-[1.8rem] font-semibold">
                    <div>ORIGINAL</div>
                    <div><input className="w-[150px] text-right" type="text" value={`${moneda == 'PEN' ? 'S/' : '$'}${info.precio_original ?? ''}`}/></div>
                  </div>
                  <div className="flex justify-between text-[1.8rem] font-semibold">
                    <div>OFERTA</div>
                    <div><input className="w-[150px] text-right" type="text" value={`${moneda == 'PEN' ? 'S/' : '$'}${info.precio_oferta ?? ''}`}/></div>
                  </div>
                  <div className="h-[80px] overflow-hidden bg-contain">
                    <img src="/images/codebar.png" height={400} width={380}/>
                  </div>
                  <div className="text-center text-[1.2rem] font-semibold" style={{fontSize: '22px',letterSpacing: '18px',transform: 'scale(1, .8)'}}>7750062152898</div>
                </div>
                <div className="absolute w-[25px] h-[100px] bg-blue-500 top-0"></div>
                <div className="absolute w-[25px] h-[290px] bg-blue-500 top-0 right-0"></div>
                <div className="absolute text-[5.5rem] font-extrabold top-[170px] right-[40px]" >{info.talla ?? ''}</div>

              </div>
              <div>ds</div>
            </div>
            <div className="flex-1 flex-row justify-between ">
              <div className="[&_div]:h-[30px] h-[500px] [&_div]:border [&_div]:cursor-pointer scrollbar-special [&_div:hover]:bg-gray-400 [&_div:hover]:text-white [&_div]:border-b-1 overflow-y-scroll">
                {
                  colores && colores.map((color,index)=>(
                    <div key={index} onClick={()=>seleccionarColor(color)} className={`${color.selected ? 'bg-gray-500 text-white' : ''}`}>{color.nom}</div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end gap-2">
          <Button tipo="default">Cancelar</Button>
          <ButtonLoader tipo="accept" loading={loading} task={imprimirEtiquetas}>Imprimir</ButtonLoader>
        </div>
      </div>
    </>
  )
}