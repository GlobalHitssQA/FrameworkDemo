const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractValueComponentPage = require('../pages/ContractValueComponentPage');

let contractValuePage;
let discrepancies = [];

Given('the user is authenticated in the system', async function () {
  contractValuePage = new ContractValueComponentPage(this.page);
  await contractValuePage.navigateToLogin();
  await contractValuePage.performLogin();
});

Given('a contract is selected', async function () {
  await contractValuePage.selectContract();
});

When('the user opens the contract value and composition component in Acticenter', async function () {
  await contractValuePage.openContractValueComponent();
});

Then('the component should be displayed correctly', async function () {
  const isVisible = await contractValuePage.isComponentVisible();
  expect(isVisible).toBe(true);
});

When('the user inspects the text colors in the component', async function () {
  this.textColors = await contractValuePage.getTextColors();
});

Then('the text colors should match Figma specifications', async function () {
  const expectedColors = contractValuePage.getFigmaTextColors();
  const colorDiscrepancies = contractValuePage.compareColors(this.textColors, expectedColors, 'text');
  discrepancies.push(...colorDiscrepancies);
});

When('the user inspects the background colors in the component', async function () {
  this.backgroundColors = await contractValuePage.getBackgroundColors();
});

Then('the background colors should match Figma specifications', async function () {
  const expectedColors = contractValuePage.getFigmaBackgroundColors();
  const colorDiscrepancies = contractValuePage.compareColors(this.backgroundColors, expectedColors, 'background');
  discrepancies.push(...colorDiscrepancies);
});

When('the user inspects the border and icon colors in the component', async function () {
  this.borderIconColors = await contractValuePage.getBorderAndIconColors();
});

Then('the border and icon colors should match Figma specifications', async function () {
  const expectedColors = contractValuePage.getFigmaBorderIconColors();
  const colorDiscrepancies = contractValuePage.compareColors(this.borderIconColors, expectedColors, 'border-icon');
  discrepancies.push(...colorDiscrepancies);
});

When('the user inspects the typography properties in the component', async function () {
  this.typographyProperties = await contractValuePage.getTypographyProperties();
});

Then('the font family should match Figma specifications', async function () {
  const expectedFontFamily = contractValuePage.getFigmaFontFamily();
  const fontDiscrepancies = contractValuePage.compareFontFamily(this.typographyProperties, expectedFontFamily);
  discrepancies.push(...fontDiscrepancies);
});

Then('the font sizes should match Figma specifications', async function () {
  const expectedFontSizes = contractValuePage.getFigmaFontSizes();
  const sizeDiscrepancies = contractValuePage.compareFontSizes(this.typographyProperties, expectedFontSizes);
  discrepancies.push(...sizeDiscrepancies);
});

Then('the font weights should match Figma specifications', async function () {
  const expectedFontWeights = contractValuePage.getFigmaFontWeights();
  const weightDiscrepancies = contractValuePage.compareFontWeights(this.typographyProperties, expectedFontWeights);
  discrepancies.push(...weightDiscrepancies);
});

Then('the font styles should match Figma specifications', async function () {
  const expectedFontStyles = contractValuePage.getFigmaFontStyles();
  const styleDiscrepancies = contractValuePage.compareFontStyles(this.typographyProperties, expectedFontStyles);
  discrepancies.push(...styleDiscrepancies);
});

When('the user documents any discrepancies found', async function () {
  await contractValuePage.documentDiscrepancies(discrepancies);
});

Then('all differences should be properly recorded', async function () {
  const isDocumented = await contractValuePage.verifyDiscrepanciesDocumented(discrepancies);
  expect(isDocumented).toBe(true);
});