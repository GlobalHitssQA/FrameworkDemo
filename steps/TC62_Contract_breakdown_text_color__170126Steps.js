const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyUserIsAuthenticated();
});

Given('the user has access to a Casa de Bolsa contract', async function () {
  await contractBreakdownPage.verifyCasaDeBolsaContractAccess();
});

When('the user accesses Acticenter and selects a Casa de Bolsa contract', async function () {
  await contractBreakdownPage.selectCasaDeBolsaContract();
});

Then('the system displays the operation screen with the total contract value component', async function () {
  const isVisible = await contractBreakdownPage.isTotalContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total contract value component to expand the breakdown', async function () {
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('the system displays a popup with the contract value breakdown including Purchasing Power MXN item', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const isPurchasingPowerVisible = await contractBreakdownPage.isPurchasingPowerMXNItemVisible();
  expect(isPurchasingPowerVisible).toBeTruthy();
});

When('the user inspects the text color of the Purchasing Power MXN item', async function () {
  await contractBreakdownPage.inspectPurchasingPowerTextColor();
});

Then('the text color matches the hexadecimal code specified in Figma Look and Feel', async function () {
  const textColor = await contractBreakdownPage.getPurchasingPowerTextColor();
  const expectedColor = await contractBreakdownPage.getExpectedFigmaTextColor();
  expect(textColor).toBe(expectedColor);
});

Then('the Purchasing Power MXN text color complies exactly with the design specifications', async function () {
  const isCompliant = await contractBreakdownPage.verifyTextColorCompliance();
  expect(isCompliant).toBeTruthy();
});