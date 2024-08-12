const apiUrl = import.meta.env.VITE_API_URL
export function convertToHex(str) {
  let hex = '';
  for (let i = 0; i < str.length; i++) {
    hex += '' + str.charCodeAt(i).toString(16);
  }
  return hex;
}
export function convertToStr(hex) {
  let str = '';
  for (let i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}
export async function DataFetch(params) {
  const { url, options } = params
  let data = {}
  try {
    const result = await fetch(url, options)
    if (result.ok) {
      data = await result.json()
    } else {
      throw new Error("");
    }
    return { ok: true, info: data }
  } catch (error) {
    return { ok: false, info: error }
  }
}
export async function Consulta({ url, params = {} }) {
  try {
    return await fetch(apiUrl + url,
      {
        credentials: 'include', ...params
      })
      // .then(resp => resp.ok ? resp.json() : Promise.reject())
      .then(resp =>{
        console.log(resp)
        if(resp.ok){
          return resp.json()
        }else{
          throw new Error('Se prodyctro un roble')
        }
      })
      .catch(resp=>{
        // Promise.reject()
        console.log("errortttttt_ss")
        return Promise.reject('Errorrraaa')
        // throw new Error('Se prodyctro un rble')
      })
  } catch (error) {
    return Promise.reject('itri error')
  }
}
// export async function CargarInfo() {
//   return await fetch(apiUrl + 'soporte', {
//     credentials: 'include'
//   })
//     .then(resp => resp.json())
// }