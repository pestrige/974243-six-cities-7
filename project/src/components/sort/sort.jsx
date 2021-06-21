import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SortItem from './sort-item';
import { connect } from 'react-redux';
import { ActionCreator } from '../../store/action';
import { SortType } from '../../const';

const rotateArrow = (isOpen) => (
  isOpen ? {transform: 'rotate(180deg)', top: '35%'} : {}
);

function Sort({sortType, sort}) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const handleClick = (payload) => {
    setIsSortOpen(false);
    sort(payload);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsSortOpen(!isSortOpen)}
      >
        {sortType.text}
        <svg
          className="places__sorting-arrow"
          width={7}
          height={4}
          style={rotateArrow(isSortOpen)}
        >
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isSortOpen ? 'places__options--opened' : ''}`}
      >
        {Object.keys(SortType).map((item) => (
          <SortItem
            key={item}
            type={item}
            isActive={sortType === item}
            handleClick ={handleClick}
          />
        ))}
      </ul>
    </form>
  );
}

Sort.propTypes = {
  sortType: PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }),
  sort: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sortType: state.sortType,
  isSortOpen: state.isSortOpen,
});

const mapDispatchToProps = (dispatch) => ({
  sort(sortType) {
    dispatch(ActionCreator.sort(sortType));
  },
});

export { Sort };
export default connect(mapStateToProps, mapDispatchToProps)(Sort);
