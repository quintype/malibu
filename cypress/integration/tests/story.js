import Header from "./header.js";

describe("Storypage verification", function() {
  const header = new Header();

  it("Search and select a story", function() {
    header.searchKeyword("india");
  });

  it("Verify header components", function() {
    header.verifyHeader();
  });
});
