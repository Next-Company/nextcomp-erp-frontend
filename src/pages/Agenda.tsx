import { Search } from "../components/Atoms/Search/Search";
import { InputG } from "../components/Atoms/Input/InputG";
import { InputSelect } from "../components/Atoms/Input/InputSelect";
import { Button } from "../components/Atoms/Button/Button";
import { TextArea } from "../components/Atoms/Input/TextArea";
import { InputSelect2 } from "../components/Atoms/Input/InputSelect2";
import { Input } from "../components/Atoms/Input/Input";

export function Agenda() {
  console.log("CARGANDO AGENDA")
  const name = 'nombre', title = 'Nombre', defaults = 'fjdij';
  return (
    <>
      <div className="directory flex flex-col p-4 m-3 rounded-md bg-white w-full relative">
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-[18px]">Agenda</h2>
          <div className="w-[400px]">
            <Search config={{ width: '200px' }} />
          </div>
        </div>
        <div className="w-full">
          <form action="" className="flex flex-col gap-4">
            {/* <InputG>Documento</InputG> */}
            <Input name={name} title={title} defaults={defaults}/>
            <div className="flex w-[50%]">
              <InputSelect title={'Prioridad'} options={['BAJA', 'MEDIA', 'ALTA']} name={"prioridad"}/>
              {/* <InputG name={'asunto'} defaults={''}>Nombre</InputG> */}
              <br></br>
              
              {/* <div className="relative">
                <div className="absolute w-[500px] h-[100px] bg-red-400 z-20">laksjd</div>
              </div> */}
            </div>
            <div>
              {/* <TextArea>sdf</TextArea> */}
              <TextArea title={'Mensaje'} name='message'/>
            </div>
            <div className="flex justify-end gap-2">
              <Button action={() => { }} tipo={'default'}>Cancelar</Button>
              <Button type={'submit'} tipo={'accept'}>Guardar</Button>
            </div>

          </form>

        </div>
      </div>
    </>
  )
}