import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { NavBar } from ".";

const renderer = new ShallowRenderer();

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe("Navbar", () => {
  const defaultMenu = {
    default: [],
  };

  const menuData = {
    default: [
      {
        "updated-at": 1604300936817,
        "tag-name": null,
        "entity-properties": null,
        "entity-slug": null,
        "publisher-id": 15,
        "menu-group-slug": "default",
        "item-id": 23224,
        rank: 38,
        title: "For Developers",
        "item-type": "section",
        "section-slug": "for-developers",
        "tag-slug": null,
        id: 2243,
        "parent-id": null,
        url: "https://madrid-old.quintype.io/for-developers",
        "entity-name": null,
        "created-at": 1544609755177,
        "section-name": "For Developers",
        "menu-group-id": 95,
        data: '{color: "#000000"}',
        children: "[]",
        completeUrl: "/for-developers",
      },
      {
        "updated-at": 1604300936818,
        "tag-name": null,
        "entity-properties": null,
        "entity-slug": null,
        "publisher-id": 15,
        "menu-group-slug": "default",
        "item-id": 6392,
        rank: 39,
        title: "Product",
        "item-type": "section",
        "section-slug": "mobile",
        "tag-slug": null,
        id: 2240,
        "parent-id": null,
        url: "https://madrid-old.quintype.io/tech/mobile",
        "entity-name": null,
        "created-at": 1544608844876,
        "section-name": "Mobile",
        "menu-group-id": 95,
        data: '{color: "#000000"}',
        children: "[{…}, {…}]",
        completeUrl: "/tech/mobile",
      },
    ],
  };

  it("renders the navbar with default vaules", () => {
    const tree = renderer.render(<NavBar />);
    expect(tree).toMatchSnapshot();
  });

  it("renders the navbar when menu.default is empty array", () => {
    const tree = renderer.render(<NavBar menu={defaultMenu} />);
    expect(tree).toMatchSnapshot();
  });

  it("renders the navbar when menu.default is a valid array", () => {
    const tree = renderer.render(<NavBar menu={menuData} />);
    expect(tree).toMatchSnapshot();
  });
});
