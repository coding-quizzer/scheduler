import React from "react";

import "components/Button.scss";

export default function Button(props) {
  let buttonClass = "button";
  props.confirm && (buttonClass += " button--confirm");
  props.danger && (buttonClass += " button--danger");
  return <button className={buttonClass}>{props.children}</button>;
};
