import { Button } from "../components/Atoms/Button/Button";
import { Search } from "../components/Atoms/Search/Search";
import { io } from "socket.io-client";
function UserChat() {
  return (
    <>
      <div className="relative flex">
        <div className="p-3">
          <div className="rounded-full w-[35px] h-[35px] bg-gray-200"></div>
        </div>
        <div className="flex flex-col flex-1 text-left [&_div]:flex-1 [&_div]:flex [&_div]:pl-2 border-t-[1px] border-t-gray-200">
          <div className="items-end text-[15px] font-semibold">Usuario</div>
          <div className="text-[12px]">ultimo mensaje</div>
        </div>
        <div className="absolute flex gap-[3px] right-2 top-4 [&_div]:w-1 [&_div]:h-1 [&_div]:rounded-full [&_div]:bg-gray-300">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export function ChatRoom() {
  // const socket = io("ws://192.168.0.171:3000")
  // const socket = io("ws://localhost:3000")
  // socket.on("hello", (arg) => {
  //   console.log(arg)
  // })
  // const enviar = () => {
  //   console.log("hoal")
  //   socket.emit("howdy", "stranger")
  // }
  return (
    <>
      {
        1 ?

          <div className="directory flex flex-col p-4 m-3 rounded-md bg-white w-full relative">
            <div className="flex justify-between items-center">
              <h2 className="font-medium text-[18px]">Colaboradores</h2>
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
                  <Button action={() => { }} type="button" tipo="default">CLick me!</Button>
                </div>
              </form>

            </div>
          </div>
          :


          <div className="directory flex flex-col m-3 rounded-md bg-white w-full relative">
            <div className="flex flex-1">
              <div className="directory flex flex-col gap-4 rounded-md bg-white w-[400px] relative">
                <div className="p-3">
                  <Search />
                </div>
                <div>
                  <ul className="[&_li]:cursor-pointer [&_li:hover]:bg-gray-100">
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
              <div className="bg-gray-200 flex-1 rounded-r-md overflow-hidden">
                <div className="flex flex-col h-full border-l-[1px] border-l-gray-200">
                  <div className="h-[50px] bg-gray-200"></div>
                  <div className="flex-1 bg-white"></div>
                  <div className="p-3 bg-gray-200">

                    <div className="flex">
                      <div></div>
                      {/* <div className="flex-1 rounded-full pl-4 pt-1 pr-4 pb-1 bg-white flex items-center" contentEditable="plaintext-only"> */}
                      <div className="flex-1 rounded-full pl-4 pt-1 pr-4 pb-1 bg-white flex items-center">
                        {/* <input type="text" multiple /> */}
                        <textarea name="" id="" className="w-full p-1" rows={1} style={{ resize: 'none' }}></textarea>
                        {/* <input type="text" className="w-full p-1" /> */}
                        {/* <div className="flex-1 h-[20px] rounded-full bg-white"></div> */}
                      </div>
                      <div>sd</div>
                    </div>

                  </div>
                </div>
              </div>
            </div >
          </div >
      }
    </>
  )
}