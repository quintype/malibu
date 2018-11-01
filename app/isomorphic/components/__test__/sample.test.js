import React from "react";
import renderer from "react-test-renderer";

function Component({ page, children }) {
  return <a href={page}>{children}</a>;
}

test("adds 1 + 2 to equal 3", () => {
  const component = renderer.create(
    <Component page="http://www.facebook.com">Facebook</Component>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
