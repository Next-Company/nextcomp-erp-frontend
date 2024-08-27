import { useEffect, useRef } from "react"

export function InputG({ name, defaults, title }) {
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
  useEffect(() => {
    if (defaults && defaults !== '') {
      console.log(defaults)
      ref.current.parentElement.classList.add('selected')
      ref.current.parentElement.querySelector('label').classList.remove('mover')
    }
  }, [defaults])
  return (
    <>
      <div onClick={onclick} className={`rounded-md bg-gray-100 flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[8px] hover:bg-gray-200 relative box-content group overflow-hidden flex-1`}>
        <label className={`text-[12px] text-blue-600 transition-all mover pointer-events-none`}>{title}</label>
        <input onClick={(e) => e.stopPropagation()} ref={ref} type="text" name={name} defaultValue={defaults} onFocus={onfocus} onBlur={onblur} className="inp bg-[inherit] w-full border-none focus:border-none focus-within:border-none focus-visible:border-none focus:outline-none" />
        <span className="after:absolute after:bottom-0 after:left-0 after:transition-all after:opacity-1 after:w-full after:border-b-[2px] after:border-b-transparent group-[.selected]:after:border-b-blue-600"></span>
      </div>
    </>
  )
}