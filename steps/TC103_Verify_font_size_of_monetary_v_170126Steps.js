const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.authenticateUser();
});

Given('the user selects a contract with monetary values in different categories', async function () {
  await contractValuePage.searchAndSelectContract();
});

Then('the system displays the component with the total contract value', async function () {
  const isVisible = await contractValuePage.isTotalContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user verifies the font size of the total value in the main component', async function () {
  this.totalValueFontSize = await contractValuePage.getTotalValueFontSize();
});

Then('the font size of the total value complies with Look and Feel specifications', async function () {
  const expectedFontSize = contractValuePage.getExpectedTotalValueFontSize();
  expect(this.totalValueFontSize).toBe(expectedFontSize);
});

When('the user clicks on the component to open the breakdown popup', async function () {
  await contractValuePage.clickOnTotalValueComponent();
});

Then('the popup displays showing monetary values for each category on the right side', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  const areValuesVisible = await contractValuePage.areBreakdownValuesVisible();
  expect(areValuesVisible).toBeTruthy();
});

When('the user inspects the font size of each monetary value in the breakdown', async function () {
  this.breakdownFontSizes = await contractValuePage.getAllBreakdownValuesFontSizes();
});

Then('all monetary values use the font size specified in Look and Feel', async function () {
  const expectedFontSize = contractValuePage.getExpectedBreakdownFontSize();
  for (const fontSize of this.breakdownFontSizes) {
    expect(fontSize).toBe(expectedFontSize);
  }
});

Then('values with format $0.00 maintain the same font size as positive balance values', async function () {
  const zeroValuesFontSizes = await contractValuePage.getZeroValuesFontSizes();
  const positiveValuesFontSizes = await contractValuePage.getPositiveValuesFontSizes();
  const expectedFontSize = contractValuePage.getExpectedBreakdownFontSize();
  for (const fontSize of zeroValuesFontSizes) {
    expect(fontSize).toBe(expectedFontSize);
  }
  for (const fontSize of positiveValuesFontSizes) {
    expect(fontSize).toBe(expectedFontSize);
  }
});