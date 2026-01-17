const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const FreeUnitsDefinitionPage = require('../pages/FreeUnitsDefinitionPage');

let freeUnitsPage;
let queryResults;

Given('I am connected to the BSCS7 database with read access', async function () {
  freeUnitsPage = new FreeUnitsDefinitionPage(this.page);
  await freeUnitsPage.navigateToDatabaseConsole();
  await freeUnitsPage.connectToDatabase('BSCS7');
});

When('I query the SYSADM.FUP_ELEMENT_DEFINITION table for GM packages', async function () {
  queryResults = await freeUnitsPage.queryFupElementDefinition();
});

Then('I should see the table with required fields FU_PACK_ID, FUP_VERSION, FUP_ELEMENT, VALID_FROM, FREE_UNITS_TYPE, COUNTING_TYPE, CURRENCY, FU_INTERVAL_LENGTH and GRANULARITY_TYPE', async function () {
  const columns = await freeUnitsPage.getTableColumns();
  expect(columns).toContain('FU_PACK_ID');
  expect(columns).toContain('FUP_VERSION');
  expect(columns).toContain('FUP_ELEMENT');
  expect(columns).toContain('VALID_FROM');
  expect(columns).toContain('FREE_UNITS_TYPE');
  expect(columns).toContain('COUNTING_TYPE');
  expect(columns).toContain('CURRENCY');
  expect(columns).toContain('FU_INTERVAL_LENGTH');
  expect(columns).toContain('GRANULARITY_TYPE');
});

Then('the VOZ element for MANUFACTURE should have quantity {int} with unit minutes', async function (expectedQuantity) {
  const vozElement = await freeUnitsPage.getElementByPackageAndType('MANUFACTURE', 'VOZ');
  expect(vozElement.quantity).toBe(expectedQuantity);
  expect(vozElement.unit).toBe('minutes');
});

Then('the SMS element for MANUFACTURE should have quantity {int} with unit message', async function (expectedQuantity) {
  const smsElement = await freeUnitsPage.getElementByPackageAndType('MANUFACTURE', 'SMS');
  expect(smsElement.quantity).toBe(expectedQuantity);
  expect(smsElement.unit).toBe('message');
});

Then('the DATOS element for MANUFACTURE should have quantity {int} with unit MB', async function (expectedQuantity) {
  const datosElement = await freeUnitsPage.getElementByPackageAndType('MANUFACTURE', 'DATOS');
  expect(datosElement.quantity).toBe(expectedQuantity);
  expect(datosElement.unit).toBe('MB');
});

Then('the UNSOLD SHOWROOM package should have VOZ with {int} minutes', async function (expectedQuantity) {
  const vozElement = await freeUnitsPage.getElementByPackageAndType('UNSOLD SHOWROOM', 'VOZ');
  expect(vozElement.quantity).toBe(expectedQuantity);
  expect(vozElement.unit).toBe('minutes');
});

Then('the UNSOLD SHOWROOM package should have SMS with {int} messages', async function (expectedQuantity) {
  const smsElement = await freeUnitsPage.getElementByPackageAndType('UNSOLD SHOWROOM', 'SMS');
  expect(smsElement.quantity).toBe(expectedQuantity);
  expect(smsElement.unit).toBe('message');
});

Then('the UNSOLD SHOWROOM package should have DATOS with {int} GB', async function (expectedQuantity) {
  const datosElement = await freeUnitsPage.getElementByPackageAndType('UNSOLD SHOWROOM', 'DATOS');
  expect(datosElement.quantity).toBe(expectedQuantity);
  expect(datosElement.unit).toBe('GB');
});

Then('the FU_INTERVAL_LENGTH field should indicate monthly renewal cycle for all packages', async function () {
  const allPackages = await freeUnitsPage.getAllPackageIntervalLengths();
  for (const pkg of allPackages) {
    expect(await freeUnitsPage.isMonthlyInterval(pkg.intervalLength)).toBe(true);
  }
});