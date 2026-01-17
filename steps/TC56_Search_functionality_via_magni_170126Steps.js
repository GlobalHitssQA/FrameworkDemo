const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterSearchPage = require('../pages/ActicenterSearchPage');

let acticenterSearchPage;

Given('the user is authenticated and on the Acticenter Desktop view', async function () {
  acticenterSearchPage = new ActicenterSearchPage(this.page);
  await acticenterSearchPage.navigateToActicenter();
  const isHeaderVisible = await acticenterSearchPage.isHeaderVisible();
  expect(isHeaderVisible).toBeTruthy();
});

When('the user clicks on the magnifying glass search icon in the header', async function () {
  await acticenterSearchPage.clickSearchIcon();
});

Then('the system displays the client general screen with available BP or contracts', async function () {
  const isClientScreenVisible = await acticenterSearchPage.isClientGeneralScreenVisible();
  expect(isClientScreenVisible).toBeTruthy();
  const hasContracts = await acticenterSearchPage.hasAvailableContracts();
  expect(hasContracts).toBeTruthy();
});

When('the user selects a specific contract from the list', async function () {
  await acticenterSearchPage.selectFirstAvailableContract();
});

Then('the system loads the selected contract and displays the total contract value component', async function () {
  const isContractValueVisible = await acticenterSearchPage.isContractValueComponentVisible();
  expect(isContractValueVisible).toBeTruthy();
});