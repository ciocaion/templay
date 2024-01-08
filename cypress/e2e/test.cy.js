describe('visit website and interact', () => {
  it('passes', () => {
    cy.visit('https://templay.dev.gea.com/dashboard');

    // Various wait and click commands (adjust wait times as necessary)
    cy.wait(1000);
    cy.contains('button', 'Start Tutorial').click();
    cy.wait(1000);
    cy.contains('button', 'Next').click();
    cy.wait(1000);
    cy.contains('button', 'Next').click();
    cy.wait(1000);
    cy.contains('button', 'Next').click();
    cy.wait(1000);
    cy.contains('button', 'Finish').click();
    cy.wait(1000);

    // Click on the button with aria-label 'Create New Template'
    cy.get('button[aria-label="Create New Template"]').click();
    cy.wait(1000); // Adjust the wait time as necessary

    // Click on the div button associated with 'Add new component'
    cy.contains('p', 'Add new component').next('div').click();
    cy.wait(1000); // Adjust the wait time as necessary

    // Click on the button with id 'accordion-button-:rb:'
    cy.get('#accordion-button-\\:rb\\:').click();
    cy.wait(1000); // Adjust the wait time as necessary

    // Click on the second 'Banner' button
    cy.get('button.chakra-button.css-1napxdx').contains('Banner').click();
     // Click on the 'Save Template' div
     cy.contains('p', 'Save Template').parent('div').click();
     cy.wait(1000); // Adjust the wait time as necessary
 
     // Click and type in the input field with placeholder 'Template Title'
     cy.get('input[placeholder="Template Title"]').click().type('1234');
     cy.wait(1000); // Adjust the wait time as necessary
 
     // Click on the 'Save' button
     cy.contains('button', 'Save').click();
     cy.wait(1000);

       // Check if the page contains the success message
    cy.contains('div[data-status="success"][role="alert"]', 'Template saved successfully').should('be.visible');
  });
})
