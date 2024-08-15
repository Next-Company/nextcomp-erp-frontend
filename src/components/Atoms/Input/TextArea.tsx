export function TextArea({children}){
  const onclick = (e) => {
    e.target.querySelector('textarea').focus()
  }
  const alter_label = (e) => {
    e.target.parentElement.querySelector('label').classList.remove('mover')
  }
  const alter_label2 = (e) => {
    if(e.target.value == '') e.target.parentElement.querySelector('label').classList.add('mover')
  } 
  return(
    <>
      <div onClick={onclick} className="rounded-md bg-gray-100 flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[10px] has-[:focus]:border-b-blue-600 has-[:focus]:border-b-[2px] hover:bg-gray-200 relative">
        <label className="text-[12px] text-blue-600 transition-all mover pointer-events-none">{children}</label>
        <textarea name="" id="" onFocus={alter_label} onBlur={alter_label2} rows={15} className = "w-full bg-inherit focus:border-none focus-within:border-none focus-visible:border-none focus:outline-none"></textarea>
      </div>
    </>
  )
}