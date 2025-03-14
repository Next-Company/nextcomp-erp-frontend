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
  return await fetch(apiUrl + url,
    {
      credentials: 'include', ...params
    })
    .then(resp =>{
      // console.log("Detros del then")
      if(resp.ok){
        return resp.json()
      }else{
        if(resp.status !== 200){
          switch(resp.status){
            case 401 :
              let msg = JSON.stringify({statuscode:401,message:'Usuario no autorizado o credenciales vencidas.'})
              // throw new Error(msg)
              return Promise.reject(msg)
            default:
              throw new Error('Otro codigo de error')
          }
        }else{
          // throw new Error('Se prodyctro un roble')
          return Promise.reject(JSON.stringify({statuscode:0,message:'Desconocido.'}))
        }         
      }
    })
    // .catch(err=>{
    //   console.log("Haber geminis :",JSON.parse(err))
    //   return Promise.reject('Errorrraaa')
    // })
  // try {
  // } catch (err) {
  //   console.log("El error es:",err)
  //   return Promise.reject('Errorrraaa')
  // }
}
// export async function CargarInfo() {
//   return await fetch(apiUrl + 'soporte', {
//     credentials: 'include'
//   })
//     .then(resp => resp.json())
// }