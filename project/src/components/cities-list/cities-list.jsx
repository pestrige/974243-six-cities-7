import React from 'react';
import PropTypes from 'prop-types';
import City from './city';
import { connect } from 'react-redux';
import { ActionCreator } from '../../store/action';
import { Cities } from '../../const';
import cityProp from './city.prop';

const citiesList = Object.values(Cities);

function CitiesList({city, changeCity}) {

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        { citiesList.map((item) => (
          <City
            key={item.name}
            isActive={item.name === city.name}
            name={item.name}
            handleClick = {changeCity}
          />
        )) }
      </ul>
    </section>
  );
}

CitiesList.propTypes = {
  city: cityProp,
  changeCity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  city: state.city,
});

const mapDispatchToProps = (dispatch) => ({
  changeCity(city) {
    dispatch(ActionCreator.changeCity(city));
  },
});

export { CitiesList };
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
