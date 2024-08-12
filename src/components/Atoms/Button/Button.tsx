export function Button({action, text}) {
  return (
    <>
      {/* <button>{params.action}</button>
      <button onClick={() => setModal(false)} className="bg-blue-600 text-white hover:bg-blue-700">Cerrar</button> */}
      <button onClick={action} className="bg-blue-600 text-white">{text}</button>
    </>
  )
}