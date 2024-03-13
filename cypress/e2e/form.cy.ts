describe("template spec", () => {
  it("valid email", () => {
    cy.visit("localhost:3000/form/");
    cy.get('input[type="email"]').type("hoge@gmail.com");
    cy.contains("Submit").click();
    cy.get('p').should('have.text', '');
  });

  it("invalid email", () => {
    cy.visit("localhost:3000/form/");
    cy.get('input[type="email"]').type("hoge");
    cy.contains("Submit").click();
    cy.get('p').should('have.text', '正しい形式でメールアドレスを入力してください');
  });
  
  it("empty email", () => {
    cy.visit("localhost:3000/form/");
    cy.contains("Submit").click();
    cy.get('p').should('have.text', 'メールアドレスを入力してください');
  });
});
