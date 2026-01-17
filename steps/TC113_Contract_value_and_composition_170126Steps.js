const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;
let loadStartTime;
let loadEndTime;

Given('the user is authenticated and on the Acticenter main screen', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenIsDisplayed();
});

When('the user searches for a contract using the search magnifying glass', async function () {
  await acticenterPage.clickSearchMagnifyingGlass();
});

When('the user selects a contract with all value categories populated', async function () {
  await acticenterPage.searchAndSelectContract();
  await acticenterPage.verifyContractInformationIsDisplayed();
});

When('the user clicks on the total value component', async function () {
  loadStartTime = Date.now();
  await acticenterPage.clickTotalValueComponent();
});

Then('the breakdown should load completely within 3 seconds', async function () {
  await acticenterPage.waitForBreakdownToLoad();
  loadEndTime = Date.now();
  const loadTimeInSeconds = (loadEndTime - loadStartTime) / 1000;
  console.log(`Component load time: ${loadTimeInSeconds} seconds`);
  expect(loadTimeInSeconds).toBeLessThanOrEqual(3);
  await acticenterPage.verifyAllBreakdownValuesAreLoaded();
});