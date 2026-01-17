const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;

Given('the user is authenticated in Acticenter as a valid advisor', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToLogin();
  await contractBreakdownPage.login(process.env.ADVISOR_USERNAME, process.env.ADVISOR_PASSWORD);
  await contractBreakdownPage.verifyMainInterfaceDisplayed();
});

When('the user selects a contract with values in multiple breakdown items', async function () {
  await contractBreakdownPage.searchContract(process.env.TEST_CONTRACT_NUMBER);
  await contractBreakdownPage.selectContractFromResults();
  await contractBreakdownPage.verifyTotalValueComponentVisible();
});

When('the user clicks on the value and composition component to display the full breakdown', async function () {
  await contractBreakdownPage.clickValueCompositionComponent();
  await contractBreakdownPage.verifyBreakdownPopupDisplayed();
});

Then('all monetary values should display currency format with peso or dollar sign', async function () {
  const breakdownItems = [
    'poderCompraMxn',
    'efectivoMxn',
    'efectivoUsd',
    'pendientesLiquidar',
    'fondosDeuda',
    'fondosCobertura',
    'fondosRentaVariable',
    'cedesPagares',
    'mercadoDinero',
    'mercadoCapitales'
  ];
  
  for (const item of breakdownItems) {
    const hasCurrencySymbol = await contractBreakdownPage.verifyCurrencySymbol(item);
    expect(hasCurrencySymbol).toBeTruthy();
  }
});

Then('all monetary values should display thousand separators with comma', async function () {
  const values = await contractBreakdownPage.getAllBreakdownValues();
  
  for (const value of values) {
    const hasValidFormat = await contractBreakdownPage.verifyThousandSeparators(value);
    expect(hasValidFormat).toBeTruthy();
  }
});

Then('all monetary values should display exactly two decimal places', async function () {
  const values = await contractBreakdownPage.getAllBreakdownValues();
  
  for (const value of values) {
    const hasTwoDecimals = await contractBreakdownPage.verifyTwoDecimalPlaces(value);
    expect(hasTwoDecimals).toBeTruthy();
  }
});