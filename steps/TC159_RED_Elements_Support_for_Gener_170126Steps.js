const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const RedElementsPage = require('../pages/RedElementsPage');

let redElementsPage;

Given('a General Motors line is provisioned with a productive RATEPLAN with {int} APNs enabled', async function(apnCount) {
  redElementsPage = new RedElementsPage(this.page);
  await redElementsPage.navigateToProvisioningPanel();
  await redElementsPage.provisionGMLineWithAPNs(apnCount);
  const provisionedAPNs = await redElementsPage.getProvisionedAPNCount();
  expect(provisionedAPNs).toBe(apnCount);
});

When('I establish a data session using APN1 for telemetry traffic', async function() {
  await redElementsPage.selectAPN('APN1');
  await redElementsPage.establishDataSession();
});

Then('the RED elements allow the data session and telemetry traffic flows correctly', async function() {
  const sessionStatus = await redElementsPage.getSessionStatus();
  expect(sessionStatus).toBe('active');
  const telemetryFlowStatus = await redElementsPage.verifyTelemetryTrafficFlow();
  expect(telemetryFlowStatus).toBe(true);
});

When('I establish data sessions sequentially using each of the {int} APNs', async function(apnCount) {
  for (let i = 1; i <= apnCount; i++) {
    await redElementsPage.selectAPN(`APN${i}`);
    await redElementsPage.establishDataSession();
    await redElementsPage.waitForSessionEstablishment();
  }
});

Then('each data session is successfully established for its corresponding APN', async function() {
  const allSessionsActive = await redElementsPage.verifyAllAPNSessionsActive();
  expect(allSessionsActive).toBe(true);
});

When('I verify the PCRF policies for each APN', async function() {
  await redElementsPage.navigateToPCRFConsole();
  await redElementsPage.loadPoliciesForAllAPNs();
});

Then('PCRF shows active and differentiated policies for each APN according to its use', async function() {
  const policiesValid = await redElementsPage.verifyDifferentiatedPolicies();
  expect(policiesValid).toBe(true);
  const policyTypes = await redElementsPage.getPolicyTypesForAPNs();
  expect(policyTypes).toContain('telemetria_in_pool');
  expect(policyTypes).toContain('navegacion_granel');
  expect(policyTypes).toContain('descarga_esim');
});

When('I generate simultaneous traffic through multiple APNs from the same line', async function() {
  await redElementsPage.initiateMultiAPNTraffic(['APN1', 'APN2', 'APN3', 'APN4']);
});

Then('RED elements support concurrent data sessions applying corresponding policies', async function() {
  const concurrentSessionsSupported = await redElementsPage.verifyConcurrentSessions();
  expect(concurrentSessionsSupported).toBe(true);
  const policiesApplied = await redElementsPage.verifyPoliciesAppliedToSessions();
  expect(policiesApplied).toBe(true);
});

When('I verify sessions for TESTING RATEPLAN with pre-productive APNs only', async function() {
  await redElementsPage.switchToTestingRateplan();
  await redElementsPage.attemptSessionWithProductiveAPNs(['APN1', 'APN3', 'APN4', 'APN5']);
  await redElementsPage.attemptSessionWithPreProductiveAPNs(['APN2', 'APN6', 'APN7']);
});

Then('RED elements only allow sessions for pre-productive APNs blocking productive ones', async function() {
  const productiveBlocked = await redElementsPage.verifyProductiveAPNsBlocked();
  expect(productiveBlocked).toBe(true);
  const preProductiveAllowed = await redElementsPage.verifyPreProductiveAPNsAllowed();
  expect(preProductiveAllowed).toBe(true);
});