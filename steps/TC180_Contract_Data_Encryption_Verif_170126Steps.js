const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractEncryptionPage = require('../pages/ContractEncryptionPage');

let contractEncryptionPage;
let capturedRequests = [];

Given('the network traffic inspection tool is configured and capturing traffic', async function () {
  contractEncryptionPage = new ContractEncryptionPage(this.page);
  capturedRequests = await contractEncryptionPage.setupNetworkInterception();
});

Given('I am authenticated in Acticenter with an active contract', async function () {
  await contractEncryptionPage.navigateToActicenter();
  await contractEncryptionPage.performAuthentication();
  await contractEncryptionPage.verifyActiveContractExists();
});

When('I access the contract value and composition component', async function () {
  await contractEncryptionPage.accessContractValueComponent();
  await contractEncryptionPage.waitForBackendCalls();
});

Then('all requests should use HTTPS protocol with TLS 1.2 or higher', async function () {
  const allRequestsSecure = await contractEncryptionPage.verifyAllRequestsUseHTTPS(capturedRequests);
  expect(allRequestsSecure).toBe(true);
});

Then('no unencrypted HTTP transmissions containing contract data should be detected', async function () {
  const hasUnencryptedData = await contractEncryptionPage.checkForUnencryptedTransmissions(capturedRequests);
  expect(hasUnencryptedData).toBe(false);
});

Then('packet contents should not be readable without decryption certificates', async function () {
  const dataIsEncrypted = await contractEncryptionPage.verifyDataEncryption(capturedRequests);
  expect(dataIsEncrypted).toBe(true);
});