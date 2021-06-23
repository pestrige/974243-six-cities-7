import React from 'react';
import PropTypes from 'prop-types';
import City from './city';
import { connect } from 'react-redux';
import { ActionCreator } from '../../store/action';
import cityProp from './city.prop';

function Cities({cities, city, onChange}) {

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        { cities.map((item) => (
          <City
            key={item.name}
            isActive={item.name === city.name}
            name={item.name}
            onChange = {onChange}
          />
        )) }
      </ul>
    </section>
  );
}

Cities.propTypes = {
  city: cityProp,
  cities: PropTypes.arrayOf(cityProp),
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
  cities: state.cities,
});

const mapDispatchToProps = (dispatch) => ({
  onChange(city) {
    dispatch(ActionCreator.changeCity(city));
  },
});

export { Cities };
export default connect(mapStateToProps, mapDispatchToProps)(Cities);
