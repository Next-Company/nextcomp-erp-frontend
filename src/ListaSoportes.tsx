// import { useRef } from "react"

export function ListaSoportes({save,children}){
  // const form = useRef()
  const onclick = (e)=>{
    e.preventDefault()
    // console.log(form.current.elements)
    // console.log(form.current)
    // console.log(e.target)
    save(e.target)
    // console.log('hola mundo')
  }  
  return(
    <>
      <form onSubmit={onclick} className="pt-4 [&_input]:border-b [&_input]:p-1 [&_input]:text-[14px] [&_input]:outline-0 [&_input:focus-visible]:border-blue-700 [&_label]:text-[12px] [&_label]:font-medium flex flex-col gap-4">
        {/* <input type="text" name="nombre" id="juan" />
        <button type="submit" onSubmit={onclick}>Enviar</button> */}
        {children}
      </form>
      {/* <form ref={form} action="" onSubmit={onsubmit} className="pt-4 [&_input]:outline [&_input]:outline-gray-300 [&_input]:outline-[2px] [&_input]:rounded-sm [&_input:focus-visible]:outline-blue-500 [&_input]:p-1 [&_label]:text-[12px] [&_label]:mb-3 [&_label]:font-medium flex flex-col gap-4"> */}
    </>
  ) 
}