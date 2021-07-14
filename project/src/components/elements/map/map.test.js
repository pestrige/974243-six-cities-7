import React from 'react';
import { render } from '@testing-library/react';
import Map from './map';
import * as useMap from '../../../hooks/use-map';

describe('Component Map', () => {
  it('should render correctly', () => {
    const useMapSpy = jest.spyOn(useMap, 'useMap');
    useMapSpy.mockReturnValue(jest.fn());
    const offers = [];
    const city = {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      }};
    const type = 'cities';
    const activeOffer = {};
    const { container } = render(
      <Map
        offers={offers}
        city={city}
        type={type}
        activeOffer={activeOffer}
      />,
    );
    const mapContainer = container.querySelector('.cities__map');
    expect(mapContainer).toBeInTheDocument();
    expect(useMapSpy).toBeCalled();
    expect(useMapSpy).toBeCalledWith(
      {current: mapContainer},
      offers,
      activeOffer,
      city,
    );
  });
});
