import React, {useState} from 'react';
import SortItem from './sort-item';
import { useSelector, useDispatch } from 'react-redux';
import { sort } from '../../../store/action';
import { getSortType } from '../../../store/selectors';
import { SortType } from '../../../const';

const rotateArrow = (isOpen) => (
  isOpen ? {transform: 'rotate(180deg)', top: '35%'} : {}
);

function Sort() {
  const sortType = useSelector(getSortType);
  const dispatch = useDispatch();

  const [isSortOpen, setIsSortOpen] = useState(false);
  const handleClick = (payload) => {
    setIsSortOpen(false);
    dispatch(sort(payload));
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

export { Sort };
export default Sort;
