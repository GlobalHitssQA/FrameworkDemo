const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const InPoolTrafficPage = require('../pages/InPoolTrafficPage');

let inPoolTrafficPage;

Given('50 lines are provisioned in SOLD plan with APN1 configured for telemetry', async function() {
  inPoolTrafficPage = new InPoolTrafficPage(this.page);
  await inPoolTrafficPage.navigateToProvisioningSection();
  await inPoolTrafficPage.provisionLinesInSoldPlan(50, 'onstarsa');
  const provisionedCount = await inPoolTrafficPage.getProvisionedLinesCount();
  expect(provisionedCount).toBe(50);
  const apnStatus = await inPoolTrafficPage.verifyApnConfiguration('APN1');
  expect(apnStatus).toBe(true);
  const packageAssigned = await inPoolTrafficPage.verifyInPoolPackageAssigned();
  expect(packageAssigned).toBe(true);
});

Given('the In Pool bag is calculated as 500 MB for the group', async function() {
  await inPoolTrafficPage.navigateToInPoolConfiguration();
  const totalBag = await inPoolTrafficPage.calculateTotalInPoolBag();
  expect(totalBag).toBe(500);
});

When('400 MB of telemetry traffic is generated through APN1 distributed among the 50 lines', async function() {
  await inPoolTrafficPage.navigateToTrafficGeneration();
  await inPoolTrafficPage.generateTelemetryTraffic(400, 'APN1');
  const registeredTraffic = await inPoolTrafficPage.getRegisteredTrafficInUdrTable();
  expect(registeredTraffic).toBe(400);
});

When('the In Pool calculation Shell is executed before pre-billing', async function() {
  await inPoolTrafficPage.navigateToShellExecution();
  await inPoolTrafficPage.executeInPoolCalculationShell();
  const consumptionStatus = await inPoolTrafficPage.getConsumptionStatus();
  expect(consumptionStatus).toBe('within_bag');
});

Then('the system generates the OCC "Servicio In Pool" with amount S\/. 65.00', async function() {
  await inPoolTrafficPage.navigateToOccSection();
  const occGenerated = await inPoolTrafficPage.verifyOccServicioInPoolGenerated();
  expect(occGenerated).toBe(true);
  const occAmount = await inPoolTrafficPage.getOccServicioInPoolAmount();
  expect(occAmount).toBe('S/. 65.00');
});

Then('the system does not generate the OCC "Servicio In Pool Granel" because there is no excess', async function() {
  const occGranelGenerated = await inPoolTrafficPage.verifyOccServicioInPoolGranelNotGenerated();
  expect(occGranelGenerated).toBe(false);
});