import { Search } from "../components/Atoms/Search/Search";

function UserChat() {
  return (
    <>
      <div className="p-2">
        <div className="rounded-full w-[50px] h-[50px] bg-gray-200"></div>
      </div>
      <div className="flex flex-col flex-1 text-left [&_div]:flex-1 [&_div]:flex [&_div]:pl-2 border-t-[1px] border-t-gray-200">
        <div className="items-end text-[15px] font-semibold">Juan Pablo</div>
        <div className="text-[12px]">ultimo mensaje</div>
      </div>
    </>
  )
}

export function ChatRoom() {
  return (
    <>
      <div className="directory flex flex-col m-3 rounded-md bg-white w-full relative">
        <div className="flex flex-1">
          <div className="directory flex flex-col gap-4 rounded-md bg-white w-[400px] relative">
            <div className="p-3">
              <Search />
            </div>
            <div>
              <ul className="[&_li]:flex [&_li]:cursor-pointer [&_li:hover]:bg-gray-100">
                <li>
                  <UserChat />
                </li>
                <li>
                  <UserChat />
                </li>
                <li>
                  <UserChat />
                </li>
                <li>
                  <UserChat />
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-200 flex-1 rounded-r-md">
            <div className="flex flex-col h-full border-l-[1px] border-l-gray-200">
              <div className="h-[60px] bg-gray-100"></div>
              <div className="flex-1 bg-white"></div>
              <div className="h-[60px] bg-gray-100"></div>
            </div>
          </div>
        </div >
      </div >
    </>
  )
}