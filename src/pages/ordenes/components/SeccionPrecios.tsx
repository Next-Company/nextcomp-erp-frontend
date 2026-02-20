import { useEffect, useRef, useState } from "react";
import { Input } from "../../../components/Atoms/Input/Input";
import { toast } from "react-toastify";
import ListaModelos from "./ListaModelos";

const INITIAL_PRICE = {precio1:[0,0],precio2:[0,0],precio3:[0,0],precio4:[0,0],precio5:[0,0],precio6:[0,0]}
function TemplatePrecios(children){
  const {orden, position, info, setInfo, setopen, openmodal, modelos, setmodelos} = children
  const onclick = (e)=>{
    const action = e.target.dataset.action;
    const position = parseInt(e.target.dataset.position);
    console.log("La accion es la siguiente:",action,position)
    // console.e
    switch(action){
      case 'eliminar':
        if(position !== 1){
          openmodal({
            open:true,
            content: <div>Desea elminar el modelo de precios seleccionado?.<br/> Cualquier modificacion realizada se perderá.</div>,
            controls: true,
            header: false,
            action:async ()=>{
              setInfo(data=>data.filter((row,key)=>key !== (position-1)))
              setmodelos(modelos.reduce((c,v)=>{
                if(v.pricemodel == position){
                  Reflect.deleteProperty(v,'pricemodel')
                  Reflect.deleteProperty(v,'selected')
                }
                c.push(v)
                return c
              },[]))
            }
          })
        }
        break;
      case 'agregar':
        console.log("Agregar la info:",info)
        setInfo(pricemodels=>[...pricemodels,INITIAL_PRICE])
        break;
      case 'vincular':
        console.log("La nueva lista de modelos es el siguiente:",modelos)
        if(modelos.filter(row=>!Object.keys(row).includes('pricemodel')).length == 0){
          toast.error('No hay modelos disponibles para vincular. Por favor verifique.', { theme: "colored" })
          return 0
        }
        openmodal({
          open:true,
          content: <ListaModelos modelos={modelos.filter(row=>(row?.pricemodel ?? -1) == position || !Object.keys(row).includes('pricemodel'))} setmodelos={setmodelos} info={[]} pricemodel={position} actions={(models)=>{
            // setmodelos(models.map((row,key)=> key == position ? {...row,pricemodel:position} : row))
            setmodelos([...modelos.filter(row=>!models.map(m=>m.idx).includes(row.idx)),...models])
            setopen(false)
          }}/>,
          controls: false,
          header: false,
          action:async ()=>{}
        })
        break;
      default:
        break;
    }
  }
  return(
    <>
      <div key={position} className="p-4 border rounded-3xl bg-gray-100 relative">
        <div className="flex flex-row items-center">
          <h2 className="font-bold">Modelo #{position}</h2>
          <h3 className="text-[12px]"> - Modelos(<strong>{modelos.filter(row=>(row.pricemodel ?? -1) == position).map(row=>row.articulo.toUpperCase()).join(',')}</strong>)</h3>
        </div>
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
            <span className="inline-block align-middle text-[12px]">Lista de precios en <strong>soles</strong> para tiendas de los mall y gamarra.</span>
          </div>
          <hr/>
          <div className="flex flex-row gap-3">
            <Input name={'idx'} defaults={orden.length > 0 ? orden[0].idx : null} type="hidden" />
            <Input name={'precio1_a'} dataset={[{origen:'precio1'},{position:0},{pricemodel:position}]} title="Hangta(S/)" defaults={orden.length > 0 ? orden[0].precios?.[position]?.precio1?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio mall'}/>
            <Input name={'precio2_a'} dataset={[{origen:'precio2'},{position:0},{pricemodel:position}]} title="Retail(S/)" defaults={orden.length > 0 ? orden[0].precios?.[position]?.precio2?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio mall'}/>
            <Input name={'precio3_a'} dataset={[{origen:'precio3'},{position:0},{pricemodel:position}]} title="Promo(S/)" defaults={orden.length > 0 ? orden[0].precios?.[position]?.precio3?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio mall'}/>
            <Input name={'precio4_a'} dataset={[{origen:'precio4'},{position:0},{pricemodel:position}]} title="Unidad(S/)" defaults={orden.length > 0 ? orden[0].precios?.[position]?.precio4?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio gamarra'}/>
            <Input name={'precio5_a'} dataset={[{origen:'precio5'},{position:0},{pricemodel:position}]} title="PorMayor(S/)" defaults={orden.length > 0 ? orden[0].precios?.[position]?.precio5?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio gamarra'}/>
            <Input name={'precio6_a'} dataset={[{origen:'precio6'},{position:0},{pricemodel:position}]} title="Distribuidor(S/)" defaults={orden.length > 0 ? orden[0].precios?.[position]?.precio6?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio gamarra'}/>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-2 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
            <span className="inline-block align-middle text-[12px]">Lista de precios en <strong>dolares</strong> para las tiendas de tumbes.</span>
          </div>
          <hr/>
          <div className="flex flex-row gap-3">
            <Input name={'idx'} defaults={orden.length > 0 ? orden[0].idx : null} type="hidden" />
            <Input name={'precio1_b'} dataset={[{origen:'precio1'},{position:1},{pricemodel:position}]} title="Hangta($)" defaults={orden.length > 0 ? orden[0].precios?.[position]?.precio1?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio aguas verdes y outlet'}/>
            <Input name={'precio2_b'} dataset={[{origen:'precio2'},{position:1},{pricemodel:position}]} title="Retail($)" defaults={orden.length > 0 ? orden[0].precios?.[position]?.precio2?.[1] ?? 0 : 0} type="number" verify="true" placeholder={'Precio aguas verdes y outlet'}/>
            <Input name={'precio3_b'} dataset={[{origen:'precio3'},{position:1},{pricemodel:position}]} title="Promo($)" defaults={orden.length > 0 ? orden[0].precios?.[position]?.precio3?.[1] ?? 0 : 0} type="number" verify="true" placeholder={'Precio aguas verdes y outlet'}/>
            <Input name={'precio4_b'} dataset={[{origen:'precio4'},{position:1},{pricemodel:position}]} title="Unidad($)" defaults={orden.length > 0 ? orden[0].precios?.[position]?.precio4?.[1] ?? 0 : 0} type="number" verify="true" placeholder={'Precio aguas verdes y outlet'}/>
            <Input name={'precio5_b'} dataset={[{origen:'precio5'},{position:1},{pricemodel:position}]} title="PorMayor($)" defaults={orden.length > 0 ? orden[0].precios?.[position]?.precio5?.[1] ?? 0 : 0} type="number" verify="true" placeholder={'Precio aguas verdes y outlet'}/>
            <Input name={'precio6_b'} dataset={[{origen:'precio6'},{position:1},{pricemodel:position}]} title="Distribuidor($)" defaults={orden.length > 0 ? orden[0].precios?.[position]?.precio6?.[1] ?? 0 : 0} type="number" verify="true" placeholder={'Precio aguas verdes y outlet'}/>
          </div>
        </div>
        {/* <div className="absolute top-2 right-2 flex flex-row gap-2 p-1 border rounded-full bg-gray-200 shadow-lg"> */}
        <div className="absolute top-2 right-2 flex flex-row gap-2 p-1 border rounded-full">
          <div className="rounded-full w-9 h-9 hover:text-red-600 hover:bg-gray-300 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="eliminar" onClick={onclick} data-position={position}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
          </div>
          <div className="rounded-full w-9 h-9 hover:bg-gray-300 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="vincular" onClick={onclick} data-position={position}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-share"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M15 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M8.7 10.7l6.6 -3.4" /><path d="M8.7 13.3l6.6 3.4" /></svg>
          </div>
          <div className="rounded-full w-9 h-9 hover:bg-gray-300 hover:cursor-pointer transition-colors flex justify-center items-center" data-action="agregar" onClick={onclick} data-position={position}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-layout-grid-add"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" /><path d="M14 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" /><path d="M4 15a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -4" /><path d="M14 17h6m-3 -3v6" /></svg>
          </div>
          {/* <div className="absolute top-full right-1 border rounded-3xl bg-white w-[300px] h-[200px]"></div> */}
        </div>
      </div>
    </>
  )
}

export default function SeccionPrecios(children:any) {
  const {orden, setorden, setopen, openmodal, modelos, setmodelos} = children
  const [info,setInfo] = useState([INITIAL_PRICE])

  const onchange = (e)=>{
    console.log("EL input referen es:",e.target.dataset.origen)
    const origen = e.target.dataset.origen
    const position = parseInt(e.target.dataset.position)
    const pricemodel = parseInt(e.target.dataset.pricemodel)
    const valor = parseFloat(e.target.value)

    console.log("La infor de orden es:",orden)
    if(orden[0].precios){
      console.log("La preicemodel es :",pricemodel)

      if(orden[0].precios[pricemodel-1]){
        const p = orden[0].precios[pricemodel-1]?.[origen] ?? [0,0]
        p[position] = valor
        // setorden([{...orden[0],precios:{...orden[0].precios,[origen]:p}}])
  
        // [{price1:[],price2:[]},{price1:[],price2:[]}]
        setorden([{
          ...orden[0],precios: [...orden[0].precios.map((r,k)=> (k == pricemodel - 1) ? {...r,[origen]:p} : r)]
        }])

      } else {
        const p = [0,0]
        p[position] = valor
        setorden([{
          ...orden[0],precios: [...orden[0].precios,{[origen]:p}]
        }])
      }

    } else {
      const p = [0,0]
      p[position] = valor
      // setorden([{...orden[0],precios:{[origen]:p}}])
      setorden([{...orden[0],precios:[{[origen]:p}]}])
    }
  }
  return <>
    <form onChange={onchange} className={`flex flex-col gap-3 p-1`}>
      <div className="flex flex-col gap-3"></div>
      {
        info.map((row,key)=><TemplatePrecios info={row} position={key+1} orden={orden} setInfo={setInfo} setopen={setopen} openmodal={openmodal} modelos={modelos} setmodelos={setmodelos}/>)
      }
    </form>
  </>
}