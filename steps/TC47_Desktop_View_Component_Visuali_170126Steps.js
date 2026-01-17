const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter system', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.performLogin();
});

Given('the browser is configured in standard Desktop resolution', async function () {
  await contractValuePage.setDesktopViewport();
});

When('the user accesses the Acticenter system in Desktop mode', async function () {
  await contractValuePage.waitForSystemLoad();
  const isLoaded = await contractValuePage.isSystemLoaded();
  expect(isLoaded).toBeTruthy();
});

When('the user selects a contract to visualize', async function () {
  await contractValuePage.selectActiveContract();
});

Then('the value and composition component is displayed on screen', async function () {
  const isVisible = await contractValuePage.isValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

Then('the header shows the client or contract search function', async function () {
  const isSearchVisible = await contractValuePage.isSearchFunctionVisible();
  expect(isSearchVisible).toBeTruthy();
});

When('the user clicks on the component to expand the breakdown', async function () {
  await contractValuePage.clickValueComponent();
});

Then('the breakdown popup is displayed correctly', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the breakdown list is vertically aligned with the total value component', async function () {
  const isAligned = await contractValuePage.verifyVerticalAlignment();
  expect(isAligned).toBeTruthy();
});

Then('all elements are readable and correctly spaced', async function () {
  const areElementsReadable = await contractValuePage.verifyElementsReadability();
  const areElementsSpaced = await contractValuePage.verifyElementsSpacing();
  expect(areElementsReadable).toBeTruthy();
  expect(areElementsSpaced).toBeTruthy();
});