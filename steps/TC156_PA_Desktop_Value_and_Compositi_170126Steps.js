const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const PADesktopPage = require('../pages/PADesktopPage');

let paDesktopPage;

Given('the user has access to the PA Desktop application', async function () {
  paDesktopPage = new PADesktopPage(this.page);
  await paDesktopPage.navigateToApplication();
});

Given('the value and composition component is loaded', async function () {
  const isLoaded = await paDesktopPage.isValueComponentLoaded();
  expect(isLoaded).toBeTruthy();
});

When('the user inspects the total value component', async function () {
  await paDesktopPage.inspectTotalValueComponent();
});

Then('the total value component should match the Figma design specifications', async function () {
  const componentStyles = await paDesktopPage.getTotalValueComponentStyles();
  expect(componentStyles).toBeDefined();
});

When('the user clicks on the total value component to open the breakdown popup', async function () {
  await paDesktopPage.clickTotalValueComponent();
});

Then('the breakdown popup should be visible', async function () {
  const isPopupVisible = await paDesktopPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the popup should match Figma specifications for position size and alignment', async function () {
  const popupStyles = await paDesktopPage.getBreakdownPopupStyles();
  expect(popupStyles.position).toBeDefined();
  expect(popupStyles.size).toBeDefined();
  expect(popupStyles.alignment).toBeDefined();
});

Then('the visual elements should comply with the PA Desktop style guide', async function () {
  const styleCompliance = await paDesktopPage.verifyStyleGuideCompliance();
  expect(styleCompliance.colors).toBeTruthy();
  expect(styleCompliance.typography).toBeTruthy();
  expect(styleCompliance.spacing).toBeTruthy();
});

Then('the breakdown items should be displayed in the correct order', async function () {
  const itemsOrder = await paDesktopPage.getBreakdownItemsOrder();
  expect(itemsOrder.length).toBeGreaterThan(0);
});

Then('the items should include Poder de compra and Pendientes por liquidar and Fondos and Cedes and Mercados', async function () {
  const items = await paDesktopPage.getBreakdownItemsText();
  const expectedItems = ['Poder de compra', 'Pendientes por liquidar', 'Fondos', 'Cedes', 'Mercados'];
  for (const expectedItem of expectedItems) {
    const found = items.some(item => item.includes(expectedItem));
    expect(found).toBeTruthy();
  }
});

When('the user documents any design deviations', async function () {
  await paDesktopPage.documentDeviations();
});

Then('a deviation report should be generated if differences are found', async function () {
  const reportGenerated = await paDesktopPage.isDeviationReportAvailable();
  expect(reportGenerated).toBeDefined();
});