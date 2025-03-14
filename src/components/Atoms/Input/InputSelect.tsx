import { useEffect, useRef, useState } from "react"
export function InputSelect({ title, name, data, df, formref=null }) {
  const ref_menu = useRef(null)
  const [select, setSelect] = useState(0)
  const [info, setInfo] = useState(data)

  const editando = (key) => {
    console.log("Editando")
    setSelect(key)
    
  }
  const onclick = (e) => {
    if (e.target.matches('div')) {
      e.target.querySelector("input[type='text']").focus()
    }
  }
  const onfocus = (e) => {
    e.target.parentElement.querySelector('label').classList.remove('mover')
    e.target.parentElement.classList.add('selected')
  }
  const onblur = (e) => {
    if (e.relatedTarget && e.relatedTarget.tagName == 'LI') {
      setSelect(parseInt(e.relatedTarget.dataset.index))
      if(formref){
        const event = new CustomEvent('salamandra', {
          detail:{valor:info[parseInt(e.relatedTarget.dataset.index)].option}
        })
        formref.current.dispatchEvent(event)
      }
    }
    e.target.parentElement.classList.remove('selected')
  }
  const ontransition = (e) => {
    if (e.propertyName == 'opacity') {
      e.target.classList.contains('scale-100') ? e.target.classList.remove('scale-100') : e.target.classList.add('scale-100')
    }
  }

  useEffect(() => {
    console.log("El valor de df es:",df)
    const result = info.findIndex(row => row.indice == df)
    console.log(result)
    setSelect(result == -1 ? 0 : result)
    // setSelect(result)
  }, [df])

  useEffect(() => {
    // console.log("El valor de df es:",df)
    console.log("Hola urano cmo vamo:",select)
    // const result = info.findIndex(row => row.indice == df)
    // console.log(result)
    // setSelect(result == -1 ? 0 : result)
    // setInfo8
  }, [select])

  const onchange = ()=>{
    console.log("Detectando el cambio del inputselect")
  }
  return (
    <>
      <div onClick={onclick} className="rounded-md bg-gray-100 flex flex-col justify-start items-start pl-[16px] pr-[16px] pt-[5px] pb-[8px] hover:bg-gray-200 relative box-content group flex-1">
        <label className="text-[12px] text-blue-600 transition-all pointer-events-none">{title}</label>

        {/* <input type='hidden' name={name} value={select >= 0 ? info[select].indice : null} /> */}
        <input type='hidden' onChange={onchange} name={name} value={info[select].indice} />
        {/* <input onClick={e => e.stopPropagation()} readOnly value={select > 0 ? info[select].option : null} type="text" onFocus={onfocus} onBlur={onblur} className="inp cursor-default bg-[inherit] w-full border-none focus:border-none focus-within:border-none focus-visible:border-none focus:outline-none" /> */}
        <input onClick={e => e.stopPropagation()} readOnly value={info[select].option} onChange={onchange} type="text" onFocus={onfocus} onBlur={onblur} className="inp cursor-default bg-[inherit] w-full border-none focus:border-none focus-within:border-none focus-visible:border-none focus:outline-none" />

        <span className="after:absolute after:bottom-0 after:left-0 after:transition-all after:opacity-1 after:w-full after:border-b-[2px] 
        after:border-b-transparent group-[.selected]:after:border-b-blue-600"></span>
        <ul onClick={onclick} id="ppp" ref={ref_menu} onTransitionEnd={ontransition} className="special absolute left-0 top-[100%] z-10 border-[1px] border-gray-100 bg-white shadow-xl rounded-sm pt-3 pb-3 [&_li:hover]:bg-gray-100 [&_li]:flex [&_li]:items-center [&_li]:cursor-pointer [&_li]:pl-[10px] [&_li]:pt-[8px] [&_li]:pb-[8px] transition-all origin-center opacity-0 scale-95 group-[.selected]:opacity-100 group-[.selected]:scale-100 group-[.selected]:flex flex-col w-full overflow-hidden group-[.selected]:overflow-visible pointer-events-none group-[.selected]:pointer-events-auto">
          {
            // valores.map((op, key) => <li key={key} data-index={key} tabIndex={-1} className="hola" onClick={() => editando(key)}>{op}</li>)
            info.map((op, key) => <li key={key} data-index={key} tabIndex={-1} onClick={() => editando(key)}>{op.option}</li>)
          }
        </ul>
      </div>
    </>
  )
}