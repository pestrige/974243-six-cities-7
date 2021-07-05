import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import City from './city';
import { changeCity } from '../../../store/action';
import { getActiveCity, getCities } from '../../../store/selectors';

function Cities() {
  const city = useSelector(getActiveCity);
  const cities = useSelector(getCities);
  const dispatch = useDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        { cities.map((item) => (
          <City
            key={item.name}
            isActive={item.name === city.name}
            name={item.name}
            onChange = {(payload) => dispatch(changeCity(payload))}
          />
        )) }
      </ul>
    </section>
  );
}

export { Cities };
export default Cities;
