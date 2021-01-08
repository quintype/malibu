import React from "react";
import { string, bool } from "prop-types";

import "./input.m.css";

export const InputField = ({ name, placeholder, type = "text", value, required, ...props }) => (
  <React.Fragment>
    <label htmlFor={name} styleName="label" className="sr-only">
      {name}
    </label>
    <input
      type={type}
      placeholder={placeholder || name}
      value={value}
      required={required}
      {...props}
      styleName="input"
    />
  </React.Fragment>
);

InputField.propTypes = {
  name: string,
  placeholder: string,
  type: string,
  value: string,
  required: bool
};
