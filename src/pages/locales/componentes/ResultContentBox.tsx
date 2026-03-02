import { useEffect, useState } from "react"
import DetailResultContentBox from "./DetailResultContentBox"

export default function ResultContentBox({result,changepositionmap}){
  const [infoproveedor,setInfoProveedor] = useState([])
  const [showdetail,setShowdetail] = useState(false)
  const [taller,setTaller] = useState({})
  const [tallerid,setTallerId] = useState(null)
  useEffect(()=>{

  },[])
  const showinfo = (e)=>{
    const id = e.target.dataset.id
    setShowdetail(true)
    document.startViewTransition(()=>setTaller(result[id]))
    setTallerId(result[id].idx)
    changepositionmap({lat:parseFloat(result[id].latitud),lng:parseFloat(result[id].longitud)})
    console.log("info taller:",taller)
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
                  <div className='flex-1 text-left flex flex-col gap-3'>
                    <div className='capitalize text-[16px] font-bold text-wrap'>{row.nombre_local}</div>
                    <div>{JSON.stringify(row)}</div>
                    <div className="text-[12px] flex flex-rows gap-2 items-center">
                      <span>4,8</span>
                      <div className="flex flex-row">
                        <div className="w-[15px] h-[15px] bg-contain" style={{backgroundImage:'url(//maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_14.png)'}}></div>
                        <div className="w-[15px] h-[15px] bg-contain" style={{backgroundImage:'url(//maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_14.png)'}}></div>
                        <div className="w-[15px] h-[15px] bg-contain" style={{backgroundImage:'url(//maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_14.png)'}}></div>                        
                        <div className="w-[15px] h-[15px] bg-contain" style={{backgroundImage:'url(//maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_half_14.png)'}}></div>
                        <div className="w-[15px] h-[15px] bg-contain" style={{backgroundImage:'url(//maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_empty_14.png)'}}></div>
                      </div>
                      {/* url(//maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_14.png)
                      url(//maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_half_14.png) */}
                      {/* url(//maps.gstatic.com/consumer/images/icons/2x/ic_star_rate_empty_14.png) */}
                    </div>
                    <div className="text-[12px]">{row.direccion}</div>
                    {/* <div>{JSON.stringify(row)}</div> */}
                    <div></div>
                  </div>
                  <div className='bg-gray-200 rounded-lg w-[80px] h-[80px]'></div>
                </div>
              </div>
            )
          }
          {showdetail && <DetailResultContentBox key={tallerid} info={{...taller}} setshowdetail={setShowdetail} />}
          {/* {showdetail && <DetailResultContentBox info={{...taller}} setshowdetail={setShowdetail} />} */}
        </div>
      </div>
    </>
  )
}