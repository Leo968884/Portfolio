describe('Skills and Portfolio Data Test', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500');
    });

    it('that the number of skill items matches the count in the JSON file', () => {
        cy.readFile('data/skills.json').then((skillsData) => {
            cy.get("[data-cy=skill-item]").should("have.length", skillsData.length);
        });
    });

    it('that the number of portfolio items matches the count in the JSON file', () => {
        cy.readFile('data/portfolio.json').then((portfolioData) => {
            cy.get("[data-cy=portfolio-item]").should("have.length", portfolioData.length);
        });
    });
});