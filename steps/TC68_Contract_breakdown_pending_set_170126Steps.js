const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.performAuthentication();
});

Given('a contract is available for consultation', async function () {
  const isContractAvailable = await contractBreakdownPage.verifyContractAvailability();
  expect(isContractAvailable).toBeTruthy();
});

When('the user accesses Acticenter and selects a contract', async function () {
  await contractBreakdownPage.selectContract();
});

Then('the system displays the operation screen with the total contract value component', async function () {
  const isComponentVisible = await contractBreakdownPage.isTotalContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalContractValueComponent();
});

Then('the system displays a popup with the contract value breakdown including Pending Settlement item', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const isPendingSettlementVisible = await contractBreakdownPage.isPendingSettlementItemVisible();
  expect(isPendingSettlementVisible).toBeTruthy();
});

When('the user inspects the text color of the Pending Settlement item', async function () {
  this.pendingSettlementTextColor = await contractBreakdownPage.getPendingSettlementTextColor();
});

Then('the text color matches the hexadecimal code specified in the Figma Look and Feel', async function () {
  const expectedColor = contractBreakdownPage.getExpectedPendingSettlementColor();
  const actualColor = this.pendingSettlementTextColor;
  expect(actualColor).toBe(expectedColor);
});

Then('the Pending Settlement text color complies exactly with the design specifications', async function () {
  const isColorCompliant = await contractBreakdownPage.validatePendingSettlementColorCompliance(this.pendingSettlementTextColor);
  expect(isColorCompliant).toBeTruthy();
});