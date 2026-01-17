const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyUserIsAuthenticated();
});

Given('a contract with debt fund investments is available', async function () {
  await contractBreakdownPage.verifyDebtFundContractAvailable();
});

When('the user selects a contract with debt fund investments', async function () {
  await contractBreakdownPage.selectDebtFundContract();
});

Then('the system displays the operation screen with the total contract value component', async function () {
  const isVisible = await contractBreakdownPage.isTotalContractValueComponentVisible();
  expect(isVisible).toBe(true);
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('the system displays a popup with the contract value breakdown including Debt Funds item', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
  const isDebtFundsVisible = await contractBreakdownPage.isDebtFundsItemVisible();
  expect(isDebtFundsVisible).toBe(true);
});

When('the user inspects the text color of the Debt Funds item', async function () {
  await contractBreakdownPage.captureDebtFundsTextColor();
});

Then('the text color matches the hexadecimal code specified in Figma Look and Feel', async function () {
  const expectedColor = '#1A1A1A';
  const isColorMatch = await contractBreakdownPage.verifyDebtFundsTextColor(expectedColor);
  expect(isColorMatch).toBe(true);
});

Then('the Debt Funds item text color complies exactly with the design specifications', async function () {
  const complianceResult = await contractBreakdownPage.verifyColorComplianceWithDesignSpecs();
  expect(complianceResult).toBe(true);
});