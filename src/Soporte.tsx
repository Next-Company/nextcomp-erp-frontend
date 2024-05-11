import { Table } from "./Table";

export function Soporte(){
  return(
    <>
      <div className="flex flex-col flex-1 w-64 bg-white border-l overflow-y-auto">
        <div className="p-2 text-left">
            <div className="flex flex-col gap-2 p-3">
              <h2 className="font-medium text-[18px]">User</h2>
              <p>A list of all the users in your account including their name, title, email and role.</p>
            </div>
            <Table/>
        </div>
      </div>
    </>
  )
}