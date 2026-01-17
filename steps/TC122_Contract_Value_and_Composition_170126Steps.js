const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;
let startTime;
let componentLoadTime;
let popupLoadTime;

Given('the user is authenticated and on the Acticenter module', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  const isLoaded = await acticenterPage.isMainScreenLoaded();
  expect(isLoaded).toBeTruthy();
});

When('the user starts the response time measurement', async function () {
  startTime = await acticenterPage.startTimeMeasurement();
  expect(startTime).toBeDefined();
});

When('the user selects a contract with multiple investment items', async function () {
  await acticenterPage.selectContractWithMultipleItems();
});

Then('the contract total value component should load within 3 seconds', async function () {
  componentLoadTime = await acticenterPage.waitForContractValueComponentAndMeasure(startTime);
  expect(componentLoadTime).toBeLessThan(3000);
});

When('the user clicks on the component to expand the breakdown', async function () {
  startTime = await acticenterPage.startTimeMeasurement();
  await acticenterPage.clickContractValueComponent();
});

Then('the popup should display within 2 seconds', async function () {
  popupLoadTime = await acticenterPage.waitForBreakdownPopupAndMeasure(startTime);
  expect(popupLoadTime).toBeLessThan(2000);
});

Then('all investment item values should be completely loaded and visible', async function () {
  const allItemsVisible = await acticenterPage.areAllInvestmentItemsVisible();
  expect(allItemsVisible).toBeTruthy();
});