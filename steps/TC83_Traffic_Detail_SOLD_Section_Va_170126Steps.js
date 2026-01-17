const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const TrafficDetailSOLDPage = require('../pages/TrafficDetailSOLDPage');

let trafficDetailPage;

Given('the user has access to the billing system', async function () {
  trafficDetailPage = new TrafficDetailSOLDPage(this.page);
  await trafficDetailPage.navigateToBillingSystem();
});

Given('the user is on the General Motors consolidated invoice for the current cycle', async function () {
  await trafficDetailPage.openGeneralMotorsInvoice();
  const isInvoiceDisplayed = await trafficDetailPage.isInvoiceFullyLoaded();
  expect(isInvoiceDisplayed).toBeTruthy();
});

When('the user navigates to the Traffic Detail SOLD section', async function () {
  await trafficDetailPage.navigateToTrafficDetailSOLDSection();
});

Then('the Traffic Detail SOLD section should be displayed', async function () {
  const isSectionVisible = await trafficDetailPage.isTrafficDetailSOLDSectionVisible();
  expect(isSectionVisible).toBeTruthy();
});

Then('only APN1 Onstarsa and APN4 Onstar01v6 should be listed', async function () {
  const apnList = await trafficDetailPage.getDisplayedAPNs();
  expect(apnList).toContain('APN1');
  expect(apnList).toContain('Onstarsa');
  expect(apnList).toContain('APN4');
  expect(apnList).toContain('Onstar01.v6');
});

Then('the MB volume consumed should be displayed for each telemetry APN', async function () {
  const apn1Volume = await trafficDetailPage.getAPNVolume('APN1');
  const apn4Volume = await trafficDetailPage.getAPNVolume('APN4');
  expect(apn1Volume).not.toBeNull();
  expect(apn4Volume).not.toBeNull();
  expect(parseFloat(apn1Volume)).toBeGreaterThanOrEqual(0);
  expect(parseFloat(apn4Volume)).toBeGreaterThanOrEqual(0);
});

Then('APN2 APN5 and APN6 should not appear in the section', async function () {
  const hasAPN2 = await trafficDetailPage.isAPNPresent('APN2');
  const hasAPN5 = await trafficDetailPage.isAPNPresent('APN5');
  const hasAPN6 = await trafficDetailPage.isAPNPresent('APN6');
  expect(hasAPN2).toBeFalsy();
  expect(hasAPN5).toBeFalsy();
  expect(hasAPN6).toBeFalsy();
});