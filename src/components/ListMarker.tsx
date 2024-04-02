// 'use client'
// import React, { useState } from 'react';
// import 'mapbox-gl/dist/mapbox-gl.css'; // Import Mapbox styles
// import { Marker, Popup } from 'react-map-gl'; // Import required Mapbox components
// import locations from '@/models/locations.json'; // Import location data

// // const icon = new Icon({
// //     iconUrl: '/images/marker-icon.png',
// //     iconSize: [20, 35],
// //     iconAnchor: [10, 35]
// // });


// const ListMarker = () => {
//     const [clickedLocation, setClickedLocation] = useState(null);

//     const handleMarkerClick = (location: any) => {
//         return <>
//             <div className=' w-96 h-96 bg-black text-white' >Hello world!</div>
//         </>
     
//     };

//     return (
//         <>
//        {locations.length > 0 &&
//         locations.map((location, index) => (
//           <Marker key={index} latitude={location.lat} longitude={location.lng}>
//             <button onClick={() => handleMarkerClick(location)}>
//               <div className="marker-icon">{/* Your marker icon here */}</div>
//             </button>
           
//               <Popup
//                     anchor="top"
//                     closeOnClick={false}
//                     onClose={() => setClickedLocation(null)} longitude={0} latitude={0}              >
//                 {location.localName}
//               </Popup>
//           </Marker>
//         ))}
//         </>
//     );
// };

// export default ListMarker;
