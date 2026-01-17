const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const RatePlanManufacturePage = require('../pages/RatePlanManufacturePage');

let ratePlanPage;

Given('I am logged into the BSCS7 system with query permissions', async function () {
  ratePlanPage = new RatePlanManufacturePage(this.page);
  await ratePlanPage.navigateToSystem();
  await ratePlanPage.login();
});

When('I access the Rate Plan MANUFACTURE configuration', async function () {
  await ratePlanPage.openRatePlanConfiguration('MANUFACTURE');
});

Then('the Rate Plan MANUFACTURE should be configured and homologated with current RP1', async function () {
  const isHomologated = await ratePlanPage.verifyRatePlanHomologation('MANUFACTURE', 'RP1');
  expect(isHomologated).toBe(true);
});

Then('the Free Units table should display {int} minutes VOZ with monthly renewal', async function (minutes) {
  const vozConfig = await ratePlanPage.getFreeUnitConfiguration('VOZ');
  expect(vozConfig.quantity).toBe(minutes);
  expect(vozConfig.renewal).toBe('monthly');
});

Then('the Free Units table should display {int} SMS with monthly renewal', async function (smsCount) {
  const smsConfig = await ratePlanPage.getFreeUnitConfiguration('SMS');
  expect(smsConfig.quantity).toBe(smsCount);
  expect(smsConfig.renewal).toBe('monthly');
});

Then('the Free Units table should display {int} MB data with monthly renewal', async function (mbCount) {
  const dataConfig = await ratePlanPage.getFreeUnitConfiguration('DATA');
  expect(dataConfig.quantity).toBe(mbCount);
  expect(dataConfig.renewal).toBe('monthly');
});

When('I verify the assigned APNs for Rate Plan MANUFACTURE', async function () {
  await ratePlanPage.openApnConfiguration();
});

Then('the system should show APN1 APN2 APN3 APN4 APN5 APN6 and APN7 associated', async function () {
  const expectedApns = ['APN1', 'APN2', 'APN3', 'APN4', 'APN5', 'APN6', 'APN7'];
  const associatedApns = await ratePlanPage.getAssociatedApns();
  for (const apn of expectedApns) {
    expect(associatedApns).toContain(apn);
  }
});

Then('APN3 should be configured with zero tariff for eSIM profile download', async function () {
  const apnTariff = await ratePlanPage.getApnTariff('APN3');
  expect(apnTariff).toBe(0);
  const allowsEsim = await ratePlanPage.verifyEsimDownloadAllowed('APN3');
  expect(allowsEsim).toBe(true);
});

Then('APN7 should be configured with zero tariff for eSIM profile download', async function () {
  const apnTariff = await ratePlanPage.getApnTariff('APN7');
  expect(apnTariff).toBe(0);
  const allowsEsim = await ratePlanPage.verifyEsimDownloadAllowed('APN7');
  expect(allowsEsim).toBe(true);
});

When('I check the excess consumption tariffs configuration', async function () {
  await ratePlanPage.openExcessTariffsSection();
});

Then('VOZ excess tariff should be configured at {float} soles per minute without IGV', async function (rate) {
  const vozTariff = await ratePlanPage.getExcessTariff('VOZ');
  expect(vozTariff.rate).toBe(rate);
  expect(vozTariff.includesIgv).toBe(false);
});

Then('SMS excess tariff should be configured at {float} soles per message without IGV', async function (rate) {
  const smsTariff = await ratePlanPage.getExcessTariff('SMS');
  expect(smsTariff.rate).toBe(rate);
  expect(smsTariff.includesIgv).toBe(false);
});

Then('DATA excess tariff should be configured at {float} soles per MB without IGV', async function (rate) {
  const dataTariff = await ratePlanPage.getExcessTariff('DATA');
  expect(dataTariff.rate).toBe(rate);
  expect(dataTariff.includesIgv).toBe(false);
});