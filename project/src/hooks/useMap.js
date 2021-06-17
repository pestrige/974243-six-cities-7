import { useState, useEffect } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Marker } from '../const';

const defaultMarker = leaflet.icon({
  iconUrl: Marker.URL,
  iconSize: Marker.SIZE,
  iconAnchor: Marker.ANCHOR,
});
const activeMarker = leaflet.icon({
  iconUrl: Marker.ACTIVE_URL,
  iconSize: Marker.SIZE,
  iconAnchor: Marker.ANCHOR,
});

export function useMap(container, points, activePoint, city) {
  const [map, setMap] = useState(null);
  const activePointId = activePoint.id;

  useEffect(() => {
    // отрисовываем карту, если ее нет
    if (container.current !== null && map === null) {
      const {location} = city;
      const leafletMap = leaflet.map(container.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          },
        )
        .addTo(leafletMap);

      setMap(leafletMap);
    }

    // рисуем маркеры для активного города
    if (map) {
      points
        .filter((point) => point.city.name === city.name)
        .forEach(({location, id}) => {
          leaflet
            .marker({
              lat: location.latitude,
              lng: location.longitude,
            }, {
              icon: id === activePointId ? activeMarker : defaultMarker,
            })
            .addTo(map);
        });
    }
  }, [container, city, points, map, activePointId]);

  return map;
}
