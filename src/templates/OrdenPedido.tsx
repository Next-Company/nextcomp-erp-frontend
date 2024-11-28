import { useContext, useRef, useState } from "react"
import { Consulta } from "../utils/utils"
import { toast } from "react-toastify";
import { ModalWindowContext } from "../components/ModalWindow/ModalWindowContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Atoms/Button/Button";
import { ButtonLoader } from "../components/Atoms/Button/ButtonLoader";

export function OrdenPedido(){
  const myform = useRef()
  const contenedor = useRef()
  const navigate = useNavigate()
  const { setOpenloader, setOpen } = useContext(ModalWindowContext)
  const [ registros, setRegistros ] = useState([{cantidad:1}])
  const [laoding, setLoading] = useState(false)
  const ingresodatos = (e)=>{
    if(e.target.matches("td")){
      console.log("Modificando el valor de la celda")
    }
  }
  const agregarfila = ()=>{
    setRegistros([...registros,{cantidad:1}])
  }
  const mostrarinfo = async ()=>{


    // setpedido('hoola muno')s
    setOpen(false)

    // const data = new FormData(myform.current)
    // const datainfo = new FormData()
    
    // const lista = contenedor.current.querySelectorAll("table#articulos tbody tr.detalle")
    // let detalle = []
    // for(let fila of lista){
    //   const inputs = (Array.from(fila.querySelectorAll("input"))).map(row=>row.value)
    //   detalle.push(inputs)
    // }
    // data.append('detalle',JSON.stringify(detalle))

    // setpedido(JSON.stringify(detalle))
    // setConciliacion(data=>({...data, porcentaje:20}))

    // setOpenloader(true)
    // await Consulta({
    //   url: 'produccion/',
    //   params: {
    //     method: 'POST', body: data
    //   }
    // })
    //   .then(resp => {
    //     setOpenloader(false)
    //     navigate("/main/operaciones/inicio")
    //     toast.success('Soporte guardado con éxito!!', { theme: "colored" })
    //   })
    //   .catch((err)=>{
    //     // setOpenloader(false)
    //     toast.error('Se produjo un error!!', { theme: "colored" })
    //   })
    //   .finally(()=>{
    //     setOpenloader(false)
    //   })

      // datainfo.
      // console.log("Mostrando informacion",datainfo)
  }
  const quitarfila = (e)=>{
    e.target.closest('tr').remove()
  }

  const closemodal = ()=>{
    setOpen(false)
  }
  const generarpdf = async ()=>{

    const data = new FormData(myform.current)
    const lista = contenedor.current.querySelectorAll("table#articulos tbody tr.detalle")
    let detalle = []
    for(let fila of lista){
      const inputs = (Array.from(fila.querySelectorAll("input"))).map(row=>row.value)
      detalle.push(inputs)
    }
    data.append('detalle',JSON.stringify(detalle))

    // setOpenloader(true)
    // await Consulta({
    //   url: 'produccion/',
    //   params: {
    //     method: 'POST', body: data
    //   }
    // })
    //   .then(resp => {
    //     setOpenloader(false)
    //     navigate("/main/operaciones/inicio")
    //     toast.success('Soporte guardado con éxito!!', { theme: "colored" })
    //   })
    //   .catch((err)=>{
    //     toast.error('Se produjo un error!!', { theme: "colored" })
    //   })
    //   .finally(()=>{
    //     setOpenloader(false)
    //   })

    // setOpenloader(true)
    setLoading(true)
    await fetch("http://192.168.18.20:4000/produccion/export",{
      method:'POST',
      credentials: 'include',
      body: data
    })
    .then(resp=>{
      return resp.json()
    })
    .then(resp=>{
      setLoading(false)

      let binaryString = window.atob(resp.data);
      let binaryLen = binaryString.length;
      let bytes = new Uint8Array(binaryLen);
      for (let i = 0; i < binaryLen; i++) {
          let ascii = binaryString.charCodeAt(i);
          bytes[i] = ascii;
      }
      let file = window.URL.createObjectURL(new Blob([bytes], {type: "application/pdf"}))

      let link = document.createElement('a')
      link.href = file
      link.target = 'blank'
      link.click()
    })
    .catch((err)=>{
      setLoading(false)
      toast.error('Se produjo un error!!', { theme: "colored" })
    })
    // const desc = async ()=>{

    // }
    // desc()


  }

  return(
    <>
  {/* <div className="flex flex-col text-[10px]"> */}
  
  <div className="flex flex-col">
    <div ref={contenedor} className="flex flex-col text-[12px] w-[800px] pl-2 pr-2 [&_input]:outline-none [&_input]:text-center">
  <form ref={myform}>
    <table id="principal" style={{ width: '100%' }}>
      <tbody>
        <tr>
          <td>
            <table style={{ border: '1px solid white' }}>
              <tbody>
                <tr>
                  <td style={{ width: '52%', padding: '5px', textAlign: 'center' }}>
                    <table border={0} className="text-[10px]">
                      <tbody>
                        <tr>
                          <td style={{ textAlign: 'left' }}>
                            <img
                              // src={`data:image/jpg;base64,${BINARY_CHUNKS2}`}
                              // src={'http://192.168.18.20:5173/images/logo_next-02.jpg'}
                              src={'http://192.168.18.20:5173/images/logo_next-02.jpg'}
                              // className="logo"
                              style={{ width: '220px' }}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <br />
                            Calle Felipo Santiago Crespo Nro 581 - San Luis - Lima - Lima
                            <br />
                            R.U.C. 20522094120
                            <br />
                            Telf: 3233128
                            <br />
                            <strong>next.company.sac@gmail.com</strong>
                            {/* <a href="#" style={{ fontWeight: 'bold' }}>
                              next.company.sac@gmail.com
                            </a> */}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td style={{ textAlign: 'center', width: '45%', border: '0.5px solid white' }}>
                    <table style={{ borderCollapse: 'collapse', padding: '6px 1px', margin: 0 }}>
                      <tbody>
                        <tr>
                          <td>
                            <table className="tipo_orden">
                              <tbody>
                                <tr>
                                  <td style={{ border: 'none' }}>
                                    <table
                                      style={{ borderCollapse: 'collapse', padding: '6px 1px', margin: 0, width: '240px' }}
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            style={{
                                              border: '1px solid black',
                                              fontWeight: 'bold',
                                              fontSize: '15px',
                                              textAlign: 'center',
                                              padding: '5px',
                                            }}
                                          >
                                            ORDEN DE PEDIDO
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td style={{ border: 'none' }}>
                                    <table className="contenido2 [&_td]:border [&_td]:border-solid [&_td]:border-black">
                                      <tbody>
                                        <tr>
                                          <td
                                            style={{
                                              height: '30px',
                                              width: '150px',
                                              fontWeight: 'bolder',
                                            }}
                                            valign="middle"
                                          >
                                            Numero de orden
                                          </td>
                                          <td style={{width: '45px', fontWeight: 'bolder' }}>AL.</td>
                                          <td style={{width: '140px' }}>
                                            <input type="text" defaultValue={""} name="nro_orden" className="w-full" />
                                          </td>
                                        </tr>
                                        <tr>
                                          <td style={{ height: '30px', width: '80px', fontWeight: 'bolder' }}>Fecha</td>
                                          <td colSpan={2}><input type="text" defaultValue={""} name="fecha" className="w-full" /></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr><td className="h-[15px]"></td></tr>
        <tr>
          <td>
            <table className="tabla_datos text-[10px] border-[1px] border-blue-600" style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ width: '67px' }}>
                    <strong>PROVEEDOR</strong>
                  </td>
                  <td style={{ width: '6px' }}>: </td>
                  <td style={{ width: '220px' }}><input type="text" defaultValue={""} name="proveedor" className="w-full" /></td>
                  <td style={{ width: '68px' }}>
                    <strong>RE</strong>
                  </td>
                  <td style={{ width: '6px' }}>: </td>
                  <td style={{ width: '165px' }}><input type="text" defaultValue={""} name="re" className="w-full" /></td>
                </tr>
                <tr>
                  <td style={{ width: '67px' }}>
                    <strong>RUC</strong>
                  </td>
                  <td style={{ width: '6px' }}>: </td>
                  <td style={{ width: '220px' }}><input type="text" defaultValue={""} name="ruc" className="w-full" /></td>
                  <td style={{ width: '68px' }}></td>
                  <td style={{ width: '6px' }}></td>
                  <td style={{ width: '165px' }}></td>
                </tr>
                <tr>
                  <td style={{ width: '67px' }}>
                    <strong>DIRIGIDO A</strong>
                  </td>
                  <td style={{ width: '6px' }}>: </td>
                  <td style={{ width: '220px' }}><input type="text" defaultValue={""} name="dirigido" className="w-full" /></td>
                  <td style={{ width: '68px' }}>
                    <strong>GIRADO POR</strong>
                  </td>
                  <td style={{ width: '6px' }}>: </td>
                  <td style={{ width: '165px' }}>
                    <input type="text" defaultValue={"VANESSA"} name="girado" className="w-full" />
                  </td>
                </tr>
                <tr>
                  <td style={{ width: '67px' }}>
                    <strong>TELEFONO</strong>
                  </td>
                  <td style={{ width: '6px' }}>: </td>
                  <td style={{ width: '220px' }}><input type="text" defaultValue={""} name="telefono" className="w-full" /></td>
                  <td style={{ width: '68px' }}>
                    <strong>A CUENTA</strong>
                  </td>
                  <td style={{ width: '6px' }}>: </td>
                  <td style={{ width: '165px' }}><input type="text" defaultValue={""} name="acuenta" className="w-full" /></td>
                </tr>
                <tr>
                  <td style={{ width: '67px' }}></td>
                  <td style={{ width: '6px' }}></td>
                  <td style={{ width: '220px' }}></td>
                  <td style={{ width: '80px' }}>
                    <strong>FECHA DE ENTREGA</strong>
                  </td>
                  <td style={{ width: '6px' }}>: </td>
                  <td style={{ width: '165px' }}><input type="text" defaultValue={"entrega"} name="entrega" className="w-full" /></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    </form>
    <br/>
    <table id="articulos" onKeyDown={ingresodatos} className={'contenido [&_td]:border-[1px] [&_td]:border-gray-400 [&_th]:border-[1px] [&_th]:border-blue-400 [&_th]:bg-blue-300 [&_th]:text-[10px]'} style={{width:'100%'}}>
      <thead>
          <tr>
              <th style={{width:'35px'}}>ITEMS</th>
              <th style={{width:'60px'}}>COLOR</th>
              <th style={{width:'240px'}}>DESCRIPCI&Oacute;N</th>
              <th style={{width:'62px'}}>CANTIDAD PEDIDA</th>
              <th style={{width:'35px'}}>UNIDAD</th>
              <th style={{width:'60px'}}>PRECIO X MILLAR</th>
              <th style={{width:'70px'}}>IMPORTE</th>
          </tr>
      </thead>
      <tbody>
        {
          registros.map((row,key)=>(
            <tr key={key} className="detalle">
              <td style={{width: '35px',textAlign: 'center'}}>
                <div className="flex flex-row justify-center   opacity-40 hover:opacity-100 cursor-pointer" onClick={quitarfila}>
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"  className="pointer-events-none icon icon-tabler icons-tabler-filled icon-tabler-trash-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16zm-9.489 5.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" /></svg>
                </div>
              </td> 
              <td style={{width: '60px',textAlign: 'center'}}><input type="text" defaultValue={""} name="color" className="w-full text-center" /></td> 
              <td style={{width: '240px', textAlign:'justify'}}><input type="text" defaultValue={""} name="desc" className="w-full" /></td>
              <td style={{width: '62px',textAlign: 'center'}}><input type="text" defaultValue={""} name="cantidad" className="w-full text-center" /></td>
              <td style={{width: '35px', textAlign: 'right', verticalAlign: 'middle'}}><input type="text" defaultValue={""} name="unidad" className="w-full text-center" /></td>
              <td style={{width: '60px', textAlign: 'right', verticalAlign: 'middle'}}><input type="text" defaultValue={""} name="precio" className="w-full text-center" /></td>
              <td style={{width: '70px', textAlign: 'right', verticalAlign: 'baseline',height: 'auto'}} valign="middle"><input type="text" defaultValue={""} name="importe" className="w-full text-center" /></td>
            </tr>
          ))
        }
        <tr className="h-[20px]">
          <td style={{width: '35px',textAlign: 'center'}}></td> 
          <td style={{width: '60px',textAlign: 'center'}}></td> 
          <td style={{width: '240px', textAlign:'justify'}}></td>
          <td style={{width: '62px',textAlign: 'center'}}></td>
          <td style={{width: '35px', textAlign: 'right', verticalAlign: 'middle'}}></td>
          <td style={{width: '60px', textAlign: 'right', verticalAlign: 'middle'}}></td>
          <td style={{width: '70px', textAlign: 'right', verticalAlign: 'baseline',height: 'auto'}} valign="middle"></td>
        </tr>
      </tbody>
    </table>
    <table style={{border: '0.5px solid #004080',width:'100%'}}>
      <tbody>
        <tr>
          <td style={{textAlign: 'center', height: '40px', width:'95px', borderRight:'0.5px solid #004080'}} valign="middle"><strong>OBSERVACIONES:</strong></td>
          <td style={{textAlign: 'right', height: '60px', lineHeight: '15px', width:'467px'}}><input type="text" defaultValue={""} name="importe" className="w-full text-center" /></td>
        </tr>
      </tbody>
    </table>
    <div onClick={agregarfila} className="h-[30px] flex flex-row justify-end items-center"><a className="cursor-pointer">+Agregar nuevo regristro</a></div>
    {/* <div onClick={mostrarinfo} className="h-[30px] flex flex-row justify-end items-center"><a className="cursor-pointer">+Mostrar info del form</a></div> */}
    <br/>
  </div>
  <div className={`flex gap-1 justify-end text-[1em]`}>
    <Button action={closemodal} tipo={'default'}>Cancelar</Button>
    <ButtonLoader task={generarpdf} tipo={'accept'} loading={laoding}>Exportar</ButtonLoader>
  </div>
  
  </div>

    </>
  )
}