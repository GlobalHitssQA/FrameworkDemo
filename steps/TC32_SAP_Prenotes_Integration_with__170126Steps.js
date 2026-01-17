const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterContractPage = require('../pages/ActicenterContractPage');

let acticenterPage;
let sapPrenotesValue;

Given('the user is authenticated in Acticenter system with advisor credentials', async function () {
  acticenterPage = new ActicenterContractPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.loginWithAdvisorCredentials();
  const isMainScreenVisible = await acticenterPage.isMainScreenDisplayed();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects a Bank type contract that has pre-notes registered in SAP', async function () {
  await acticenterPage.searchBankContractWithSAPPrenotes();
  await acticenterPage.selectContractFromResults();
  const isContractLoaded = await acticenterPage.isContractInformationLoaded();
  expect(isContractLoaded).toBeTruthy();
});

When('the user clicks on the value and composition component to view the breakdown', async function () {
  await acticenterPage.clickValueCompositionComponent();
});

Then('the system displays the breakdown with all applicable items for the contract', async function () {
  const isBreakdownVisible = await acticenterPage.isBreakdownPopupDisplayed();
  expect(isBreakdownVisible).toBeTruthy();
  const hasApplicableItems = await acticenterPage.hasApplicableBreakdownItems();
  expect(hasApplicableItems).toBeTruthy();
});

Then('the Cash in Transit item shows the value obtained from the SAP pre-notes service', async function () {
  const cashInTransitValue = await acticenterPage.getCashInTransitValue();
  expect(cashInTransitValue).not.toBeNull();
  expect(cashInTransitValue).toMatch(/^\$[\d,]+(\.\d{2})?$/);
});

Then('the Cash in Transit value matches the pre-notes information stored in SAP', async function () {
  const acticenterValue = await acticenterPage.getCashInTransitValue();
  const sapValue = await acticenterPage.getSAPPrenotesExpectedValue();
  const normalizedActicenterValue = acticenterPage.normalizeMonetaryValue(acticenterValue);
  const normalizedSAPValue = acticenterPage.normalizeMonetaryValue(sapValue);
  expect(normalizedActicenterValue).toEqual(normalizedSAPValue);
});