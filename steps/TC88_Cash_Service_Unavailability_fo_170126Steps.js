const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the Cash service for Bank contracts is unavailable', async function() {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.simulateCashServiceUnavailable();
});

Given('the user is authenticated in Acticenter', async function() {
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyUserIsAuthenticated();
});

When('the user selects a Bank contract', async function() {
  await contractValuePage.selectBankContract();
});

Then('the system attempts to load the total contract value component', async function() {
  await contractValuePage.waitForContractValueComponentLoad();
});

Then('an error message is displayed for Cash MXN information', async function() {
  const errorVisible = await contractValuePage.isCashMXNErrorMessageVisible();
  expect(errorVisible).toBeTruthy();
});

When('the user opens the breakdown popup', async function() {
  await contractValuePage.openBreakdownPopup();
});

Then('the Cash MXN section shows an error indicator or unavailable value', async function() {
  const hasErrorIndicator = await contractValuePage.hasCashMXNErrorIndicator();
  expect(hasErrorIndicator).toBeTruthy();
});

Then('other sections display correctly when their services are available', async function() {
  const otherSectionsVisible = await contractValuePage.areOtherBreakdownSectionsVisible();
  expect(otherSectionsVisible).toBeTruthy();
});

Then('the Funds section is visible', async function() {
  const fundsVisible = await contractValuePage.isFundsSectionVisible();
  expect(fundsVisible).toBeTruthy();
});

Then('the Pending settlement section is visible', async function() {
  const pendingVisible = await contractValuePage.isPendingSettlementSectionVisible();
  expect(pendingVisible).toBeTruthy();
});