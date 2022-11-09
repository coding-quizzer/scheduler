import React from "react";
import classNames from "classnames";

import 'components/InterviewerListItem.scss';

const InterviewerListItem = (props) => {
  const { name, avatar, selected, setInterviewer } = props;
  const itemClass = classNames('interviewers__item', {'interviewers__item--selected': selected})
  return (
    <li className={itemClass} onClick={setInterviewer} data-testid='interviewer-item'>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
        />
        {selected && name}
    </li>
  )
}

export default InterviewerListItem;