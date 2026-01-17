const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter on a mobile device in portrait orientation', async function() {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.setViewportToPortrait();
  await contractValuePage.navigateToActicenter();
  await contractValuePage.waitForAuthentication();
});

Given('an active contract is selected', async function() {
  await contractValuePage.selectActiveContract();
});

When('the user views the contract value and composition component', async function() {
  await contractValuePage.waitForContractValueComponent();
});

Then('the component should be displayed adapted to portrait orientation', async function() {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
  const isPortraitLayout = await contractValuePage.isComponentInPortraitLayout();
  expect(isPortraitLayout).toBeTruthy();
});

When('the user clicks on the component to expand the breakdown', async function() {
  await contractValuePage.clickContractValueComponent();
});

Then('the popup should display correctly with the list of items in portrait orientation', async function() {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const isPopupPortrait = await contractValuePage.isPopupInPortraitLayout();
  expect(isPopupPortrait).toBeTruthy();
});

When('the user changes the device orientation to landscape', async function() {
  await contractValuePage.setViewportToLandscape();
});

Then('the component and breakdown should reorganize automatically for horizontal space', async function() {
  const isLandscapeLayout = await contractValuePage.isComponentInLandscapeLayout();
  expect(isLandscapeLayout).toBeTruthy();
  const isPopupLandscape = await contractValuePage.isPopupInLandscapeLayout();
  expect(isPopupLandscape).toBeTruthy();
});

Then('the breakdown should remain vertically aligned with the total value component', async function() {
  const isAligned = await contractValuePage.isBreakdownAlignedWithComponent();
  expect(isAligned).toBeTruthy();
});