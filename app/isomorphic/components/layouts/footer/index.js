import React from "react";
import "./styles.m.css";
import logo from "./logo.png";
import assetify from "@quintype/framework/assetify";

const Footer = () => {
  const categorieItems = ["First", "Second", "Third", "Forth", "Fifth"];
  const sectionItems = ["First", "Second", "Third"];
  const linkItems = ["First", "Second", "Third", "Forth"];
  const categories = categorieItems.map((item, id) => <li key={id}>{item}</li>);
  const sections = sectionItems.map((item, id) => <li key={id}>{item}</li>);
  const links = linkItems.map((item, id) => <li key={id}>{item}</li>);
  return (
    <div styleName="footer">
      <img src={assetify(logo)} styleName="logo-footer" alt="Logo" />
      <div>
        <div styleName="footer-headings">Popular categories:</div>
        <ul>{categories}</ul>
      </div>
      <div>
        <div styleName="footer-headings">Popular Sections:</div>
        <ul>{sections}</ul>
      </div>
      <div>
        <div styleName="footer-headings">Quick Links:</div>
        <ul>{links}</ul>
      </div>
    </div>
  );
};

export { Footer };
