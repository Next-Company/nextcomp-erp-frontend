const apiUrl = import.meta.env.VITE_API_URL
import { useContext, useMemo, useRef } from "react"
import { AuthPermitions } from "../contexts/contexts"
import { useFetch } from "../hooks/useFetch"
import { createPortal } from "react-dom"
import { LoadingWindow } from "../components/LoadingWindow/LoadingWindow"
import { Articulo } from "../components/Common/Articulo"
import { Consulta } from "../utils/utils"
import { InputMultiSelectV2 } from "../components/Atoms/Input/InputMultiSelectV2"
import { InputSelectTest } from "../components/Atoms/Input/InputSelectTest"
import { Input } from "../components/Atoms/Input/Input"

const API_KEY = 'a0765f5398ae4694bf2d5b0093660c73'
export function Home() {
  const options = useMemo(() => ({
    url: 'https://newsapi.org/v2/everything?q=fashion&sortBy=publishedAt&apiKey=' + API_KEY + '&pageSize=20&language=es'
  }), [])
  const { data, loading} = useFetch(options)
  
  const myform = useRef()
  const mostrar = ()=>{
    const data = new FormData(myform.current)
    console.log(Array.from(data))
  }
  const printpdf = ()=>{
    // alert("Imprimiendo informacion adicional del pdf")
    window.location.href = apiUrl + 'produccion/print/'
    // (async ()=>{
    //   fetch("http://192.168.18.20:4000/produccion/print",{
    //     method:'GET',
    //     credentials:'include'
    //   })
    //   .then(resp=>{
    //     console.log("Envio del servidor:",resp)
    //   })
    // })()

  }
  return (
    <>
      <div className="directory flex flex-col p-4 m-3 rounded-md bg-white w-full relative">
        <div className="w-[300px]">
          {/* <InputMultiSelect title={'Ruta'} name={"ruta"} data={[{ indice: 'IMPL', option: 'CONFECCION', selected: true }, { indice: 'SOPT', option: 'OJAL Y BOTON' }, { indice: 'PRCT', option: 'ESTAMPADO' }, { indice: 'PRCT', option: 'LAVANDERIA' }, { indice: 'PRCT', option: 'BORDADO' }, { indice: 'PRCT', option: 'ACABADOS' }]} df={'PRCT'} /> */}
          <InputMultiSelectV2 title={'Ruta'} name={"ruta"} data={[{ indice: 'IMPL', option: 'CONFECCION', selected: true }, { indice: 'SOPT', option: 'OJAL Y BOTON' }, { indice: 'PRCT', option: 'ESTAMPADO' }, { indice: 'PRCT', option: 'LAVANDERIA' }, { indice: 'PRCT', option: 'BORDADO' }, { indice: 'PRCT', option: 'ACABADOS' }]} df={JSON.parse('["CONFECCION","ACABADOS"]')} />




          {/* <form ref={form} action="">
            <select name="frutas" onChange={onchange} ref={multi} multiple>
              <option value='manz'>manzana</option>
              <option value='per'>pera</option>
              <option value='mel'>melon</option>
              <option value='sand'>sandia</option>
              <option value='plat'>platano</option>
            </select>
          </form>
          <Button action={()=>{console.log(multi.current)}} type="button" tipo="success">Click me!!</Button>
          <Button action={enviar} type="button" tipo="accept">Enviar</Button>
          <Button action={traer} type="button" tipo="accept">Consultar</Button> */}
        </div>

        <div className="flex-1 min-w-[200px] max-w-[300px] mt-4">
          <InputSelectTest title={'Estado'} name={"estado_orden"} data={[{ indice: '', option: '' },{ indice: 'EN PROCESO', option: 'EN PROCESO' }, { indice: 'FINALIZADO', option: 'FINALIZADO' }, { indice: 'ANULADO', option: 'ANULADO' }]} df={''} />
        </div>
        <div className="flex-1 min-w-[200px] max-w-[300px] mt-4">
          <form ref={myform}>
            <Input name={'oc'} title="OC" defaults={null} type="text" />
            <button type="button" onClick={mostrar}>ClickMe!</button>
          </form>
        </div>
        <div className="flex-1 min-w-[200px] max-w-[300px] mt-4">
          <button type="button" className="border-[1px] border-red-500 rounded p-2" onClick={printpdf}>Imprimir PDF!</button>
        </div>
        
        
    
        {/* <NavLink
          to="/messages"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          Messages
        </NavLink>; */}

        {/* <Search/> */}
        {/* <div className="mt-4 flex items-center border-[1px] rounded-md gap-3 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
          <input type="searh" className="h-[30px] flex-1 focus:outline-none" />
        </div> */}
        <div className="grid_article scrollbar-special">
          {data && data.articles.map((res, index) => <Articulo key={index} info={res} />)}
        </div>


        



        <div className="overflow-scroll scrollbar-special">

        <table id="principal" style={{ width: '100%' }}>
    <tbody>
      <tr>
        <td>
          <table style={{ border: '1px solid white' }}>
            <tbody>
              <tr>
                <td style={{ width: '52%', padding: '5px', textAlign: 'center' }}>
                  <table border={0}>
                    <tbody>
                      <tr>
                        <td style={{ textAlign: 'left' }}>
                          <img
                            // src={`data:image/jpg;base64,${BINARY_CHUNKS2}`}
                            src={'./public/images/logo.jpg'}
                            className="logo"
                            style={{ width: '160px' }}
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
                          <a href="#" style={{ fontWeight: 'bold' }}>
                            next.company.sac@gmail.com
                          </a>
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
                                    style={{ borderCollapse: 'collapse', padding: '6px 1px', margin: 0, width: '200px' }}
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          style={{
                                            border: '1px solid black',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            textAlign: 'center',
                                            padding: '10px',
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
                                  <table className="contenido2">
                                    <tbody>
                                      <tr>
                                        <td
                                          style={{
                                            height: '20px',
                                            width: '100px',
                                            fontWeight: 'bolder',
                                          }}
                                          valign="middle"
                                        >
                                          Numero de orden
                                        </td>
                                        <td style={{ height: '20px', width: '45px', fontWeight: 'bolder' }}>AL.</td>
                                        <td style={{ height: '20px', width: '130px' }} ></td>
                                      </tr>
                                      <tr>
                                        <td style={{ height: '20px', width: '80px', fontWeight: 'bolder' }}>Fecha</td>
                                        <td colSpan={2} ></td>
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
      <tr>
        <td>
          <table className="tabla_datos" style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td style={{ width: '67px' }}>
                  <strong>PROVEEDOR</strong>
                </td>
                <td style={{ width: '6px' }}>: </td>
                <td style={{ width: '220px' }} ></td>
                <td style={{ width: '68px' }}>
                  <strong>RE</strong>
                </td>
                <td style={{ width: '6px' }}>: </td>
                <td style={{ width: '165px' }} ></td>
              </tr>
              <tr>
                <td style={{ width: '67px' }}>
                  <strong>RUC</strong>
                </td>
                <td style={{ width: '6px' }}>: </td>
                <td style={{ width: '220px' }} ></td>
                <td style={{ width: '68px' }}></td>
                <td style={{ width: '6px' }}></td>
                <td style={{ width: '165px' }} ></td>
              </tr>
              <tr>
                <td style={{ width: '67px' }}>
                  <strong>DIRIGIDO A</strong>
                </td>
                <td style={{ width: '6px' }}>: </td>
                <td style={{ width: '220px' }} ></td>
                <td style={{ width: '68px' }}>
                  <strong>GIRADO POR</strong>
                </td>
                <td style={{ width: '6px' }}>: </td>
                <td style={{ width: '165px' }} >
                  VANESSA
                </td>
              </tr>
              <tr>
                <td style={{ width: '67px' }}>
                  <strong>TELEFONO</strong>
                </td>
                <td style={{ width: '6px' }}>: </td>
                <td style={{ width: '220px' }} ></td>
                <td style={{ width: '68px' }}>
                  <strong>A CUENTA</strong>
                </td>
                <td style={{ width: '6px' }}>: </td>
                <td style={{ width: '165px' }} ></td>
              </tr>
              <tr>
                <td style={{ width: '67px' }}></td>
                <td style={{ width: '6px' }}></td>
                <td style={{ width: '220px' }} ></td>
                <td style={{ width: '80px' }}>
                  <strong>FECHA DE ENTREGA</strong>
                </td>
                <td style={{ width: '6px' }}>: </td>
                <td style={{ width: '165px' }} ></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <br/>
  <table className={'contenido'} style={{width:'100%'}}>
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
        <tr>
          <td style={{width: '35px',textAlign: 'center'}}></td> 
          <td style={{width: '60px',textAlign: 'right'}} ></td> 
          <td style={{width: '240px', textAlign:'justify'}} ></td>
          <td style={{width: '62px',textAlign: 'center'}} ></td>
          <td style={{width: '35px', textAlign: 'right', verticalAlign: 'middle'}} >UND</td>
          <td style={{width: '60px', textAlign: 'right', verticalAlign: 'middle'}} ></td>
          <td style={{width: '70px', textAlign: 'right', verticalAlign: 'baseline',height: 'auto'}} valign="middle" ></td>
        </tr>
    </tbody>
  </table>

        </div>

      </div>
      
      
      {
        loading && createPortal(
          <LoadingWindow />, document.querySelector("#root")
        )
      }
    </>
  )
}