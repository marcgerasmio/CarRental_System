import { useMap } from "react-leaflet";
import { useEffect } from "react";

const ResizeMap = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);

  return null;
};

export default ResizeMap;
