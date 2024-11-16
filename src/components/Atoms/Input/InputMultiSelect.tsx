import { useEffect, useRef, useState } from "react"
export function InputMultiSelect({ title, name, data, df = null }) {
  const ref_menu = useRef(null)
  const [select, setSelect] = useState(df ? JSON.parse(df).map(row => data.findIndex(ele=>ele.option == row)) : [])
  const [info, setInfo] = useState(data)

  const editando = (key,target) => {
    select.findIndex(element => element == key) < 0 ? setSelect(select => [...select,key]) : setSelect(select => select.filter(row=>row !== key))
    target.classList.toggle("after:content-['✔']")
    target.classList.toggle("after:px-2")
    target.classList.toggle("justify-between")
    target.classList.toggle("bg-gray-100")
  }
  const onclick = (e) => {
    if (e.target.matches('div')) {
      e.target.querySelector('label').classList.remove('mover')
      e.target.classList.add('selected')
      e.target.focus()
    }
  }
  const onblur = (e) => {
    select.length == 0 && e.target.querySelector('label').classList.add('mover')
    e.target.classList.remove('selected')
  }
  const ontransition = (e) => {
    if (e.propertyName == 'opacity') {
      e.target.classList.contains('scale-100') ? e.target.classList.remove('scale-100') : e.target.classList.add('scale-100')
    }
  }
  useEffect(()=>{
    console.log(JSON.parse(df)?.map(row=>row))
      // setSelect(df ? JSON.parse(df).map(row => data.findIndex(ele=>ele.option == row)) : [])
  },[df])

  return (
    <>
      <div onClick={onclick} onBlur={onblur} className="rounded-md bg-gray-100 flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[8px] hover:bg-gray-200 relative box-content group flex-1" tabIndex={-1}>
        <label className="text-[12px] text-blue-600 transition-all pointer-events-none">{title}</label>

        <input type='hidden' name={name} value={JSON.stringify(select.map(row=>data[row].option))} />
        <input readOnly value={select.length > 0 ? select.map(row=>info[row].option).toString() : ''} type="text" onFocus={()=>{}} onBlur={()=>{}} className="inp cursor-default bg-[inherit] w-full border-none focus:border-none focus-within:border-none focus-visible:border-none focus:outline-none pointer-events-none"/>

        <span className="after:absolute after:bottom-0 after:left-0 after:transition-all after:opacity-1 after:w-full after:border-b-[2px] after:border-b-transparent group-[.selected]:after:border-b-blue-600"></span>
        <ul onClick={onclick} id="ppp" ref={ref_menu} onTransitionEnd={ontransition} className="special absolute left-0 top-[100%] z-10 border-[1px] border-gray-100 bg-white shadow-xl rounded-sm pt-3 pb-3 [&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center [&_li]:cursor-pointer [&_li]:pl-[10px] [&_li]:pt-[8px] [&_li]:pb-[8px] transition-all origin-center opacity-0 scale-95 group-[.selected]:opacity-100 group-[.selected]:scale-100 group-[.selected]:flex flex-col w-full overflow-hidden group-[.selected]:overflow-visible pointer-events-none group-[.selected]:pointer-events-auto">
          {
            info.map((op, key) => <li key={key} className={`${df && JSON.parse(df).findIndex(ele=>ele == op.option) >= 0 && "after:content-['✔'] after:px-2 justify-between bg-gray-100"}`} data-index={key} onClick={(e) => editando(key,e.target)}>{op.option}</li>)
          }
        </ul>
      </div>
    </>
  )
}