import { useState } from "react"
import { Input } from "../../../components/Atoms/Input/Input"
import { ButtonLoader } from "../../../components/Atoms/Button/ButtonLoader"
import { InputSelect } from "../../../components/Atoms/Input/InputSelect"

// ── Helpers ────────────────────────────────────────────────────────────────
const v = (info, key) => (info.length > 0 ? info[0][key] : null)

function SectionHeader({ label }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500 shrink-0" />
        <span className="text-[12px] text-gray-600 font-medium">{label}</span>
      </div>
      <hr className="m-0" />
    </div>
  )
}

// ── Component ──────────────────────────────────────────────────────────────
export default function SeccionDatosPrincipales({ info, form, setorden }) {
  const [loading, setLoading] = useState(false)

  const consultaruc = () => {
    setLoading(true)
    fetch("https://jsjfact.com/_consulta/consulta_masiva.php?RUX=" + "20522094120")
      .then((r) => r.json())
      .then((data) => {
        console.log("La data es:", data)
        setLoading(false)
      })
      .catch(() => console.log("Error en la consulta"))
  }

  return (
    <div className="flex flex-col gap-5 pt-3">

      {/* ── Sección 1: Identificación ───────────────────────────────────── */}
      <SectionHeader label="Datos principales del proveedor" />

      <div className="flex flex-col gap-3">
        {/* Fila 1 — RUC + botón + Razón Social */}
        <div className="flex flex-row gap-3 items-center">
          <Input name="idx" defaults={v(info, "idx")} type="hidden" />
          <div className="w-[160px] shrink-0">
            <Input
              name="ruc"
              title="NroRUC"
              defaults={v(info, "ruc")}
              type="text"
              verify="true"
              placeholder="20000000000"
            />
          </div>
          <div className="shrink-0">
            <ButtonLoader task={consultaruc} type="button" loading={loading} tipo="success">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M21 12a9 9 0 1 0 -9 9"/>
                <path d="M3.6 9h16.8"/><path d="M3.6 15h7.9"/>
                <path d="M11.5 3a17 17 0 0 0 0 18"/>
                <path d="M12.5 3a16.984 16.984 0 0 1 2.574 8.62"/>
                <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"/>
                <path d="M20.2 20.2l1.8 1.8"/>
              </svg>
            </ButtonLoader>
          </div>
          <div className="flex-1">
            <Input
              name="nom"
              title="Razón Social"
              defaults={v(info, "nom")}
              type="text"
              verify="true"
              placeholder="Razón social del proveedor"
            />
          </div>
        </div>
        {/* Fila 2 — Dirección + Representante */}
        <div className="flex flex-row gap-3">
          <div className="flex-1">
            <Input
              name="direccion"
              title="Dirección"
              defaults={v(info, "direccion")}
              type="text"
              placeholder="Dirección fiscal del proveedor"
            />
          </div>
          <div className="w-[18%]">
            <Input
              name="telefono"
              title="Teléfono"
              defaults={v(info, "telefono")}
              type="text"
              placeholder="9xx xxx xxx"
            />
          </div>
          <div className="w-[35%]">
            <Input
              name="representante"
              title="Representante"
              defaults={v(info, "representante")}
              type="text"
              placeholder="Nombre del representante"
            />
          </div>
        </div>
      </div>

      {/* ── Sección 2: Datos adicionales ───────────────────────────────── */}
      <SectionHeader label="Datos adicionales del proveedor" />

      <div className="flex flex-col gap-3">
        {/* Fila 1 — Tipo servicio + Tipo proveedor + Detalle */}
        <div className="flex flex-row gap-3">
          <div className="w-[22%]">
            <InputSelect
              title="Tipo de Servicio"
              name="giro"
              data={[
                { indice: "OTROS",      option: "OTROS",      selected: true },
                { indice: "CONFECCION", option: "CONFECCION" },
                { indice: "LAVANDERIA", option: "LAVANDERIA" },
                { indice: "BORDADO",    option: "BORDADO" },
                { indice: "ACABADO",    option: "ACABADO" },
                { indice: "OJAL",    option: "OJAL" },
                { indice: "FUSIONADO",    option: "FUSIONADO" },
                { indice: "ESTAMPADO",  option: "ESTAMPADO" },
              ]}
              df={v(info, "giro")}
              placeholder="Tipo de servicio"
            />
          </div>
          <div className="w-[22%]">
            <InputSelect
              title="Tipo de Proveedor"
              name="clase"
              data={[
                { indice: "OTROS",     option: "OTROS",     selected: true },
                { indice: "SERVICIOS", option: "SERVICIOS" },
                { indice: "TELAS",     option: "TELAS" },
                { indice: "INSUMOS",     option: "INSUMOS" },
              ]}
              df={v(info, "clase")}
              placeholder="Tipo de proveedor"
            />
          </div>
          <div className="flex-1">
            <Input
              name="det"
              title="Detalle"
              defaults={v(info, "det")}
              type="text"
              placeholder="Descripción adicional del proveedor"
            />
          </div>
        </div>

        {/* Fila 2 — Teléfono + Correo + Web */}
        <div className="flex flex-row gap-3">
          <div className="w-[32%]">
            <Input
              name="correo"
              title="Correo"
              defaults={v(info, "correo")}
              type="text"
              placeholder="correo@proveedor.com"
            />
          </div>
          <div className="flex-1">
            <Input
              name="web"
              title="Sitio Web"
              defaults={v(info, "web")}
              type="text"
              placeholder="https://www.proveedor.com"
            />
          </div>
        </div>
      </div>

      {/* ── Sección 3: Datos bancarios ──────────────────────────────────── */}
      <SectionHeader label="Datos bancarios" />

      <div className="flex flex-col gap-3">
        {/* Fila 1 — Banco + N° Cuenta + CCI */}
        <div className="flex flex-row gap-3">
          <div className="w-[22%]">
            <InputSelect
              title="Banco"
              name="banco"
              placeholder="Seleccione el banco"
              data={[
                { indice: "",                  option: "Seleccione el banco", selected: true },
                { indice: "BCP",               option: "BCP" },
                { indice: "SCOTIABANK",        option: "SCOTIABANK" },
                { indice: "INTERBANK",         option: "INTERBANK" },
                { indice: "BBVA",              option: "BBVA" },
                { indice: "BANCO DE LA NACION",option: "BANCO DE LA NACION" },
              ]}
              df={v(info, "banco")}
            />
          </div>
          <div className="w-[28%]">
            <Input
              name="cuenta_corriente"
              title="N° Cuenta"
              defaults={v(info, "cuenta_corriente")}
              type="text"
              placeholder="Número de cuenta bancaria"
            />
          </div>
          <div className="flex-1">
            <Input
              name="cci"
              title="CCI"
              defaults={v(info, "cci")}
              type="text"
              placeholder="Código de cuenta interbancario"
            />
          </div>
        </div>

        {/* Fila 2 — Detracciones + Yape + Plin */}
        <div className="flex flex-row gap-3">
          <div className="w-[35%]">
            <Input
              name="cuenta_detracciones"
              title="Cuenta de Detracciones"
              defaults={v(info, "cuenta_detracciones")}
              type="text"
              placeholder="Banco de la Nación"
            />
          </div>
          <div className="w-[18%]">
            <Input
              name="yape"
              title="Yape"
              defaults={v(info, "yape")}
              type="text"
              placeholder="9xx xxx xxx"
            />
          </div>
          <div className="w-[18%]">
            <Input
              name="plin"
              title="Plin"
              defaults={v(info, "plin")}
              type="text"
              placeholder="9xx xxx xxx"
            />
          </div>
        </div>
      </div>

    </div>
  )
}









