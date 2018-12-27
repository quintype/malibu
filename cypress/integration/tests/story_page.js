import Header from "./common_function.js";

describe("Search and redirect to a story", () => {
  const header = new Header();

  it("Search and select a story", () => {
    header.searchKeyword("india wins");
  });

  it("click the storycard", () => {
    header.clickCard();
  });

  it("Verify the story", () => {
    header.verifyStory("india wins");
  });
});
