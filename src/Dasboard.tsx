import { Sidenav } from "./Sidenav";
import { Table } from "./Table";

export function Dasboard(){
  return(
    <>
      <div className="flex flex-col h-[100%] overflow-hidden text-[14px]">
        <div className="flex items-center justify-between h-[50px] bg-white border-b">
          <div className="">
            <svg id="Capa_1" className="w-[30px]" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 107.84 124.51"><defs></defs><path className="cls-1" style={{fillRule:'evenodd'}} d="M297.91,309.05,312,300.88l13.1,16.46-27.23,15.75L253.3,307.32V255.89l44.61-25.71,27.23,15.7L312,262.33l-14.13-8.17-23.77,13.75v3.3h32.05V292H274.14v3.3Zm-.27,34.81-27-15.53-27-15.6V250.48l27-15.54,27-15.59,27,15.59,27,15.54v62.25l-27,15.6Zm41.09-86.24v52.57l-20.9-26.31Z" transform="translate(-243.72 -219.35)"/></svg>
          </div>
          <div className="rounded-full w-10 h-10 border">dfdf</div>
        </div>
        <div className="flex flex-1 overflow-hidden bg-[rgba(255,90,0,.12)]">
          <Sidenav/>
          <div className="flex flex-col flex-1 w-64 bg-[#f5f7fa] overflow-y-auto">
            <div className="flex border-b h-16">
              <div className="flex-1"></div>
              <div>
                {/* <div className="rounded-full w-12 h-12 border">dfdf</div> */}
              </div>
            </div>
            <div className="p-2">
                <Table/>
                <Table/>
                <Table/>
                <Table/>
                <Table/>
                <Table/>
                <Table/>
                <Table/>
                <Table/>
                <Table/>
                <Table/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}