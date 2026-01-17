const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with an active contract', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.loginWithValidCredentials();
  await contractValuePage.selectActiveContract();
});

When('the user navigates to the contract value and composition component', async function () {
  await contractValuePage.waitForContractValueComponentVisible();
});

When('the user presses Tab to focus on the main component', async function () {
  await contractValuePage.pressTabToFocusMainComponent();
});

Then('the component should display a visible focus indicator', async function () {
  const hasFocusIndicator = await contractValuePage.verifyMainComponentHasFocusIndicator();
  expect(hasFocusIndicator).toBeTruthy();
});

When('the user presses Enter to open the breakdown popup', async function () {
  await contractValuePage.pressEnterToOpenBreakdown();
});

Then('the breakdown popup should be displayed', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the user can navigate between elements using Tab key', async function () {
  await contractValuePage.navigateBreakdownElementsWithTab();
});

Then('each element should display a clear and distinguishable focus state', async function () {
  const allElementsHaveFocus = await contractValuePage.verifyAllBreakdownElementsHaveFocusState();
  expect(allElementsHaveFocus).toBeTruthy();
});

Then('the focus states should comply with WCAG 2.1 accessibility standards', async function () {
  const isWCAGCompliant = await contractValuePage.verifyFocusStatesWCAGCompliance();
  expect(isWCAGCompliant).toBeTruthy();
});