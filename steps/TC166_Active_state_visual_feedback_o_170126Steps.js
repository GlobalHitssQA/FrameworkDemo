const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractComponentPage = require('../pages/ContractComponentPage');

let contractComponentPage;

Given('the user is authenticated in Acticenter', async function () {
  contractComponentPage = new ContractComponentPage(this.page);
  await contractComponentPage.navigateToActicenter();
  await contractComponentPage.performAuthentication();
});

Given('the user has selected an active contract', async function () {
  await contractComponentPage.selectActiveContract();
});

Given('the contract value and composition component is visible', async function () {
  const isVisible = await contractComponentPage.isContractComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user presses and holds the mouse button on the main component', async function () {
  await contractComponentPage.pressAndHoldMainComponent();
});

Then('the component should display the active visual state with style changes', async function () {
  const hasActiveState = await contractComponentPage.hasActiveStateStyles();
  expect(hasActiveState).toBeTruthy();
});

When('the user observes the active state before releasing the click', async function () {
  this.activeStateStyles = await contractComponentPage.captureActiveStateStyles();
});

Then('the active state should be visually distinct from hover and normal states', async function () {
  const isDistinct = await contractComponentPage.isActiveStateDistinct(this.activeStateStyles);
  expect(isDistinct).toBeTruthy();
});

When('the user releases the click', async function () {
  await contractComponentPage.releaseClick();
});

Then('the breakdown popup should open correctly', async function () {
  const isPopupVisible = await contractComponentPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the component visual state should return to normal or hover state', async function () {
  const hasNormalState = await contractComponentPage.hasNormalOrHoverState();
  expect(hasNormalState).toBeTruthy();
});