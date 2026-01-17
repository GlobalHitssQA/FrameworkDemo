const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('a Wealth Management user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.loginAsWealthManagementUser();
  const isMainInterfaceVisible = await contractValuePage.isMainInterfaceVisible();
  expect(isMainInterfaceVisible).toBeTruthy();
});

When('the user selects an active Wealth Management contract', async function () {
  await contractValuePage.searchAndSelectActiveContract();
});

Then('the value and composition component is displayed in Responsive Landscape view', async function () {
  await contractValuePage.setResponsiveLandscapeView();
  const isComponentVisible = await contractValuePage.isValueCompositionComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

Then('the component shows the total contract value with correct monetary format', async function () {
  const totalValue = await contractValuePage.getTotalContractValue();
  const hasCorrectFormat = contractValuePage.validateMonetaryFormat(totalValue);
  expect(hasCorrectFormat).toBeTruthy();
});

When('the user clicks on the total value component', async function () {
  await contractValuePage.clickTotalValueComponent();
});

Then('a popup with the complete contract value breakdown is displayed', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('all applicable items show their corresponding monetary values on the right side', async function () {
  const itemsWithValues = await contractValuePage.getAllBreakdownItemsWithValues();
  expect(itemsWithValues.length).toBeGreaterThan(0);
  for (const item of itemsWithValues) {
    expect(item.hasValueOnRight).toBeTruthy();
  }
});

Then('items without balance show zero value', async function () {
  const zeroBalanceItems = await contractValuePage.getZeroBalanceItems();
  for (const item of zeroBalanceItems) {
    expect(item.value).toMatch(/\$0\.00/);
  }
});

When('the user clicks outside the expanded component', async function () {
  await contractValuePage.clickOutsidePopup();
});

Then('the breakdown popup closes correctly', async function () {
  const isPopupClosed = await contractValuePage.isBreakdownPopupClosed();
  expect(isPopupClosed).toBeTruthy();
});