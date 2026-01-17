const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;
let bankContractPendingText;
let brokerageContractPendingText;

Given('the user is authenticated and on the Acticenter main screen', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.verifyMainScreenDisplayed();
});

When('the user selects a Bank type contract with pending settlement operations', async function () {
  await acticenterPage.selectBankContractWithPendingOperations();
});

Then('the system loads the Bank contract information and displays the total contract value component', async function () {
  await acticenterPage.verifyContractInfoLoaded();
  await acticenterPage.verifyTotalValueComponentDisplayed();
});

When('the user clicks on the total contract value component to expand the breakdown', async function () {
  await acticenterPage.clickTotalValueComponent();
});

Then('the system displays the breakdown showing the Pending to settle section for the Bank contract', async function () {
  await acticenterPage.verifyBreakdownPopupDisplayed();
  await acticenterPage.verifyPendingToSettleSectionDisplayed();
  bankContractPendingText = await acticenterPage.getPendingToSettleSectionText();
});

When('the user closes the breakdown and selects a Brokerage type contract with pending settlement operations', async function () {
  await acticenterPage.closeBreakdownPopup();
  await acticenterPage.selectBrokerageContractWithPendingOperations();
});

Then('the system loads the Brokerage contract information and displays the total contract value component', async function () {
  await acticenterPage.verifyContractInfoLoaded();
  await acticenterPage.verifyTotalValueComponentDisplayed();
});

Then('the system displays the breakdown showing the Pending to settle section for the Brokerage contract', async function () {
  await acticenterPage.verifyBreakdownPopupDisplayed();
  await acticenterPage.verifyPendingToSettleSectionDisplayed();
  brokerageContractPendingText = await acticenterPage.getPendingToSettleSectionText();
});

Then('the Pending to settle section is displayed in the same manner for both contract types', async function () {
  const bankSectionStyle = await acticenterPage.getPendingToSettleSectionStyle();
  const brokerageSectionStyle = await acticenterPage.getPendingToSettleSectionStyle();
  expect(bankContractPendingText).toBeTruthy();
  expect(brokerageContractPendingText).toBeTruthy();
  await acticenterPage.verifyPendingToSettleSectionConsistency();
});