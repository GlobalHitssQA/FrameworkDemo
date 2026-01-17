const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ConcurrentContractPage = require('../pages/ConcurrentContractPage');

let sessionOnePage;
let sessionTwoPage;
let initialValues;
let sessionOneValues;
let sessionTwoValues;

Given('I have two active sessions with the same user and contract selected', async function () {
  sessionOnePage = new ConcurrentContractPage(this.pageOne);
  sessionTwoPage = new ConcurrentContractPage(this.pageTwo);
  await sessionOnePage.navigateToContract();
  await sessionTwoPage.navigateToContract();
  await sessionOnePage.loginWithCredentials(this.testCredentials);
  await sessionTwoPage.loginWithCredentials(this.testCredentials);
  await sessionOnePage.selectContract(this.testContractId);
  await sessionTwoPage.selectContract(this.testContractId);
});

Given('both sessions display the value and composition component with identical initial values', async function () {
  const valuesSessionOne = await sessionOnePage.getTotalContractValue();
  const valuesSessionTwo = await sessionTwoPage.getTotalContractValue();
  initialValues = valuesSessionOne;
  expect(valuesSessionOne).toEqual(valuesSessionTwo);
  const compositionOne = await sessionOnePage.getContractComposition();
  const compositionTwo = await sessionTwoPage.getContractComposition();
  expect(compositionOne).toEqual(compositionTwo);
});

When('I execute an operation that modifies a category value in session one', async function () {
  await sessionOnePage.openFundsPurchaseDialog();
  await sessionOnePage.selectFundForPurchase(this.testFundId);
  await sessionOnePage.enterPurchaseAmount(this.testPurchaseAmount);
  await sessionOnePage.confirmFundPurchase();
});

Then('the operation is processed correctly in session one', async function () {
  const operationStatus = await sessionOnePage.getOperationStatus();
  expect(operationStatus).toBe('success');
  sessionOneValues = await sessionOnePage.getTotalContractValue();
  expect(sessionOneValues).not.toEqual(initialValues);
});

When('I refresh the component in session two without closing the session', async function () {
  await sessionTwoPage.refreshContractComponent();
});

Then('session two displays updated values reflecting changes from session one', async function () {
  sessionTwoValues = await sessionTwoPage.getTotalContractValue();
  expect(sessionTwoValues).toEqual(sessionOneValues);
  const compositionTwo = await sessionTwoPage.getContractComposition();
  const compositionOne = await sessionOnePage.getContractComposition();
  expect(compositionTwo).toEqual(compositionOne);
});

When('I execute simultaneous operations in both sessions affecting different categories', async function () {
  const operationOne = sessionOnePage.executeCategoryOperation('efectivo_mxn', this.testOperationAmountOne);
  const operationTwo = sessionTwoPage.executeCategoryOperation('mercado_capitales', this.testOperationAmountTwo);
  await Promise.all([operationOne, operationTwo]);
});

Then('the system processes both operations without conflicts', async function () {
  const statusOne = await sessionOnePage.getOperationStatus();
  const statusTwo = await sessionTwoPage.getOperationStatus();
  expect(statusOne).toBe('success');
  expect(statusTwo).toBe('success');
});

Then('both sessions display correctly updated values', async function () {
  await sessionOnePage.refreshContractComponent();
  await sessionTwoPage.refreshContractComponent();
  const finalValuesOne = await sessionOnePage.getTotalContractValue();
  const finalValuesTwo = await sessionTwoPage.getTotalContractValue();
  expect(finalValuesOne).toEqual(finalValuesTwo);
  const compositionOne = await sessionOnePage.getContractComposition();
  const compositionTwo = await sessionTwoPage.getContractComposition();
  expect(compositionOne).toEqual(compositionTwo);
});

When('I verify data integrity by querying the backend directly', async function () {
  this.backendData = await sessionOnePage.queryBackendContractData(this.testContractId);
});

Then('the stored values are consistent and reflect all executed operations correctly', async function () {
  const frontendValues = await sessionOnePage.getTotalContractValue();
  const frontendComposition = await sessionOnePage.getContractComposition();
  expect(this.backendData.totalValue).toEqual(frontendValues);
  expect(this.backendData.composition.poderCompraMxn).toEqual(frontendComposition.poderCompraMxn);
  expect(this.backendData.composition.efectivoMxn).toEqual(frontendComposition.efectivoMxn);
  expect(this.backendData.composition.efectivoUsd).toEqual(frontendComposition.efectivoUsd);
  expect(this.backendData.composition.pendientesLiquidar).toEqual(frontendComposition.pendientesLiquidar);
  expect(this.backendData.composition.fondos).toEqual(frontendComposition.fondos);
  expect(this.backendData.composition.cedesPagares).toEqual(frontendComposition.cedesPagares);
  expect(this.backendData.composition.mercadoDinero).toEqual(frontendComposition.mercadoDinero);
  expect(this.backendData.composition.mercadoCapitales).toEqual(frontendComposition.mercadoCapitales);
});