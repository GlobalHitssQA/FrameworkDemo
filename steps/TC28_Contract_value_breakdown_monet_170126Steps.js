const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyUserIsAuthenticated();
});

Given('a contract with multiple monetary value items is selected', async function () {
  await contractBreakdownPage.selectContractWithMultipleItems();
  await contractBreakdownPage.verifyTotalValueComponentIsVisible();
});

When('the user clicks on the total contract value component', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the breakdown popup is displayed with detailed contract value', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

Then('all monetary amounts display thousand separators with commas', async function () {
  const amounts = await contractBreakdownPage.getAllMonetaryAmounts();
  for (const amount of amounts) {
    const hasValidFormat = contractBreakdownPage.validateThousandSeparator(amount);
    expect(hasValidFormat).toBe(true);
  }
});

Then('all monetary amounts display exactly two decimal places', async function () {
  const amounts = await contractBreakdownPage.getAllMonetaryAmounts();
  for (const amount of amounts) {
    const hasTwoDecimals = contractBreakdownPage.validateTwoDecimalPlaces(amount);
    expect(hasTwoDecimals).toBe(true);
  }
});

Then('all amounts greater than 999 include comma thousand separators', async function () {
  const amounts = await contractBreakdownPage.getAllMonetaryAmounts();
  for (const amount of amounts) {
    const numericValue = contractBreakdownPage.extractNumericValue(amount);
    if (numericValue >= 1000) {
      const hasCommaSeparator = contractBreakdownPage.validateThousandSeparatorForLargeAmounts(amount);
      expect(hasCommaSeparator).toBe(true);
    }
  }
});

Then('all monetary values start with the peso symbol', async function () {
  const amounts = await contractBreakdownPage.getAllMonetaryAmounts();
  for (const amount of amounts) {
    const startsWithPeso = contractBreakdownPage.validatePesoSymbol(amount);
    expect(startsWithPeso).toBe(true);
  }
});