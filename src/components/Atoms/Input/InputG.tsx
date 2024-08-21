import { useEffect, useRef } from "react"

export function InputG({ name, defaults, children }) {
  const ref = useRef(null)
  const onclick = (e) => {
    e.target.querySelector('input').focus()
  }
  const onfocus = (e) => {
    e.target.parentElement.querySelector('label').classList.remove('mover')
    e.target.parentElement.classList.add('selected')
  }
  const onblur = (e) => {
    if (e.target.value == '') {
      e.target.parentElement.querySelector('label').classList.add('mover')
      e.target.parentElement.classList.remove('selected')
    }
  }
  const oneffect = (e) => {
    console.log("incluyendo otro efecto adicional")
  }
  useEffect(()=>{
    if(defaults !== '') ref.current.focus()
  },[defaults])
  return (
    <>
      {/* <div onClick={onclick} className="rounded-md bg-gray-100 flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[8px] has-[input:focus]:border-b-blue-600 has-[input:focus]:border-b-[2px] hover:bg-gray-200 relative box-content group overflow-hidden"> */}
      <div onClick={onclick} className="rounded-md bg-gray-100 flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[8px] hover:bg-gray-200 relative box-content group overflow-hidden">
        <label className="text-[12px] text-blue-600 transition-all mover pointer-events-none">{children}</label>
        <input ref={ref} type="text" name={name} defaultValue={defaults} onFocus={onfocus} onBlur={onblur} className="inp bg-[inherit] border-b-[1px] w-full border-none focus:border-none focus-within:border-none focus-visible:border-none focus:outline-none" />
        <span className="after:absolute after:bottom-0 after:left-0 after:transition-all after:opacity-1 after:w-full after:border-b-[2px] after:border-b-transparent group-[.selected]:after:border-b-blue-600"></span>
      </div>
    </>
  )
}