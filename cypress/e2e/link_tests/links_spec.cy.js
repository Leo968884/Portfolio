beforeEach(() => {
  cy.visit('http://127.0.0.1:5500');
});

describe('Navigation Links Test', () => {

  it('should navigate to top of page', () => {
    cy.get('a[href="#"]').click();
    cy.url().should('include', '#');
  });

  it('should navigate to the Home section', () => {
    cy.get('a[href="#home"]').click();
    cy.url().should('include', '#home');
  });

  it('should navigate to the About section', () => {
    cy.get('a[href="#about"]').click();
    cy.url().should('include', '#about');
  });

  it('should navigate to the Skills section', () => {
    cy.get('a[href="#skills"]').click();
    cy.url().should('include', '#skills');
  });

  it('should navigate to the Portfolio section', () => {
    cy.get('a[href="#portfolio"]').click();
    cy.url().should('include', '#portfolio');
  });

  it('should navigate to the Contact section', () => {
    cy.get('a[href="#contact"]').click();
    cy.url().should('include', '#contact');
  });
});

describe('Portfolio Projects Links Test', () => {

  it('should test all projects site links', () => {
    cy.readFile('data/portfolio.json').then((portfolio) => {
      portfolio.forEach((project) => {
        if (project.site) {
          cy.contains(project.title).parent().contains('Site').click();

          cy.origin(project.site, { args: { project } }, ({ project }) => {
            cy.url().should('include', project.site);
          });

          cy.visit('http://127.0.0.1:5500');
        }
      });
    });
  });

  it('should test all GitHub repository links and verify they are public', () => {
    cy.readFile('data/portfolio.json').then((portfolio) => {
      portfolio.forEach((project) => {
        if (project.git) {
          cy.contains(project.title).parent().contains('Lien GitHub').click();

          cy.origin(project.git, { args: { project } }, ({ project }) => {
            cy.url().should('include', project.git);

            const repoPath = project.git.replace('https://github.com/', '');
            cy.request(`https://api.github.com/repos/${repoPath}`).then((response) => {
              expect(response.body.visibility).to.equal('public');
            });
          });

          cy.visit('http://127.0.0.1:5500');
        }
      });
    });
  });
});
