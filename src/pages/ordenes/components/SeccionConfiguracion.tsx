import { useEffect, useRef } from "react";
import { Input } from "../../../components/Atoms/Input/Input";
import { InputSelect } from "../../../components/Atoms/Input/InputSelect";
import { TextArea } from "../../../components/Atoms/Input/TextArea";
import Guias from "../../../components/Common/Guias";
import { Consulta } from "../../../utils/utils";
import { toast } from "react-toastify";

export default function SeccionConfiguracion(children:any) {
  const {setOpen,openModal,setOpenloader,setRegistros,tallaslist,orden} = children
  const info = []

  useEffect(() => {
    setOpenloader(true)
    Consulta({url:'ordenes/extraerdisponiblemodelos/' + orden })
    .then((resp)=>{
      console.log("Los registros de la orden son :",resp)
      if(resp.length > 0){
        // setInfo(info=>({...info,id_orden_CAB:item.idx,id_corte_CAB:item.id_corte,orden_ref:item.oc,marca:item.marca,modelo:item.modelos,producto:item.producto}))
        // setRegistros(resp)
      }else{
        toast.warning('No se encontraron datos disponibles.', { theme: "colored" })
      }
    })
    .catch((error)=>{
      console.log("Error con la consulta",error)
    })
    .finally(()=>{
      setOpenloader(false)
    })

  })


  const nuevoproveedor = async () => {
    alert('Funcion para agregar nuevo proveedor');
  }
  const searchproducto = async () => {
    alert('Funcion para buscar producto');
  }
  const nuevamarca = async () => {
    alert('Funcion para agregar nueva marca');
  }
  const editvalue = async (e: React.ChangeEvent<HTMLInputElement>) => {

  }
  const agregarcombo = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

  }
  const add_insumo = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

  }
  const onclick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {

  }
  const fases = []
  const searchguia = () => {
    let params_modal = null
    params_modal = {
      open: true,
      content: <Guias actions={(item) => {
        // console.log("El item seleccionado es: ",item)
        setOpenloader(true)
        setOpen(false)
        Consulta({ url: 'produccion/guia/' + item.idx })
          .then(resp => {
            console.log("La info de la sandia enero es:",resp)
            setInfo(info => ({ ...info, id_guia_origen: item.idx, nro_guia_origen: item.idx, id_proveedor_CAB: item.id_proveedor_CAB, proveedor: item.proveedor, distribucion: item.distribucion }))
            console.log("Los registros de la guia son:", resp[1])
            // setRegistros(resp[1].map(row => ({ ...row, despacho: 0, caidos: 0 })))
            setRegistros(resp[1].map(row => {
              row = { ...row, id_item: row.idx, despacho: 0, caidos: 0, incompletos: 0 }
              Reflect.deleteProperty(row, 'idx')
              return row
            }))
          })
          .catch((err) => {
            setOpenloader(false)
          })
          .finally(() => {
            setOpenloader(false)
          })
      }} />,
      controls: false,
      header: false,
      action: () => {
      }
    }
    openModal(params_modal)
  }
  return <>
    <div className={`flex flex-col gap-3`}>
      <div className="flex flex-col gap-3"></div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
          <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
        </div>
        <hr/> 
        <Input name={'idx'} defaults={info.length > 0 ? info[0].idx : null} type="hidden" />
        <div className="w-[500px]">
          <Input name={'oc'} title="OP" defaults={info.length > 0 ? info[0].oc : null} type="text" verify="true" placeholder={'Numero de la orden'}/>
        </div>
        <Input name={'id_cliente_CAB'} defaults={info.length > 0 ? info[0].id_cliente_CAB : null} type="hidden" verify="true"/>
        <div className="w-[350px]">
          <Input name={'cliente'} title="Guia" defaults={info.length > 0 ? info[0].cliente : null} type="text" action={searchguia} mode={'static'} verify="true" placeholder={'Numero de la orden'}/>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
        <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
      </div>
      <div className="h-[300px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] mt-2">
        <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
          <thead className="text-left sticky top-0 bg-white">
            <tr>
              <th className="lg:table-cell w-[500px]">ColorCombo</th>  
              {
                tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map(talla=>
                  <th className="lg:table-cell">{talla.toUpperCase()}</th>
                )
              }
              {/* <th className="lg:table-cell">S/T</th>
              <th className="lg:table-cell">XS / 26</th>
              <th className="lg:table-cell">S / 28</th>
              <th className="lg:table-cell">M / 30</th>
              <th className="lg:table-cell">L / 32</th>
              <th className="lg:table-cell">XL / 34</th>
              <th className="lg:table-cell">XXL / 36</th> */}
              <th className="lg:table-cell">CantidadCombo</th>
              <th className="lg:table-cell">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {
              Object.keys(info).length > 0 && info.combos && info.combos.map((row,key)=>(
                <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                  <td><input type="text" onChange={editvalue} data-name="color_combo" data-position={key} value={row.color_combo} /></td>
                  {
                    tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map(talla=>
                      <td><input data-name={talla} type="number" onChange={editvalue} data-position={key} value={row[talla]}/></td>    
                    )
                  }
                  {/* <td><input data-name="st" type="number" onChange={editvalue} data-position={key} value={row.st}/></td>
                  <td><input data-name="xs" type="number" onChange={editvalue} data-position={key} value={row.xs}/></td>
                  <td><input data-name="s" type="number" onChange={editvalue} data-position={key} value={row.s}/></td>
                  <td><input data-name="m" type="number" onChange={editvalue} data-position={key} value={row.m}/></td>
                  <td><input data-name="l" type="number" onChange={editvalue} data-position={key} value={row.l}/></td>
                  <td><input data-name="xl" type="number" onChange={editvalue} data-position={key} value={row.xl}/></td>
                  <td><input data-name="xxl" type="number" onChange={editvalue} data-position={key} value={row.xxl}/></td> */}
                  <td><input data-name="cantidad_combo" type="number" onChange={(editvalue)} data-position={key} value={row.cantidad_combo}/></td>
                  <td className="w-[250px]">
                    <ul className="flex flex-row justify-end">
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete_combo_orden" onClick={onclick} data-position={key} data-id={info.idx}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="download">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={add_insumo} data-insumos={JSON.stringify(row.insumos)} data-position={key}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-arrows-join"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7h5l3.5 5h9.5" /><path d="M3 17h5l3.495 -5" /><path d="M18 15l3 -3l-3 -3" /></svg>
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))
            }
          </tbody>
          <tfoot className="sticky bottom-0 bg-white">
            <tr>
              <td colSpan={6} className="text-right"></td>
              <td className="text-center font-black">TOTAL</td>
              <td className="text-center text-[15px] font-black"></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={10} >
                <div className="flex flex-row justify-center">
                  <div onClick={agregarcombo} data-id={info.idx} className="bg-green-500 w-[250px] h-[20px] flex flex-row justify-center items-center text-center rounded-full text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
                    +
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div>
        <TextArea title="Observaciones" name="observaciones_fase_ordenes" />
      </div>
    </div>
  </>
}