import {renderHook} from '@testing-library/react-hooks';
import {useMap} from './use-map';

jest.mock('leaflet', () => ({
  __esModule: true,
  default: {
    icon() {
      return 'mock icon';
    },
    map() {
      return 'mock map';
    },
    tileLayer() {
      return this;
    },
    addTo() {
      return this;
    },
  },
}));

const container = {
  current: '<section className="cities__map map"/>',
};
const city = {
  name: 'Paris',
  location: {
    latitude: 48.85661,
    longitude: 2.351499,
    zoom: 13,
  },
};
describe('hook useMap', () => {
  const offers = [];
  it('should return map', () => {
    const {result} = renderHook(() =>
      useMap(container, offers, {}, city),
    );

    expect(result.current).toBe('mock map');
  });
});
