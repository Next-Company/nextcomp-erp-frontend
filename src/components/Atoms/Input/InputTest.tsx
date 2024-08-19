export function InputTest({ children }) {
  const onclick = (e) => {
    e.target.querySelector('input').focus()
  }
  const alter_label = (e) => {
    e.target.parentElement.querySelector('label').classList.remove('mover')
  }
  const alter_label2 = (e) => {
    if (e.target.value == '') e.target.parentElement.querySelector('label').classList.add('mover')
  }
  return (
    <>
      {/* <div onClick={onclick} className="rounded-md bg-gray-100 flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[8px] has-[input:focus]:border-b-blue-600 has-[input:focus]:border-b-[2px] hover:bg-gray-200 relative box-content"> */}
      <div onClick={onclick} className="rounded-md flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[8px] relative box-content">
        <label className="text-[12px] text-blue-600 transition-all mover pointer-events-none">{children}</label>
        <input type="text" onFocus={alter_label} onBlur={alter_label2} className="inp bg-[inherit] border-b-[1px] border-b-gray-500 focus:border-b-red-500 focus:border-b-[1px] focus:outline-none w-full " />
      </div>
    </>
  )
}