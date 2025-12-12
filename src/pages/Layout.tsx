export default function Layout({children}){
  return(
    <>
      <div className="directory flex flex-col lg:p-4 sm:p-1 h-full rounded-lg w-full relative bg-white">
        {children}
      </div>
    </>
  )
}