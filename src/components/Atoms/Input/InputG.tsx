export function InputG({ children }) {
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
      <div onClick={onclick} className="rounded-md bg-gray-100 flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[8px] has-[input:focus]:border-b-blue-600 has-[input:focus]:border-b-[2px] hover:bg-gray-200 relative box-content">
        {/* <div onClick={onclick} className="rounded-md flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[8px] relative box-content"> */}
        <label className="text-[12px] text-blue-600 transition-all mover pointer-events-none">{children}</label>
        <input type="text" onFocus={alter_label} onBlur={alter_label2} className="inp bg-[inherit] border-b-[1px] w-full border-none focus:border-none focus-within:border-none focus-visible:border-none focus:outline-none" />

        <span className="absolute block z-10 w-full h-10px after:rounded-b-md after:bg-green-400 after:h-[10px] after:block after:w-full after:boder-[2px] after:border-red-600 left-0 bottom-0"></span>
        {/* <span className="absolute z-10 w-full bg-green-300 h-[12px] after:h-[20px] after:bg-gradient-to-[45deg, black, transparent] after:block after:w-full left-0 bottom-0">D</span> */}
      </div>
      {/* <div className="w-[300px] border-[1px] border-red-400 after:w-[100%] after:h-[20px] after:border-b-[5px] after:border-b-blue-600 after:block">sf</div> */}
      {/* <div className="w-[300px] border-[1px] border-red-400 after:w-[100%] after:h-[20px] after:border-[5px] after:border-blue-600 after:block">
      </div> */}
      <br />
      <div className="w-[300px] overflow-hidden border-[0px] rounded-[4px] bg-gray-200 h-[50px] border-red-400 relative group is-published">
        {/* <span className="absolute bottom-0 rounded-[4px] block z-10 w-full h-[4px] border-b-[2px] border-b-violet-600"></span> */}
        <span className="after:absolute after:bottom-0 after:left-0 after:transition-all after:opacity-1 after:w-full after:border-b-[2px] after:border-b-violet-600 group-hover-[.is-published]:bg-red-700"></span>
      </div>
    </>
  )
}