import { Input } from "../../../components/Atoms/Input/Input"
import { InputSelect } from "../../../components/Atoms/Input/InputSelect"
import { TextArea } from "../../../components/Atoms/Input/TextArea"

export default function SeccionMolde({info,orden}){
  console.log("Info molde:",orden)
  return <>
    <div className={`flex flex-col gap-3 pt-4`}>
      <div className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
        <span className="inline-block align-middle text-[12px]">Datos adicionales</span>
      </div>
      <hr/>
      <div className="flex gap-3 flex-col">
        <Input name={'idx'} defaults={info.length > 0 && info[0].idx ? info[0].idx : null}  type="hidden" />
        <Input name={'id_cab_orden'} defaults={orden ?? null}  type="hidden" />
        <div className="w-[450px]">
          <Input name={'responsable'} defaults={info.length > 0 && info[0].responsable ? info[0].responsable : null} title="Responsable" type="text" placeholder={'Dato informativo opcional'}/>
        </div>
        <div className="w-[650px]">
          <Input name={'molde'} defaults={info.length > 0 && info[0].molde ? info[0].molde : null}  title="Molde" type="text" placeholder={'Dato informativo opcional'}/>
        </div>
        <div className="w-[950px] flex gap-2">
          <Input name={'muestra'} defaults={info.length > 0 && info[0].muestra ? info[0].muestra : null} title="Muestra" type="text" placeholder={'Dato informativo opcional'}/>
          <Input name={'lavado'} defaults={info.length > 0 && info[0].lavado ? info[0].lavado : null} title="Lavado" type="text" placeholder={'Dato informativo opcional'}/>
        </div>
        {/* <div className="w-[450px]">
        </div> */}
        <div className="w-[550px]">
          <Input name={'cliente_corte'} defaults={info.length > 0 && info[0].cliente_corte ? info[0].cliente_corte : null} title="Aprobación Cliente" type="text" placeholder={'Dato informativo opcional'}/>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
        <span className="inline-block align-middle text-[12px]">Datos adicionales</span>
      </div>
      <hr/>
      <div className="flex gap-3 flex-col">
        <div className="w-[1050px] flex gap-2">
          <InputSelect title={'Tizado'} name={"tizado"} data={
            [
              { indice: 'PENDIENTE', option: 'PENDIENTE', selected: true  },
              { indice: 'OBSERVADO', option: 'OBSERVADO' },
              { indice: 'FINALIZADO', option: 'FINALIZADO' },
            ]} 
            df={Object.keys(info).length > 0 ? info[0].tizado : null} 
            placeholder={'Dato informativo opcional'}
          />
          <InputSelect title={'Estado'} name={"estado_molde"} data={[{ indice: 'PENDIENTE', option: 'PENDIENTE', selected: true }, { indice: 'FINALIZADO', option: 'FINALIZADO' }, { indice: '-', option: 'NO CORRESPONDE' }]} df={info.length > 0 ? info[0].estado_molde : null} placeholder={'Dato informativo opcional'}/>
        </div>

      </div>
      <div>
        <TextArea title="Observaciones" name="observaciones_fase_molde" />
      </div>
    </div>
  </>
}