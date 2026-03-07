import { Input } from "../../../components/Atoms/Input/Input";
import { InputSelect } from "../../../components/Atoms/Input/InputSelect";
import { TextArea } from "../../../components/Atoms/Input/TextArea";
import Table from "../../../components/Atoms/Table/Table";

export default function SeccionPrincipal({
  info,
  fases,
  condicionpago,
  form,
  listaordenes,
  nuevoproveedor,
  distribucion,
  nuevoregistro,
  setCondicionPago,
  tallasbase,
  registros,
  editvalue,
  urlparams,
  paquetes,
  editpaquete,
  nuevopaquete,
  onclick
}){
  return(
    <div className={` flex-col gap-3 h-full flex`}>
      <div className="flex items-center gap-2 mt-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
        <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
      </div>
      <hr/>
      <div className="flex flex-col gap-3">
        <Input name={'idx'} defaults={Object.keys(info).length > 0 ? info.idx : null} type="hidden" />
        <Input name={'id_orden_CAB'} defaults={Object.keys(info).length > 0 ? info.id_orden_CAB : null} type="hidden" verify="true" />
        <Input name={'tipo'} defaults={'SERVICIOS'} type="hidden" placeholder={'Info referencial'}/>
        <Input name={'id_corte_CAB'} defaults={Object.keys(info).length > 0 ? info.id_corte_CAB : null} type="hidden"/>
        <div className="w-[300px]">
          {
            fases.length > 0
            ? <InputSelect title={'Servicio'} name={"servicio"} data={fases.map(fase=>({indice:fase.ruta,option:fase.ruta}))} formref={form} df={Object.keys(info).length > 0 ? info.servicio : null} placeholder={'Info referencial'}
            />
            : <Input name={''} defaults={null} type="text" title="Servicio" />
          }
        </div>
        <div className="w-[40%] flex gap-3">
          <Input name={'orden_ref'} title="OP/OC" defaults={Object.keys(info).length > 0 ? info.orden_ref : null} type="text" action={listaordenes} mode={'static'} verify="true" placeholder={'Info referencial'}/>
          <Input name={'id_proveedor_CAB'} defaults={Object.keys(info).length > 0 ? info.id_proveedor_CAB : null} type="hidden" verify="true"/>
          <Input name={'modelo'} title="Modelo" defaults={Object.keys(info).length > 0 ? info.modelo : null} type="text" verify="true" placeholder={'Info referencial'}/>
        </div>
        <div className="w-[65%] flex gap-3">
          <Input name={'marca'} title="Marca" defaults={Object.keys(info).length > 0 ? info.marca : null} type="text" verify="true" placeholder={'Info referencial'}/>
          <Input name={'producto'} title="Producto" defaults={Object.keys(info).length > 0 ? info.producto : null} type="text" verify="true" placeholder={'Info referencial'}/>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
        <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
      </div>
      <hr/>
      <div className="flex flex-row gap-3 w-[37%]">
        <Input name={'proveedor'} title="Proveedor" defaults={Object.keys(info).length > 0 ? info.proveedor : null} type="text" action={nuevoproveedor} mode={'static'} verify="true" placeholder={'Info referencial'}/>
      </div>
      <div className="flex flex-row gap-3 w-[45%]">
        <Input name={'costo'} title="Costo" defaults={Object.keys(info).length > 0 ? info.costo : null} type="number" verify="true" placeholder={'Info referencial'}/>
        <Input name={'responsable'} title="Responsable" defaults={Object.keys(info).length > 0 ? info.responsable : null} type="text" verify="true" placeholder={'Info referencial'}/>
      </div>
      <div className="flex flex-row gap-3 w-[58%]">
        <Input name={'fec_emision'} title="FecEmision" defaults={Object.keys(info).length > 0 ? info.fec_emision : null} type="date" verify="true" placeholder={'Info referencial'}/>
        <Input name={'fec_recepcion'} title="FecRecepcion" defaults={Object.keys(info).length > 0 ? info.fec_recepcion : null} type="date" placeholder={'Info referencial'}/>
        <Input name={'fec_retorno'} title="FecRetorno" defaults={Object.keys(info).length > 0 ? info.fec_retorno : null} type="date" verify="true" placeholder={'Info referencial'}/>
      </div>
      <div className="flex flex-row gap-3 w-[65%]">
        <Input name={'motivo_traslado'} title="Motivo traslado" defaults={Object.keys(info).length > 0 ? info.motivo_traslado : null} type="text" verify="true" placeholder={'Info referencial'}/>
        <InputSelect title={'Estado'} name={"estado"} data={
          [
            { indice: 'PENDIENTE', option: 'PENDIENTE', selected: true }, 
            { indice: 'FINALIZADO', option: 'FINALIZADO' }, 
            { indice: 'ANULADO', option: 'ANULADO' }, 
          ]} 
          df={Object.keys(info).length > 0 ? info.estado : null} 
          placeholder={'Info referencial'}
        />
      </div>
      <div className="flex flex-row gap-3 w-[45%]">
        <InputSelect title={'TipoDistribucion'} formref={form} name={"distribucion"} data={
          [
            { indice: 'TLL', option: 'TALLAS', selected: true }, 
            { indice: 'GLB', option: 'GLOBALES' }, 
            { indice: 'PQT', option: 'PAQUETES' }, 
          ]} 
          df={Object.keys(info).length > 0 ? info.distribucion : null} 
          placeholder={'Info referencial'}
        />
        <InputSelect title={'IGV(18%)'} name={"igv"} data={
          [
            { indice: '0', option: 'APLICA', selected: true }, 
            { indice: '1', option: 'NO APLICA' }, 
          ]} 
          df={Object.keys(info).length > 0 ? info.igv : null} 
          placeholder={'Info referencial'}
        />
      </div>
      <div className="flex gap-3">
        <div className="w-[450px]">
          <InputSelect title={'CondiciónPago'} formref={form} name={"condicion_pago"} data={
            [
              { indice: 1, option: 'PAGO CONTRA ENTREGA', selected: true }, 
              { indice: 2, option: 'PAGO PROGRAMADO' },
              { indice: 3, option: 'PAGO SEMANAL' },
              { indice: 4, option: 'PAGO CON ADELANTO + PROGRAMACION' },
            ]} 
            df={Object.keys(info).length > 0 ? info.condicion_pago : null} 
            placeholder={'Info referencial'}
          />
        </div>
        {
          condicionpago == 4 && <div className="w-[300px]"><Input name={'porcentaje_adelanto'} defaults={Object.keys(info).length > 0 && info.porcentaje_adelanto ? info.porcentaje_adelanto : null} title="PorcentajeAdelanto(%)" type="number" verify="true" placeholder={'Info referencial'}/></div>
        }
        {
          [2,4].includes(condicionpago) && <div className="w-[300px]"><Input name={'programacion'} defaults={Object.keys(info).length > 0 && info.programacion ? info.programacion : null} title="Programacion(Dias)" type="number" verify="true" placeholder={'Info referencial'}/></div>
        }
        {/* <div className="w-[380px]">
          <InputSelect title={'IGV(18%)'} name={"igv"} data={
            [
              { indice: '0', option: 'APLICA', selected: true }, 
              { indice: '1', option: 'NO APLICA' }, 
            ]} 
            df={Object.keys(info).length > 0 ? info.igv : null} 
            placeholder={'Info referencial'}
          />
        </div> */}
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
        <span className="inline-block align-middle text-[12px]">Detalle de los artículos</span>
      </div>
      <hr/>
      <div className={`${distribucion == 'PQT' && 'hidden'}`}>
        <Table
          actions={[
            {
              name:'add',
              trigger:nuevoregistro,
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
            },
            {
              name:'clear',
              trigger:()=>{setCondicionPago(4)},
              icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eraser"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" /><path d="M18 13.3l-6.3 -6.3" /></svg>
            }
          ]}
          headcontent={
            <tr>
              <th className="lg:table-cell w-[500px]">Descripcion</th>
              <th className="lg:table-cell">Disponibles</th>
              {
                tallasbase.length > 0 && tallasbase.map(talla=>
                  <th className="lg:table-cell">{talla.toUpperCase()}</th>    
                )
              }
              <th className="lg:table-cell">Cantidad</th>
              <th className="lg:table-cell">Adicional</th>
              <th className="lg:table-cell">Acciones</th>
            </tr>
          }
          bodycontent={
            registros.length > 0 && registros.map((row,key)=>(
              <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                <td><input type="text" onChange={editvalue} data-name="articulo" data-position={key} value={row.articulo} /></td>
                <td className="text-center w-[150px]">{urlparams.id ? (row.disponible_total + row.cantidad) : row.disponible_total}</td>
                {
                  tallasbase.map(talla=>
                    <td><input data-name={talla} type="number" onChange={editvalue} data-position={key} value={row[talla] ?? 0} className="fracciones"/></td>    
                  ) 
                }
                <td><input type="number" onChange={editvalue} data-position={key} data-name="cantidad" value={row.cantidad} className="fracciones"/></td>
                <td><input type="checkbox" id="isprototipo" onChange={editvalue} data-position={key} data-name="isprototipo" checked={row.isprototipo} className="fracciones"/></td>
                <td className="w-[250px]">
                  <ul className="flex flex-row justify-end">
                    <li>
                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-position={key}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                      </div>
                    </li>
                    <li>
                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="download">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                      </div>
                    </li>
                    <li>
                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="review">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                      </div>
                    </li>
                    <li>
                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="" onClick={()=>{}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                      </div>
                    </li>
                    <li>
                      <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={()=>{}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                      </div>
                    </li>
                  </ul>
                </td>
              </tr>
            ))
          }
        />
        {/* <div className="h-[380px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-1"> 
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell w-[500px]">Descripcion</th>
                <th className="lg:table-cell">Disponibles</th>
                {
                  tallasbase.length > 0 && tallasbase.map(talla=>
                    <th className="lg:table-cell">{talla.toUpperCase()}</th>    
                  )
                }
                <th className="lg:table-cell">Cantidad</th>
                <th className="lg:table-cell">Adicional</th>
                <th className="lg:table-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                registros.length > 0 && registros.map((row,key)=>(
                  <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                    <td><input type="text" onChange={editvalue} data-name="articulo" data-position={key} value={row.articulo} /></td>
                    <td className="text-center w-[150px]">{urlparams.id ? (row.disponible_total + row.cantidad) : row.disponible_total}</td>
                    {
                      tallasbase.map(talla=>
                        <td><input data-name={talla} type="number" onChange={editvalue} data-position={key} value={row[talla] ?? 0} className="fracciones"/></td>    
                      ) 
                    }
                    <td><input type="number" onChange={editvalue} data-position={key} data-name="cantidad" value={row.cantidad} className="fracciones"/></td>
                    <td><input type="checkbox" id="isprototipo" onChange={editvalue} data-position={key} data-name="isprototipo" checked={row.isprototipo} className="fracciones"/></td>
                    <td className="w-[250px]">
                      <ul className="flex flex-row justify-end">
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-position={key}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="download">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="review">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="" onClick={()=>{}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={()=>{}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                          </div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))
              }
            </tbody>
            <tfoot className="sticky bottom-0">
              <tr>
                <td colSpan={12} >
                  <div className="flex flex-row justify-center">
                    <div onClick={nuevoregistro} className="bg-green-500 w-[250px] h-[20px] flex flex-row justify-center items-center text-center rounded-xl text-white text-[15px] font-bold cursor-pointer hover:bg-green-600">
                      +
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div> */}
      </div>
      <div className={`${distribucion !== 'PQT' && 'hidden'}`}>
        <span>Paquetes:</span>
        <div className="h-[380px] scrollbar-special rounded-md overflow-y-scroll border-t-[.2px] border-b-[.2px] mt-2"> 
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell w-[500px]">Paquete</th>
                <th className="lg:table-cell">XS / 26</th>
                <th className="lg:table-cell">S / 28</th>
                <th className="lg:table-cell">M / 30</th>
                <th className="lg:table-cell">L / 32</th>
                <th className="lg:table-cell">XL / 34</th>
                <th className="lg:table-cell">XXL / 36</th>
                <th className="lg:table-cell">Cantidad</th>
                <th className="lg:table-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                paquetes.length > 0 && paquetes.map((row,key)=>(
                  <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                    <td><input type="text" onChange={editpaquete} data-name="articulo" data-position={key} value={row.articulo} /></td>
                    <td><input data-name="xs" type="number" onChange={editpaquete} data-position={key} value={row.xs} className="fracciones"/></td>
                    <td><input data-name="s" type="number" onChange={editpaquete} data-position={key} value={row.s} className="fracciones"/></td>
                    <td><input data-name="m" type="number" onChange={editpaquete} data-position={key} value={row.m} className="fracciones"/></td>
                    <td><input data-name="l" type="number" onChange={editpaquete} data-position={key} value={row.l} className="fracciones"/></td>
                    <td><input data-name="xl" type="number" onChange={editpaquete} data-position={key} value={row.xl} className="fracciones"/></td>
                    <td><input data-name="xxl" type="number" onChange={editpaquete} data-position={key} value={row.xxl} className="fracciones"/></td>
                    <td><input type="number" onChange={editpaquete} data-position={key} data-name="cantidad" value={row.cantidad} className="fracciones"/></td>
                    <td className="w-[250px]">
                      <ul className="flex flex-row justify-end">
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-position={key}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="download">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="review">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="" onClick={()=>{}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="edit" onClick={()=>{}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                          </div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))
              }
            </tbody>
            <tfoot className="sticky bottom-0">
              <tr>
                <td colSpan={10} >
                  <div className="flex flex-row justify-center">
                    <div onClick={nuevopaquete} className="bg-blue-500 w-[200px] h-[25px] flex flex-row justify-center items-center text-center rounded-md text-white text-[15px] font-bold cursor-pointer hover:bg-blue-600">
                      +
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div>
        <TextArea title="Observaciones" name="observaciones" valor={Object.keys(info).length > 0 ? info.observaciones : null} rows={4} />
      </div>
    </div>
  )
}