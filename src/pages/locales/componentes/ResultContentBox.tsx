import { useEffect, useState } from "react"
import DetailResultContentBox from "./DetailResultContentBox"

export default function ResultContentBox({result,changepositionmap}){
  const [infoproveedor,setInfoProveedor] = useState([])
  const [showdetail,setShowdetail] = useState(false)
  useEffect(()=>{

  },[])
  const showinfo = (e)=>{
    const id = e.target.dataset.id
    const info = result[id].info[0]
    setShowdetail(true)
    changepositionmap({lat:info.latitud,lng:info.longitud})
  }
  return(
    <>
      <div className='bg-white w-[410px] h-full flex flex-col shadow-2xl'>
        <div className='h-[100px]'></div>
        <div className='flex-1 overflow-y-auto scrollbar-special'>
          { 
            result && result.map((row,key)=>
              <div key={key} className='p-4 min-h-[150px] cursor-pointer border-b-[1px] border-b-gray-300 hover:bg-gray-100' data-id={key} onClick={showinfo}>
                <div className='flex flex-row gap-2 pointer-events-none'>
                  <div className='flex-1 text-left'>
                    <div className='capitalize text-[16px] font-bold text-wrap'>{row.nom}</div>
                    <div>{row.idx}HOAL</div>
                    <div>{JSON.stringify(row)}</div>
                    <div></div>
                  </div>
                  {/* <div className='bg-gray-200 rounded-lg w-[80px] h-[80px]'></div> */}
                </div>
              </div>
            )
          }
          {showdetail && <DetailResultContentBox setshowdetail={setShowdetail} />}
          {/* <div className={`absolute top-[50px] ${!showdetail ? 'hidden' : ''} right-0 bottom-[20px] bg-white w-[400px] rounded-[20px] overflow-hidden shadow-2xl`} style={{transform:'translateX(420px)'}}>
            <div className='w-full'>
              <div className='realtive h-[200px] bg-emerald-300 '>
                <div className='absolute w-[40px] h-[40px] bg-white rounded-full flex flex-row justify-center items-center cursor-pointer shadow-xl right-4 top-4 hover:bg-gray-100'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}