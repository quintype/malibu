import Header from "./header.js";

describe("Malibu Test", function() {
  const header = new Header();

  it("Verify header components", function() {
    header.verifyHeader();
  });

  it("Search a story", function() {
    header.searchKeyword("india");
  });

  // it('Verify breaking news', function(){
  //	header.verifyBn();
  //	})

  // it('Verify a specific story title', function(){
  //	header.searchKeyword();
  //	header.verifyStoryTitle();
  //	})
});
