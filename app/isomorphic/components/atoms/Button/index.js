import React from "react";
import { string, any, bool, func } from "prop-types";
import { Link } from "@quintype/components";

import "./button.m.css";

const Button = ({ href, children, color, flat, socialButton = false, onClick, ...props }) => {
  if (socialButton) {
    return (
      <a href={href} styleName="btn">
        {children}
      </a>
    );
  }
  return href ? (
    <Link href={href} styleName="btn">
      {children}
    </Link>
  ) : (
    <button styleName="btn">{children}</button>
  );
};

Button.propTypes = {
  href: string,
  className: string,
  children: any,
  color: string,
  flat: bool,
  socialButton: bool,
  onClick: func
};

export default Button;
