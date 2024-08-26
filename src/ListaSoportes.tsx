// import { useRef } from "react"

export function ListaSoportes({ save, children }) {
  // const form = useRef()
  const onclick = (e) => {
    e.preventDefault()
    // console.log(form.current.elements)
    // console.log(form.current)
    // console.log(e.target)
    save(e.target)
    // console.log('hola mundo')
  }
  return (
    <>
      <div className="">
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-medium text-[18px]">Nuevo Soporte</h2>
          </div>
          <hr />
        </div>
        {/* <form onSubmit={onclick} className="pt-4 [&_input]:border-b [&_input]:p-1 [&_input]:text-[14px] [&_input]:outline-0 [&_input:focus-visible]:border-blue-700 [&_label]:text-[12px] [&_label]:font-medium flex flex-col gap-4" was-validated> */}
        <form onSubmit={onclick} className="pt-4 flex flex-col gap-4">
          {/* <form onSubmit={onclick} className="pt-4 flex gap-4" was-validated> */}
          {/* <input type="text" name="nombre" id="juan" />
        <button type="submit" onSubmit={onclick}>Enviar</button> */}
          {children}
        </form>

      </div>
    </>
  )
}