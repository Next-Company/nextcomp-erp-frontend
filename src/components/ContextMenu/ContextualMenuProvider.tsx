import { useState } from "react"
import { ContextualMenu } from "./ContextualMenu"
import { ContextualMenuContext } from "./ContextualMenuContext"

export function ContextualMenuProvider({children}){
  // const [position,setPosition] = useState({x:100,y:0})
  const [params,setParams] = useState({position:{x:100,y:0},content:'',actions:()=>{}})
  const open = (params)=>{
    setParams(params)
  }
  return(
    <ContextualMenuContext.Provider value={{open}}>
      {children}
      <ContextualMenu params={params}/>
    </ContextualMenuContext.Provider>
  )

}