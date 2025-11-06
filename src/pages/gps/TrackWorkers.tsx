import {APIProvider, Map} from '@vis.gl/react-google-maps';
export default function TrackWorkers(){
  return(
    <>
      <div className="directory flex flex-col m-2 rounded-md w-full relative bg-white overflow-hidden">
        {/* <APIProvider apiKey={'AIzaSyAoogN_c7uL6osdLW6doI3NJjA_8I_fJwY'}> */}
        <APIProvider apiKey={''}>
          <Map
            style={{width: '100vw', height: '100vh'}}
            defaultCenter={{lat: 22.54992, lng: 0}}
            defaultZoom={3}
            gestureHandling='greedy'
            disableDefaultUI
          />
        </APIProvider>        
      </div>
    </>
  )
}