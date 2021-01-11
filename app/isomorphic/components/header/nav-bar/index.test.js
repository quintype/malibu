import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { NavBar } from ".";

const renderer = new ShallowRenderer();

describe("Navbar", () => {
  it("renders the NewsHeading component with linked-story-slug", () => {
    const tree = renderer.render(<NavBar />);
    expect(tree).toMatchSnapshot();
  });
});
