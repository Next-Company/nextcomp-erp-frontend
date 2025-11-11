import {AdvancedMarker, APIProvider, Map, Marker, Pin} from '@vis.gl/react-google-maps';
export default function TrackWorkers(){
  return(
    <>
      <div className="directory flex flex-col m-2 rounded-md w-full relative bg-white overflow-hidden">
        <APIProvider apiKey={'AIzaSyAoogN_c7uL6osdLW6doI3NJjA_8I_fJwY'}>
        {/* <APIProvider apiKey={'Your API key here'}> */}
          {/* <Map defaultZoom={10} defaultCenter={{lat: 53.54992, lng: 10.00678}}> */}
          <Map mapId='f85e5903510adef7379942d5' defaultZoom={10} defaultCenter={{lat: -12.07147840019903, lng: -76.99764673360458}}>
            {/* <Marker  */}
            <AdvancedMarker 
              position={{lat: -12.07147840019903, lng: -76.99764673360458}} 
            >
              {/* <img src={'./src/assets/elenex.svg'} width={32} height={32} /> */}
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
              {/* <Pin
                background={'#0f9d58'}
                borderColor={'#006425'}
                glyphColor={'#60d98f'}
              /> */}
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.113461866735673, lng: -76.99149822994535}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.066662951826835, lng: -77.01363371945794}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.231033838620396, lng: -76.9106640720046}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.055156819369076, lng: -76.97134263637695}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.084073218673883, lng: -77.01383923063428}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.180259020257592, lng: -76.94211653469253}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.066772095149142, lng: -77.01354243616402}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.055594746880518, lng: -77.10222622912386}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.067448564564154, lng: -77.01331740757472}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -12.00643910266651, lng: -77.00393967859632}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
            <AdvancedMarker 
              position={{lat: -11.936736938802214, lng: -77.06523677114856}} 
            >
              <div className='w-[25px] h-[25px] bg-white rounded-full'>
                <img src={'/src/assets/elenex.svg'} width={32} height={32} />
              </div>
            </AdvancedMarker>
          </Map>
        </APIProvider>  
      </div>
    </>
  )
}


