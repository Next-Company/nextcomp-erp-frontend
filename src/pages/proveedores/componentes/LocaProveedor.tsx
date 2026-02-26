import { AdvancedMarker, APIProvider, Map, Pin } from "@vis.gl/react-google-maps";
import { Input } from "../../../components/Atoms/Input/Input";
import { Button } from "../../../components/Atoms/Button/Button";
import { useState } from "react";
import { InputSelect } from "../../../components/Atoms/Input/InputSelect";
import { InputTest } from "../../../components/Atoms/Input/InputTest";

export default function LocalProveedor({info = []}){
  const [position,setPosition] = useState({lat: -12.07147840019903, lng: -76.99764673360458})
  console.log("La posicion actual es:",position)
  return(
    <>
      <div className="w-[1200px] h-[700px] bg-white p-1 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
          <span className="inline-block align-middle text-[12px]">Datos adicionales del proveedor</span>
        </div>
        <hr/>
        <div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Input name={'nombre_local'} title="NombreLocal" defaults={info.length > 0 ? info[0].nombre_local : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
              <InputSelect title={'TipoLocal'} name={"tipo_local"} data={
                [
                  { indice: 'OTROS', option: 'OTROS', selected: true },
                  { indice: 'SERVICIOS', option: 'SERVICIOS' },
                  { indice: 'TELAS', option: 'TELAS' },
                  { indice: 'AVIOS', option: 'AVIOS' }
                ]} 
                df={Object.keys(info).length > 0 ? info[0]?.tipo_local : null} placeholder={'Seleccione el tipo de producto a registrar.'} 
              />
              <div className="w-[45%]">
                <Input name={'direccion'} title="Direccion" defaults={info.length > 0 ? info[0].direccion : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-[35%]">
                <Input name={'referencia'} title="Referencia" defaults={info.length > 0 ? info[0].referencia : null} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
              </div>
              <InputTest name={'latitud'} title="Latitud" defaults={info.length > 0 ? info[0].latitud : position.lat} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
              <InputTest name={'longitud'} title="Longitud" defaults={info.length > 0 ? info[0].longitud : position.lng} type="text" placeholder={'Descripcion adicional del producto a crear.'}/>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[6px] h-[6px] rounded-full bg-gray-500"></div>
          <span className="inline-block align-middle text-[12px]">Datos adicionales del proveedor</span>
        </div>
        <hr/>
        <div className='notpadding h-full bg-red-400 flex-1'>
          <APIProvider apiKey={'AIzaSyAoogN_c7uL6osdLW6doI3NJjA_8I_fJwY'}>
            <Map mapId='f85e5903510adef7379942d5' disableDefaultUI={true} defaultZoom={15} defaultCenter={{lat: -12.07147840019903, lng: -76.99764673360458}}></Map>
            <AdvancedMarker position={{lat: position.lat, lng: position.lng}} gmpDraggable={true} onDragEnd={(e)=>{
              setPosition({lat: e.latLng.lat(), lng: e.latLng.lng()})
            }}>
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <Pin
                  glyphColor={'black'}
                />
              </div>
            </AdvancedMarker>
          </APIProvider>
        </div>
        <div className="flex flex-row gap-3 justify-end">
          <Button type="button" tipo={'default'}>Cancelar</Button>
          <Button type="button" tipo={'accept'}>Guardar</Button>
        </div>
      </div>
    </>
  )
}