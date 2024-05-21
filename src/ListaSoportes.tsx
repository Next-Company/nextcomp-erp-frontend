import { useRef } from "react"

export function ListaSoportes({save,children}){
  const form = useRef()
  const onsubmit = (e)=>{
    e.preventDefault()
    // console.log(form.current??.elements)
    save()
  }  
  return(
    <>
      <form ref={form} action="" onSubmit={onsubmit} className="p-4 [&_input]:border-b [&_input]:p-1 [&_input]:text-[14px] [&_label]:text-[12px] [&_label]:font-medium">
        {children}
      </form>
    </>
  ) 
}