import React, { MouseEventHandler } from "react"
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  action?: MouseEventHandler,
  tipo: string
}
export function Button({action = ()=>{}, type, tipo, children}:Props) {
  const buttons = {
    default: <button onClick={action} type={type} className="bt-vite">{children}</button>, 
    accept: <button onClick={action} type={type} className="bg-blue-700 border-blue-700 border-[1px] text-white rounded-[8px] border-transparent pt-[0.6em] pb-[0.6em] pl-[1.2em] pr-[1.2em] text-[1em] cursor-pointer transition-all hover:border-blue-600 hover:border-[1px] hover:bg-blue-600">{children}</button>,
    success: <button onClick={action} type={type} className="bg-green-700 border-green-700 border-[1px] text-white rounded-[8px] border-transparent pt-[0.6em] pb-[0.6em] pl-[1.2em] pr-[1.2em] text-[1em] cursor-pointer transition-all hover:border-green-600 hover:border-[1px] hover:bg-green-600">{children}</button>,
    warning: <button onClick={action} type={type} className="bg-orange-700 border-orange-700 border-[1px] text-white rounded-[8px] border-transparent pt-[0.6em] pb-[0.6em] pl-[1.2em] pr-[1.2em] text-[1em] cursor-pointer transition-all hover:border-orange-600 hover:border-[1px] hover:bg-orange-600">{children}</button>
  } 
  return (
    <>
      {buttons[tipo]}
    </>
  )
}