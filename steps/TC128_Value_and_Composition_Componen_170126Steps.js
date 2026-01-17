const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ValueCompositionPage = require('../pages/ValueCompositionPage');

let valueCompositionPage;

Given('the user opens Microsoft Edge browser', async function () {
  valueCompositionPage = new ValueCompositionPage(this.page);
  await valueCompositionPage.initializeBrowser();
});

Given('the user navigates to Acticenter module', async function () {
  await valueCompositionPage.navigateToActicenter();
});

Given('the user logs in with valid credentials', async function () {
  await valueCompositionPage.login(process.env.USERNAME, process.env.PASSWORD);
});

When('the user selects a Casa de Bolsa Persona Moral contract', async function () {
  await valueCompositionPage.selectCasaBolsaPersonaMoralContract();
});

Then('the value and composition component renders correctly', async function () {
  const isVisible = await valueCompositionPage.isValueCompositionComponentVisible();
  expect(isVisible).toBe(true);
});

When('the user clicks on the component to open the breakdown popup', async function () {
  await valueCompositionPage.clickValueCompositionComponent();
});

Then('the popup displays all applicable items', async function () {
  const isPopupVisible = await valueCompositionPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

Then('the Poder de compra MXN value is displayed correctly', async function () {
  const isDisplayed = await valueCompositionPage.isPoderCompraMXNDisplayed();
  expect(isDisplayed).toBe(true);
});

Then('the Efectivo USD value is displayed correctly', async function () {
  const isDisplayed = await valueCompositionPage.isEfectivoUSDDisplayed();
  expect(isDisplayed).toBe(true);
});

When('the user hovers over interactive elements', async function () {
  await valueCompositionPage.hoverOverInteractiveElement();
});

Then('the tooltips are displayed correctly', async function () {
  const isTooltipVisible = await valueCompositionPage.isTooltipVisible();
  expect(isTooltipVisible).toBe(true);
});

When('the user clicks outside the component', async function () {
  await valueCompositionPage.clickOutsideComponent();
});

Then('the popup closes correctly', async function () {
  const isPopupClosed = await valueCompositionPage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBe(true);
});

Then('no console errors or warnings are present', async function () {
  const consoleMessages = await valueCompositionPage.getConsoleErrorsAndWarnings();
  expect(consoleMessages.length).toBe(0);
});