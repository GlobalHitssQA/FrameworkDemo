const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.authenticate();
});

Given('a Casa de Bolsa contract for Physical Person is selected', async function () {
  await contractValuePage.selectCasaDeBolsaPhysicalPersonContract();
  const isComponentVisible = await contractValuePage.isTotalValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickTotalValueComponent();
});

Then('the breakdown popup should be displayed', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the Purchasing Power MXN item should be visible in the breakdown list', async function () {
  const isItemVisible = await contractValuePage.isPurchasingPowerMXNVisible();
  expect(isItemVisible).toBeTruthy();
});

Then('the Purchasing Power MXN value should be aligned to the right in Mexican pesos format', async function () {
  const valueText = await contractValuePage.getPurchasingPowerMXNValue();
  const isValidFormat = contractValuePage.isValidMexicanPesoFormat(valueText);
  expect(isValidFormat).toBeTruthy();
  
  const isAlignedRight = await contractValuePage.isPurchasingPowerValueAlignedRight();
  expect(isAlignedRight).toBeTruthy();
});

Then('the displayed amount should match the currentcash value from Casa de Bolsa contract', async function () {
  const displayedValue = await contractValuePage.getPurchasingPowerMXNValue();
  const expectedValue = await contractValuePage.getExpectedCurrentCashValue();
  const normalizedDisplayed = contractValuePage.normalizeMonetaryValue(displayedValue);
  const normalizedExpected = contractValuePage.normalizeMonetaryValue(expectedValue);
  expect(normalizedDisplayed).toBe(normalizedExpected);
});

Then('when the contract has no balance in this item it should display zero pesos', async function () {
  await contractValuePage.selectContractWithZeroBalance();
  await contractValuePage.clickTotalValueComponent();
  await contractValuePage.waitForBreakdownPopup();
  const valueText = await contractValuePage.getPurchasingPowerMXNValue();
  const normalizedValue = contractValuePage.normalizeMonetaryValue(valueText);
  expect(normalizedValue).toBe('0.00');
});