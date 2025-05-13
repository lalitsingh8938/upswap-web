// import { useEffect, useRef } from "react";

// const GoogleMapComponent = () => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     const initMap = () => {
//       const map = new window.google.maps.Map(mapRef.current, {
//         center: { lat: 28.6139, lng: 77.2090 }, // New Delhi
//         zoom: 12,
//       });

//       new window.google.maps.Marker({
//         position: { lat: 28.6139, lng: 77.2090 },
//         map,
//         title: "New Delhi",
//       });
//     };

//     const loadGoogleMaps = () => {
//       if (!window.google || !window.google.maps) {
//         const script = document.createElement("script");
//         script.src =
//           "https://maps.googleapis.com/maps/api/js?key=AIzaSyCRQXge0eI79YVPiihiUrqOKv4NapMnA9I&libraries=places&callback=initMap";
//         script.async = true;
//         script.defer = true;
//         window.initMap = initMap; // global function for callback
//         document.head.appendChild(script);
//       } else {
//         initMap(); // Google Maps already loaded
//       }
//     };

//     loadGoogleMaps();
//   }, []);

//   return (
//     <div className="w-full h-[400px] border rounded-md shadow-lg">
//       <div ref={mapRef} className="w-full h-full" />
//     </div>
//   );
// };

// export default GoogleMapComponent;
