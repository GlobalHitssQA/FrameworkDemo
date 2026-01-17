const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;
let totalValueDisplayed;
let categoryValues;

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.waitForAuthentication();
});

Given('a contract with diversified investments in all categories is available', async function () {
  const isContractAvailable = await contractBreakdownPage.verifyDiversifiedContractExists();
  expect(isContractAvailable).toBeTruthy();
});

When('the user selects the contract with all investment categories', async function () {
  await contractBreakdownPage.openContractSearch();
  await contractBreakdownPage.searchAndSelectDiversifiedContract();
});

Then('the total contract value component displays the accumulated value', async function () {
  const isValueVisible = await contractBreakdownPage.isTotalValueComponentVisible();
  expect(isValueVisible).toBeTruthy();
  totalValueDisplayed = await contractBreakdownPage.getTotalContractValue();
  expect(totalValueDisplayed).toBeGreaterThan(0);
});

When('the user clicks on the total value component to expand the breakdown', async function () {
  await contractBreakdownPage.clickTotalValueComponent();
});

Then('the breakdown popup displays all investment categories with their values', async function () {
  const isPopupVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
  
  const categories = await contractBreakdownPage.getAllCategoryNames();
  const expectedCategories = [
    'Poder de compra MXN',
    'Efectivo MXN',
    'Efectivo USD',
    'Pendientes por liquidar',
    'Fondos',
    'Cedes y pagarés',
    'Mercado de dinero',
    'Mercado de capitales'
  ];
  
  for (const category of expectedCategories) {
    expect(categories).toContain(category);
  }
});

Then('each category displays a positive value with correct currency format', async function () {
  categoryValues = await contractBreakdownPage.getAllCategoryValues();
  
  for (const [category, value] of Object.entries(categoryValues)) {
    expect(value.rawValue).toBeGreaterThan(0);
    expect(value.formattedValue).toMatch(/^\$[\d,]+\.\d{2}$/);
  }
});

Then('the sum of all category values matches the total value displayed', async function () {
  const sumOfCategories = await contractBreakdownPage.calculateSumOfCategories();
  const tolerance = 0.01;
  expect(Math.abs(sumOfCategories - totalValueDisplayed)).toBeLessThanOrEqual(tolerance);
});