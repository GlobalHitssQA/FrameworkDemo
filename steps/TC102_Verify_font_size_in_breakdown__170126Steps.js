const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const BreakdownPage = require('../pages/BreakdownPage');

let breakdownPage;

Given('the user is authenticated in Acticenter', async function () {
  breakdownPage = new BreakdownPage(this.page);
  await breakdownPage.navigateToActicenter();
  await breakdownPage.waitForAuthentication();
});

Given('a contract with multiple breakdown items exists', async function () {
  await breakdownPage.verifyContractWithMultipleItemsExists();
});

When('the user navigates to the contract value and composition component', async function () {
  await breakdownPage.navigateToContractValueComponent();
  const isVisible = await breakdownPage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the component to display the breakdown popup', async function () {
  await breakdownPage.clickContractValueComponent();
  await breakdownPage.waitForBreakdownPopup();
});

Then('the breakdown popup should display all expected items', async function () {
  const expectedItems = [
    'Poder de compra MXN',
    'Efectivo MXN',
    'Efectivo USD',
    'Pendientes por liquidar',
    'Fondos de deuda',
    'Fondos de cobertura',
    'Fondos de renta variable',
    'Cedes y pagarés',
    'Mercado de dinero',
    'Mercado de capitales'
  ];
  const displayedItems = await breakdownPage.getBreakdownItemTitles();
  for (const item of expectedItems) {
    expect(displayedItems).toContain(item);
  }
});

Then('the font size of each breakdown item title should match the Look and Feel specifications', async function () {
  const expectedFontSize = '14px';
  const fontSizes = await breakdownPage.getBreakdownItemTitleFontSizes();
  for (const fontSize of fontSizes) {
    expect(fontSize).toBe(expectedFontSize);
  }
});