import { useEffect, useState } from "react"

export function TextArea({ title, name, valor = "" }) {
  const [initial, setInital] = useState(valor)
  const onclick = (e) => {
    e.target.querySelector('textarea').focus()
  }
  const onfocus = (e) => {
    e.target.parentElement.querySelector('label').classList.remove('mover')
    e.target.parentElement.classList.add('selected')
  }
  const onblur = (e) => {
    if (e.target.value == '') {
      e.target.parentElement.querySelector('label').classList.add('mover')
    }
    e.target.parentElement.classList.remove('selected')
  }
  useEffect(()=>{
    setInital(valor)
  },[valor])
  return (
    <>
      <div onClick={onclick} className="rounded-md bg-gray-100 flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[10px] hover:bg-gray-200 relative group overflow-hidden">
      {/* value={initial} */}
        <label className={`text-[12px] text-blue-600 transition-all ${valor == '' && 'mover'} pointer-events-none`}>{title}</label>
        <textarea onClick={(e) => e.stopPropagation()} name={name} value={initial}  onFocus={onfocus} onBlur={onblur} rows={15} className="w-full bg-inherit focus:border-none focus-within:border-none focus-visible:border-none focus:outline-none resize-none"></textarea>
        {/* defaultValue={initial} */}
        <span className="after:absolute after:bottom-0 after:left-0 after:transition-all after:opacity-1 after:w-full after:border-b-[2px] after:border-b-transparent group-[.selected]:after:border-b-blue-600"></span>
      </div>
      {/* value={valor}  */}
    </>
  )
}