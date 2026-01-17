const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in Acticenter with an active contract', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToContractView();
  await contractValuePage.waitForComponentToLoad();
});

When('the user inspects the main contract value component', async function () {
  const isVisible = await contractValuePage.isMainComponentVisible();
  expect(isVisible).toBeTruthy();
});

Then('the main container should have role region with appropriate aria-label', async function () {
  const hasRegionRole = await contractValuePage.hasRegionRoleOnMainContainer();
  expect(hasRegionRole).toBeTruthy();
  
  const ariaLabel = await contractValuePage.getMainContainerAriaLabel();
  expect(ariaLabel).toContain('Valor');
  expect(ariaLabel).toContain('contrato');
});

Then('the breakdown list should have role list with each item having role listitem', async function () {
  const hasListRole = await contractValuePage.hasListRoleOnBreakdownContainer();
  expect(hasListRole).toBeTruthy();
  
  const allItemsHaveListitemRole = await contractValuePage.allBreakdownItemsHaveListitemRole();
  expect(allItemsHaveListitemRole).toBeTruthy();
});

Then('the monetary values should have appropriate semantic roles', async function () {
  const monetaryValuesAccessible = await contractValuePage.areMonetaryValuesAccessible();
  expect(monetaryValuesAccessible).toBeTruthy();
});

Then('there should be no redundant or conflicting ARIA roles with native HTML elements', async function () {
  const hasConflicts = await contractValuePage.hasRedundantOrConflictingAriaRoles();
  expect(hasConflicts).toBeFalsy();
});