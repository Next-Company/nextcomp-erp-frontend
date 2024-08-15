export function InputSelect({children,title,nombre}){
  const alter_label = (e) => {
    e.target.parentElement.querySelector('label').classList.remove('mover')
  }
  const alter_label2 = (e) => {
    if(e.target.value == '') e.target.parentElement.querySelector('label').classList.add('mover')
  } 
  return(
    <>
      {/* <div className="rounded-md bg-gray-100 flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[8px] has-[:focus]:border-b-blue-600 has-[:focus]:border-b-[2px] hover:bg-gray-200 relative"> */}
      <div className="rounded-md bg-gray-100 flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[8px] has-[:focus]:border-b-blue-600 has-[:focus]:border-b-[2px] hover:bg-gray-200 relative">
        <label className="text-[12px] text-blue-600 transition-all mover pointer-events-none">{title}</label>
        <select className="outline-none w-full bg-[inherit]" onFocus={alter_label} onBlur={alter_label2} >
          {/* <option value=""></option>
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option> */}
          {children}
        </select>
      </div>
    </>
  )
}