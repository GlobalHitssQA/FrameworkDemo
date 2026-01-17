const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const DocumentationPage = require('../pages/DocumentationPage');

let documentationPage;

Given('the user documentation repository is accessible', async function () {
  documentationPage = new DocumentationPage(this.page);
  await documentationPage.navigateToDocumentationRepository();
  const isAccessible = await documentationPage.isRepositoryAccessible();
  expect(isAccessible).toBeTruthy();
});

When('I locate the documentation for the contract value and composition component', async function () {
  await documentationPage.searchForComponentDocumentation('contract value composition');
  await documentationPage.openComponentDocumentation();
});

Then('the documentation should be accessible to end users', async function () {
  const isDocumentationVisible = await documentationPage.isDocumentationVisible();
  expect(isDocumentationVisible).toBeTruthy();
});

Then('the documentation should explain the component purpose and benefits', async function () {
  const hasPurposeSection = await documentationPage.hasPurposeAndBenefitsSection();
  expect(hasPurposeSection).toBeTruthy();
  const purposeContent = await documentationPage.getPurposeSectionContent();
  expect(purposeContent.length).toBeGreaterThan(0);
});

Then('the documentation should include step by step instructions with screenshots or diagrams', async function () {
  const hasInstructions = await documentationPage.hasStepByStepInstructions();
  expect(hasInstructions).toBeTruthy();
  const hasVisualAids = await documentationPage.hasScreenshotsOrDiagrams();
  expect(hasVisualAids).toBeTruthy();
});

Then('the documentation should explain all breakdown items including Purchasing Power and Cash and Pending Settlement and Funds', async function () {
  const breakdownItems = [
    'Poder de compra MXN',
    'Efectivo MXN',
    'Efectivo USD',
    'Pendientes por liquidar',
    'Fondos',
    'Cedes y pagarés',
    'Mercado de dinero',
    'Mercado de capitales'
  ];
  for (const item of breakdownItems) {
    const hasItemExplanation = await documentationPage.hasBreakdownItemExplanation(item);
    expect(hasItemExplanation).toBeTruthy();
  }
});

Then('the documentation should include common use cases and practical examples', async function () {
  const hasUseCases = await documentationPage.hasUseCasesSection();
  expect(hasUseCases).toBeTruthy();
  const hasPracticalExamples = await documentationPage.hasPracticalExamples();
  expect(hasPracticalExamples).toBeTruthy();
});

Then('the documentation should include support contact information or help channels', async function () {
  const hasSupportInfo = await documentationPage.hasSupportContactInformation();
  expect(hasSupportInfo).toBeTruthy();
});