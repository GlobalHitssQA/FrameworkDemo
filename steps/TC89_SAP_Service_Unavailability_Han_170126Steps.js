const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;
let sapServiceMocked = false;

Given('the SAP service for Mexdolar balance is unavailable', async function() {
  sapServiceMocked = true;
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.mockSAPServiceUnavailable();
});

Given('the user is authenticated in Acticenter', async function() {
  await contractValuePage.navigateToActicenter();
  await contractValuePage.verifyUserIsAuthenticated();
});

When('the user selects a Banco Persona Moral contract with Mexdolar account', async function() {
  await contractValuePage.searchForContract();
  await contractValuePage.selectBancoPersonaMoralContractWithMexdolar();
});

Then('the system attempts to load the total contract value component', async function() {
  await contractValuePage.waitForContractValueComponentLoad();
});

Then('the system displays a message indicating USD Cash information is unavailable or shows indeterminate value', async function() {
  const hasErrorOrIndeterminate = await contractValuePage.verifyUSDCashErrorOrIndeterminate();
  expect(hasErrorOrIndeterminate).toBeTruthy();
});

When('the user opens the breakdown popup', async function() {
  await contractValuePage.openBreakdownPopup();
});

Then('the USD Cash section shows an error or unavailable status or zero with service failure indication', async function() {
  const usdCashStatus = await contractValuePage.getUSDCashSectionStatus();
  const isErrorState = usdCashStatus.hasError || usdCashStatus.isUnavailable || usdCashStatus.isZeroWithIndication;
  expect(isErrorState).toBeTruthy();
});

Then('the other sections independent of SAP service display their correct values', async function() {
  const independentSectionsValid = await contractValuePage.verifyIndependentSectionsDisplayCorrectly();
  expect(independentSectionsValid).toBeTruthy();
});