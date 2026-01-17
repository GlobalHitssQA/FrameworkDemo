const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const SourceCodeDocumentationPage = require('../pages/SourceCodeDocumentationPage');

let sourceCodePage;

Given('I have access to the Acticenter project source code repository', async function () {
  sourceCodePage = new SourceCodeDocumentationPage(this.page);
  const hasAccess = await sourceCodePage.verifyRepositoryAccess();
  expect(hasAccess).toBeTruthy();
});

When('I locate the contract value and composition component files', async function () {
  const filesFound = await sourceCodePage.locateComponentFiles();
  expect(filesFound).toBeTruthy();
});

Then('the component files should contain descriptive comments about functionality', async function () {
  const hasDescriptiveComments = await sourceCodePage.verifyDescriptiveComments();
  expect(hasDescriptiveComments).toBeTruthy();
});

Then('the main functions and methods should have parameter and return value documentation', async function () {
  const hasFunctionDocumentation = await sourceCodePage.verifyFunctionDocumentation();
  expect(hasFunctionDocumentation).toBeTruthy();
});

Then('the code should include documentation about breakdown items and business rules', async function () {
  const hasBusinessRulesDocumentation = await sourceCodePage.verifyBreakdownItemsDocumentation();
  expect(hasBusinessRulesDocumentation).toBeTruthy();
});