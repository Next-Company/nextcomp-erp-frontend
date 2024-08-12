import { Input } from "../../components/Atoms/Input/Input";

export function Settings() {
  return (
    <>
      <div className="flex-1 text-left p-4">
        <span className="text-[30px]">Public Profile</span>
        <hr />
        <form action="" className="flex flex-col gap-3 [&_div]:flex [&_div]:flex-col">
          <div>
            <label htmlFor="nombre">Name</label>
            <Input />
          </div>
          <div>
            <label htmlFor="nombre">Name</label>
            <Input />
          </div>
          <div>
            <label htmlFor="nombre">Name</label>
            <Input />
          </div>
        </form>
      </div>
    </>
  )
}