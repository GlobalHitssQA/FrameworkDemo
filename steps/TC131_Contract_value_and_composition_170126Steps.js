const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const ActicenterPage = require('../pages/ActicenterPage');

let acticenterPage;

Given('the user is authenticated as an advisor in the Acticenter module', async function () {
  acticenterPage = new ActicenterPage(this.page);
  await acticenterPage.navigateToActicenter();
  await acticenterPage.loginAsAdvisor();
});

When('the user searches and selects an existing contract', async function () {
  await acticenterPage.searchContract();
  await acticenterPage.selectFirstContract();
});

Then('the contract value and composition component is displayed', async function () {
  const isVisible = await acticenterPage.isContractValueComponentVisible();
  expect(isVisible).toBeTruthy();
});

Then('the component shows the total contract value with correct monetary format', async function () {
  const totalValue = await acticenterPage.getTotalContractValue();
  expect(totalValue).toMatch(/^\$[\d,]+\.\d{2}$/);
});

When('the user clicks on the contract value component', async function () {
  await acticenterPage.clickContractValueComponent();
});

Then('a popup with the value breakdown is displayed aligned vertically', async function () {
  const isPopupVisible = await acticenterPage.isBreakdownPopupVisible();
  expect(isPopupVisible).toBeTruthy();
});

Then('the breakdown includes all applicable items based on contract type', async function () {
  const hasItems = await acticenterPage.hasBreakdownItems();
  expect(hasItems).toBeTruthy();
});

Then('items without monetary value are displayed as zero', async function () {
  const zeroItems = await acticenterPage.getZeroValueItems();
  for (const item of zeroItems) {
    expect(item).toMatch(/\$0\.00/);
  }
});

When('the user verifies Casa de Bolsa contract items', async function () {
  await acticenterPage.selectCasaDeBolsaContract();
});

Then('the purchasing power MXN item is displayed with currentcash value', async function () {
  const isVisible = await acticenterPage.isPurchasingPowerMXNVisible();
  expect(isVisible).toBeTruthy();
  const value = await acticenterPage.getPurchasingPowerMXNValue();
  expect(value).toMatch(/^\$[\d,]+\.\d{2}$/);
});

Then('the USD cash item shows the dollar currency amount', async function () {
  const usdValue = await acticenterPage.getCasaBolsaUSDCashValue();
  expect(usdValue).toMatch(/^\$[\d,]+\.\d{2}$/);
});

When('the user verifies Bank contract items', async function () {
  await acticenterPage.selectBankContract();
});

Then('the MXN cash item is displayed with account balance', async function () {
  const isVisible = await acticenterPage.isMXNCashVisible();
  expect(isVisible).toBeTruthy();
  const value = await acticenterPage.getMXNCashValue();
  expect(value).toMatch(/^\$[\d,]+\.\d{2}$/);
});

Then('the cash in transit item is displayed with SAP prenotes information', async function () {
  const isVisible = await acticenterPage.isCashInTransitVisible();
  expect(isVisible).toBeTruthy();
});

When('the user verifies Bank Persona Moral contract with Mexdolar account', async function () {
  await acticenterPage.selectBankPersonaMoralMexdolarContract();
});

Then('the USD cash item is displayed without exchange rate conversion', async function () {
  const usdValue = await acticenterPage.getUSDCashValue();
  expect(usdValue).toBeDefined();
});

Then('the breakdown shows pending settlements accumulated value', async function () {
  const pendingValue = await acticenterPage.getPendingSettlementsValue();
  expect(pendingValue).toMatch(/^\$[\d,]+\.\d{2}$/);
});

Then('the breakdown shows debt funds hedge funds and equity funds accumulated values', async function () {
  const debtFunds = await acticenterPage.getDebtFundsValue();
  const hedgeFunds = await acticenterPage.getHedgeFundsValue();
  const equityFunds = await acticenterPage.getEquityFundsValue();
  expect(debtFunds).toMatch(/^\$[\d,]+\.\d{2}$/);
  expect(hedgeFunds).toMatch(/^\$[\d,]+\.\d{2}$/);
  expect(equityFunds).toMatch(/^\$[\d,]+\.\d{2}$/);
});

Then('the breakdown shows Cedes pagares money market and capital market values', async function () {
  const cedesPagares = await acticenterPage.getCedesPagaresValue();
  const moneyMarket = await acticenterPage.getMoneyMarketValue();
  const capitalMarket = await acticenterPage.getCapitalMarketValue();
  expect(cedesPagares).toMatch(/^\$[\d,]+\.\d{2}$/);
  expect(moneyMarket).toMatch(/^\$[\d,]+\.\d{2}$/);
  expect(capitalMarket).toMatch(/^\$[\d,]+\.\d{2}$/);
});

When('the user clicks outside the breakdown component', async function () {
  await acticenterPage.clickOutsideBreakdown();
});

Then('the breakdown popup closes', async function () {
  const isHidden = await acticenterPage.isBreakdownPopupHidden();
  expect(isHidden).toBeTruthy();
});

Then('the search function with magnifying glass icon is visible', async function () {
  const isVisible = await acticenterPage.isSearchIconVisible();
  expect(isVisible).toBeTruthy();
});

When('the user clicks on the magnifying glass search icon', async function () {
  await acticenterPage.clickSearchIcon();
});

Then('the client general screen is displayed for contract selection', async function () {
  const isVisible = await acticenterPage.isClientScreenVisible();
  expect(isVisible).toBeTruthy();
});

When('the user views a Mexdolar Persona Moral contract', async function () {
  await acticenterPage.selectMexdolarPersonaMoralContract();
});

Then('the USD cash is displayed as read only without exchange conversion', async function () {
  const isReadOnly = await acticenterPage.isUSDCashReadOnly();
  expect(isReadOnly).toBeTruthy();
});

Then('the buy sell widget is disabled', async function () {
  const isDisabled = await acticenterPage.isBuySellWidgetDisabled();
  expect(isDisabled).toBeTruthy();
});

When('the user validates responsive views', async function () {
  await acticenterPage.validateResponsiveViews();
});

Then('the component works correctly in desktop landscape and portrait views', async function () {
  const desktopValid = await acticenterPage.validateDesktopView();
  const landscapeValid = await acticenterPage.validateLandscapeView();
  const portraitValid = await acticenterPage.validatePortraitView();
  expect(desktopValid).toBeTruthy();
  expect(landscapeValid).toBeTruthy();
  expect(portraitValid).toBeTruthy();
});