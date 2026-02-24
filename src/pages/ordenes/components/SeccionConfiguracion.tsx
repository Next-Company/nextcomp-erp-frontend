import { useEffect, useRef, useState } from "react";
import { Input } from "../../../components/Atoms/Input/Input";
import ColoresBase from "./ColoresBase";
import { InputSelect } from "../../../components/Atoms/Input/InputSelect";
import { Search } from "../../../components/Atoms/Search/Search";

const EQUIVALENTSIZES = {
  'st':{'1':'st','2':'st','3':'st'},
  'xs':{'2':'26','3':'8'},
  's':{'2':'28','3':'10'},
  'm':{'2':'30','3':'12'},
  'l':{'2':'32','3':'14'},
  'xl':{'2':'34','3':'16'},
  'xxl':{'2':'36'},
  '26':{'1':'xs','3':'8'},
  '28':{'1':'s','3':'10'},
  '30':{'1':'m','3':'12'},
  '32':{'1':'l','3':'14'},
  '34':{'1':'xl','3':'16'},
  '36':{'1':'xxl'},
  '8':{'1':'xs','2':'26'},
  '10':{'1':'s','2':'28'},
  '12':{'1':'m','2':'30'},
  '14':{'1':'l','2':'32'},
  '16':{'1':'xl','2':'34'}   
}
function FraccionadoByModelo(children:any){
  const {tallaslist,modelos,editvalue,onclick,disponible,agregarmodelo,orden,setmodelos,disponible_detalle} = children
  const onchange = (e)=>{
    const position = e.target.dataset.position
    const checked = e.target.checked
    setmodelos(modelos.map((modelo,key)=>key == position ? {...modelo,idreceta: (checked ? orden[0].id_receta : null), articulo: (checked ? orden[0].modelos : '')} : modelo))
    // console.log("HOla jupiter",orden,position,e.target.checked)
  }
  return(
    <>
      <div>
        <div className="flex flex-row justify-between rounded-full mb-2">
          <div className="w-[400px]">
            {/* <Search placeholder="Buscar por modelo o color" onChange={(e)=>{}} /> */}
            <div className="flex items-center border rounded-full gap-3 bg-gray-200 pl-4 p-1 pr-4 has-[:focus]:bg-white has-[:focus]:shadow-md transition-all" onClick={onclick}>
              {
                0
                ? 
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-loader-2 animate-spin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3a9 9 0 1 0 9 9" /></svg>
                : 
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
              }
              <input type="searh" className={`h-[30px] flex-1 bg-transparent focus:outline-none`} placeholder="Busqueda soporte" />
            </div>
          </div>
          <div>
            <ul className="flex w-[150px] flex-row justify-end rounded-full p-[2px] gap-2 [&_div]:cursor-pointer border bg-gray-200">
              <li>
                <div className="rounded-full w-9 h-9 hover:bg-white hover:text-red-600 transition-colors flex justify-center items-center" data-action="clear" onClick={onclick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eraser"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" /><path d="M18 13.3l-6.3 -6.3" /></svg>
                </div>
              </li>
              <li>
                <div className="rounded-full w-9 h-9 hover:bg-white transition-colors flex justify-center items-center" data-action="add" onClick={agregarmodelo}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="overflow-hidden rounded-xl">
          <div className="h-[450px] scrollbar-special overflow-y-scroll border-t-[.2px] border rounded-xl bg-gray-200">
            <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100 [&_tbody_tr:nth-child(2n)]:bg-white">
              <thead className="text-left sticky top-0 bg-white">
                <tr>
                  <th className="lg:table-cell min-w-[300px]">Modelo</th>  
                  <th className="lg:table-cell min-w-[200px]">Color</th>
                  <th className="lg:table-cell min-w-[100px]">UsaReceta</th>
                  {
                    tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map(talla=>
                      <th className="lg:table-cell">{talla.toUpperCase()}</th>
                    )
                  }
                  <th className="lg:table-cell text-center">Disponible</th>
                  <th className="lg:table-cell">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  modelos && modelos.map((row,key)=>(
                    <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                      <td><input data-name="articulo" type="text" onChange={editvalue} data-position={key} value={row.articulo}/></td>
                      {/* <td className="text-center whitespace-nowrap">{row.articulo}</td> */}
                      <td className="text-center whitespace-nowrap">{row.color}</td>
                      <td className="text-center ">
                        <input type="checkbox" onChange={onchange} data-position={key}/>
                      </td>
                      {
                        tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map(talla=>
                          <td className="text-center"><input data-name={talla} type="number" onChange={editvalue} data-position={key} value={row[talla]}/></td>    
                        )
                      }
                      <td className="text-center">{tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').reduce((c,talla)=>c+parseInt(row[talla]||0),0)}</td>
                      <td className="w-[250px]">
                        <ul className="flex flex-row justify-end">
                          <li>
                            <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-position={key}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                            </div>
                          </li>
                          <li>
                            <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="divie" onClick={()=>{}} data-insumos={JSON.stringify(row.insumos)} data-position={key}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-vector-spline"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 4a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -2" /><path d="M3 18a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -2" /><path d="M17 5c-6.627 0 -12 5.373 -12 12" /></svg>
                            </div>
                          </li>
                          <li>
                            <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="vincular" onClick={onclick} data-position={key}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-color-swatch"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2" /><path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9" /><path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12" /><path d="M17 17l0 .01" /></svg>
                            </div>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
              <tfoot className="sticky bottom-0 bg-white">
                <tr className="h-[50px] text-[14px]">
                  {/* <td>{JSON.stringify(disponible_detalle)}</td> */}
                  <td></td>
                  <td></td>
                  {/* <td>{JSON.stringify(modelos)}</td> */}
                  <td className="text-center font-extrabold">DISPONIBLE</td>
                  {
                    tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map(talla=>
                      <td className="text-center font-extrabold">{
                        {...tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').reduce((c,v)=>{c[v] = 0; return c},{}),...disponible}[talla]
                      }</td>
                    )
                  }
                  <td className="text-center font-extrabold">{Object.keys(disponible).reduce((c,v)=>c + (disponible[v] ?? 0),0)}</td>
                  <td></td>
                </tr>
                <tr className="h-[50px] text-[14px]">
                  <td></td>
                  <td></td>
                  <td className="text-center font-extrabold">TOTAL</td>
                  {
                    tallaslist.filter(r=>r.selected)[0].tallasformateado.split('-').map(talla=>
                      <td className={`text-center font-extrabold ${disponible[talla] - modelos.reduce((c,v)=>c + parseInt((v[talla] ?? 0)),0) < 0 ? 'text-red-600' : ''}`}>
                        {
                          // disponible[talla] - modelos.reduce((c,v)=>c + parseInt((v[talla] ?? 0)),0)
                          {...tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').reduce((c,v)=>{c[v] = 0; return c},{}),...disponible}[talla] - modelos.reduce((c,v)=>c + parseInt((v[talla] ?? 0)),0)
                        }
                      </td>
                    )
                  }
                  {/* <td className="text-center font-extrabold">{Object.values(disponible).reduce((c,v)=>c + v,0) - 10}</td> */}
                  <td className={`text-center font-extrabold ${Object.keys(disponible).reduce((c,v)=>c + (disponible[v] ?? 0),0) - modelos.reduce((c,v)=>c + tallaslist.filter(r=>r.selected)[0].tallas.reduce((c,v2)=>c + parseInt(v[v2.desc] ?? 0),0),0) < 0 ? 'text-red-600' : ''}`}>
                    {
                      Object.keys(disponible).reduce((c,v)=>c + (disponible[v] ?? 0),0) - modelos.reduce((c,v)=>c + tallaslist.filter(r=>r.selected)[0].tallas.reduce((c,v2)=>c + parseInt(v[v2.desc] ?? 0),0),0)
                    }
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
function FraccionadoByReceta(children:any){
  const {tallaslist,modelos,editvalue,onclick,disponible,disponible_detalle} = children
  console.log("La informacion de los modelo es:",modelos)
  return(
    <>
      <div>

        <div className="py-2 flex flex-row justify-between">
          <div className="w-[400px]">
            <Search placeholder="Buscar por modelo o color" onChange={(e)=>{}} />
          </div>
          <div>
            <ul className="flex w-[150px] flex-row justify-end border rounded-full p-[2px] gap-2 [&_div]:cursor-pointer bg-gray-200">
              <li>
                <div className="rounded-full w-9 h-9 hover:bg-white hover:text-red-600 transition-colors flex justify-center items-center" data-action="clear" onClick={onclick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eraser"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" /><path d="M18 13.3l-6.3 -6.3" /></svg>
                </div>
              </li>
              <li>
                <div className="rounded-full w-9 h-9 hover:bg-white transition-colors flex justify-center items-center" data-action="add" onClick={()=>{}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                </div>
              </li>
            </ul>
          </div>
        </div>    
        <div className="h-[450px] scrollbar-special overflow-y-scroll border-t-[.2px] border rounded-xl bg-gray-200" style={{}}>
          <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:text-center [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-100 text-[12px] [&_tbody_tr:hover]:outline-red-600 [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100 [&_tbody_tr:nth-child(2n)]:bg-white">
            <thead className="text-left sticky top-0 bg-white">
              <tr>
                <th className="lg:table-cell min-w-[300px]">Modelo</th>  
                <th className="lg:table-cell min-w-[300px]">Color</th>  
                {
                  tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map(talla=>
                    <th className="lg:table-cell">{talla.toUpperCase()}</th>
                  )
                }
                <th className="lg:table-cell text-center">Disponible</th>
                <th className="lg:table-cell">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                modelos && modelos.map((row,key)=>(
                  <tr key={key} className="focus-visible:[&_input]:outline-[0px] focus-visible:[&_input]:bg-gray-200 focus-visible:[&_input]:border-black focus-visible:[&_input]:bg-transparent [&_input]:text-center [&_input]:p-[2px] [&_input]:w-full [&_input]:bg-transparent">
                    <td><input data-name="articulo" type="text" onChange={editvalue} data-position={key} value={row.articulo}/></td>
                    {/* <td className="text-center whitespace-nowrap">{row.articulo}</td> */}
                    <td className="text-center whitespace-nowrap">{row.color}</td>
                    {
                      tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map(talla=>
                        <td className="text-center"><input data-name={talla} type="number" onChange={editvalue} data-position={key} value={row[talla]}/></td>    
                      )
                    }
                    <td className="text-center">{tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').reduce((c,talla)=>c+parseInt(row[talla]||0),0)}</td>
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
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="divie" onClick={()=>{}} data-insumos={JSON.stringify(row.insumos)} data-position={key}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-vector-spline"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 4a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -2" /><path d="M3 18a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -2" /><path d="M17 5c-6.627 0 -12 5.373 -12 12" /></svg>
                          </div>
                        </li>
                        <li>
                          <div className="rounded-full w-9 h-9 hover:bg-gray-300 transition-colors flex justify-center items-center" data-action="vincular" onClick={onclick} data-position={key}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-color-swatch"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2" /><path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9" /><path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12" /><path d="M17 17l0 .01" /></svg>
                          </div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))
              }
            </tbody>
            <tfoot className="sticky bottom-0 bg-white">
              <tr className="h-[50px] text-[14px]">
                {/* <td>{JSON.stringify(disponible_detalle)}</td> */}
                <td></td>
                <td className="text-center font-extrabold">DISPONIBLE</td>
                {
                  tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').map(talla=>
                    <td className="text-center font-extrabold">{
                      {...tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').reduce((c,v)=>{c[v] = 0; return c},{}),...disponible}[talla]
                    }</td>
                  )
                }
                <td className="text-center font-extrabold">{Object.keys(disponible).reduce((c,v)=>c + (disponible[v] ?? 0),0)}</td>
                <td></td>
              </tr>
              <tr className="h-[50px] text-[14px]">
                <td></td>
                <td className="text-center font-extrabold">TOTAL</td>
                {
                  tallaslist.filter(r=>r.selected)[0].tallasformateado.split('-').map(talla=>
                    <td className={`text-center font-extrabold ${disponible[talla] - modelos.reduce((c,v)=>c + parseInt((v[talla] ?? 0)),0) < 0 ? 'text-red-600' : ''}`}>
                      {
                        {...tallaslist.filter(row=>row.selected)[0].tallasformateado.split('-').reduce((c,v)=>{c[v] = 0; return c},{}),...disponible}[talla] - modelos.reduce((c,v)=>c + parseInt((v[talla] ?? 0)),0)
                      }
                    </td>
                  )
                }
                <td className={`text-center font-extrabold ${Object.keys(disponible).reduce((c,v)=>c + (disponible[v] ?? 0),0) - modelos.reduce((c,v)=>c + tallaslist.filter(r=>r.selected)[0].tallas.reduce((c,v2)=>c + parseInt(v[v2.desc] ?? 0),0),0) < 0 ? 'text-red-600' : ''}`}>
                  {
                    Object.keys(disponible).reduce((c,v)=>c + (disponible[v] ?? 0),0) - modelos.reduce((c,v)=>c + tallaslist.filter(r=>r.selected)[0].tallas.reduce((c,v2)=>c + parseInt(v[v2.desc] ?? 0),0),0)
                  }
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  )
}

export default function SeccionConfiguracion(children:any) {
  const {openmodal,info,tallaslist,setTallasfracciones,setopen,modelos,setModelos,disponible,corte,disponible_detalle,usareceta,setUsaReceta} = children
  // const [tallaslist,setTallasList] = useState(tallastemplate)
  const [newdisponible,setNewDisponible] = useState(disponible)
  const [newdisponibledetalle,setNewDisponibleDetalle] = useState(disponible_detalle)
  // const [usareceta,setUsaReceta] = useState(0)
  const contenedor = useRef(null)

  const salamandra_receta = (event)=>{
    if(event.detail.name == 'fracciones_con_receta'){
      console.log("Dento de la condicon la infor es:",event.detail.valor,corte,newdisponibledetalle,tallaslist)

      setUsaReceta(event.detail.valor == 'SI' ? 1 : 0)
  
      if(event.detail.valor == 'SI'){
        const tallasbase = tallaslist.find(row=>row.selected)
        // console.log("La talla base es la siguiente dentro de codicion es:",tallasbase,disponible_detalle)
        const k = newdisponibledetalle.map(row=>{
          return {
            idreceta:row.id_receta,
            articulo:row.modelos,
            ...tallasbase.tallas.map(row=>row.desc).reduce((c,v)=>{
              c[v] = row.fracciones.find(k=>k.talla == v)?.['cantidad'] ?? 0
              return c;
            },{}),
            cantidad_combo:row.cantidad_combo
          }
        })
        setModelos(k)
      } else {
        setModelos([])
      }
    }
  }

  useEffect(()=>{    
    contenedor.current?.addEventListener('salamandra',salamandra_receta)
    return ()=>{
      contenedor.current?.removeEventListener('salamandra',salamandra_receta)
    }
  },[tallaslist])

  const salamandra_tallas = (event)=>{
    if(event.detail.name == 'tallasbase'){
      console.log("La talla base seleccionada es:",event.detail,tallaslist)
      const oldtemplatesizes = tallaslist.filter(row=>row.selected)[0]?.tallasformateado.split('-') ?? []
      // const newtemplatesizes = tallaslist.filter(row=>row.idx == parseInt(event.detail.indice))[0]?.tallasformateado.split('-') ?? []

      console.log("El disponible actual es el siguiente",disponible,modelos)
      // console.log("El cambio de talla es el siguiente:",[...tallaslist.map(row=>({...row,selected:row.idx == parseInt(event.detail.indice)}))])
      setTallasfracciones([...tallaslist.map(row=>({...row,selected:row.idx == parseInt(event.detail.indice)}))])

      setNewDisponible({...Object.keys(newdisponible).reduce((c,v)=>{
        c[EQUIVALENTSIZES[v][event.detail.indice] ?? v] = newdisponible[v]
        return c
      },{})})

      console.log("El nuevo disponible detalle es el siguiente:",newdisponibledetalle)
      setNewDisponibleDetalle([...newdisponibledetalle.reduce((c,v)=>{
        c.push({
          ...Object.keys(v).reduce((c2,k)=>{
            if(!oldtemplatesizes.includes(k)){
              if(k == 'fracciones'){
                c2[k] = v.fracciones.reduce((cc,vv)=>{
                  // cc[EQUIVALENTSIZES[vv][event.detail.indice] ?? vv] = v.fracciones[vv]
                  cc.push({...vv, talla: EQUIVALENTSIZES[vv.talla][event.detail.indice] ?? vv.talla})
                  return cc;
                },[])
              } else {
                c2[k] = v[k]
              }
            } else {
              c2[EQUIVALENTSIZES[k][event.detail.indice] ?? k] = v[k]
            }
            return c2
          },{})
        })
        return c
      },[])])

      // setModelos([])

      setModelos([...modelos.reduce((c,v)=>{
        const contenido = {
          ...Object.keys(v).reduce((c2,k)=>{
            if(!oldtemplatesizes.includes(k)){
              if(k == 'fracciones'){
                c2[k] = Object.keys(v.fracciones).reduce((cc,vv)=>{
                  cc[EQUIVALENTSIZES[vv][event.detail.indice] ?? vv] = v.fracciones[vv]
                  return cc;
                },{})
              } else {
                c2[k] = v[k]
              }
            } else {
              c2[EQUIVALENTSIZES[k][event.detail.indice] ?? k] = v[k]
            }
            return c2
          },{})
        }
        Reflect.deleteProperty(contenido,'idx')
        c.push(contenido)
        return c
      },[])])
    }
  }
  useEffect(()=>{
    contenedor.current?.addEventListener('salamandra',salamandra_tallas)
    return ()=>{
      contenedor.current?.removeEventListener('salamandra',salamandra_tallas)
    }
  },[usareceta])
  const editvalue = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const position = parseInt(e.target.dataset.position)
    const value = e.target.value
    const name = e.target.dataset.name
    setModelos([...modelos.map((row,key)=>key == position ? {...row,[name]:value} : row)])
  }
  const onclick = async (e) => {
    const position = parseInt(e.target.dataset.position)
    const action = e.target.dataset.action
    switch(action){
      case 'delete':
        setModelos([...modelos.filter((row,key)=>key !== position)])
        break;
      case 'vincular':
        vincularcolores(e)
        break;
      case 'clear':
        setModelos([])
        break;
      default:
        break;
    }
  }
  const agregarmodelo = ()=>{
    console.log('La infor de la orde es la siguiente:',info)
    const initialcombos = tallaslist.filter(talla=>talla.selected)[0]?.tallasformateado.split('-').reduce((c,v)=>{
      c[v] = 0
      return c
    },{}) ?? {}
    setModelos([...modelos,{articulo:'',...initialcombos,cantidad_combo:0}])
  }
  const vincularcolores = async (e) => {
    const position = e.currentTarget.getAttribute('data-position')
    openmodal({
      open:true,
      content: <ColoresBase 
        actions={(item)=>{  
          console.log("Camaron de la isla:",item)
          setModelos([...modelos.map((row,key)=>key == position ? {...row,color:item.nom,idcolor:item.idx} : row)])
          // setModelos([...modelos.filter((modelo)=>modelo.idprod !== item.id_producto_CAB),{...item}])
          // console.log("Informacion de los insumos:",item)
          // setopen(false)
          // const initialcombos = tallaslist.filter(talla=>talla.selected)[0]?.tallasformateado.split('-').reduce((c,v)=>{
          //   c[v] = 0
          //   return c
          // },{}) ?? {}
          // setModelos([...modelos,{idprod:item[0].id_producto_CAB,articulo:item[0].producto,...initialcombos,cantidad_combo:0}])
        }}
        closemodal={()=>setopen(false)}
      />,
      controls: false,
      header: false,
      action:async ()=>{
      }
    })
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
        <div className="flex flex-row gap-3">
          <Input name={'idx'} defaults={info.length > 0 ? info[0].idx : null} type="hidden" />
          <div className="w-[800px] flex flex-row gap-3" ref={contenedor}>
            {
              tallaslist.length > 0
              ? <InputSelect title={'TallasFormato'} name={"tallasbase"} data={tallaslist.map(row=>({indice:row.idx,option:row.tallasformateado}))} df={info.length > 0 ? info[0].tallasfracciones : null} formref={contenedor} />
              : <Input name={''} defaults={null} title="Ruta" type="text" />
            }
            <InputSelect 
              title={'UsaReceta'}
              name={"fracciones_con_receta"} 
              data={
                [
                  { indice: 0, option: 'NO' }, 
                  { indice: 1, option: 'SI' } 
                ]
              } 
              // df={info.length > 0 ? info[0].estado_orden : null} formref={contenedor} placeholder={'Numero de la orden'}
              df={parseInt(usareceta)} formref={contenedor} placeholder={'Numero de la orden'}
            />
          </div>
        </div> 
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
        <span className="inline-block align-middle text-[12px]">Datos de la orden de producción</span>
      </div>
      <hr/>
      {
        usareceta
        ? <FraccionadoByReceta tallaslist={tallaslist} modelos={modelos} editvalue={editvalue} onclick={onclick} disponible={newdisponible} disponible_detalle={newdisponibledetalle} />
        : <FraccionadoByModelo tallaslist={tallaslist} modelos={modelos} editvalue={editvalue} onclick={onclick} disponible={newdisponible} orden={info} agregarmodelo={agregarmodelo} setmodelos={setModelos} disponible_detalle={newdisponibledetalle}/>
      } 
    </div>
  </>
}