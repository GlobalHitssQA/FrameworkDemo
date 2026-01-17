const { expect } = require('@playwright/test');

class SimChangePage {
  constructor(page) {
    this.page = page;
    this._simChangeModuleLink = '[data-testid="sim-change-module"]';
    this._userPermissionsIndicator = '[data-testid="user-permissions-badge"]';
    this._lineSearchInput = '[data-testid="line-search-input"]';
    this._searchButton = '[data-testid="search-button"]';
    this._lineStatusIndicator = '[data-testid="line-status"]';
    this._linePlanLabel = '[data-testid="line-plan"]';
    this._inPoolPackageLabel = '[data-testid="in-pool-package"]';
    this._newIccidInput = '[data-testid="new-iccid-input"]';
    this._newSimStatusIndicator = '[data-testid="new-sim-status"]';
    this._submitSimChangeButton = '[data-testid="submit-sim-change"]';
    this._processingSpinner = '[data-testid="processing-spinner"]';
    this._simChangeStatusLabel = '[data-testid="sim-change-status"]';
    this._confirmationMessageLabel = '[data-testid="confirmation-message"]';
  }

  async navigateToSimChangeModule() {
    await this.page.click(this._simChangeModuleLink);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyUserHasSimChangePermissions() {
    const permissionsBadge = await this.page.locator(this._userPermissionsIndicator);
    const permissions = await permissionsBadge.textContent();
    expect(permissions).toContain('SIM_CHANGE');
  }

  async searchLine(lineNumber) {
    await this.page.fill(this._lineSearchInput, lineNumber);
    await this.page.click(this._searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyLineIsActive() {
    const status = await this.page.locator(this._lineStatusIndicator).textContent();
    expect(status).toBe('ACTIVE');
  }

  async verifyLinePlan(expectedPlan) {
    const plan = await this.page.locator(this._linePlanLabel).textContent();
    expect(plan).toBe(expectedPlan);
  }

  async verifyInPoolPackageExists(expectedPackage) {
    const packageLabel = await this.page.locator(this._inPoolPackageLabel).textContent();
    expect(packageLabel).toContain(expectedPackage);
  }

  async verifyNewSimAvailable(iccid) {
    await this.page.fill(this._newIccidInput, iccid);
    await this.page.waitForTimeout(500);
    const status = await this.page.locator(this._newSimStatusIndicator).textContent();
    expect(status).toBe('AVAILABLE');
  }

  async enterNewIccid(iccid) {
    await this.page.fill(this._newIccidInput, iccid);
  }

  async submitSimChangeRequest() {
    await this.page.click(this._submitSimChangeButton);
  }

  async waitForProcessingComplete() {
    await this.page.waitForSelector(this._processingSpinner, { state: 'hidden', timeout: 60000 });
  }

  async getSimChangeStatus() {
    return await this.page.locator(this._simChangeStatusLabel).textContent();
  }

  async getConfirmationMessage() {
    return await this.page.locator(this._confirmationMessageLabel).textContent();
  }
}

class InstantLinkPage {
  constructor(page) {
    this.page = page;
    this._instantLinkMenuLink = '[data-testid="instant-link-menu"]';
    this._iccidSearchInput = '[data-testid="iccid-search-input"]';
    this._searchButton = '[data-testid="search-button"]';
    this._lineIccidLabel = '[data-testid="line-iccid"]';
    this._linePlanLabel = '[data-testid="line-plan"]';
    this._apnListContainer = '[data-testid="apn-list"]';
    this._apnItemSelector = '[data-testid^="apn-item-"]';
    this._apnConfigurationLink = '[data-testid="apn-configuration-link"]';
    this._esimDownloadToggle = '[data-testid="esim-download-toggle"]';
    this._esimDownloadCostLabel = '[data-testid="esim-download-cost"]';
  }

  async navigateToInstantLink() {
    await this.page.click(this._instantLinkMenuLink);
    await this.page.waitForLoadState('networkidle');
  }

  async searchByIccid(iccid) {
    await this.page.fill(this._iccidSearchInput, iccid);
    await this.page.click(this._searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getLineIccid() {
    return await this.page.locator(this._lineIccidLabel).textContent();
  }

  async getLinePlan() {
    return await this.page.locator(this._linePlanLabel).textContent();
  }

  async getConfiguredApns() {
    const apnElements = await this.page.locator(this._apnItemSelector).all();
    const apns = [];
    for (const element of apnElements) {
      apns.push(await element.textContent());
    }
    return apns;
  }

  async navigateToApnConfiguration() {
    await this.page.click(this._apnConfigurationLink);
    await this.page.waitForLoadState('networkidle');
  }

  async isEsimDownloadEnabled(apnName) {
    const toggle = this.page.locator(`[data-testid="esim-toggle-${apnName}"]`);
    return await toggle.isChecked();
  }

  async getEsimDownloadCost(apnName) {
    const costLabel = this.page.locator(`[data-testid="esim-cost-${apnName}"]`);
    const costText = await costLabel.textContent();
    return parseFloat(costText.replace(/[^0-9.]/g, ''));
  }
}

class Bscs7Page {
  constructor(page) {
    this.page = page;
    this._bscs7MenuLink = '[data-testid="bscs7-menu"]';
    this._iccidSearchInput = '[data-testid="bscs7-iccid-search"]';
    this._searchButton = '[data-testid="bscs7-search-button"]';
    this._inPoolPackageStatusLabel = '[data-testid="in-pool-status"]';
    this._inPoolPackageSizeLabel = '[data-testid="in-pool-size"]';
  }

  async navigateToBscs7() {
    await this.page.click(this._bscs7MenuLink);
    await this.page.waitForLoadState('networkidle');
  }

  async searchByIccid(iccid) {
    await this.page.fill(this._iccidSearchInput, iccid);
    await this.page.click(this._searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getInPoolPackageStatus() {
    return await this.page.locator(this._inPoolPackageStatusLabel).textContent();
  }

  async getInPoolPackageSize() {
    return await this.page.locator(this._inPoolPackageSizeLabel).textContent();
  }
}

class InPoolCalculationPage {
  constructor(page) {
    this.page = page;
    this._inPoolCalculationMenuLink = '[data-testid="in-pool-calculation-menu"]';
    this._lineSearchInput = '[data-testid="in-pool-line-search"]';
    this._searchButton = '[data-testid="in-pool-search-button"]';
    this._lineIncludedIndicator = '[data-testid="line-included-indicator"]';
    this._calculationFormulaLabel = '[data-testid="calculation-formula"]';
  }

  async navigateToInPoolCalculation() {
    await this.page.click(this._inPoolCalculationMenuLink);
    await this.page.waitForLoadState('networkidle');
  }

  async searchLineInPool(iccid) {
    await this.page.fill(this._lineSearchInput, iccid);
    await this.page.click(this._searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isLineIncludedInCalculation() {
    const indicator = await this.page.locator(this._lineIncludedIndicator);
    return await indicator.isVisible();
  }

  async getCalculationFormula() {
    return await this.page.locator(this._calculationFormulaLabel).textContent();
  }
}

class NetworkServicesPage {
  constructor(page) {
    this.page = page;
    this._networkServicesMenuLink = '[data-testid="network-services-menu"]';
    this._iccidSearchInput = '[data-testid="network-iccid-search"]';
    this._searchButton = '[data-testid="network-search-button"]';
    this._volteHlrStatusLabel = '[data-testid="volte-hlr-status"]';
    this._volteHssStatusLabel = '[data-testid="volte-hss-status"]';
    this._volteImsStatusLabel = '[data-testid="volte-ims-status"]';
  }

  async navigateToNetworkServices() {
    await this.page.click(this._networkServicesMenuLink);
    await this.page.waitForLoadState('networkidle');
  }

  async searchByIccid(iccid) {
    await this.page.fill(this._iccidSearchInput, iccid);
    await this.page.click(this._searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async getVolteStatusInHlr() {
    return await this.page.locator(this._volteHlrStatusLabel).textContent();
  }

  async getVolteStatusInHss() {
    return await this.page.locator(this._volteHssStatusLabel).textContent();
  }

  async getVolteStatusInIms() {
    return await this.page.locator(this._volteImsStatusLabel).textContent();
  }
}

class SiacUnicoPage {
  constructor(page) {
    this.page = page;
    this._siacUnicoMenuLink = '[data-testid="siac-unico-menu"]';
    this._lineSearchInput = '[data-testid="siac-line-search"]';
    this._transactionTypeSelect = '[data-testid="transaction-type-select"]';
    this._searchButton = '[data-testid="siac-search-button"]';
    this._transactionRowSelector = '[data-testid="transaction-row"]';
    this._transactionDateLabel = '[data-testid="transaction-date"]';
    this._transactionTimeLabel = '[data-testid="transaction-time"]';
    this._transactionUserLabel = '[data-testid="transaction-user"]';
    this._previousIccidLabel = '[data-testid="previous-iccid"]';
    this._newIccidLabel = '[data-testid="new-iccid"]';
    this._transactionPlanLabel = '[data-testid="transaction-plan"]';
  }

  async navigateToSiacUnico() {
    await this.page.click(this._siacUnicoMenuLink);
    await this.page.waitForLoadState('networkidle');
  }

  async searchTransaction(lineNumber, transactionType) {
    await this.page.fill(this._lineSearchInput, lineNumber);
    await this.page.selectOption(this._transactionTypeSelect, transactionType);
    await this.page.click(this._searchButton);
    await this.page.waitForLoadState('networkidle');
  }

  async isTransactionRegistered() {
    const transactionRow = await this.page.locator(this._transactionRowSelector);
    return await transactionRow.isVisible();
  }

  async getTransactionDetails() {
    return {
      date: await this.page.locator(this._transactionDateLabel).textContent(),
      time: await this.page.locator(this._transactionTimeLabel).textContent(),
      user: await this.page.locator(this._transactionUserLabel).textContent(),
      previousIccid: await this.page.locator(this._previousIccidLabel).textContent(),
      newIccid: await this.page.locator(this._newIccidLabel).textContent(),
      plan: await this.page.locator(this._transactionPlanLabel).textContent()
    };
  }
}

module.exports = {
  SimChangePage,
  InstantLinkPage,
  Bscs7Page,
  InPoolCalculationPage,
  NetworkServicesPage,
  SiacUnicoPage
};