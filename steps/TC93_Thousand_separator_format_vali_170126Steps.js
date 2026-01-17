const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToApplication();
  await contractValuePage.waitForAuthentication();
});

Given('the user has selected a contract with monetary values greater than one thousand in multiple categories', async function () {
  await contractValuePage.selectContractWithHighValues();
});

When('the user views the total contract value component', async function () {
  await contractValuePage.waitForContractValueComponent();
});

Then('the total value should display with comma thousand separators', async function () {
  const totalValue = await contractValuePage.getTotalContractValue();
  const hasCorrectFormat = contractValuePage.validateThousandSeparatorFormat(totalValue);
  expect(hasCorrectFormat).toBe(true);
});

When('the user clicks on the component to display the breakdown', async function () {
  await contractValuePage.clickContractValueComponent();
});

Then('the breakdown popup should be visible', async function () {
  const isVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isVisible).toBe(true);
});

Then('all category values greater than thousand should use comma thousand separators', async function () {
  const categoryValues = await contractValuePage.getAllCategoryValues();
  for (const value of categoryValues) {
    const numericValue = contractValuePage.extractNumericValue(value);
    if (numericValue > 1000) {
      const hasCorrectFormat = contractValuePage.validateThousandSeparatorFormat(value);
      expect(hasCorrectFormat).toBe(true);
    }
  }
});