const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValuePage = require('../pages/ContractValuePage');

let contractValuePage;

Given('the user is authenticated in the system', async function () {
  contractValuePage = new ContractValuePage(this.page);
  await contractValuePage.navigateToApplication();
  await contractValuePage.performAuthentication();
});

Given('a contract is selected', async function () {
  await contractValuePage.selectContract();
});

When('the user accesses the contract value and composition component', async function () {
  await contractValuePage.accessContractValueComponent();
});

Then('the component should be displayed correctly on the screen', async function () {
  const isVisible = await contractValuePage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

Then('the general design should match the Look and Feel specifications', async function () {
  const hasCorrectStructure = await contractValuePage.verifyComponentStructure();
  expect(hasCorrectStructure).toBeTruthy();
  
  const hasCorrectStyling = await contractValuePage.verifyComponentStyling();
  expect(hasCorrectStyling).toBeTruthy();
});

Then('the visual elements like buttons and icons should align with the approved design', async function () {
  const buttonsVisible = await contractValuePage.areButtonsVisible();
  expect(buttonsVisible).toBeTruthy();
  
  const iconsVisible = await contractValuePage.areIconsVisible();
  expect(iconsVisible).toBeTruthy();
  
  const elementsAligned = await contractValuePage.verifyElementsAlignment();
  expect(elementsAligned).toBeTruthy();
});

Then('the component should maintain visual consistency with other Acticenter components', async function () {
  const hasConsistentFonts = await contractValuePage.verifyFontConsistency();
  expect(hasConsistentFonts).toBeTruthy();
  
  const hasConsistentColors = await contractValuePage.verifyColorConsistency();
  expect(hasConsistentColors).toBeTruthy();
  
  const hasConsistentSpacing = await contractValuePage.verifySpacingConsistency();
  expect(hasConsistentSpacing).toBeTruthy();
});