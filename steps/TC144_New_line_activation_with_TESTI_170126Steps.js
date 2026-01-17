const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const LineActivationPage = require('../pages/LineActivationPage');
const InstantLinkPage = require('../pages/InstantLinkPage');
const BSCS7Page = require('../pages/BSCS7Page');
const NetworkSystemsPage = require('../pages/NetworkSystemsPage');
const SiacUnicoPage = require('../pages/SiacUnicoPage');

let lineActivationPage;
let instantLinkPage;
let bscs7Page;
let networkSystemsPage;
let siacUnicoPage;
let activatedLineNumber;

Given('the user is authenticated with line activation permissions', async function() {
  lineActivationPage = new LineActivationPage(this.page);
  await lineActivationPage.navigateToActivationPortal();
  await lineActivationPage.login(process.env.TEST_USER, process.env.TEST_PASSWORD);
  await lineActivationPage.verifyUserHasActivationPermissions();
});

Given('a SIM card is available for activation', async function() {
  await lineActivationPage.verifySIMCardAvailable();
});

Given('TESTING plan is configured in the system', async function() {
  await lineActivationPage.verifyTestingPlanExists();
});

When('the user initiates new line activation process', async function() {
  await lineActivationPage.clickNewLineActivation();
});

When('the user selects TESTING plan with corresponding parameters', async function() {
  await lineActivationPage.selectPlan('TESTING');
  await lineActivationPage.configureTestingPlanParameters();
});

When('the user submits the activation request', async function() {
  activatedLineNumber = await lineActivationPage.submitActivationRequest();
});

Then('the system accepts the activation request and processes the line provision', async function() {
  const status = await lineActivationPage.getActivationStatus();
  expect(status).toBe('PROVISIONED');
});

Then('the line is provisioned in INSTANT LINK with TESTING rateplan', async function() {
  instantLinkPage = new InstantLinkPage(this.page);
  await instantLinkPage.navigateToInstantLink();
  await instantLinkPage.searchLine(activatedLineNumber);
  const rateplan = await instantLinkPage.getRateplan();
  expect(rateplan).toBe('TESTING');
});

Then('the line has APN2 and APN6 pre-productive APNs configured', async function() {
  const apns = await instantLinkPage.getConfiguredAPNs();
  expect(apns).toContain('APN2');
  expect(apns).toContain('APN6');
});

Then('the line in BSCS7 has TESTING plan with bulk tarification for VOICE SMS and DATA', async function() {
  bscs7Page = new BSCS7Page(this.page);
  await bscs7Page.navigateToBSCS7();
  await bscs7Page.searchLine(activatedLineNumber);
  const plan = await bscs7Page.getActivePlan();
  expect(plan).toBe('TESTING');
  const tarificationType = await bscs7Page.getTarificationType();
  expect(tarificationType).toBe('GRANEL');
});

Then('the VOICE rate is 0.07 soles per minute', async function() {
  const voiceRate = await bscs7Page.getVoiceRate();
  expect(voiceRate).toBe(0.07);
});

Then('the SMS rate is 0.05 soles per message', async function() {
  const smsRate = await bscs7Page.getSMSRate();
  expect(smsRate).toBe(0.05);
});

Then('the DATA rate is 0.2033 soles per MB without IGV', async function() {
  const dataRate = await bscs7Page.getDataRate();
  expect(dataRate).toBe(0.2033);
  const includesIGV = await bscs7Page.rateIncludesIGV();
  expect(includesIGV).toBe(false);
});

Then('the line has VoLTE enabled in HLR HSS and IMS network systems', async function() {
  networkSystemsPage = new NetworkSystemsPage(this.page);
  await networkSystemsPage.navigateToNetworkSystems();
  await networkSystemsPage.searchLine(activatedLineNumber);
  const hlrVoLTE = await networkSystemsPage.isVoLTEEnabledInHLR();
  const hssVoLTE = await networkSystemsPage.isVoLTEEnabledInHSS();
  const imsVoLTE = await networkSystemsPage.isVoLTEEnabledInIMS();
  expect(hlrVoLTE).toBe(true);
  expect(hssVoLTE).toBe(true);
  expect(imsVoLTE).toBe(true);
});

Then('the SERVICE_VOLTE parameter is provisioned', async function() {
  const serviceVoLTE = await networkSystemsPage.getServiceVoLTEParameter();
  expect(serviceVoLTE).toBe('PROVISIONED');
});

Then('the activation is recorded in SIAC Unico with date time user and TESTING plan', async function() {
  siacUnicoPage = new SiacUnicoPage(this.page);
  await siacUnicoPage.navigateToSiacUnico();
  await siacUnicoPage.searchTransaction(activatedLineNumber);
  const record = await siacUnicoPage.getActivationRecord();
  expect(record.date).toBeTruthy();
  expect(record.time).toBeTruthy();
  expect(record.user).toBeTruthy();
  expect(record.plan).toBe('TESTING');
});