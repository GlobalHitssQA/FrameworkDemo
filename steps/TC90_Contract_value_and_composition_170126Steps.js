const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated and accesses Acticenter without selecting any contract', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
});

Then('the main Acticenter screen is displayed', async function () {
  const isMainScreenVisible = await acticenterPage.isMainScreenVisible();
  expect(isMainScreenVisible).toBe(true);
});

Then('the contract value and composition component is not visible', async function () {
  const isComponentVisible = await acticenterPage.isContractValueComponentVisible();
  expect(isComponentVisible).toBe(false);
});

When('the user searches for a client using the search magnifying glass', async function () {
  await acticenterPage.clickSearchMagnifyingGlass();
  await acticenterPage.enterClientSearchTerm('TEST_CLIENT');
  await acticenterPage.submitSearch();
});

When('the user selects a client from the search results', async function () {
  await acticenterPage.selectFirstClientFromResults();
});

Then('the client general screen BP is displayed', async function () {
  const isClientScreenVisible = await acticenterPage.isClientBPScreenVisible();
  expect(isClientScreenVisible).toBe(true);
});

When('the user selects a specific contract from the client', async function () {
  await acticenterPage.selectFirstAvailableContract();
});

Then('the selected contract is loaded', async function () {
  const isContractLoaded = await acticenterPage.isContractLoaded();
  expect(isContractLoaded).toBe(true);
});

Then('the contract value and composition component is visible', async function () {
  const isComponentVisible = await acticenterPage.isContractValueComponentVisible();
  expect(isComponentVisible).toBe(true);
});

Then('the component displays the total contract value and the breakdown option', async function () {
  const hasTotalValue = await acticenterPage.hasTotalContractValue();
  const hasBreakdownOption = await acticenterPage.hasBreakdownOption();
  expect(hasTotalValue).toBe(true);
  expect(hasBreakdownOption).toBe(true);
});