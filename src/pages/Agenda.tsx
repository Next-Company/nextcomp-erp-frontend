import { Search } from "../components/Atoms/Search/Search";
import { TextArea } from "../components/Atoms/Input/TextArea";

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
        <div className="w-full">
          <form action="" className="flex flex-col gap-4">
            <div className="flex w-[50%]">
              <br></br>
            </div>
            <div>
              {/* <TextArea>sdf</TextArea> */}
              <TextArea title={'Mensaje'} name='message' />
            </div>
          </form>

        </div>
      </div>
    </>
  )
}