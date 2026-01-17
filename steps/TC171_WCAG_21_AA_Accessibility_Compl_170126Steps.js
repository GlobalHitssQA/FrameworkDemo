const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with an active contract', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.performLogin();
  await contractValuePage.waitForAuthentication();
});

When('the user accesses the contract value and composition component', async function () {
  await contractValuePage.navigateToContractValueComponent();
});

Then('the component should be displayed correctly on screen', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

Then('the color contrast should meet WCAG 2.1 AA minimum ratio of 4.5:1 for normal text and 3:1 for large text', async function () {
  const contrastResults = await contractValuePage.runColorContrastAudit();
  expect(contrastResults.violations.length).toBe(0);
});

Then('all interactive elements should be accessible via keyboard navigation', async function () {
  const keyboardAccessible = await contractValuePage.verifyKeyboardAccessibility();
  expect(keyboardAccessible).toBeTruthy();
});

Then('the tab order should follow a logical and coherent sequence', async function () {
  const tabOrderValid = await contractValuePage.verifyLogicalTabOrder();
  expect(tabOrderValid).toBeTruthy();
});

Then('the automated accessibility audit should report no critical AA level errors', async function () {
  const auditResults = await contractValuePage.runFullAccessibilityAudit();
  const criticalViolations = auditResults.violations.filter(v => v.impact === 'critical' || v.impact === 'serious');
  expect(criticalViolations.length).toBe(0);
});