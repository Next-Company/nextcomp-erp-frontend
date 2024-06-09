import { Link } from 'react-router-dom'
import './App.css'
export function About(){
  const onclick = (e)=>{
    console.log(e.target)
  }
  return(
    <>
      <div className="bg-green-300">
        <h1>About</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </div>
      <div className='w-[200px] h-[200px] bg-orange-400' onClick={onclick}>
        <h1>Hola mudno</h1>
      </div>
    </>
  )
}