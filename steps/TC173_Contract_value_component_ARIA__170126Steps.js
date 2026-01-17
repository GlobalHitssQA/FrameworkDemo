const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with an active contract', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToContractView();
  await contractValuePage.waitForComponentToLoad();
});

When('the user inspects the contract value and composition component', async function () {
  await contractValuePage.locateContractValueComponent();
});

Then('the component source code should be accessible via browser developer tools', async function () {
  const isComponentPresent = await contractValuePage.isContractValueComponentVisible();
  expect(isComponentPresent).toBe(true);
});

Then('the dropdown button should have a descriptive aria-label or aria-labelledby attribute', async function () {
  const hasAriaLabel = await contractValuePage.hasDropdownButtonAriaLabel();
  const hasAriaLabelledBy = await contractValuePage.hasDropdownButtonAriaLabelledBy();
  expect(hasAriaLabel || hasAriaLabelledBy).toBe(true);
  
  if (hasAriaLabel) {
    const ariaLabelText = await contractValuePage.getDropdownButtonAriaLabel();
    expect(ariaLabelText.length).toBeGreaterThan(0);
  }
});

Then('the breakdown popup should have role dialog and aria-modal true attributes', async function () {
  await contractValuePage.openBreakdownPopup();
  
  const hasDialogRole = await contractValuePage.hasPopupDialogRole();
  expect(hasDialogRole).toBe(true);
  
  const hasAriaModal = await contractValuePage.hasPopupAriaModalTrue();
  expect(hasAriaModal).toBe(true);
});

Then('each breakdown item should have aria-describedby linking to its monetary value', async function () {
  const allItemsHaveAriaDescribedBy = await contractValuePage.allBreakdownItemsHaveAriaDescribedBy();
  expect(allItemsHaveAriaDescribedBy).toBe(true);
});

Then('the popup close button should have a descriptive aria-label', async function () {
  const hasCloseButtonAriaLabel = await contractValuePage.hasCloseButtonAriaLabel();
  expect(hasCloseButtonAriaLabel).toBe(true);
  
  const closeButtonAriaLabel = await contractValuePage.getCloseButtonAriaLabel();
  expect(closeButtonAriaLabel.length).toBeGreaterThan(0);
  
  await contractValuePage.closeBreakdownPopup();
});