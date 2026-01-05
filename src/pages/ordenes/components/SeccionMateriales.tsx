import { Input } from "../../../components/Atoms/Input/Input"
import { InputSelect } from "../../../components/Atoms/Input/InputSelect"
import { TextArea } from "../../../components/Atoms/Input/TextArea"

export default function SeccionMateriales({info,orden}){
  console.log("Info materiales:",orden)
  return <>
    <div className={`flex flex-col gap-3 pt-4`}>
      <div className="flex gap-3">
        <Input name={'idx'} defaults={info.length > 0 && info[0].idx ? info[0].idx : null}  type="hidden" />
        <Input name={'id_cab_orden'} defaults={orden ?? null}  type="hidden" />
      </div>
      <div className="flex gap-3">
        <InputSelect title={'Estado'} name={"estado_materiales"} data={[{ indice: 'PENDIENTE', option: 'PENDIENTE', selected: true }, { indice: 'FINALIZADO', option: 'FINALIZADO' }]} df={info.length > 0 ? info[0].estado_materiales : null} />
      </div>
      <div>
        <TextArea title="Observaciones" name="observaciones_fase_materiales" />
      </div>
    </div>
  </>
}