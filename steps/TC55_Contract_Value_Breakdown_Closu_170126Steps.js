const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with a valid contract selected', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToActicenter();
  await contractValuePage.waitForAuthentication();
  await contractValuePage.selectValidContract();
});

Given('the device is configured in Responsive Portrait resolution', async function () {
  await contractValuePage.setResponsivePortraitViewport();
});

When('the user clicks on the total contract value component to display the breakdown', async function () {
  await contractValuePage.clickTotalValueComponent();
});

Then('the system displays the popup with the total contract value breakdown', async function () {
  const isPopupVisible = await contractValuePage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

When('the user clicks outside the breakdown popup', async function () {
  await contractValuePage.clickOutsidePopup();
});

Then('the breakdown popup closes and only the total contract value component is displayed', async function () {
  const isPopupHidden = await contractValuePage.isBreakdownPopupHidden();
  const isTotalValueVisible = await contractValuePage.isTotalValueComponentVisible();
  expect(isPopupHidden).toBe(true);
  expect(isTotalValueVisible).toBe(true);
});