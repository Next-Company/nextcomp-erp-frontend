import { useEffect, useRef, useState } from "react";
import { Input } from "../../../components/Atoms/Input/Input";
import { TextArea } from "../../../components/Atoms/Input/TextArea";
import { toast } from "react-toastify";
import Recetas from "../../../components/Common/Recetas";
import Colores from "../../../components/Common/Colores";
import ColoresBase from "./ColoresBase";


export default function SeccionPrecios(children:any) {
  const {orden, setorden} = children

  const onchange = (e)=>{
    console.log("EL input referen es:",e.target.dataset.origen)
    const origen = e.target.dataset.origen
    const position = parseInt(e.target.dataset.position)
    const valor = parseFloat(e.target.value)
    // {precio1:[23,14],precio2:[13.23,89.34]}

    console.log("La infor de orden es:",orden)
    if(orden[0].precios){
      const p = orden[0].precios?.[origen] ?? [0,0]
      p[position] = valor
      setorden([{...orden[0],precios:{...orden[0].precios,[origen]:p}}])
    } else {
      const p = [0,0]
      p[position] = valor
      setorden([{...orden[0],precios:{[origen]:p}}])
    }
  }
  return <>
    <form onChange={onchange} className={`flex flex-col gap-3`}>
      <div className="flex flex-col gap-3"></div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
          <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
        </div>
        <hr/>
        <div className="flex flex-row gap-3">
          <Input name={'idx'} defaults={orden.length > 0 ? orden[0].idx : null} type="hidden" />
          <Input name={'precio1_a'} dataset={[{origen:'precio1'},{position:0}]} title="Hangta(S/)" defaults={orden.length > 0 ? orden[0].precios?.precio1?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio hantag'}/>
          <Input name={'precio2_a'} dataset={[{origen:'precio2'},{position:0}]} title="Retail(S/)" defaults={orden.length > 0 ? orden[0].precios?.precio2?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio retail'}/>
          <Input name={'precio3_a'} dataset={[{origen:'precio3'},{position:0}]} title="Promo(S/)" defaults={orden.length > 0 ? orden[0].precios?.precio3?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio retail'}/>
          <Input name={'precio4_a'} dataset={[{origen:'precio4'},{position:0}]} title="Unidad(S/)" defaults={orden.length > 0 ? orden[0].precios?.precio4?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio retail'}/>
          <Input name={'precio5_a'} dataset={[{origen:'precio5'},{position:0}]} title="PorMayor(S/)" defaults={orden.length > 0 ? orden[0].precios?.precio5?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio retail'}/>
          <Input name={'precio6_a'} dataset={[{origen:'precio6'},{position:0}]} title="Distribuidor(S/)" defaults={orden.length > 0 ? orden[0].precios?.precio6?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio retail'}/>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
          <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
        </div>
        <hr/>
        <div className="flex flex-row gap-3">
          <Input name={'idx'} defaults={orden.length > 0 ? orden[0].idx : null} type="hidden" />
          <Input name={'precio1_b'} dataset={[{origen:'precio1'},{position:1}]} title="Hangta($)" defaults={orden.length > 0 ? orden[0].precios?.precio1?.[0] ?? 0 : 0} type="number" verify="true" placeholder={'Precio hantag'}/>
          <Input name={'precio2_b'} dataset={[{origen:'precio2'},{position:1}]} title="Retail($)" defaults={orden.length > 0 ? orden[0].precios?.precio2?.[1] ?? 0 : 0} type="number" verify="true" placeholder={'Precio retail'}/>
          <Input name={'precio3_b'} dataset={[{origen:'precio3'},{position:1}]} title="Promo($)" defaults={orden.length > 0 ? orden[0].precios?.precio3?.[1] ?? 0 : 0} type="number" verify="true" placeholder={'Precio retail'}/>
          <Input name={'precio4_b'} dataset={[{origen:'precio4'},{position:1}]} title="Unidad($)" defaults={orden.length > 0 ? orden[0].precios?.precio4?.[1] ?? 0 : 0} type="number" verify="true" placeholder={'Precio retail'}/>
          <Input name={'precio5_b'} dataset={[{origen:'precio5'},{position:1}]} title="PorMayor($)" defaults={orden.length > 0 ? orden[0].precios?.precio5?.[1] ?? 0 : 0} type="number" verify="true" placeholder={'Precio retail'}/>
          <Input name={'precio6_b'} dataset={[{origen:'precio6'},{position:1}]} title="Distribuidor($)" defaults={orden.length > 0 ? orden[0].precios?.precio6?.[1] ?? 0 : 0} type="number" verify="true" placeholder={'Precio retail'}/>
        </div>
      </div>
    </form>
  </>
}