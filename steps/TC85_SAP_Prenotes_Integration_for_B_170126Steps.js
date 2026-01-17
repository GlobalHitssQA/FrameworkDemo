const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('I am authenticated in Acticenter with an active Bank contract', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.waitForAuthentication();
});

When('I select a Bank contract that has cash in transit', async function () {
  await contractBreakdownPage.openContractSearch();
  await contractBreakdownPage.selectBankContractWithCashInTransit();
});

Then('the system loads the selected contract', async function () {
  const isLoaded = await contractBreakdownPage.isContractLoaded();
  expect(isLoaded).toBeTruthy();
});

When('I expand the contract value breakdown', async function () {
  await contractBreakdownPage.clickContractValueComponent();
  await contractBreakdownPage.waitForBreakdownPopup();
});

Then('the system invokes the SAP prenotes service to obtain cash in transit', async function () {
  const isBreakdownVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isBreakdownVisible).toBeTruthy();
});

Then('I verify the Cash in Transit field in the breakdown', async function () {
  const isCashInTransitVisible = await contractBreakdownPage.isCashInTransitFieldVisible();
  expect(isCashInTransitVisible).toBeTruthy();
});

Then('the system displays the cash in transit value obtained from SAP prenotes service', async function () {
  const cashInTransitValue = await contractBreakdownPage.getCashInTransitValue();
  expect(cashInTransitValue).not.toBeNull();
  expect(cashInTransitValue).toMatch(/^\$[\d,]+\.\d{2}/);
});

When('I select a Casa de Bolsa contract', async function () {
  await contractBreakdownPage.closeBreakdownPopup();
  await contractBreakdownPage.openContractSearch();
  await contractBreakdownPage.selectCasaDeBolsaContract();
  await contractBreakdownPage.clickContractValueComponent();
  await contractBreakdownPage.waitForBreakdownPopup();
});

Then('the Cash in Transit field should not be visible for Casa de Bolsa contracts', async function () {
  const isCashInTransitVisible = await contractBreakdownPage.isCashInTransitFieldVisible();
  expect(isCashInTransitVisible).toBeFalsy();
});