const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ContractBreakdownPage = require('../pages/ContractBreakdownPage');

let contractBreakdownPage;
let operationTimes = [];

Given('the user is authenticated in Acticenter', async function () {
  contractBreakdownPage = new ContractBreakdownPage(this.page);
  await contractBreakdownPage.navigateToActicenter();
  await contractBreakdownPage.verifyUserAuthenticated();
});

Given('a contract with values in multiple categories is selected', async function () {
  await contractBreakdownPage.selectContractWithMultipleCategories();
  await contractBreakdownPage.verifyContractComponentDisplayed();
});

When('the user clicks on the contract value component to display the breakdown', async function () {
  const startTime = Date.now();
  await contractBreakdownPage.clickContractValueComponent();
  const endTime = Date.now();
  operationTimes.push(endTime - startTime);
});

Then('the breakdown popup should be displayed smoothly', async function () {
  const isVisible = await contractBreakdownPage.isBreakdownPopupVisible();
  expect(isVisible).toBeTruthy();
});

When('the user closes the breakdown by clicking outside the component', async function () {
  const startTime = Date.now();
  await contractBreakdownPage.closeBreakdownByClickingOutside();
  const endTime = Date.now();
  operationTimes.push(endTime - startTime);
});

Then('the popup should close correctly', async function () {
  const isClosed = await contractBreakdownPage.isBreakdownPopupClosed();
  expect(isClosed).toBeTruthy();
});

When('the user repeats opening and closing the breakdown {int} consecutive times', async function (repetitions) {
  for (let i = 0; i < repetitions; i++) {
    const openStartTime = Date.now();
    await contractBreakdownPage.clickContractValueComponent();
    await contractBreakdownPage.waitForBreakdownPopupVisible();
    const openEndTime = Date.now();
    operationTimes.push(openEndTime - openStartTime);

    const closeStartTime = Date.now();
    await contractBreakdownPage.closeBreakdownByClickingOutside();
    await contractBreakdownPage.waitForBreakdownPopupClosed();
    const closeEndTime = Date.now();
    operationTimes.push(closeEndTime - closeStartTime);
  }
});

Then('the component should open and close consistently without performance degradation', async function () {
  const firstHalf = operationTimes.slice(0, Math.floor(operationTimes.length / 2));
  const secondHalf = operationTimes.slice(Math.floor(operationTimes.length / 2));
  
  const avgFirstHalf = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
  const avgSecondHalf = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
  
  const degradationThreshold = 1.5;
  expect(avgSecondHalf).toBeLessThan(avgFirstHalf * degradationThreshold);
});

Then('each operation response time should remain under {int} seconds', async function (maxSeconds) {
  const maxMilliseconds = maxSeconds * 1000;
  for (const time of operationTimes) {
    expect(time).toBeLessThan(maxMilliseconds);
  }
});