import { Link } from 'react-router-dom'
import { useState } from "react"
export function Header(){
  const [isvisible,setIsvisible] = useState(false)
  const onclick = (e)=>{
    if(e.target.matches('*')){
      setIsvisible(isvisible => !isvisible)
    }
  }
  return(
    <>
      <div className="flex items-center justify-between h-[50px] bg-white border-b pl-5 pr-5">
        <div className="flex items-center gap-5">
          <svg id="Capa_1" className="w-[30px]" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 107.84 124.51"><defs></defs><path className="cls-1" style={{fillRule:'evenodd'}} d="M297.91,309.05,312,300.88l13.1,16.46-27.23,15.75L253.3,307.32V255.89l44.61-25.71,27.23,15.7L312,262.33l-14.13-8.17-23.77,13.75v3.3h32.05V292H274.14v3.3Zm-.27,34.81-27-15.53-27-15.6V250.48l27-15.54,27-15.59,27,15.59,27,15.54v62.25l-27,15.6Zm41.09-86.24v52.57l-20.9-26.31Z" transform="translate(-243.72 -219.35)"/></svg>
          <div>
            <ul className='[&_li]:inline-block flex gap-8'>
              <li><Link to="/">Operaciones</Link></li>
              <li><Link to="/">Ventas</Link></li>
              <li><Link to="/">Contabilidad</Link></li>
              <li><Link to="/">Oficina</Link></li>
              <li><Link to="/main">Soporte</Link></li>
            </ul>
          </div>
        </div>
        <div onClick={onclick} className="rounded-full w-10 h-10 border bg-gray-300 cursor-pointer relative">
          { isvisible 
            ? <div className="w-[250px] h-[300px] bg-white rounded-md absolute right-2 top-10 shadow-lg shadow-gray-500/50 border">
                <ul>
                  <li><Link to="/">Login</Link></li>
                  <li><Link to="/config">Config</Link></li>
                </ul>
              </div> 
            : '' 
          }
        </div>
      </div>
    </>
  )
}