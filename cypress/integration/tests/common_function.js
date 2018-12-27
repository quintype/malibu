class Header {
  verifyHeader() {
    cy.visit("http://localhost:3000/");
    cy.get(".styles-m__publisher-logo__1GwUp").should("be.visible");
    cy.get(".styles-m__navbar__1m8_H").should("be.visible");
    cy.get(".styles-m__search__btn__4CL5x").should("be.visible");
  }

  searchKeyword(para) {
    cy.visit("http://localhost:3000/");
    cy.get(".styles-m__search__btn__4CL5x").click({ force: true });
    cy.get("#searchForm").type(`${para}{enter}`, { force: true });
    // cy.wait(3000);
    cy.get("h1").contains(`Search - ${para}`);
  }
  clickSection(para) {
    cy.visit("http://localhost:3000/");
    cy.get(".styles-m__navbar__1m8_H").and(nav => {
      nav.first().click();
    });
  }
  verifyBn() {
    cy.get(".breaking-news").should("be.visible");
  }
  verifyStory(para) {
    cy.get(".qt-image").should("be.visible");
    cy.get("h1").contains(`${para}`);
  }
  clickCard() {
    cy.get(".story-grid")
      .find("story-grid-item")
      .and(h2 => {
        h2.first().click();
      });
  }
}

export default Header;
