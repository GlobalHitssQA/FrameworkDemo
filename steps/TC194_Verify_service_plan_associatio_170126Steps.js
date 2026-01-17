const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const DatabasePage = require('../pages/DatabasePage');

let databasePage;

Given('the user is connected to BSCS7 database', async function () {
  databasePage = new DatabasePage(this.page);
  await databasePage.navigateToDatabaseConsole();
  await databasePage.connectToDatabase('BSCS7');
});

When('the user queries TIM.PCP_SERVICIOS_PLANES table filtered by GM product', async function () {
  await databasePage.executeQuery('SELECT * FROM TIM.PCP_SERVICIOS_PLANES WHERE PRODUCTO = \'GM\'');
});

Then('the table displays columns CCO_PRCO, CO_SER, SPCODE, VERSION, ESTADO, FECHA_IN_VIG, CARGO_FIJO and USUARIO', async function () {
  const columns = await databasePage.getTableColumns();
  expect(columns).toContain('CCO_PRCO');
  expect(columns).toContain('CO_SER');
  expect(columns).toContain('SPCODE');
  expect(columns).toContain('VERSION');
  expect(columns).toContain('ESTADO');
  expect(columns).toContain('FECHA_IN_VIG');
  expect(columns).toContain('CARGO_FIJO');
  expect(columns).toContain('USUARIO');
});

Then('the MANUFACTURE plan has 3 associated services for VOZ 10min, SMS 10 and DATA 100MB', async function () {
  const services = await databasePage.getServicesByPlan('MANUFACTURE');
  expect(services.length).toBe(3);
  const hasVoz = await databasePage.validateServiceExists(services, 'VOZ', 10);
  const hasSms = await databasePage.validateServiceExists(services, 'SMS', 10);
  const hasData = await databasePage.validateServiceExists(services, 'DATOS', 100);
  expect(hasVoz).toBeTruthy();
  expect(hasSms).toBeTruthy();
  expect(hasData).toBeTruthy();
});

Then('the UNSOLD SHOWROOM plan has 3 associated services for VOZ 100min, SMS 100 and DATA 2GB', async function () {
  const services = await databasePage.getServicesByPlan('UNSOLD SHOWROOM');
  expect(services.length).toBe(3);
  const hasVoz = await databasePage.validateServiceExists(services, 'VOZ', 100);
  const hasSms = await databasePage.validateServiceExists(services, 'SMS', 100);
  const hasData = await databasePage.validateServiceExists(services, 'DATOS', 2048);
  expect(hasVoz).toBeTruthy();
  expect(hasSms).toBeTruthy();
  expect(hasData).toBeTruthy();
});

Then('the TESTING and DORMANT plans have only bulk rate services without free units', async function () {
  const testingServices = await databasePage.getServicesByPlan('TESTING');
  const dormantServices = await databasePage.getServicesByPlan('DORMANT');
  const testingHasFreeUnits = await databasePage.planHasFreeUnits(testingServices);
  const dormantHasFreeUnits = await databasePage.planHasFreeUnits(dormantServices);
  expect(testingHasFreeUnits).toBeFalsy();
  expect(dormantHasFreeUnits).toBeFalsy();
});

Then('the SOLD plan has In Pool 10MB service configured for telemetry on APN1 and APN4', async function () {
  const soldServices = await databasePage.getServicesByPlan('SOLD');
  const hasInPoolService = await databasePage.validateInPoolService(soldServices, 10, ['APN1', 'APN4']);
  expect(hasInPoolService).toBeTruthy();
});

Then('the PURGED plan has no active services associated', async function () {
  const purgedServices = await databasePage.getActiveServicesByPlan('PURGED');
  expect(purgedServices.length).toBe(0);
});