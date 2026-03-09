import { useEffect, useState } from "react";
import { INITIAL_PRICE } from "../constants/constants";
import TemplatePrecios from "./TemplatePrecios";


export default function SeccionPrecios(children:any) {
  const {orden, setorden, setopen, openmodal, modelos, setmodelos} = children
  const [info,setInfo] = useState(orden[0].precios ?? [INITIAL_PRICE])

  useEffect(()=>{
    console.log("La info de la orden es :",orden)
  },[])

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