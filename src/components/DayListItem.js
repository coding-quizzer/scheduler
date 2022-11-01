import  React from 'react';
import classNames from 'classnames';

export default function DayListItem(props) {
  const full = (props.spots === 0);
  const itemClass = classNames("day-list__item", {"day-list__item--selected": props.selected, "day-list__item--full": full})
  return (
    <li className={itemClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{`${props.spots} spots remaining`}</h3>
    </li>
  );
}