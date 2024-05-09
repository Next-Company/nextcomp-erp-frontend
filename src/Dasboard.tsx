export function Dasboard(){
  return(
    <>
      {/* <div className="grid grid-cols-2"> */}
      <nav className="flex h-[100%] text-xs">
        <div className="flex flex-col flex-none p-3 gap-y-4 w-[20%] bg-[white]">
          <div className="mb-4 mt-3">
            <svg id="Capa_1" className="w-[30px]" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 107.84 124.51"><defs></defs><path className="cls-1" style={{fillRule:'evenodd'}} d="M297.91,309.05,312,300.88l13.1,16.46-27.23,15.75L253.3,307.32V255.89l44.61-25.71,27.23,15.7L312,262.33l-14.13-8.17-23.77,13.75v3.3h32.05V292H274.14v3.3Zm-.27,34.81-27-15.53-27-15.6V250.48l27-15.54,27-15.59,27,15.59,27,15.54v62.25l-27,15.6Zm41.09-86.24v52.57l-20.9-26.31Z" transform="translate(-243.72 -219.35)"/></svg>
          </div>
          <div>
            <ul>
              <li className="">
                <a href="/" className="flex h-[40px] p-2 text-black/50 hover:text-black/50 hover:bg-[rgb(232,232,232)] hover:rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" className="bag oc se ur"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"></path></svg>
                  Dasboard
                </a>
              </li>
              <li className="p-2">
                <a href="" className="flex h-[30px] p-1 text-white/80 hover:text-white hover:bg-[rgb(67,56,202)] hover:rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" className="ayb brz oc se ur __web-inspector-hide-shortcut__"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path></svg>
                  Equipo
                </a>
              </li>
              <li className="p-2">
                <a href="" className="flex h-[30px] p-1 text-white/80 hover:text-white hover:bg-[rgb(67,56,202)] hover:rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" className="ayb brz oc se ur"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"></path></svg>
                  Proyecto
                </a>
              </li>
              <li className="p-2">
                <a href="" className="flex h-[30px] p-1 text-white/80 hover:text-white hover:bg-[rgb(67,56,202)] hover:rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" className="ayb brz oc se ur"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path></svg>
                  Calendario
                </a>
              </li>
              <li className="p-2">
                <a href="" className="flex h-[30px] p-1 text-white/80 hover:text-white hover:bg-[rgb(67,56,202)] hover:rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" className="ayb brz oc se ur"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"></path></svg>
                  Documentos
                </a>
              </li>
              <li className="p-2">
                <a href="" className="flex h-[30px] p-1 text-white/80 hover:text-white hover:bg-[rgb(67,56,202)] hover:rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" className="ayb brz oc se ur"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"></path></svg>
                  Reportes
                </a>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              <li>Soporte</li>
              <li>Ventas</li>
              <li>Diseño</li>
              <li>Gerencia</li>
              <li>Operaciones</li>
            </ul>
          </div>
          {/* <div>
          </div> */}
        </div>
        <div className="flex flex-col flex-1 w-64 bg-[#f5f7fa]">
          <div className="border-b-2 h-16">
            aasfdjal
          </div>
          <div></div>
        </div>
      </nav>
    </>
  )
}