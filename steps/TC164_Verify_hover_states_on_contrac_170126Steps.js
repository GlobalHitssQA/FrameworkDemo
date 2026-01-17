const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.authenticate();
});

Given('a contract is selected and the value composition component is visible', async function () {
  await contractValuePage.selectActiveContract();
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user hovers over the main contract value component', async function () {
  await contractValuePage.hoverOverMainComponent();
});

Then('the component should display the hover state visual changes', async function () {
  const hasHoverState = await contractValuePage.verifyMainComponentHoverState();
  expect(hasHoverState).toBeTruthy();
});

When('the user expands the breakdown section', async function () {
  await contractValuePage.expandBreakdownSection();
});

When('the user hovers over each list item in the breakdown', async function () {
  await contractValuePage.hoverOverAllBreakdownItems();
});

Then('each interactive list item should display the hover state', async function () {
  const allItemsHaveHoverState = await contractValuePage.verifyAllBreakdownItemsHoverState();
  expect(allItemsHaveHoverState).toBeTruthy();
});

When('the user moves the cursor away from the elements', async function () {
  await contractValuePage.moveCursorAway();
});

Then('all elements should return to their normal visual state', async function () {
  const elementsNormal = await contractValuePage.verifyElementsReturnToNormalState();
  expect(elementsNormal).toBeTruthy();
});