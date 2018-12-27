class Header {
  verifyHeader() {
    cy.visit("http://localhost:3000/");
    cy.get(".styles-m__navigation-component__3rUzI").should("be.visible");
    cy.get(".styles-m__publisher-logo__T2iJN").should("be.visible");
    cy.get(".styles-m__navbar__2GDU6").should("be.visible");
    cy.get(".styles-m__search__btn__2DEQX").should("be.visible");
  }

  searchKeyword(para) {
    cy.get(".styles-m__search__btn__2DEQX").click();
    cy.get("#searchForm").type(`${para}{enter}`, { force: true });
    cy.url().should("include", `/search?q=${para}`);
    cy.get("h1").contains(`Search - ${para}`);
  }

  verifyBn() {
    cy.get(".breaking-news").should("be.visible");
  }

  verifyStoryTitle() {
    cy.get('[href="/entertainment/2017/02/17/Maldives-your-next-vacation"] > h2').click();
    // cy.get('h1').contains('Maldives your next vacation')
    cy.get('[href="/culture/2018/11/21/a-test-story-for-tables"]').contains("A test story for tables");
  }
}

export default Header;
