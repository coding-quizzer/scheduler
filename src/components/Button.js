import React from "react";

import "components/Button.scss";

export default function Button(props) {
  let buttonClass = "button";
  buttonClass += props.confirm ? " button--confirm" : "";
  buttonClass += props.danger ? " button--danger" : "";
  return <button className={buttonClass}>{props.children}</button>;
};
