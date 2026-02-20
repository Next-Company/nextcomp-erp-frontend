import { useEffect, useRef, useState } from "react";
import { Input } from "../../../components/Atoms/Input/Input";
import { toast } from "react-toastify";
import { Consulta } from "../../../utils/utils";
import { InputSelect } from "../../../components/Atoms/Input/InputSelect";

const INITIAL_MODELS = [
  {idx:1,articulo:'PANTALON MEGA',selected:true},
  {idx:2,articulo:'PANTALON MEGA 2'},
  {idx:3,articulo:'PANTALON MEGA 3'},
  {idx:4,articulo:'PANTALON MEGA 2'},
  {idx:5,articulo:'PANTALON MEGA 3'},
  {idx:6,articulo:'PANTALON MEGA 2'},
  {idx:7,articulo:'PANTALON MEGA 3'},
  {idx:8,articulo:'PANTALON MEGA 2'},
  {idx:9,articulo:'PANTALON MEGA 3'},
  {idx:10,articulo:'PANTALON MEGA 2'},
  {idx:11,articulo:'PANTALON MEGA 3'}
]

export default function SeccionImpresiones(children:any) {
  const { idprod, modelos } = children;
  const [info,setInfo] =  useState({oc:'0000000',producto:'PANTALON MEGA',estilo:'CLASICO',tela:'DENIM',base:'BAGGY',color:'NEGRO',talla:'S/T',precio_oferta:'149.90',precio_original:'149.90'});
  const [moneda,setMoneda] = useState('PEN')
  const [colores,setColores] = useState([])
  const [tallas,setTallas] = useState([])
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  const [distribucion,setDistribucion] = useState(1)
  // const [modelosimpresion,setModelosimpresion] = useState(modelos?.length ? modelos : INITIAL_MODELS)
  const [modelosimpresion,setModelosimpresion] = useState(INITIAL_MODELS)
  const form = useRef(null)

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
      if(event.detail.name == 'distribucion'){
        setDistribucion(event.detail.indice)
      }
    };
    form?.current?.addEventListener("salamandra", handleInputChange);
    return () => {
      form.current?.removeEventListener("salamandra", handleInputChange);
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
        
        // Primero deciframos el codigo morse a letras del alfabeto
        const traduccion = window.atob(info)
        // Creamos un contenedor de cajas con un numero de cajas igual a la longitud de la traduccion
        const nuevo_contenedor = new Uint8Array(traduccion.length);
        // Obtenemos el codigo ASCII de cada letra usando el metodo charCodeAt() y lo guardamos en cada caja del contenedor
        for (let i = 0; i < traduccion.length; i++) {
          nuevo_contenedor[i] = traduccion.charCodeAt(i);
        }
        // Envolvemos el contenedor en otro contenedor del tipo Blob, que es un contenedor de archivos que se puede abrir en el navegador, y le decimos que es un PDF
        const blob = new Blob([nuevo_contenedor], { type: 'application/pdf' });
        // Generamos una URL temporal para abrir el PDF en una nueva pestaña
        const url = URL.createObjectURL(blob);
        // const url = URL.createObjectURL(new Blob([new Uint8Array(info.data)], { type: 'application/pdf' }));
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
  }
  const actualizarModelos = (event) => {
    const position = parseInt(event.target.dataset.position)
    setModelosimpresion(prev=>prev.map((m,index)=>({...m,selected:index == position ? (m.selected ? 0 : 1) : (m?.selected ?? 0)})))
  }
  return(
    <>
      <div className="flex flex-col mb-2">
        <div className="scrollbar-special overflow-y-scroll flex flex-col gap-3">
          <div></div>
          <div className="flex items-center gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
            <span className="inline-block align-middle text-[12px]">Datos adicionales</span>
          </div>
          <hr/>
          <div className="flex gap-2">
            <div ref={form} className="flex flex-row gap-4 w-full">
              <div className="w-[400px] text-left">
                <InputSelect title={'Distribucion'} name={"distribucion"} data={
                  [
                    { indice: 1, option: 'HOJA DE CORTE', selected: true }, 
                    { indice: 2, option: 'PERSONALIZADO' }, 
                  ]} 
                  df={1} 
                  placeholder={'Info referencial'}
                  formref={form}
                />
              </div>
              <div className="w-[400px] text-left">
                <InputSelect title={'MonedaOrigen'} name={"moneda"} data={
                  [
                    { indice: 'PEN', option: 'SOLES', selected: true }, 
                    { indice: 'USD', option: 'DOLARES' }, 
                  ]} 
                  df={moneda} 
                  placeholder={'Info referencial'}
                  formref={form.current}
                />
              </div>
              {
                distribucion == 2 &&
                <div className="w-[400px] text-left">
                  <Input name={'cantidad'} title="Cantidad" defaults={0} type="number" verify="true" placeholder={'Info referencial'}/>
                </div>
              }
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
            <span className="inline-block align-middle text-[12px]">Datos adicionales</span>
          </div>
          <hr/>
          <div className="flex-1 flex flex-row gap-[30px] mb-2">
            <div className="flex-1 flex-row overflow-hidden rounded-xl bg-gray-100">
              <div className="h-[500px] [&_div.model]:cursor-pointer scrollbar-special [&_div.model:hover]:bg-gray-100 [&_div.model.selected:hover]:bg-indigo-100 [&_div.model]:border-b-1 overflow-y-scroll flex flex-col border rounded-xl">
                <div className="sticky top-0 px-4 py-3 flex flex-row justify-between items-center bg-gray-100">
                  <h2 className="font-bold text-[16px]">Lista de modelos</h2>
                  <div>
                    <ul className="flex w-[150px] flex-row justify-end rounded-full gap-2 [&_div]:cursor-pointer [&_div:hover]:bg-gray-200">
                      <li>
                        <div className="rounded-full w-9 h-9 hover:text-red-600 transition-colors flex justify-center items-center" data-action="clear">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eraser"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" /><path d="M18 13.3l-6.3 -6.3" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 transition-colors flex justify-center items-center" data-action="add">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="px-4 py-1 lista flex flex-col gap-2">
                  {
                    modelosimpresion && modelosimpresion.map((modelo,index)=>(
                      <div key={index} onClick={actualizarModelos} data-position={index} className={`model flex flex-row justify-between px-4 py-5 text-[12px] rounded-lg ${modelo.selected ? 'bg-indigo-100 outline-indigo-300 outline outline-[1px] text-indigo-500 selected' : 'text-gray-400'}`}>
                        <span>{modelo.articulo}</span>
                        {
                          modelo.selected
                          ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-dot"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 6.66a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15z" /></svg>
                          :
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-dashed"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" /><path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" /><path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" /><path d="M8.56 20.31a9 9 0 0 0 3.44 .69" /><path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" /><path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" /><path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" /><path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" /></svg>
                        }
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            <div className="">
              <div className="relative border border-gray-300 rounded-lg overflow-hidden w-[450px] shadow-xl shadow-black/40">
                <div className="text-left px-[2rem] pt-[2rem] pb-[1.5rem] text-[12px]">
                  <div className="text-[1.2rem] font-bold">OP:{info?.oc ?? ''}</div>
                  <div className="font-bold text-[2.5rem]"><input type="text" value={info?.producto ?? ''}/></div>
                  <div className="text-[1.8rem]"><input type="text" value={info?.estilo !== '' ? info?.estilo : '--'}/></div>
                  <div className="text-[1.8rem]"><input type="text" value={info?.base !== '' ? info?.base : '--'}/></div>
                  <div className="text-[1.8rem]"><input type="text" value={info?.color ?? ''}/></div>
                  <div className="text-[1.8rem]"><input type="text" value={info?.tela !== '' ? info?.tela : '--'}/></div>
                  <div className="flex justify-between text-[1.8rem] font-semibold">
                    <div>ORIGINAL</div>
                    <div><input className="w-[150px] text-right" type="text" value={`${moneda == 'PEN' ? 'S/' : '$'}${info?.precio_original ?? ''}`}/></div>
                  </div>
                  <div className="flex justify-between text-[1.8rem] font-semibold">
                    <div>OFERTA</div>
                    <div><input className="w-[150px] text-right" type="text" value={`${moneda == 'PEN' ? 'S/' : '$'}${info?.precio_oferta ?? ''}`}/></div>
                  </div>
                  <div className="h-[80px] overflow-hidden bg-contain">
                    <img src="/images/codebar.png" height={400} width={380}/>
                  </div>
                  <div className="text-center text-[1.2rem] font-semibold" style={{fontSize: '22px',letterSpacing: '18px',transform: 'scale(1, .8)'}}>7750062152898</div>
                </div>
                <div className="absolute w-[25px] h-[100px] bg-blue-500 top-0"></div>
                <div className="absolute w-[25px] h-[290px] bg-blue-500 top-0 right-0"></div>
                <div className="absolute text-[5.5rem] font-extrabold top-[170px] right-[40px]" >{info?.talla ?? ''}</div>
              </div>
            </div>

            <div className="flex-1 flex-row overflow-hidden rounded-xl bg-gray-100">
              <div className="h-[500px] [&_div.model]:cursor-pointer scrollbar-special [&_div.model:hover]:bg-gray-100 [&_div.model.selected:hover]:bg-indigo-100  [&_div.model]:border-b-1 overflow-y-scroll flex flex-col border rounded-xl">
                <div className="sticky top-0 bg-gray-100 p-4 flex flex-row justify-between">
                  <h2 className="font-bold text-[16px]">Lista de tallas base</h2>
                  <div>
                    <ul className="flex w-[150px] flex-row justify-end rounded-full p-[2px] gap-2 [&_div]:cursor-pointer [&_div:hover]:bg-gray-200">
                      <li>
                        <div className="rounded-full w-9 h-9 hover:text-red-600 transition-colors flex justify-center items-center" data-action="clear">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eraser"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" /><path d="M18 13.3l-6.3 -6.3" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 transition-colors flex justify-center items-center" data-action="add">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="px-4 py-1 lista flex flex-col gap-2">
                  {
                    modelosimpresion && modelosimpresion.map((modelo,index)=>(
                      <div key={index} onClick={actualizarModelos} data-position={index} className={`model flex flex-row justify-between px-4 py-5 text-[12px] rounded-lg ${modelo.selected ? 'bg-indigo-100 outline-indigo-300 outline outline-[1px] text-indigo-500 selected' : 'text-gray-400'}`}>
                        <span>{modelo.articulo}</span>
                        {
                          modelo.selected
                          ?
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-circle-dot"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-5 6.66a2 2 0 0 0 -1.977 1.697l-.018 .154l-.005 .149l.005 .15a2 2 0 1 0 1.995 -2.15z" /></svg>
                          :
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-dashed"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.56 3.69a9 9 0 0 0 -2.92 1.95" /><path d="M3.69 8.56a9 9 0 0 0 -.69 3.44" /><path d="M3.69 15.44a9 9 0 0 0 1.95 2.92" /><path d="M8.56 20.31a9 9 0 0 0 3.44 .69" /><path d="M15.44 20.31a9 9 0 0 0 2.92 -1.95" /><path d="M20.31 15.44a9 9 0 0 0 .69 -3.44" /><path d="M20.31 8.56a9 9 0 0 0 -1.95 -2.92" /><path d="M15.44 3.69a9 9 0 0 0 -3.44 -.69" /></svg>
                        }
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>

          </div>
          <div className="h-[100px]"></div>
        </div>
      </div>
    </>
  )
}