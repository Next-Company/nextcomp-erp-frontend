export function Button({action, text = '', children}) {
  return (
    <>
      {/* <button>{params.action}</button>
      <button onClick={() => setModal(false)} className="bg-blue-600 text-white hover:bg-blue-700">Cerrar</button> */}
      <button onClick={action} className="bg-blue-600 text-white rounded-[8px] border-transparent p-[0.6em 1.2em] text-[1em] bg-blue-700 cursor-pointer transition-all hover:border-[1px] hover:border-[#646cff] focus:outline-[4px] focus-visible:outline-[4px]">{text}</button>
    </>
  )
}

// button {
//   border-radius: 8px;
//   border: 1px solid transparent;
//   padding: 0.6em 1.2em;
//   font-size: 1em;
//   font-weight: 500;
//   font-family: inherit;
//   background-color: #1a1a1a;
//   cursor: pointer;
//   transition: border-color 0.25s;
// }

// button:hover {
//   border-color: #646cff;
// }

// button:focus,
// button:focus-visible {
//   outline: 4px auto -webkit-focus-ring-color;
// }