const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated as a Private Banking user in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.loginAsPrivateBankingUser();
  const isMainInterfaceVisible = await contractValuePage.isMainInterfaceDisplayed();
  expect(isMainInterfaceVisible).toBe(true);
});

When('the user selects an active Individual Person contract', async function () {
  await contractValuePage.selectIndividualPersonContract();
});

Then('the value and composition component is displayed in Responsive Landscape view', async function () {
  const isComponentVisible = await contractValuePage.isValueCompositionComponentVisible();
  expect(isComponentVisible).toBe(true);
});

Then('the component shows the total contract value with correct monetary format', async function () {
  const totalValue = await contractValuePage.getTotalContractValue();
  const hasValidMonetaryFormat = await contractValuePage.hasValidMonetaryFormat(totalValue);
  expect(hasValidMonetaryFormat).toBe(true);
});

When('the user clicks on the total value component', async function () {
  await contractValuePage.clickTotalValueComponent();
});

Then('a popup is displayed with the complete breakdown including all categories', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
  const categories = await contractValuePage.getBreakdownCategories();
  expect(categories).toContain('Efectivo MXN');
  expect(categories).toContain('Pendientes por liquidar');
  expect(categories).toContain('Fondos de deuda');
  expect(categories).toContain('Fondos de cobertura');
  expect(categories).toContain('Fondos de renta variable');
  expect(categories).toContain('Efectivo en tránsito');
  expect(categories).toContain('Cedes y pagarés');
  expect(categories).toContain('Mercado de dinero');
  expect(categories).toContain('Mercado de capitales');
});

Then('the breakdown list is vertically aligned with the main component', async function () {
  const isAligned = await contractValuePage.isBreakdownVerticallyAligned();
  expect(isAligned).toBe(true);
});

When('the user clicks outside the expanded component', async function () {
  await contractValuePage.clickOutsidePopup();
});

Then('the popup closes and returns to normal view', async function () {
  const isPopupHidden = await contractValuePage.isBreakdownPopupHidden();
  expect(isPopupHidden).toBe(true);
});