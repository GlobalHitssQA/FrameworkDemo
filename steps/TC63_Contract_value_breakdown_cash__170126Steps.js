const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.waitForAuthentication();
});

When('the user selects a Bank contract', async function () {
  await contractValuePage.selectBankContract();
});

Then('the system displays the operation screen with the total contract value component', async function () {
  const isVisible = await contractValuePage.isTotalContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePage.clickTotalContractValueComponent();
});

Then('the system displays a popup with the contract value breakdown', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

When('the user locates the Efectivo MXN item in the breakdown list', async function () {
  await contractValuePage.locateEfectivoMXNItem();
});

Then('the item is displayed with the name Efectivo MXN', async function () {
  const itemName = await contractValuePage.getEfectivoMXNItemName();
  expect(itemName).toBe('Efectivo MXN');
});

Then('the Efectivo MXN item name complies with the typography size and format specified in the Look and Feel', async function () {
  const stylesCompliant = await contractValuePage.verifyEfectivoMXNItemStyles();
  expect(stylesCompliant).toBeTruthy();
});