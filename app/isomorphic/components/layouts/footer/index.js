import React from "react";
import "./styles.m.css";
import logo from "./logo.png";
import assetify from "@quintype/framework/assetify";

const Footer = () => {
  const categories = ["First", "Second", "Third", "Forth", "Fifth"];
  const sections = ["First", "Second", "Third"];
  const links = ["First", "Second", "Third", "Forth"];
  const generateList = (item, id) => <li key={id}>{item}</li>;

  return (
    <div styleName="footer">
      <img src={assetify(logo)} styleName="logo-footer" alt="Logo" />
      <div styleName="footer-items">
        <div styleName="footer-headings">Popular categories:</div>
        <ul>{categories.map(generateList)}</ul>
      </div>
      <div styleName="footer-items">
        <div styleName="footer-headings">Popular Sections:</div>
        <ul>{sections.map(generateList)}</ul>
      </div>
      <div styleName="footer-items">
        <div styleName="footer-headings">Quick Links:</div>
        <ul>{links.map(generateList)}</ul>
      </div>
    </div>
  );
};

export { Footer };
