const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePopupPage = require('../pages/ContractValuePopupPage');

let contractValuePopupPage;

Given('the user is authenticated in the system', async function () {
  contractValuePopupPage = new ContractValuePopupPage(this.page);
  await contractValuePopupPage.navigateToApplication();
  await contractValuePopupPage.verifyUserIsAuthenticated();
});

Given('a contract with value data is selected', async function () {
  await contractValuePopupPage.selectContractWithValueData();
});

When('the user clicks on the total contract value component', async function () {
  await contractValuePopupPage.clickTotalContractValueComponent();
});

Then('the breakdown popup is displayed correctly', async function () {
  const isPopupVisible = await contractValuePopupPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBe(true);
});

Then('the popup design matches the Look and Feel specifications from Figma', async function () {
  const hasCorrectLayout = await contractValuePopupPage.verifyPopupLayoutStructure();
  expect(hasCorrectLayout).toBe(true);
  
  const hasCorrectTypography = await contractValuePopupPage.verifyPopupTypography();
  expect(hasCorrectTypography).toBe(true);
  
  const hasCorrectColors = await contractValuePopupPage.verifyPopupColorScheme();
  expect(hasCorrectColors).toBe(true);
});

Then('the popup elements like titles, monetary values and visual structure are consistent with the approved design', async function () {
  const hasTitleElement = await contractValuePopupPage.verifyPopupTitleExists();
  expect(hasTitleElement).toBe(true);
  
  const hasMonetaryValues = await contractValuePopupPage.verifyMonetaryValuesDisplayed();
  expect(hasMonetaryValues).toBe(true);
  
  const hasCorrectStructure = await contractValuePopupPage.verifyVisualStructureElements();
  expect(hasCorrectStructure).toBe(true);
});

Then('the popup maintains visual consistency with other Acticenter popup components', async function () {
  const hasConsistentBorderRadius = await contractValuePopupPage.verifyPopupBorderRadius();
  expect(hasConsistentBorderRadius).toBe(true);
  
  const hasConsistentShadow = await contractValuePopupPage.verifyPopupBoxShadow();
  expect(hasConsistentShadow).toBe(true);
  
  const hasConsistentSpacing = await contractValuePopupPage.verifyPopupSpacing();
  expect(hasConsistentSpacing).toBe(true);
});