// import { useEffect, useState } from "react"
// import { Input } from "../../../components/Atoms/Input/Input"
// import { ButtonLoader } from "../../../components/Atoms/Button/ButtonLoader"
// import { InputSelect } from "../../../components/Atoms/Input/InputSelect"

// export default function SeccionDatosPrincipales({info,form,setorden}){
//   // const { setOpenloader } = useContext(ModalWindowContext)
//   // const [dataimg,setDataimg] = useState([])
//   const [loading,setLoading] = useState(false)
//   useEffect(()=>{
//     // const handleSalamandra = (event) => {
//     //   setTipopedido(event.detail.valor == 'ORDEN' ? 1 : 0)
//     // };
//     // form.current.addEventListener("salamandra", handleSalamandra);
//   },[])

//   const consultaruc = ()=>{
//     // setOpenloader(true)
//     setLoading(true)
//     fetch('https://jsjfact.com/_consulta/consulta_masiva.php?RUX='+'20522094120')
//     .then(resp=>resp.json())
//     .then(data=>{
//       console.log("La data es:",data)
//       setLoading(false)
//     })
//     .catch(()=>{
//       console.log("Se produjo un error en la consulta")
//     })
//   }
//   // const nuevamarca = ()=>{
//   //   let params_modal = null
//   //   params_modal = {
//   //     open:true,
//   //     content: <Marca actions={(item)=>{
//   //       setorden(orden=>([{...orden[0],marca:item.nom}]))
//   //       setopen(false)
//   //     }}/>,
//   //     controls: true,
//   //     header: false,
//   //     action:()=>{
//   //     }
//   //   }
//   //   openmodal(params_modal)
//   // }
//   return <>
//     <div className={`flex flex-col gap-3 pt-3`}>
//       <div className="flex flex-col gap-3">
//         <Input name={'idx'} defaults={info.length > 0 ? info[0].idx : null} type="hidden" />
//         <div className="flex items-center gap-2">
//           <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
//           <span className="inline-block align-middle text-[12px]">Datos principales del proveedor</span>
//         </div>
//         <hr/>
//         <div className="flex flex-col gap-3">
//           <div className="flex flex-row gap-3 align-top justify-start items-start">
//             <div className="w-[15%]">
//               <Input name={'ruc'} title="NroRUC" defaults={info.length > 0 ? info[0].ruc : null} type="text" verify="true" placeholder={'Nombre completo del producto a crear.'}/>
//             </div>
//             <ButtonLoader task={()=>{}} type="button" loading={loading} tipo={'success'}>
//               <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-world-search"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 12a9 9 0 1 0 -9 9" /><path d="M3.6 9h16.8" /><path d="M3.6 15h7.9" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a16.984 16.984 0 0 1 2.574 8.62" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M20.2 20.2l1.8 1.8" /></svg>
//             </ButtonLoader>
//           </div>
//         </div>
//         <div className="w-[45%]">
//           <Input name={'nom'} title="RazonSocial" defaults={info.length > 0 ? info[0].nom : null} type="text" verify="true" placeholder={'Nombre completo del producto a crear.'}/>
//         </div>
//         <div className="w-[70%] flex flex-row gap-3">
//           <Input name={'direccion'} title="Direccion" defaults={info.length > 0 ? info[0].direccion : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
//           <Input name={'representante'} title="Representante" defaults={info.length > 0 ? info[0].representante : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
//         </div>
//         {/* <div className="w-[30%]">
//           <Input name={'representante'} title="Representante" defaults={info.length > 0 ? info[0].representante : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
//         </div> */}
//         <div className="flex items-center gap-2">
//           <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
//           <span className="inline-block align-middle text-[12px]">Datos adicionales del proveedor</span>
//         </div>
//         <hr/>
//         {/* <hr className="m-0"/> */}
//         <div className="flex flex-col gap-3">
//           <div className="flex gap-3">
//             <div className="w-[20%]">
//               {/* <Input name={'giro'} title="Tipo de Servicio" defaults={info.length > 0 ? info[0].giro : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/> */}
//               <InputSelect 
//                 title={'Tipo de Servicio'} 
//                 name={'giro'} 
//                 data={
//                   [
//                     { indice: 'OTROS', option: 'OTROS', selected: true },
//                     { indice: 'CONFECCION', option: 'CONFECCION' },
//                     { indice: 'LAVANDERIA', option: 'LAVANDERIA' },
//                     { indice: 'BORDADO', option: 'BORDADO' },
//                     { indice: 'ACABADO', option: 'ACABADO' },
//                     { indice: 'ESTAMPADO', option: 'ESTAMPADO' },
//                   ]} 
//                 df={Object.keys(info).length > 0 ? info[0].clase : null} placeholder={'Seleccione el tipo de servicio a registrar.'} 
//               />
//             </div>
//             <div className="w-[20%]">
//               <Input name={'telefono'} title="Telefono" defaults={info.length > 0 ? info[0].telefono : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
//             </div>
//             <div className="w-[35%]">
//               <Input name={'correo'} title="Correo" defaults={info.length > 0 ? info[0].correo : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
//             </div>
//           </div>
//         </div>
//         <div className="">
//           <div className="w-[40%]">
//             <Input name={'web'} title="Web" defaults={info.length > 0 ? info[0].web : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
//           </div>
//         </div>
//         <div className="w-[30%]">
//           <Input name={'cuenta_corriente'} title="N° Cuenta" defaults={info.length > 0 ? info[0].cuenta_corriente : null} type="text" placeholder={'Cuenta a nombre del titular.'}/>
//           <Input name={'cci'} title="CCI" defaults={info.length > 0 ? info[0].cuenta_corriente : null} type="text" placeholder={'CCI a nombre del titular.'}/>
//           <InputSelect title={'Banco'} name={"banco"} data={
//             [
//               { indice: 'OTROS', option: 'OTROS', selected: true },
//               { indice: 'BCP', option: 'BCP' },
//               { indice: 'SCOTIABANK', option: 'SCOTIABANK' },
//               { indice: 'INTERBANK', option: 'INTERBANK' },
//               { indice: 'BBVA', option: 'BBVA' },
//               { indice: 'BANCO DE LA NACION', option: 'BANCO DE LA NACION' }
//             ]} 
//             df={Object.keys(info).length > 0 ? info[0].clase : null} placeholder={'Seleccione el a registrar.'} 
//           />
//           <Input name={'cci'} title="CCI" defaults={info.length > 0 ? info[0].cuenta_corriente : null} type="text" placeholder={'CCI a nombre del titular.'}/>
//           <Input name={'wallet-01'} title="yape" defaults={info.length > 0 ? info[0].telefono : null} type="number" placeholder={'Numero de yape del titular.'}/>
//           <Input name={'wallet-02'} title="plin" defaults={info.length > 0 ? info[0].telefono : null} type="number" placeholder={'Numero de plin del titular.'}/>
//           <Input name={'cuenta_detracciones'} title="Cuenta de detracciones" defaults={info.length > 0 ? info[0].telefono : null} type="number" placeholder={'BANCO DE LA NACIÓN.'}/>
//         </div>
//         <div className="w-[60%]">
//           <Input name={'det'} title="Detalle" defaults={info.length > 0 ? info[0].det : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
//         </div>
//         <div className="w-[25%] flex flex-row gap-3">
//           {/* <InputSelect title={'Categoria'} name={"cat"} data={
//             [
//               { indice: '0', option: 'NINGUNO', selected: true  },
//               { indice: '1', option: 'TRANSPORTISTA' },
//             ]} 
//             df={Object.keys(info).length > 0 ? info[0].cat : null} placeholder={'Seleccione el tipo de producto a registrar.'} 
//           /> */}
//           <InputSelect title={'Tipo de Proveedor'} name={"clase"} data={
//             [
//               { indice: 'OTROS', option: 'OTROS', selected: true },
//               { indice: 'SERVICIOS', option: 'SERVICIOS' },
//               { indice: 'TELAS', option: 'TELAS' },
//               { indice: 'AVIOS', option: 'AVIOS' }
//             ]} 
//             df={Object.keys(info).length > 0 ? info[0].clase : null} placeholder={'Seleccione el tipo de producto a registrar.'} 
//           />
//         </div>
//         <hr className="m-0"/>
//       </div>
//     </div>
//   </>
// }