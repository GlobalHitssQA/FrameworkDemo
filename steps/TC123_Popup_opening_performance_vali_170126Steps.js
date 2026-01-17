const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;
let performanceMetrics = [];

Given('the user is authenticated and on the Acticenter module', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
});

Given('the user selects an active contract', async function () {
  await acticenterPage.selectActiveContract();
});

Given('the contract value component is displayed correctly', async function () {
  const isVisible = await acticenterPage.isContractValueComponentVisible();
  expect(isVisible).toBe(true);
});

When('the user clicks on the total contract value component and measures response time', async function () {
  const openingTime = await acticenterPage.clickContractValueAndMeasureTime();
  performanceMetrics.push(openingTime);
});

Then('the pop-up should open completely in less than {float} seconds', async function (maxSeconds) {
  const lastMeasurement = performanceMetrics[performanceMetrics.length - 1];
  expect(lastMeasurement).toBeLessThan(maxSeconds * 1000);
  await acticenterPage.verifyPopupFullyLoaded();
  await acticenterPage.closePopup();
});

When('the user repeats the opening operation {int} consecutive times', async function (repetitions) {
  for (let i = 0; i < repetitions; i++) {
    const openingTime = await acticenterPage.clickContractValueAndMeasureTime();
    performanceMetrics.push(openingTime);
    await acticenterPage.closePopup();
  }
});

Then('all measurements should be within the acceptable range of {float} seconds', async function (maxSeconds) {
  const maxMilliseconds = maxSeconds * 1000;
  for (const metric of performanceMetrics) {
    expect(metric).toBeLessThan(maxMilliseconds);
  }
});

Then('the average opening time should be less than {float} seconds', async function (maxSeconds) {
  const averageTime = performanceMetrics.reduce((sum, time) => sum + time, 0) / performanceMetrics.length;
  const maxMilliseconds = maxSeconds * 1000;
  expect(averageTime).toBeLessThan(maxMilliseconds);
  console.log(`Average pop-up opening time: ${averageTime.toFixed(2)}ms`);
  console.log(`All measurements: ${performanceMetrics.map(m => m.toFixed(2) + 'ms').join(', ')}`);
});