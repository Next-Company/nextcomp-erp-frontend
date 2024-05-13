import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
export function About(){
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
    </>
  )
}