import React from "react";
import assetify from "@quintype/framework/assetify";

import "./styles.m.css";

import logo from "./logo.png";

const Footer = () => {
  const categories = ["First", "Second", "Third", "Forth", "Fifth"];
  const sections = ["First", "Second", "Third"];
  const links = ["First", "Second", "Third", "Forth"];

  const generateItemsList = (item, id) => (
    <li styleName="list-items" key={id}>
      {item}
    </li>
  );

  return (
    <div styleName="footer">
      <img src={assetify(logo)} styleName="logo-footer" alt="Logo" />
      <div styleName="block">
        <div styleName="footer-headings">Popular Categories:</div>
        <ul>{categories.map(generateItemsList)}</ul>
      </div>
      <div styleName="block">
        <div styleName="footer-headings">Popular Sections:</div>
        <ul>{sections.map(generateItemsList)}</ul>
      </div>
      <div styleName="block">
        <div styleName="footer-headings">Quick Links:</div>
        <ul>{links.map(generateItemsList)}</ul>
      </div>
    </div>
  );
};

export { Footer };
