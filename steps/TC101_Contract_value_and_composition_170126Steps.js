const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractComponentPage = require('../pages/ContractComponentPage');

let contractPage;

Given('the user is authenticated in Acticenter as an authorized advisor or banker', async function () {
  contractPage = new ContractComponentPage(this.page);
  await contractPage.navigateToActicenter();
  await contractPage.loginAsAuthorizedUser();
  const isMainScreenVisible = await contractPage.isMainScreenDisplayed();
  expect(isMainScreenVisible).toBeTruthy();
});

When('the user selects an active contract for Individual or Legal Entity', async function () {
  await contractPage.selectActiveContract();
});

Then('the system displays the contract value and composition component', async function () {
  const isComponentVisible = await contractPage.isContractValueComponentVisible();
  expect(isComponentVisible).toBeTruthy();
});

When('the user inspects the typography font of the component title and monetary values', async function () {
  this.titleFontFamily = await contractPage.getComponentTitleFontFamily();
  this.valuesFontFamily = await contractPage.getMonetaryValuesFontFamily();
});

Then('the typography font complies with the Look and Feel specifications', async function () {
  const expectedFontFamily = contractPage.getExpectedFontFamily();
  expect(this.titleFontFamily).toContain(expectedFontFamily);
  expect(this.valuesFontFamily).toContain(expectedFontFamily);
});

When('the user clicks on the component to open the breakdown popup', async function () {
  await contractPage.clickContractValueComponent();
});

Then('the popup displays showing the breakdown of items', async function () {
  const isPopupVisible = await contractPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('all item texts and monetary values use the specified typography font', async function () {
  const itemFonts = await contractPage.getAllBreakdownItemsFontFamilies();
  const expectedFontFamily = contractPage.getExpectedFontFamily();
  for (const fontFamily of itemFonts) {
    expect(fontFamily).toContain(expectedFontFamily);
  }
});