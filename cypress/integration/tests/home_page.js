import Header from "./common_function.js";

describe("Storypage verification", () => {
  const header = new Header();

  it("Verify header components", () => {
    header.verifyHeader();
  });

  it("Search and select a story", () => {
    header.searchKeyword("india");
  });

  it("Verifies breaking news components", () => {
    header.verifyBn();
  });
});
