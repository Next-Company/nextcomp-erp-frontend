export function TextArea({ children }) {
  const onclick = (e) => {
    e.target.querySelector('textarea').focus()
  }
  const alter_label = (e) => {
    e.target.parentElement.querySelector('label').classList.remove('mover')
    e.target.parentElement.classList.add('selected')
  }
  const alter_label2 = (e) => {
    if (e.target.value == '') {
      e.target.parentElement.querySelector('label').classList.add('mover')
      e.target.parentElement.classList.remove('selected')
    }
  }
  return (
    <>
      {/* <div onClick={onclick} className="rounded-md bg-gray-100 flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[10px] has-[:focus]:border-b-blue-600 has-[:focus]:border-b-[2px] hover:bg-gray-200 relative"> */}
      <div onClick={onclick} className="rounded-md bg-gray-100 flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[10px] hover:bg-gray-200 relative group overflow-hidden">
        <label className="text-[12px] text-blue-600 transition-all mover pointer-events-none">{children}</label>
        <textarea onClick={(e) => e.stopPropagation()} name="" id="" onFocus={alter_label} onBlur={alter_label2} rows={15} className="w-full bg-inherit focus:border-none focus-within:border-none focus-visible:border-none focus:outline-none resize-none"></textarea>
        <span className="after:absolute after:bottom-0 after:left-0 after:transition-all after:opacity-1 after:w-full after:border-b-[2px] after:border-b-transparent group-[.selected]:after:border-b-blue-600"></span>
      </div>
    </>
  )
}