import { useEffect, useState } from "react"
import { Button } from "../../../components/Atoms/Button/Button"


// tallasbase.reduce((c,v)=>{c[v] = 0;return c;},{})

function VentanaIngresosTable({position,data,setregistros,registros,tallasbase}){
  const model = {fracciones_despacho:[
      {concepto:'INGRESO',...Object.fromEntries(tallasbase.map(v => [v, 0])),cantidad:0},
      {concepto:'CAIDOS',...Object.fromEntries(tallasbase.map(v => [v, 0])),cantidad:0},
      {concepto:'INCOMPLETOS',...Object.fromEntries(tallasbase.map(v => [v, 0])),cantidad:0},
    ]
  }
  const [ingreso,setIngreso] = useState(data.fracciones_despacho.length > 0 ? data : model)
  // const [ingreso,setIngreso] = useState([])
  console.log("Nuevo reenderizado del componente CuerpoDespachoTest", data)
  useEffect(()=>{
    console.log("La info recibida es:",data)
    if(data.fracciones_despacho.length > 0) setIngreso(data)
  },[data])

  const editvalue = (e)=>{
    const grupo = parseInt(e.target.dataset.grupo)
    const name = e.target.dataset.name
    const value = parseInt(e.target.value)
    // setData([...data.map((row,key)=> key == parseInt(position) ? {...row,[name]:parseInt(e.target.value)} : row)])
    console.log("Dentro de la edicion de cantidades despachos",grupo,name,value)
    
    setregistros(registros.map((row,key)=>key == position 
      ? {...row,fracciones_despacho: row.fracciones_despacho.length > 0
        ? row.fracciones_despacho.map((row2,key2)=>key2 == grupo ? {...row2,[name]:value} : row2) 
        : model.fracciones_despacho.map((row2,key2)=>key2 == grupo ? {...row2,[name]:value} : row2)
        } 
      : row))
    // console.log("INfo del reduce :",ingreso.despachos[0].fracciones.filter(row=>row.talla == 'xs'))
  }
  console.log("INfo del mango :",data)
  // console.log("INfo del reduce :",Object.values(data.despachos[0].fracciones.filter(row=>row.talla == 'xs')[0]).filter(item=>typeof item === 'number').reduce((c,v)=>c+v,0)) 
  return(
    <>
    <div className="scrollbar-special overflow-y-scroll mt-2 mb-2">
      <div className="flex flex-row justify-between px-4 rounded-lg bg-cyan-100 p-1 h-[40px] items-center"><strong>{data.articulo}</strong><strong className="italic text-[20px]">{data.cantidad}</strong></div>
      <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
        <thead className="text-left sticky top-0 bg-white">
          <tr>
            <th className="lg:table-cell">Concepto</th>
            {
              tallasbase.map(talla=>
                <th className="lg:table-cell">{talla.toUpperCase()}</th>    
              )
            }
            <th className="lg:table-cell">CantidadIngreso</th>
            {/* <th className="lg:table-cell">Acciones</th> */}
          </tr>
        </thead>
        <tbody>
          {
            ingreso.fracciones_despacho.map((row,key)=>(
              <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent h-[45px]">
                <td><input type="text" onChange={editvalue} data-name="color_combo" data-grupo={key} value={row.concepto} /></td>
                {
                  tallasbase.map(talla=>
                    <td><input data-name={talla} type="number" onChange={editvalue} data-grupo={key} value={row[talla] ?? 0}/></td>
                  )
                }
                <td><input data-name="cantidad" type="number" onChange={(editvalue)} data-grupo={key} value={tallasbase.reduce((c,v)=>{
                  c += row[v] ?? 0
                  return c
                },0)}/></td>
              </tr>
            ))
          }
        </tbody>
        <tfoot>
          <tr className="h-[45px] font-bold">
            <td>SUBTOTAL:</td>
            {
              tallasbase.map(talla=>
                <td>{ingreso.fracciones_despacho.reduce((c,v)=>c+parseInt(v[talla] ?? 0),0)}</td>
              )
            }
            <td>{ingreso.fracciones_despacho.reduce((c,v)=>c+tallasbase.reduce((cc,vv)=>cc+(v[vv] ?? 0),0),0)}</td>
          </tr>
          <tr className="h-[45px] font-bold">
            <td>SALDO:</td>
            {
              tallasbase.map(talla=>
                <td>{(data.fracciones.filter(row=>row.talla == talla)[0].cantidad) - (data.despachos.length > 0 ? data.despachos.reduce((c1,v1)=>c1 + ( v1.fracciones.length > 0 ? Object.values(v1.fracciones.filter(row=>row.talla == talla)[0]).filter(item=>typeof item === 'number').reduce((c,v)=>c+v,0) : 0) ,0) : 0)}</td>    
              )
            }
            <td>{data.fracciones.reduce((c,v)=>c+v.cantidad,0) - (data.despachos.length > 0 ? data.despachos.reduce((c1,v1)=>c1 + ( v1.fracciones.length > 0 ? v1.fracciones.reduce((c,v)=>c + v.caidos + v.despachos + v.incompletos,0) : 0 ),0) : 0)}</td>
          </tr>
          <tr className="h-[45px] font-bold">
            <td>DIFERENCIA:</td>
            {
              tallasbase.map(talla=>
                <td>{(data.fracciones.filter(row=>row.talla == talla)[0].cantidad) - (data.despachos.length > 0 ? data.despachos.reduce((c1,v1)=>c1 + (v1.fracciones.length > 0 ? Object.values(v1.fracciones.filter(row=>row.talla == talla)[0]).filter(item=>typeof item === 'number').reduce((c,v)=>c+v,0) : 0),0) : 0) - ingreso.fracciones_despacho.reduce((c,v)=>c+parseInt(v[talla] ?? 0),0)}</td>
              )
            }
            <td>{data.fracciones.reduce((c,v)=>c+v.cantidad,0) - (data.despachos.length > 0 ? data.despachos.reduce((c1,v1)=>c1 + (v1.fracciones.length > 0 ? v1.fracciones.reduce((c,v)=>c + v.caidos + v.despachos + v.incompletos,0) : 0),0) : 0) - ingreso.fracciones_despacho.reduce((c,v)=>c+tallasbase.reduce((cc,vv)=>cc+parseInt(v[vv] ?? 0),0),0)}</td>
          </tr>
        </tfoot>
      </table>
    </div>

    </>
  )
}
export default function VentanaIngresos({registros,setregistros,setopen,tallasbase}){
  const [copia,setCopia] = useState([])
  useEffect(()=>{
    console.log("Imprimierdo mi primer efecto",registros)
    setCopia(JSON.parse(JSON.stringify(registros)).reduce((c,v)=>{
      if(v.fracciones_despacho.length > 0){
        v.fracciones_despacho = [
          v.fracciones_despacho.reduce((cc,vv)=>{
            cc[vv.talla] = vv.cantidad
            return cc
          },{concepto:'INGRESO'}),
          v.fracciones_despacho.reduce((cc,vv)=>{
            cc[vv.talla] = vv.caidos
            return cc
          },{concepto:'CAIDOS'}),
          v.fracciones_despacho.reduce((cc,vv)=>{
            cc[vv.talla] = vv.incompletos
            return cc
          },{concepto:'INCOMPLETOS'}),
        ]
      }
      c.push(v)
      return c
    },[]))
  },[])
  // console.log("La info de la copia es :",copia)
  const actualizar = ()=>{
    console.log("Banana:",copia)
    const kk = copia.map(row=>
      ({...row,
        despacho:row.fracciones_despacho.length > 0 
            ? tallasbase.reduce((c,v)=>c+parseInt(row.fracciones_despacho[0][v]),0) 
            : 0,
        caidos:row.fracciones_despacho.length > 0 
            ? tallasbase.reduce((c,v)=>c+parseInt((row.fracciones_despacho[1])[v]),0) 
            : 0,
        incompletos:row.fracciones_despacho.length > 0 
            ? tallasbase.reduce((c,v)=>c+parseInt((row.fracciones_despacho[2])[v]),0) 
            : 0,
        fracciones_despacho: row.fracciones_despacho.length > 0
        ? tallasbase.map(item=>({talla:item,cantidad:row.fracciones_despacho[0][item],caidos:row.fracciones_despacho[1][item],incompletos:row.fracciones_despacho[2][item]}))
        : []
      }))
      console.log("Enoelmaiz :",kk)

    setregistros(reg=>reg.map((row,key)=>{
      return row.id_item == kk[0].id_item ? kk[0] : row 
    }))
    setopen(false)
  }
  return(
    <>
      <div className="flex flex-col w-[1100px] h-[500px]">
        <div className="flex-1 overflow-y-auto scrollbar-special ">
        {
          copia.length > 0 && copia.map((row,key)=><VentanaIngresosTable position={key} data={row} setregistros={setCopia} registros={copia} tallasbase={tallasbase}/>)
        }
        </div>
        <div className="p-2 flex flex-row justify-end gap-2">
          <Button tipo={'default'} type={'button'} action={()=>setopen(false)}>Cancelar</Button>
          <Button tipo={'default'} type={'button'} action={actualizar}>Aceptar</Button>
        </div>
      </div>
    </>
  )
}