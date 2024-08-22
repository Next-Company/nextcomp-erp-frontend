export function InputSelect({children,title,nombre}){
  const onclick = (e) => {
    e.target.querySelector('input').focus()
  }
  const onfocus = (e) => {
    e.target.parentElement.querySelector('label').classList.remove('mover')
    e.target.parentElement.classList.add('selected')
  }
  const onblur = (e) => {
    if(e.target.value == ''){
      e.target.parentElement.querySelector('label').classList.add('mover')
      e.target.parentElement.classList.remove('selected')
    }
  } 
  return(
    <>
      {/* <div className="rounded-md bg-gray-100 flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[8px] has-[:focus]:border-b-blue-600 has-[:focus]:border-b-[2px] hover:bg-gray-200 relative"> */}
      {/* <div className="rounded-md bg-gray-100 flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[8px] has-[:focus]:border-b-blue-600 has-[:focus]:border-b-[2px] hover:bg-gray-200 relative group overflow-hidden"> */}
      {/* <div className="rounded-md bg-gray-100 flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[8px] hover:bg-gray-200 relative group overflow-hidden"> */}
      <div onClick={onclick} className="rounded-md bg-gray-100 flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[8px] hover:bg-gray-200 relative box-content group">
        <label className="text-[12px] text-blue-600 transition-all mover pointer-events-none">{title}</label>

        <input type="text" onFocus={onfocus} onBlur={onblur} className="inp bg-[inherit] w-full border-none focus:border-none focus-within:border-none focus-visible:border-none focus:outline-none" />
        {/* <select className="outline-none w-full bg-[inherit]" onFocus={alter_label} onBlur={alter_label2} >
          {children}
        </select> */}
        <span className="after:absolute after:bottom-0 after:left-0 after:transition-all after:opacity-1 after:w-full after:border-b-[2px] 
        after:border-b-transparent group-[.selected]:after:border-b-blue-600"></span>
        <ul className="hidden left-0 top-[100%] z-10 border-[1px] border-gray-100 bg-white shadow-xl rounded-sm w-full pt-3 pb-3 [&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center [&_li]:cursor-pointer [&_li]:pl-[10px] [&_li]:pt-[8px] [&_li]:pb-[8px] transition-all origin-center opacity-0 scale-90 group-[.selected]:opacity-100 group-[.selected]:scale-100 group-[.selected]:absolute group-[.selected]:flex group-[.selected]:flex-col">
          <li>Opcion1</li>
          <li>Opcion2</li>
          <li>Opcion3</li>
        </ul>
      </div>
    </>
  )
}