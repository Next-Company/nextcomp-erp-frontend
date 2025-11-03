import { useRef, useState } from "react"
import { Consulta } from "../../utils/utils"
import { Input } from "../Atoms/Input/Input"
import { InputSelect } from "../Atoms/Input/InputSelect"
import { Button } from "../Atoms/Button/Button"
import { ButtonLoader } from "../Atoms/Button/ButtonLoader"

const ExportFilters = ({ close, update }) => {
  const [stage, setStage] = useState(1)
  const [laoding, setLoading] = useState(false)
  const form_export = useRef()
  const form_import = useRef()
  const exportletra = () => {
    setLoading(true)
    Consulta({
      url: 'reports/resumenconsolidado',
      params: {
        body: new FormData(form_export.current),
        method: 'POST'
      }
    })
      .then(resp => {
        // loader(false)
        // setLoading(false)
        const hexString = resp.data;
        const bytes = new Uint8Array(hexString.length / 2)
        for (let i = 0; i < hexString.length; i += 2) {
          bytes[i / 2] = parseInt(hexString.substr(i, 2), 16);
        }
        const file = window.URL.createObjectURL(new Blob([bytes], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }))
        const a = document.createElement("a");
        a.classList.add("pdf_link")
        a.href = file;
        a.download = resp.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a)
      })
      .catch((error) => {
        console.log("El mnesaje de error es:", error)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const importletra = (e) => {
    e.preventDefault()
    console.log(Object.fromEntries(new FormData(form_import.current)))
    setLoading(true)
    Consulta({url:'reports/import',params:{
      method:'POST',
      body:new FormData(form_import.current)
    }})
    .then(resp=>{
      console.log(resp)
      close(false)
      // setLoading(false)
      update()
    })
    .catch(err=>{ 
      console.log(err)
    })
    .finally(()=>{
      console.log("Finaliza la consulta")
      setLoading(false)
    })
  }
  return (
    <>
      <div className="w-[800px] h-[500px] overflow-hidden flex flex-col">
        
        <div className="border-t-[.2px] border-b-[.2px] border-gray-300">
          <ul className="list-none min-w-[300px] flex [&_button:hover]:bg-gray-100 [&_button]:cursor-pointer [&_button]:text-nowrap [&_button]:pl-5 [&_button]:pr-5 [&_button]:flex [&_button]:justify-center [&_button]:items-center [&_button]:h-[50px] [&_button.active]:text-blue-500 [&_button]:text-gray-400 [&_button]:rounded-none [&_button:hover]:outline-none [&_button]:font-[inherit] [&_button]:font-semibold [&_button.active:hover]:bg-blue-50">
            <button className={`group ${stage == 1 ? 'active' : ''}`} data-stage="1" onClick={()=>setStage(1)}>
              <span className="relative h-[100%] flex items-center pointer-events-none">
                Exportar
                <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
              </span>
            </button>
            <button className={`group ${stage == 2 ? 'active' : ''}`} data-stage="2" onClick={()=>setStage(2)}>
              <span className="relative h-[100%] flex items-center pointer-events-none">
                Importar
                <span className="absolute bottom-0 group-[.active]:border-b-[3px] group-[.active]:border-b-blue-500 flex items-center w-[100%] h-[100%]"></span>
              </span>
            </button>
          </ul>
        </div>
        <div className="flex-1">
          <div className={`w-[200%] h-[100%] flex flex-row ${stage == 1 ? 'translate-x-0' : 'translate-x-[-50%]'} transition-transform duration-200`}>
            {/* EXPORTAR */}
            <div className="flex-1 h-full flex flex-col">
              <div className="w-full pt-2 flex-1">
                <div>
                  <form ref={form_export} className="flex flex-col gap-2">
                    <Input name={'proveedor'} title="Proveedor" type="text" />
                    <Input name={'fec_desde'} title="FechaDesde" type="date" />
                    <Input name={'fec_hasta'} title="FechaHasta" type="date" />
                    <InputSelect title={'Estado'} name={"estado"} data={
                      [
                        { indice: 'PENDIENTE', option: 'PENDIENTE', selected: true }, 
                        { indice: 'TERMINADO', option: 'TERMINADO' }, 
                      ]} 
                      df={null} 
                    />
                  </form>
                </div>
              </div>
              <div className="flex flex-row justify-end gap-2 pb-2">
                <Button tipo="default" action={()=>close(false)} type="button">Cancelar</Button>
                {/* <Button action={exportletra} tipo="success" type="button">Exportar</Button> */}
                <ButtonLoader task={exportletra} tipo={'success'} type="button" loading={laoding}>Exportar</ButtonLoader>
              </div>
            </div>
            {/* IMPORTAR */}
            <div className="flex-1 flex flex-col">
              <form ref={form_import} onSubmit={importletra} className="flex flex-col gap-2 h-full">
                <div className="flex-1 p-2">
                  <input type="file" name="filenext" accept=".xlsx,application/vnd.ms-excels" required className="w-full h-[40px] border-[.2px] border-gray-200 bg-zinc-300 cursor-pointer"/>
                </div>
                <div className="flex flex-row justify-between items-center gap-2 pb-2">
                  <a href="http://192.168.18.20:4000/templates/plantilla_letras.xlsx" target="_blank" download={'nueva_imagen'}>* Descargar plantilla</a>
                  <div className="flex flex-row gap-2">
                    <Button tipo="default" action={()=>close(false)} type="button">Cancelar</Button>
                    {/* <ButtonLoader task={importletra} tipo={'accept'} type="submit" loading={laoding}>Importar</ButtonLoader> */}
                    <ButtonLoader tipo={'accept'} type="submit" loading={laoding}>Importar</ButtonLoader>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}