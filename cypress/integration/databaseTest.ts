/// <reference types="cypress" />

describe('Visit URL and log result', () => {
  it('should log the result of the request', () => {
    cy.request('http://localhost:5001/students').then((response) => {
      // Print the response status and body in the Cypress Test Runner
      cy.log(`Response Status: ${response.status}`);
      cy.log(`Response Body: ${JSON.stringify(response.body)}`);
      cy.wait(10000);
    });
  });
});
