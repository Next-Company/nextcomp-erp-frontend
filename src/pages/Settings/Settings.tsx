import { Input } from "../../components/Atoms/Input/Input";
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export function Settings() {
  const notify = () => toast("Wow so easy!");
  const success = () => toast.success('🦄 Wow so easy!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
    const warn = () => toast.warn('🦄 Wow so easy!', {theme: "colored"});
  return (
    <>
      <div className="flex-1 text-left p-4">
        <span className="text-[30px]">Public Profile</span>
        <hr />
        <form action="" className="flex flex-col gap-3 [&_div]:flex [&_div]:flex-col">
          <div>
            <label htmlFor="nombre">Name</label>
            <Input />
          </div>
          <div>
            <label htmlFor="nombre">Name</label>
            <Input />
          </div>
          <div>
            <label htmlFor="nombre">Name</label>
            <Input />
          </div>
        </form>
        <div>
          <button onClick={warn} className="bg-blue-500 text-white">Notify!</button>
        </div>
      </div>
    </>
  )
}