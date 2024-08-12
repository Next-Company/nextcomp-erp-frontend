export function Search(){
  const onclick = (e) => {
    // e.target.parentElement.classList.add('bg-white','shadow-md')
    // console.log(e.target.parentElement)
  }
  return( 
    <>
        <div className="flex items-center border-[1px] rounded-full gap-3 bg-gray-200 pl-4 p-1 pr-4 has-[:focus]:bg-white has-[:focus]:shadow-md" onClick={onclick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
          <input type="searh" className="h-[30px] flex-1 focus:outline-none bg-gray-200 focus:bg-white focus:w-[300px]" style={{transition:'width .3s ease'}} placeholder="Busqueda soporte" />
        </div>
    </>
  )
}