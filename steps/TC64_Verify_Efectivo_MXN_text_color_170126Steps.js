const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyUserIsAuthenticated();
});

Given('a Bank contract is available for consultation', async function () {
  await contractBreakdownPage.verifyBankContractAvailable();
});

When('the user selects a Bank contract', async function () {
  await contractBreakdownPage.selectBankContract();
});

Then('the system displays the operation screen with the total contract value component', async function () {
  const isVisible = await contractBreakdownPage.isTotalContractValueComponentVisible();
  expect(isVisible).toBe(true);
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('the system displays a popup with the contract value breakdown', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

Then('the breakdown includes the Efectivo MXN field', async function () {
  const isFieldVisible = await contractBreakdownPage.isEfectivoMxnFieldVisible();
  expect(isFieldVisible).toBe(true);
});

When('the user inspects the text color of Efectivo MXN field', async function () {
  this.efectivoMxnTextColor = await contractBreakdownPage.getEfectivoMxnTextColor();
});

Then('the text color matches the hexadecimal code specified in Figma Look and Feel', async function () {
  const expectedColor = await contractBreakdownPage.getExpectedFigmaColor();
  const actualColor = this.efectivoMxnTextColor;
  expect(actualColor).toBe(expectedColor);
});

Then('the Efectivo MXN text color complies exactly with the design specifications', async function () {
  const isCompliant = await contractBreakdownPage.verifyColorCompliance(this.efectivoMxnTextColor);
  expect(isCompliant).toBe(true);
});