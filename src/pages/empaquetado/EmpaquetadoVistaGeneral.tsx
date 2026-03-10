import { useContext, useEffect, useRef, useState } from "react";
import { Search } from "../../components/Atoms/Search/Search";
import { Consulta } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Atoms/Button/Button";
import { ModalWindowContext } from "../../components/ModalWindow/ModalWindowContext";
import { toast } from "react-toastify";

const SectionPredespacho = ({info,onclick}) => {
  return (
    <div className="flex-1 scrollbar-special overflow-y-scroll">
      <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-300 [&_tbody_tr:nth-child(2n-1):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-white [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
        <thead className="text-left sticky top-0 bg-white">
          <tr>
            <th className="lg:table-cell">Id</th>
            <th className="lg:table-cell">NroGuia</th>
            <th className="lg:table-cell">Cliente</th>
            <th className="lg:table-cell">Producto</th>
            <th className="lg:table-cell">Modelo</th>
            <th className="lg:table-cell">OC</th>
            <th className="lg:table-cell text-center">Despachos</th>
            <th className="lg:table-cell text-center">Caidos</th>
            <th className="lg:table-cell text-center">Incompletos</th>
            <th className="lg:table-cell text-center">FechaEmisionGuia</th>
            <th className="lg:table-cell text-center">FechaDespacho</th>
            <th className="lg:table-cell text-center">Accciones</th>
          </tr>
        </thead>
        <tbody>
          {
            info.length > 0
              ? info.map((row, key) => (
                <tr key={key} className="">
                  <td className="font-bold">{row.idx}</td>
                  <td>{row.nro_guia}</td>
                  <td className="font-bold">{row.cliente.length >= 45 ? row.cliente.substr(0, 45) + '...' : row.cliente}</td>
                  <td>{row.producto}</td>
                  <td>{row.modelos}</td>
                  <td>{row.oc}</td>
                  <td className="text-center font-bold text-green-600">{row.total_despacho}</td>
                  <td className="text-center font-bold text-red-600">{row.total_caidos}</td>
                  <td className="text-center font-bold text-red-600">{row.total_incompletos}</td>
                  <td className="text-center font-bold">{row.fec_emision_guia}</td>
                  <td className="text-center font-bold">{row.fec_despacho}</td>
                  <td className="w-[200px]">
                    <ul className="flex flex-row justify-end">
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-id={row.idx} data-distribucion={row.distribucion}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="download" onClick={onclick} data-id={row.idx} data-orden={row.id_orden_origen ?? row.id_orden_origen} data-distribucion={row.distribucion}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" onClick={onclick} data-action="review" data-id={row.idx} data-idguia={row.id_guia_origen}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="edit" onClick={onclick} data-id={row.idx}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))
              :
              <tr className="h-[40px]"><td colSpan={13} className="text-center"><span>Datos no encontrados</span></td></tr>
          }
        </tbody>
        <tfoot className="sticky w-full bottom-0 bg-gray-100 ">
          <tr>
            <td className="h-[45px] border-t border-t-gray-600" colSpan={12}>
              <div className="flex flex-row justify-between items-center">
                <div>
                  Showing 1 to 4 of 4 entries (filtered from 57 total entries)
                </div>
                <div className="flex flex-row justify-end items-center gap-2">
                  <div className="w-[30px] h-[30px] rounded-full bg-transparent hover:bg-gray-300 flex flez-row justify-center items-center cursor-pointer transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-caret-left"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13.883 5.007l.058 -.005h.118l.058 .005l.06 .009l.052 .01l.108 .032l.067 .027l.132 .07l.09 .065l.081 .073l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059v12c0 .852 -.986 1.297 -1.623 .783l-.084 -.076l-6 -6a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01z" /></svg>
                  </div>
                  <div className="w-[30px] h-[30px] rounded-full bg-transparent hover:bg-gray-300 flex flez-row justify-center items-center cursor-pointer transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-caret-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002l-.059 -.002l-.058 -.005l-.06 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z" /></svg>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
const SectionDespacho = ({info,onclick}) => {
  return (
    <div className="flex-1 scrollbar-special overflow-y-scroll">
      <table className="w-[100%] border-collapse border-red-100 [&_th]:font-[600] [&_th]:pt-3 [&_th]:pb-3 [&_tr]:border-b [&_td]:p-[6px] [&_tbody_tr:hover]:bg-gray-300 [&_tbody_tr:nth-child(2n-1):hover]:bg-gray-300 text-[12px] [&_tbody_tr:hover]:outline-white [&_tbody_tr:hover]:outline-1 [&_tbody_tr:hover]:outline-double [&_tbody_tr:hover]:cursor-pointer lg:[&_tr:hover_ul]:visible lg:[&_ul]:invisible [&_tbody_tr:nth-child(2n-1)]:bg-gray-100">
        <thead className="text-left sticky top-0 bg-white">
          <tr>
            <th className="lg:table-cell">Id</th>
            <th className="lg:table-cell">NroGuia</th>
            <th className="lg:table-cell">Cliente</th>
            <th className="lg:table-cell">Producto</th>
            <th className="lg:table-cell">Modelo</th>
            <th className="lg:table-cell">OC</th>
            <th className="lg:table-cell text-center">Despachos</th>
            <th className="lg:table-cell text-center">Caidos</th>
            <th className="lg:table-cell text-center">Incompletos</th>
            <th className="lg:table-cell text-center">FechaEmisionGuia</th>
            <th className="lg:table-cell text-center">FechaDespacho</th>
            <th className="lg:table-cell text-center">Accciones</th>
          </tr>
        </thead>
        <tbody>
          {
            info.length > 0
              ? info.map((row, key) => (
                <tr key={key} className="">
                  <td className="font-bold">{row.idx}</td>
                  <td>{row.nro_guia}</td>
                  <td className="font-bold">{row.cliente.length >= 45 ? row.cliente.substr(0, 45) + '...' : row.cliente}</td>
                  <td>{row.producto}</td>
                  <td>{row.modelos}</td>
                  <td>{row.oc}</td>
                  <td className="text-center font-bold text-green-600">{row.total_despacho}</td>
                  <td className="text-center font-bold text-red-600">{row.total_caidos}</td>
                  <td className="text-center font-bold text-red-600">{row.total_incompletos}</td>
                  <td className="text-center font-bold">{row.fec_emision_guia}</td>
                  <td className="text-center font-bold">{row.fec_despacho}</td>
                  <td className="w-[200px]">
                    <ul className="flex flex-row justify-end">
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="delete" onClick={onclick} data-id={row.idx} data-distribucion={row.distribucion}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="download" onClick={onclick} data-id={row.idx} data-orden={row.id_orden_origen ?? row.id_orden_origen} data-distribucion={row.distribucion}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-download"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" onClick={onclick} data-action="review" data-id={row.idx} data-idguia={row.id_guia_origen}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                        </div>
                      </li>
                      <li>
                        <div className="rounded-full w-9 h-9 hover:bg-gray-100 transition-colors flex justify-center items-center" data-action="edit" onClick={onclick} data-id={row.idx}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))
              :
              <tr className="h-[40px]"><td colSpan={13} className="text-center"><span>Datos no encontrados</span></td></tr>
          }
        </tbody>
        <tfoot className="sticky w-full bottom-0 bg-gray-100 ">
          <tr>
            <td className="h-[45px] border-t border-t-gray-600" colSpan={12}>
              <div className="flex flex-row justify-between items-center">
                <div>
                  Showing 1 to 4 of 4 entries (filtered from 57 total entries)
                </div>
                <div className="flex flex-row justify-end items-center gap-2">
                  <div className="w-[30px] h-[30px] rounded-full bg-transparent hover:bg-gray-300 flex flez-row justify-center items-center cursor-pointer transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-caret-left"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M13.883 5.007l.058 -.005h.118l.058 .005l.06 .009l.052 .01l.108 .032l.067 .027l.132 .07l.09 .065l.081 .073l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059v12c0 .852 -.986 1.297 -1.623 .783l-.084 -.076l-6 -6a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01z" /></svg>
                  </div>
                  <div className="w-[30px] h-[30px] rounded-full bg-transparent hover:bg-gray-300 flex flez-row justify-center items-center cursor-pointer transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-caret-right"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002l-.059 -.002l-.058 -.005l-.06 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z" /></svg>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default function EmpaquetadoVistaGeneral() {
  const [info, setInfo] = useState([])
  const [estado, setEstado] = useState('EMPAQUETADO')
  const navigate = useNavigate()
  const lista = useRef()
  const { openModal, config, setOpenloader, setOpen } = useContext(ModalWindowContext)
  // const [refresh,setRefresh] = useState(false)

  const onclick = (e) => {
    const action = e.target.dataset.action
    const id = e.target.dataset.id
    const idorden = e.target.dataset.orden
    const distribucion = e.target.dataset.distribucion
    let params_modal = null
    switch (action) {
      case 'delete':
        params_modal = {
          open: true,
          content: <div>Desea eliminar el registro seleccionado?. Tenga en cuenta de que el <br /> proceso no es reversible.</div>,
          controls: true,
          header: false,
          action: () => {
            setOpenloader(true)
            Consulta({
              url: 'produccion/borrardespachoempaquetado/' + id, params: {
                method: 'DELETE'
              }
            })
              .then(resp => {
                if(resp.ok){
                  toast.success(resp.message, { theme: "colored" })
                }else{
                  toast.error(resp.message, { theme: "colored" })
                }
                // setRefresh(true)
                recargarinfo()
                setOpenloader(false)
              })
              .catch(() => {
                setOpenloader(false)
                // logout()
              })
              .finally(() => {
                setOpenloader(false)
              })
          }
        }
        console.log("Los params son:",params_modal)
        openModal(params_modal)
        break;
      case 'download':
        console.log("El tipo de distribucion es:",distribucion)
        params_modal = {
          open: true,
          content: <div>Desea continuar con la descarga de la guia de traslado interno?.<br />  Tenga en cuenta de que el proceso puede tardar unos minutos.</div>,
          controls: true,
          header: false,
          action: () => {
            const desc = async () => {
              setOpenloader(true)
              Consulta({
		            url: 'produccion/verdespachoacabados/' + id + "/" + idorden + '/2' 
              })
              .then(resp => {
                setOpenloader(false)
                const binaryString = window.atob(resp.data);
                const binaryLen = binaryString.length;
                const bytes = new Uint8Array(binaryLen);
                for (let i = 0; i < binaryLen; i++) {
                  const ascii = binaryString.charCodeAt(i);
                  bytes[i] = ascii;
                }
                const file = window.URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }))
                window.open(file,'_blank')
              })
              .catch((err) => {
                setOpenloader(false)
                toast.error('Se produjo un error!!', { theme: "colored" })
              })
            }
            desc()
          }
        }
        openModal(params_modal)
        break;
      case 'edit':
        navigate("/main/empaquetado/recepcion/" + id)
        break;
      case 'review':
        // params_modal = {
        //   open: true,
        //   content: <div className="pb-4">
        //     <iframe src={`${apiUrl}produccion/verdespachoguia/${id}/${idguia}/1`} width={1100} height={700} />
        //   </div>,
        //   controls: true,
        //   header: false,
        //   action: () => {}
        // }
        // openModal(params_modal)

        // navigate("/main/estampado/review/"+ id)
        break;

      default:
        break;
    }
  }

  useEffect(() => {
    const data = new FormData()
    setOpenloader(true)
    Consulta({
      url: 'produccion/getListaDespachosAcabados/' + estado, params: {
        method: 'GET'
      }
    })
      .then(resp => {
        console.log(resp)
        setOpenloader(false)
        setInfo(resp)
      })
      .catch((error) => {
        console.log(error)
        // logout()
        // toast.error('Error en la consulta de base', { theme: "colored" })
      })
      .finally(() => {
        console.log("Horror en la consulta de base de datos")
        // setOpenloader(false)
      })
  }, [])

  const filtrarestado = (e) => {
    const estado = e.target.dataset.estado
    setOpenloader(true)

    Consulta({
      url: 'produccion/getListaDespachosAcabados/' + estado, params: {
        method: 'GET'
      }
    })
      .then(resp => {
        setOpenloader(false)
        lista.current.querySelector('button.active').classList.remove('active')
        e.target.classList.add('active')
        setInfo(resp)
        // setEstado(resp.filter(row=>row.estado == estado))
        setEstado(estado)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setOpenloader(false)
      })
  }

  const recargarinfo = () => {
    const data = new FormData()
    setOpenloader(true)
    Consulta({
      url: 'produccion/getListaDespachosAcabados/' + estado, params: {
        // url: 'produccion/inventario/22', params: {
        method: 'GET'
      }
    })
      .then(resp => {
        console.log(resp)
        setOpenloader(false)
        setInfo(resp)
      })
      .catch((error) => {
        console.log(error)
        // logout()
        // toast.error('Error en la consulta de base', { theme: "colored" })
      })
      .finally(() => {
        console.log("Horror en la consulta de base de datos")
        // setOpenloader(false)
      })
  }
  const nuevoregistro= () => {
    estado == 'EMPAQUETADO' ? navigate('/main/empaquetado/recepcion') : navigate('/main/empaquetado/distribucion')
    
  }
  const busquedaglobal = async (input) => {
    setOpenloader(true)
    Consulta({
      url: 'produccion/getListaDespachosAcabados/' + estado + '/' + (input.value == '' ? '' : input.value), params: {
        method: 'GET'
      }
    })
      .then(resp => {
        setOpenloader(false)
        setInfo(resp)
      })
      .catch((error) => {
        console.log("El mnesaje de error es:", error)
      })
      .finally(() => {
        console.log("Horror en la consulta de base de datos")
      })
  }

  return (
    <>
      {/* <div className="directory flex flex-col lg:p-4 sm:p-1 lg:m-2 rounded-md w-full relative bg-white"> */}
        <div className="flex flex-col flex-1 pl-2 pr-2 h-full">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-[16px]"><strong>Empaquetado</strong></h2>
              <div className="w-[500px] mb-1">
                <Search config={{ width: '200px' }} action={busquedaglobal} />
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-gray-200"></div>
          <div className="text-left scrollbar-special flex flex-col flex-1 overflow-scroll-auto">
            <div>
              <ul ref={lista} className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
                <button className="group active" data-estado="EMPAQUETADO" onClick={filtrarestado}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    Predespacho
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
                <button className="group" data-estado="DISTRIBUCION" onClick={filtrarestado}>
                  <span className="relative h-[100%] flex items-center pointer-events-none">
                    Despacho
                    <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
                  </span>
                </button>
              </ul>
            </div>
            <hr />
            {estado == 'EMPAQUETADO' ? <SectionPredespacho info={info} onclick={onclick} /> : <SectionDespacho info={info} onclick={onclick} />}
            <div className="flex flex-row justify-end">
              <div className="flex gap-2 mt-2">
                <Button action={recargarinfo} tipo={'default'}>Actualizar</Button>
                <Button action={nuevoregistro} tipo={'accept'}>Nuevo</Button>
              </div>
            </div >
          </div>
        </div>
      {/* </div> */}
    </>
  )
}
