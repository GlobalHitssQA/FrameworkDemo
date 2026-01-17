const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter with Mexican regional configuration', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyMexicanRegionalConfigLoaded();
});

When('the user selects a contract and expands the value and composition breakdown', async function () {
  await contractBreakdownPage.selectContract();
  await contractBreakdownPage.expandValueBreakdown();
});

Then('all amounts should display period as decimal separator and comma as thousand separator', async function () {
  const amounts = await contractBreakdownPage.getAllDisplayedAmounts();
  for (const amount of amounts) {
    const isValidFormat = contractBreakdownPage.validateMexicanNumberFormat(amount);
    expect(isValidFormat).toBeTruthy();
  }
});

Then('amounts with decimals in all breakdown items should follow Mexican format', async function () {
  const breakdownItems = await contractBreakdownPage.getBreakdownItemAmounts();
  for (const item of breakdownItems) {
    const hasCorrectDecimalSeparator = contractBreakdownPage.hasPointAsDecimalSeparator(item);
    const hasCorrectThousandSeparator = contractBreakdownPage.hasCommaAsThousandSeparator(item);
    expect(hasCorrectDecimalSeparator).toBeTruthy();
    expect(hasCorrectThousandSeparator).toBeTruthy();
  }
});

Then('amounts without decimals should display .00 at the end', async function () {
  const amounts = await contractBreakdownPage.getAllDisplayedAmounts();
  for (const amount of amounts) {
    const hasTwoDecimals = contractBreakdownPage.hasTwoDecimalPlaces(amount);
    expect(hasTwoDecimals).toBeTruthy();
  }
});

Then('the separator format should comply with regional configuration standards', async function () {
  const allAmounts = await contractBreakdownPage.getAllDisplayedAmounts();
  const complianceResult = contractBreakdownPage.validateRegionalCompliance(allAmounts);
  expect(complianceResult.isCompliant).toBeTruthy();
});