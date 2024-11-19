import { useContext, useMemo, useRef } from "react"
import { AuthPermitions } from "../contexts/contexts"
import { useFetch } from "../hooks/useFetch"
import { createPortal } from "react-dom"
import { LoadingWindow } from "../components/LoadingWindow/LoadingWindow"
import { Articulo } from "../components/Common/Articulo"
import { Search } from "../components/Atoms/Search/Search"
import { InputMultiSelect } from "../components/Atoms/Input/InputMultiSelect"
import { NavLink } from "react-router-dom"
import { Button } from "../components/Atoms/Button/Button"
import { Consulta } from "../utils/utils"
import { InputMultiSelectV2 } from "../components/Atoms/Input/InputMultiSelectV2"
import { InputSelect } from "../components/Atoms/Input/InputSelect"
import { InputSelect2 } from "../components/Atoms/Input/InputSelect2"
import { InputSelectTest } from "../components/Atoms/Input/InputSelectTest"
import { Input } from "../components/Atoms/Input/Input"

const API_KEY = 'a0765f5398ae4694bf2d5b0093660c73'
export function Home() {
  const { logout } = useContext(AuthPermitions)
  const options = useMemo(() => ({
    url: 'https://newsapi.org/v2/everything?q=fashion&sortBy=publishedAt&apiKey=' + API_KEY + '&pageSize=20&language=es'
  }), [])
  const { data, loading, error } = useFetch(options)
  const multi = useRef()
  const form = useRef()
  const onchange = (e)=>{
    console.log("seleccionando",e)
  }
  const enviar = ()=>{
    const data = new FormData(form.current)
    // alert("Enviando!!")}
    Consulta({url:"produccion/multi",params:{
      method:'POST',
      body:data
    }})
  }
  const traer = ()=>{
    Consulta({url:"produccion/traer"})
    .then(resp=>{
      console.log(resp)
      // console.log("La respuesta es : " + JSON.parse(resp))
    })
  }
  const myform = useRef()
  const mostrar = ()=>{
    const data = new FormData(myform.current)
    console.log(Array.from(data))
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
          <InputSelectTest title={'Estado'} name={"estado_orden"} data={[{ indice: 'EN PROCESO', option: 'EN PROCESO' }, { indice: 'FINALIZADO', option: 'FINALIZADO' }, { indice: 'ANULADO', option: 'ANULADO' }]} df={''} />
        </div>
        <div className="flex-1 min-w-[200px] max-w-[300px] mt-4">
          <form ref={myform}>
            <Input name={'oc'} title="OC" defaults={null} type="text" />
            <button type="button" onClick={mostrar}>ClickMe!</button>
          </form>
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
      </div>
      
      {
        loading && createPortal(
          <LoadingWindow />, document.querySelector("#root")
        )
      }
    </>
  )
}