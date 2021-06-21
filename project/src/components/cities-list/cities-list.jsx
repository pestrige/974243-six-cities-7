import React from 'react';
import PropTypes from 'prop-types';
import City from './city';
import { connect } from 'react-redux';
import { ActionCreator } from '../../store/action';
import { Cities } from '../../const';

const citiesList = Object.values(Cities);

function CitiesList({cityName, changeCity}) {

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        { citiesList.map((city) => (
          <City
            key={city.name}
            isActive={city.name === cityName}
            name={city.name}
            handleClick = {changeCity}
          />
        )) }
      </ul>
    </section>
  );
}

CitiesList.propTypes = {
  cityName: PropTypes.string.isRequired,
  changeCity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cityName: state.cityName,
});

const mapDispatchToProps = (dispatch) => ({
  changeCity(cityName) {
    dispatch(ActionCreator.changeCity(cityName));
  },
});

export { CitiesList };
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
