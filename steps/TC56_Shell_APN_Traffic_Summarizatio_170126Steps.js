const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ShellExecutionPage = require('../pages/ShellExecutionPage');

let shellPage;

Given('the BSCS7 system is available and Shell sh_BSCS_calculaFacturaGM is deployed', async function () {
  shellPage = new ShellExecutionPage(this.page);
  await shellPage.navigateToSystemConsole();
  await shellPage.verifySystemAvailability();
  await shellPage.verifyShellDeployment();
});

Given('a SOLD plan line exists with traffic records in UDR_LT_01 table', async function () {
  await shellPage.navigateToDatabaseConsole();
  await shellPage.verifySOLDPlanLineExists();
  await shellPage.verifyUDRTableAccessible();
});

When('I insert test traffic records with 50 MB on APN1, 30 MB on APN2, 40 MB on APN4, 20 MB on APN5, and 10 MB on APN6', async function () {
  const trafficRecords = [
    { apn: 'onstarsa', megabytes: 50 },
    { apn: 'apn2', megabytes: 30 },
    { apn: 'onstar01.v6', megabytes: 40 },
    { apn: 'apn5', megabytes: 20 },
    { apn: 'apn6', megabytes: 10 }
  ];
  await shellPage.insertTrafficRecords(trafficRecords);
  await shellPage.verifyRecordsInserted();
});

When('I execute the Shell sh_BSCS_calculaFacturaGM to summarize telemetry traffic', async function () {
  await shellPage.navigateToShellExecution();
  await shellPage.executeShellScript('sh_BSCS_calculaFacturaGM');
  await shellPage.waitForShellCompletion();
});

Then('the total summarized traffic should be 90 MB from APN1 and APN4 only', async function () {
  const totalTraffic = await shellPage.getSummarizedTrafficTotal();
  expect(totalTraffic).toBe(90);
});

Then('the traffic from APN2, APN5, and APN6 should be excluded from In Pool calculation', async function () {
  const excludedTraffic = await shellPage.getExcludedAPNTraffic();
  expect(excludedTraffic.apn2).toBe(30);
  expect(excludedTraffic.apn5).toBe(20);
  expect(excludedTraffic.apn6).toBe(10);
  const inPoolTraffic = await shellPage.getInPoolTrafficDetails();
  expect(inPoolTraffic).not.toContain('apn2');
  expect(inPoolTraffic).not.toContain('apn5');
  expect(inPoolTraffic).not.toContain('apn6');
});

Then('the execution logs should document that only APN1 and APN4 were included in the summarization', async function () {
  await shellPage.navigateToExecutionLogs();
  const logContent = await shellPage.getExecutionLogContent();
  expect(logContent).toContain('APN1: onstarsa - Included in In Pool calculation');
  expect(logContent).toContain('APN4: onstar01.v6 - Included in In Pool calculation');
  expect(logContent).toContain('Excluded APNs from In Pool: APN2, APN5, APN6');
});