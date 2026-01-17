const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user has access to the PA Responsive application', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToApplication();
});

When('the user views the component in Landscape mode at {int}px width', async function (width) {
  await contractValuePage.setViewportLandscape(width);
});

Then('the component should adapt correctly to horizontal orientation', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
  const isAdapted = await contractValuePage.verifyLandscapeLayout();
  expect(isAdapted).toBeTruthy();
});

When('the user views the component in Portrait mode at {int}px width', async function (width) {
  await contractValuePage.setViewportPortrait(width);
});

Then('the component should adapt correctly to vertical orientation', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
  const isAdapted = await contractValuePage.verifyPortraitLayout();
  expect(isAdapted).toBeTruthy();
});

When('the user taps on the contract value component', async function () {
  await contractValuePage.tapContractValueComponent();
});

Then('the breakdown popup should be displayed correctly', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the popup should adapt to both Landscape and Portrait orientations', async function () {
  await contractValuePage.setViewportLandscape(1024);
  const landscapeAdapted = await contractValuePage.verifyPopupLandscapeLayout();
  expect(landscapeAdapted).toBeTruthy();
  
  await contractValuePage.setViewportPortrait(768);
  const portraitAdapted = await contractValuePage.verifyPopupPortraitLayout();
  expect(portraitAdapted).toBeTruthy();
});

When('the user verifies the responsive breakpoints', async function () {
  await contractValuePage.captureCurrentBreakpointState();
});

Then('the breakpoint at {int}px should function correctly', async function (breakpoint) {
  const isBreakpointCorrect = await contractValuePage.verifyBreakpoint(breakpoint);
  expect(isBreakpointCorrect).toBeTruthy();
});

When('the user taps to close the breakdown popup', async function () {
  await contractValuePage.tapCloseBreakdownPopup();
});

Then('the popup should close successfully', async function () {
  const isPopupClosed = await contractValuePage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
});

Then('any design deviations should be documented', async function () {
  const deviations = await contractValuePage.documentDesignDeviations();
  this.attach(JSON.stringify(deviations, null, 2), 'application/json');
});