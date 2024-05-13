export function Modal(){
  return(
    <>
      <div className="absolute flex justify-center items-center top-0 bottom-0 w-[100vw] h-[100vh] bg-rose-700 bg-opacity-40 hidden">
        <div className="w-[800px] h-[600px] bg-white rounded-md">
          My modal
        </div>
      </div>
    </>
  )
}