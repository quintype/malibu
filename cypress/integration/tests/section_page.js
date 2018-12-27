import Header from "./common_function.js";

describe("Section page verification", () => {
  const header = new Header();

  it("Verify header components", () => {
    header.clickSection();
  });
});
