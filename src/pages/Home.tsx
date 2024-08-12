import { useContext, useMemo } from "react"
import { AuthPermitions } from "../contexts/contexts"
import { useFetch } from "../hooks/useFetch"
import { createPortal } from "react-dom"
import { LoadingWindow } from "../components/LoadingWindow/LoadingWindow"
import { Articulo } from "../components/Common/Articulo"
import { Search } from "../components/Atoms/Search/Search"

const API_KEY = 'a0765f5398ae4694bf2d5b0093660c73'
export function Home() {
  const { logout } = useContext(AuthPermitions)
  const options = useMemo(() => ({
    url: 'https://newsapi.org/v2/everything?q=fashion&sortBy=publishedAt&apiKey=' + API_KEY + '&pageSize=20&language=es'
  }), [])
  const { data, loading, error } = useFetch(options)
  console.log({ data, loading, error })
  return (
    <>
      <div className="directory flex flex-col p-4 m-3 rounded-md bg-white w-full relative">
        <Search/>
        {/* <div className="mt-4 flex items-center border-[1px] rounded-md gap-3 p-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
          <input type="searh" className="h-[30px] flex-1 focus:outline-none" />
        </div> */}
        <div className="grid_article scrollbar-special">
          {data && data.articles.map((res, index) => <Articulo key={index} info={res} />)}
        </div>
      </div>
      {
        loading && createPortal(
          <LoadingWindow />, document.querySelector("#root")
        )
      }
    </>
  )
}