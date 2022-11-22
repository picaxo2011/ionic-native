import { GoogleMap } from "@capacitor/google-maps";
import { useRef } from "react";
import { Geolocation } from "@capacitor/geolocation";

const MyMap: React.FC = () => {
  const mapRef = useRef<HTMLElement>();
  let newMap: GoogleMap;

  async function createMap() {
    const coordinates = await Geolocation.getCurrentPosition();

    if (!mapRef.current) return;
    newMap = await GoogleMap.create({
      id: "my-cool-map",
      element: mapRef.current,
      apiKey: process.env.REACT_APP_API_MAP_KEY as string,
      config: {
        center: {
          lat: coordinates.coords.latitude,
          lng: coordinates.coords.longitude,
        },
        zoom: 8,
      },
    });
    newMap.enableCurrentLocation(true);
  }

  return (
    <div className="component-wrapper">
      <capacitor-google-map
        ref={mapRef}
        style={{
          display: "inline-block",
          width: 275,
          height: 400,
        }}
      ></capacitor-google-map>

      <button onClick={createMap}>Create Map</button>
    </div>
  );
};

export default MyMap;
