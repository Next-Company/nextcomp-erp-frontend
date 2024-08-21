import { Search } from "../components/Atoms/Search/Search";
import { InputG } from "../components/Atoms/Input/InputG";
import { InputSelect } from "../components/Atoms/Input/InputSelect";

export function Agenda() {
  return (
    <>
      <div className="directory flex flex-col p-4 m-3 rounded-md bg-white w-full relative">
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-[18px]">Agenda</h2>
          <div className="w-[400px]">
            <Search config={{ width: '200px' }} />
          </div>
        </div>
        <div className="w-[400px]">
          <form action="">
            <InputG>Documento</InputG>
            {/* <InputSelect>Datos</InputSelect> */}
          </form>
        </div>
      </div>
    </>
  )
}